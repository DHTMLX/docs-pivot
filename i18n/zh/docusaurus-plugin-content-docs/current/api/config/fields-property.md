---
sidebar_label: fields
title: fields 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 fields 配置项。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载免费的 30 天评估版 DHTMLX Pivot。
---

# fields

### 描述 {#description}

@short: 可选。包含 Pivot 表格字段对象的数组

`fields` 属性在配置对象中控制 widget 如何解析其接收到的数据字段类型，并允许为字段定义排序顺序。

### 用法 {#usage}

~~~jsx
fields?: [{
    id: string,
    label?: string,
    type: "number" | "date" | "text",
    sort?: "asc" | "desc" | ((a: any, b: any) => number),
    format?: string | boolean | numberFormatOptions{}
}];
~~~

### 参数 {#parameters}

默认情况下，如果未设置该属性，widget 将自动分析传入数据并相应地填充 `fields` 对象。

`fields` 数组中的每个对象应包含以下属性：

- `id` - （必填）字段的 ID
- `label` - （可选）在图形界面中显示的字段标签
- `type` - （必填）字段中的数据类型（"number"、"date" 或 "text"）
- `sort` - （可选）定义字段的默认排序顺序。接受 "asc"、"desc" 或自定义排序函数
- `format` - （可选）允许自定义字段中数字和日期的格式；该格式也将在[导出](guides/exporting-data.md)时生效
    - `string` - （可选）日期的格式（默认情况下，Pivot 使用语言环境中的 `dateFormat`）
    - `boolean` - （可选）如果设置为 **false**，数字将按原样显示，不进行任何格式化
    - `numberFormatOptions` - （可选）用于格式化数字字段的选项对象；默认情况下，数字最多显示 3 位小数，并对整数部分应用千位分组。
        - `minimumIntegerDigits`（number）- （可选）整数的最小位数（例如，如果该值设置为 2，数字 1 将显示为 "01"）；默认值为 1；
        - `minimumFractionDigits`（number）- （可选）要使用的最小小数位数（例如，如果该值设置为 2，数字 10.5 将显示为 "10.50"）；默认值为 0；
        - `maximumFractionDigits`（number）- （可选）要使用的最大小数位数（例如，如果该值设置为 2，数字 10.3333... 将显示为 "10.33"）；默认值为 3；  
        有关数字位数选项的更多详情，请参阅 [数字位数选项](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumintegerdigits)
        - `prefix`（string）- （可选）数字前的字符串，用于货币等附加符号
        - `suffix`（string）- （可选）数字后的字符串，用于货币等附加符号

:::info
如果通过 [`tableShape`](api/config/tableshape-property.md) 属性应用了模板，它将覆盖 `format` 设置。
:::

### 示例 {#example}

~~~jsx {2-34}
const table = new pivot.Pivot("#root", {
    fields: [
        {
            id: "rank",
            label: "Rank",
            type: "number"
        },
        {
            id: "title",
            label: "Title",
            type: "text"
        },
        {
            id: "genre",
            label: "Genre",
            type: "text"
        },
        {
            id: "studio",
            label: "Studio",
            type: "text"
        },
        {
            id: "type",
            label: "Type",
            type: "text"
        },
        {
            id: "score",
            label: "Score",
            type: "number"
        },
        //其他字段
    ],
    data,
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
~~~

**相关文章**：

- [数字格式化](guides/localization.md#number-formatting)
- [为字段应用格式](guides/working-with-data.md#applying-formats-to-fields)

**相关示例**：  [Pivot 2. 定义字段格式](https://snippet.dhtmlx.com/77nc4j8v)
