---
sidebar_label: api.intercept()
title: intercept 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 intercept 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# api.intercept()

### 描述 {#description}

@short: 用于拦截并阻止内部事件

### 用法 {#usage}

~~~jsx
api.intercept(
    event: string,
    callback: function,
    config?: { tag?: number | string | symbol } 
): void;
~~~

### 参数 {#parameters}

- `event` - （必填）要触发的事件
- `callback` - （必填）要执行的回调函数（回调参数取决于所触发的事件）
- `config` - （可选）存储以下参数的对象：
    - `tag` - （可选）操作标签。您可以使用标签名称通过 [`detach`](api/internal/detach-method.md) 方法移除操作处理器

### 事件 {#events}

:::info
Pivot 内部事件的完整列表可在[**此处**](api/overview/main-overview.md#pivot-events)查看。
如果您只想监听操作而不修改，请使用 [`api.on()`](api/internal/on-method.md) 方法。若要对操作进行修改，请使用 `api.intercept()` 方法。
:::

### 示例 {#example}

以下示例展示了如何在初始化时关闭所有可折叠行。

~~~jsx {21-24}
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

// 在初始化时关闭所有行
table.api.intercept("render-table", (ev) => {
    ev.config.data.forEach((row) => (row.open = false));
}, {tag: "render-table-tag"});
~~~

**相关文章**：[`render-table`](api/events/render-table-event.md)
