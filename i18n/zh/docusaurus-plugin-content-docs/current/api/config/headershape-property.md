---
sidebar_label: headerShape
title: headerShape 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 headerShape 配置项。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# headerShape

### 描述 {#description}

@short: 可选。配置 Pivot 表格中表头的外观与行为

### 用法 {#usage}

~~~jsx  
headerShape?: {
    collapsible?: boolean,
    vertical?: boolean,
    template?: (label: string, field: string, subLabel?: string) => string,
    cellStyle?: (
        field: string, 
        value: any, 
        area: "rows"|"columns"|"values", 
        method?: string,
        isTotal?: boolean) 
        => string,
};
~~~

### 参数 {#parameters}

- `collapsible` - （可选）若设置为 **true**，表格中的维度分组可折叠。默认值为 **false**
- `vertical` - （可选）若设置为 **true**，将所有表头的文字方向从水平改为垂直。默认值为 **false**
- `cellStyle` - （可选）一个为表头单元格应用自定义样式的函数。该函数返回 CSS 类名，并接受以下参数：
    - `field` (string) - （必填）表示单元格对应字段名称的字符串。树形列的表头对应的字段为 ""
    - `value` (string | number | date) - （必填）单元格的值
    - `area` - （必填）表示单元格所在区域的字符串（"rows"、"columns" 或 "values" 区域）
    - `method` (string) - （可选）一个字符串，可表示对 "values" 区域字段执行的操作（例如 "sum"、"count" 等），或对 "columns" 区域字段设置的谓词名称
    - `isTotal` - （可选）定义单元格是否属于汇总列
- `template` - （可选）定义表头文字的格式。默认情况下，作为行字段时显示 `label` 参数的值，作为值字段时显示标签和方法（例如 *Oil(count)*）。该函数接受字段 id、标签以及方法或谓词 id（如有），并返回处理后的值。默认模板如下：
~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

## 示例 {#example}

在以下示例中，**values** 字段的表头将显示标签和方法名称（subLabel），并将结果转换为小写（例如 *profit (sum)*）：

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // 自定义表头文字模板
        template: (label, id, subLabel) => (label + (subLabel ? ` (${subLabel})` : "")).toLowerCase(),
        },
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // 其他值
        ],
    },
    fields,
});
~~~

**相关示例**：
- [Pivot 2. 网格表头中文字的垂直方向](https://snippet.dhtmlx.com/4qroi8ka)
- [Pivot 2. 可折叠列](https://snippet.dhtmlx.com/pt2ljmcm)
- [Pivot 2. 为表格和表头单元格添加自定义 CSS](https://snippet.dhtmlx.com/nfdcs4i2)

**相关文章**：
- [配置](guides/configuration.md)
- [单元格样式](guides/stylization.md#cell-style)
