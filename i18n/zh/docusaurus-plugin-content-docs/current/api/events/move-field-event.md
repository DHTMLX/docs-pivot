---
sidebar_label: move-field
title: move-field 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 move-field 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# move-field

### 描述 {#description}

@short: 当字段重新排序时触发

### 用法 {#usage}

~~~jsx
"move-field": ({
    area: string,
    id: string | number,
    before?: string,
    after?: string
}) => void | boolean;
~~~

### 参数 {#parameters}

该操作的回调函数接受一个包含以下参数的对象：

- `area` - （必填）发生重新排序的区域名称，可以是 "rows"、"columns" 或 "values" 区域
- `id` - （必填）被移动字段的 id
- `before` - （可选）移动字段被放置到其之前的字段 id
- `after` - （可选）移动字段被放置到其之后的字段 id

:::info
处理内部 events 时，您可以使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

### 示例 {#example}

~~~jsx {20-23}
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

//将重新排序字段的 id 输出到控制台
table.api.on("move-field", (ev) => {
    console.log("The id of the reordered field:", ev.id);
});
~~~

**相关文章**：[api.on()](api/internal/on-method.md)
