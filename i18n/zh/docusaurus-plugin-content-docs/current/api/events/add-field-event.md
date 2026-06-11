---
sidebar_label: add-field
title: add-field 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 add-field 事件。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# add-field

### 描述 {#description}

@short: 当新字段添加到行、列或值区域时触发

### 用法 {#usage}

~~~jsx
"add-field": ({
    id?: string | number,
    area: string,
    field: string | number,
    method?: string
}) => boolean;
~~~

### 参数 {#parameters}

该操作的回调函数接收一个包含以下参数的对象：

- `id` - （可选）新字段的指定 id；如果未设置，则使用自动生成的 id
- `area` - （必填）添加新字段的区域名称，可以是 "rows"、"columns" 或 "values" 区域
- `field` - （必填）字段名称
- `method` - （可选）定义数据聚合的方法（如果未指定，则使用适合该数据类型的第一个方法）；方法可以是以下之一：
  - 对于 **values** 区域为必填项，是一个包含数据操作类型的字符串：[默认方法](guides/working-with-data.md#default-methods)
  - 对于 **rows** 和 **columns** 区域为可选项，如果设置了值则为谓词；可以是自定义谓词，也可以是默认值之一："year"、"quarter"、"month"、"week"、"day"、"hour"、"minute"。默认情况下使用原始值。
  如果设置了自定义谓词或方法，应为 [predicates](api/config/predicates-property.md) 或 [methods](api/config/methods-property.md) 属性指定 id。

:::info
如需处理内部事件，可以使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

### 示例 {#example}

以下示例中，我们使用 [`api.intercept()`](api/internal/intercept-method.md) 方法为 **number** 数据类型的值字段添加新方法：

~~~jsx {20-27}
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
//使用预定义方法添加值
table.api.intercept("add-field", (ev) => {
    const { fields } = table.api.getState();
    const type = fields.find((f) => f.id == ev.field).type;

    if (ev.area == "values" && type == "number") {
        ev.method = "min";
    }
});
~~~

**相关文章**：[api.intercept()](api/internal/intercept-method.md)
