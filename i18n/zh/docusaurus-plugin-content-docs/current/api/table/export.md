---
sidebar_label: export
title: export
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 export 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本
---

# export

### 描述 {#description}

@short: 在导出数据时触发

要触发 Table 事件，需要通过 [`getTable`](api/methods/gettable-method.md) 方法访问 Pivot 内部的 Table 实例。

### 用法 {#usage}

```jsx
"export": ({
    options: {
        format: "csv" | "xlsx",
        fileName?: string,
        header?: boolean,
        footer?: boolean,
        download?: boolean,

        /* XLSX 设置*/
        styles?: boolean | {
            header?: {
                fontWeight?: "bold",
                color?: string,
                background?: string,
                align?: "left"|"right"|"center",
                borderBottom?:  string,
                borderRight?:  string,
            }
            lastHeaderCell?:  { /*  与 header 相同 */  },
            cell?: { /*  与 header 相同 */ };
            firstFooterCell?: { /*  与 header 相同 */ },
            footer?: {/*  与 header 相同 */},
        }
        cellTemplate?: (value: any, row: any, column: object ) 
            => string | null,
        headerCellTemplate?: (text: string, cell: object, column: object, type: "header"| "footer") 
            => string | null,
        cellStyle?: (value: any, row: any, column: object) 
            => { format: string; align: "left"|"right"|"center" } | null,
        headerCellStyle?: (text: string, cell: object, column: object, type: "header"| "footer") 
            => { format: string; align: "left"|"right"|"center" } | null,
        sheetName?: string,

        /* CSV 设置 */
        rows: string,
        cols: string,
    },
    result?: any,
}) => boolean|void;
```

Table widget 的 `export` 动作具有以下可配置参数：

- `options` - 包含导出选项的对象；选项因格式类型而异
- `result` - 导出的 Excel 或 CSV 数据的结果（通常为 Blob 或文件，取决于 `download` 选项）

    **两种格式（"csv" 和 "xlsx"）的通用选项**：

    - `format` (string) - （可选）导出格式，可以是 "csv" 或 "xlsx"
    - `fileName` (string) - （可选）文件名（默认为 "data"）
    - `header` (boolean) - （可选）定义是否导出表头（默认为 **true**）
    - `footer` (boolean) - （可选）定义是否导出表尾（默认为 **true**）
    - `download` (boolean) - （可选）定义是否下载文件。默认设置为 **true**。若设置为 **false**，文件将不会被下载，Excel 或 CSV 数据（Blob）将通过 `ev.result` 获取

     **"xlsx" 格式专有选项**：

    - `sheetName` (string) - Excel 工作表的名称（默认为 "data"）
    - `styles` (boolean 或对象) - 若设置为 **false**，表格将不带任何样式导出；可通过样式属性的哈希对象进行配置：
        - `header` - 包含表头单元格设置的对象：
            - `fontWeight` (string) - （可选）可设置为 "bold"；若未设置，字体将为普通样式
            - `color` (string) - （可选）表头的文字颜色
            - `background` (string) - （可选）表头的背景颜色
            - `align` - （可选）文字对齐方式，可为 "left"|"right"|"center"。若未设置，将应用 Excel 中设置的对齐方式
            - `borderBottom` (string) - （可选）底部边框的样式
            - `borderRight` (string) - （可选）右侧边框的样式（例如，*borderRight: "0.5px solid #dfdfdf"*）
        - `lastHeaderCell` - 表头最后一行单元格的样式属性，与 *header* 的属性相同
        - `cell` - 表体单元格的样式属性，与 *header* 的属性相同
        - `firstFooterCell` - 表尾第一行单元格的样式属性，与 *header* 的属性相同
        - `footer` - 表尾单元格的样式属性，与 *header* 的属性相同
    - `cellTemplate` - 用于自定义每个单元格导出值的函数。接受 value、row 和 column 对象作为参数，返回要导出的自定义值
	- `headerCellTemplate` - 在导出时自定义表头或表尾单元格值的函数。调用时传入文本、表头单元格对象、列对象以及单元格类型（"header" 或 "footer"），允许用户修改导出的表头/表尾值
	- `cellStyle` - 在导出时自定义各单元格样式和格式的函数。接受 value、row 和 column 对象作为参数，应返回包含样式属性（如对齐方式或格式）的对象
	- `headerCellStyle` - 与 cellStyle 类似，但专用于表头和表尾单元格。该函数接受文本、表头单元格对象、列对象以及类型（"header" 或 "footer"），并返回样式属性
    :::note
    默认情况下，对于 "xlsx" 格式，日期和数字字段将以原始值导出，使用默认格式或通过 [`fields`](api/config/fields-property.md) 属性定义的格式。但如果为某个字段定义了模板（参见 [`tableShape`](api/config/tableshape-property.md) 属性），则会导出该模板定义的渲染值。若同时设置了模板和 `format`，模板设置将覆盖格式设置。
    :::

    **"csv" 格式专有选项**：

    - `rows` (string) - （可选）行分隔符，默认为 "\n"
    - `cols` (string) - （可选）列分隔符，默认为 "\t"

## 示例 {#example}

以下代码片段展示了如何导出数据：

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**相关文章**：
- [`getTable`](api/methods/gettable-method.md)
- [导出数据](guides/exporting-data.md)
- [为字段应用格式](guides/working-with-data.md#applying-formats-to-fields)
