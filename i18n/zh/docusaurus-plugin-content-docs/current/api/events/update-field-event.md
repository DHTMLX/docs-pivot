---
sidebar_label: update-field
title: update-field 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 update-field 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 免费 30 天评估版本。
---

# update-field

### 描述 {#description}

@short: 在更新字段时触发

### 用法 {#usage}

~~~jsx
"update-field": ({
    id: string | number,
    method: string,
    area: string
}) => boolean;
~~~

### 参数 {#parameters}

该操作的回调函数接收一个包含以下参数的对象：

- `id` - （必填）被更新字段的 id
- `method` - （必填）方法可以是以下值之一：
  - 对于 **values** 区域，为包含某种数据操作类型的字符串：[默认方法](guides/working-with-data.md#default-methods)
  - 对于 **rows** 和 **columns** 区域，可以是数据谓词值，取以下值之一："year"、"quarter"、"month"、"week"、"day"、"hour"、"minute"。默认情况下使用原始值。
  如果设置了自定义谓词或方法，则应在 [predicate](api/config/predicates-property.md) 或 [methods](api/config/methods-property.md) 属性中指定 id。
- `area` - （必填）字段所在区域的名称，可以是 "rows"、"columns" 或 "values" 区域

:::info
要处理内部事件，可以使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

### 示例 {#example}

~~~jsx {19-22}
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
//将被更新字段的 id 输出到控制台
table.api.on("update-field", (ev) => {
    console.log("The id of the field that was updated:", ev.id);
});
~~~

**相关文章**：
- [api.on()](api/internal/on-method.md)
- [methods](api/config/methods-property.md)
