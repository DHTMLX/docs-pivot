---
sidebar_label: 与服务器配合使用
title: 与服务器配合使用
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解如何将 Pivot 与后端集成。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

Pivot 完全在浏览器中运行。该 widget 接收一个原始行数组和一个 [`config`](/api/config/config-property)（rows / columns / values），并在客户端对行进行聚合。它没有内置的传输层，但公共 API 提供了与任何后端进行往返通信的钩子。

典型的集成包含三个部分：

1. **加载**：初始化时从服务器加载原始的未聚合数据
2. **保存配置**：当用户更改布局时保存 `config`，以便后续会话可以恢复
3. **保存聚合表格**：当服务器需要汇总结果的快照时保存

## 从服务器加载原始数据 {#load-raw-data-from-the-server}

[`data`](/api/config/data-property) 属性期望接收一个原始行对象数组。Pivot 自身完成行的聚合，因此服务器返回未汇总的数据。

使用 `fetch`（或任意 HTTP 客户端）拉取数据和字段，待响应到达后再构建 widget：

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
        fetch(server + "/config").then(res => res.json()), // 可选
    ]).then(([data, fields, config]) => {
        new pivot.Pivot("#root", {
            data,
            fields,
            config,
        });
    });
</script>
~~~

如果服务器以 ISO 字符串形式返回日期字段，请在将数组传递给 Pivot 之前将其转换为 `Date` 实例。日期类型字段的聚合方法依赖真实的 `Date` 值：

~~~jsx
data.forEach(row => {
    if (typeof row.when === "string") row.when = new Date(row.when);
});
~~~

:::info
**另请参阅**：
- [加载数据](/guides/loading-data)
- [日期格式化](/guides/localization#date-formatting)
:::

## 保存用户布局以恢复会话 {#save-the-users-layout-to-resume-the-session}

要让用户返回上次离开时的布局，需在每次更改时持久化 [`config`](/api/config/config-property) 对象。当用户通过 UI 编辑布局时，[`update-config`](/api/events/update-config-event) 事件会触发。其 payload 为经过处理的配置，结构为 `{ rows, columns, values, filters }`。

使用 [`api.on()`](/api/internal/on-method) 监听事件而不修改它。若处理函数需要更改事件 payload，则改用 [`api.intercept()`](/api/internal/intercept-method)。

以下示例订阅 `update-config` 事件，并将新布局 POST 到服务器：

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
    ]).then(([data, fields]) => {
        const table = new pivot.Pivot("#root", { data, fields });

        table.api.on("update-config", newConfig => {
            fetch(server + "/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newConfig),
            });
        });
    });
</script>
~~~

下次访问时，从 `/config` 返回已保存的配置，并在初始化时将其作为 `config` 属性传入。widget 将从上次的布局开始。如果布局在 widget 已存在后才到达，请使用 [`setConfig()`](/api/methods/setconfig-method) 方法应用已保存的配置。

当用户在配置面板中拖动字段时，频繁的更新可能会淹没服务器。可将 POST 包裹在定时器中以对调用进行防抖处理：

~~~jsx
let saveTimer;
table.api.on("update-config", newConfig => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newConfig),
        });
    }, 300);
});
~~~

:::note
`update-config` 的 payload 是*经过处理*的配置：Pivot 可能会将字段引用规范化为 `{ field, method }` 形式。初始化时将处理后的结构作为 `config` 属性传回即可，无需额外转换。
:::

:::tip
在处理函数中返回 `false` 可阻止布局更改。可利用此方式将持久化操作限制在服务器端验证通过后执行。
:::

## 保存聚合表格 {#save-the-aggregated-table}

有时*结果本身*才是价值所在：渲染表格的服务器端缓存、定期报告或导出流水线。[`render-table`](/api/events/render-table-event) 事件在 Pivot 完成聚合后触发，携带完整的汇总表格：`columns`、`data` 行、`footer`、`split` 等。

以下示例订阅 `render-table` 事件并将快照 POST 到服务器，跳过首次渲染：

~~~jsx
const table = new pivot.Pivot("#root", { data, fields, config });

let firstRender = true;
let saveTimer;

table.api.on("render-table", ({ config: tableConfig }) => {
    // 跳过首次聚合触发的初始渲染
    if (firstRender) {
        firstRender = false;
        return;
    }

    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/snapshot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                columns: tableConfig.columns,
                data: tableConfig.data,
                footer: tableConfig.footer,
                split: tableConfig.split,
            }),
        });
    }, 300);
});
~~~

:::note
`render-table` 事件比 `update-config` 触发更频繁。该事件在每次重新计算时运行，包括排序和展开/折叠操作。请对处理函数进行防抖处理并跳过首次渲染，以确保每次真实更改只发出一次 POST。
:::

:::tip
在处理函数中返回 `false` 可阻止渲染。可在服务器拒绝快照或用于只读模式时使用此方式。
:::

### 重新加载聚合快照 {#reload-an-aggregated-snapshot}

Pivot 生成聚合表格，不显示预聚合的数据。[`data`](/api/config/data-property) 属性始终接收原始行。因此，从 `render-table` 保存的快照适用于以下场景：

- 服务器端的下游导出流水线（CSV、XLSX）
- 使用已保存的 `columns` 和 `data` 通过普通数据表渲染的只读视图
- 缓存的报告，可提供给其他用户而无需重新运行聚合

**相关文章**：

- [加载数据](/guides/loading-data)
- [导出数据](/guides/exporting-data)

**相关 API**：

- [`api.on()`](/api/internal/on-method)
- [`update-config`](/api/events/update-config-event)
- [`render-table`](/api/events/render-table-event)
