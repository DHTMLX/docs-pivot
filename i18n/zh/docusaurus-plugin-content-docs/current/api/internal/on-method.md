---
sidebar_label: api.on()
title: on 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 on 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# api.on()

### 描述 {#description}

@short: 允许为内部事件附加处理函数

### 用法 {#usage}

~~~jsx
api.on(
    event: string,
    handler: function,
    config?: { intercept?: boolean, tag?: number | string | symbol }
): void;
~~~

### 参数 {#parameters}

- `event` - （必填）要触发的事件
- `handler` - （必填）要附加的处理函数（处理函数的参数取决于所触发的事件）
- `config` - （可选）存储以下参数的对象：
    - `intercept` - （可选）如果在创建事件监听器时设置 `intercept: true`，则该事件监听器将在所有其他监听器之前执行
    - `tag` - （可选）操作标签。您可以使用标签名称通过 [`detach`](api/internal/detach-method.md) 方法移除操作处理函数

### 事件 {#events}

:::info
Pivot 内部事件的完整列表可在[**此处**](api/overview/main-overview.md#pivot-events)查看。
如果您只想监听操作而不对其进行修改，请使用 `api.on()` 方法。若要对操作进行更改，请使用 [`api.intercept()`](api/internal/intercept-method.md) 方法。
:::

### 示例 {#example}

以下示例演示如何输出激活过滤器的字段标签：

~~~jsx {21-29}
// 创建 Pivot
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});

table.api.on("open-filter", (ev) => {
    if (ev.id) {
        const { config } = table.api.getState();
        const fieldObj = config[ev.area].find((f) => f.id === ev.id);
        if (fieldObj) {
            console.log("The field for which filter was activated:", fieldObj.label);
        }
    }
}, {tag: "open-filter-tag"});
~~~
