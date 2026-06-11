---
sidebar_label: render-table
title: render-table 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 render-table 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 30 天免费评估版本。
---

# render-table

### 描述 {#description}

@short: 在处理完 widget 配置之后、渲染表格之前触发

该事件允许您动态修改最终的表格配置，或完全阻止表格的渲染。

### 用法 {#usage}

~~~jsx
"render-table": ({
    config: {
        columns?: any[],
        data?: any[],
        footer?: boolean,
        sizes?: {
            rowHeight?: number,
            headerHeight?: number,
            columnWidth?: number,
            footerHeight?: number
        },
        split?: {
            left?: number;
            right?: number;
        },
        tree?: boolean,
        cellStyle?: (row: any, col: any) => string,
    }
}) => boolean | void;
~~~

### 参数 {#parameters}

该动作的回调函数接收包含以下参数的 `config` 对象：

- `columns` - （可选）列数组，每个对象包含以下参数：
    - `id` (number) - （必填）列的 id
    - `cell` (any) - （可选）包含单元格内容的模板（请参阅[通过 template 辅助函数添加模板](guides/configuration.md#adding-a-template-via-the-template-helper)）
    - `template` - （可选）通过 [`tableShape`](api/config/tableshape-property.md) 属性定义的模板
    - `fields` (array) - （可选）在树模式下定义层级列中的字段，反映该列在不同层级上显示的字段
     - `field` - （可选）字段 id 字符串
    - `method` (string) - （可选）为该列中某个字段定义的方法
    - `methods` (array) - （可选）定义在树模式下层级列中字段所应用的方法
    - `format` (string 或 object) - （必填）日期格式或数字格式（参阅[对字段应用格式](guides/working-with-data.md#applying-formats-to-fields)）
    - `isNumeric` (boolean) - （可选）定义列是否包含数值
    - `isTotal` (boolean) - （可选）定义是否为汇总列
    - `area` (string) - （可选）列渲染所在的区域："rows"、"columns"、"values"
    - `header` - （可选）表头单元格数组，每个单元格包含以下属性：
        - `text` (string) - （可选）单元格文本、格式化值或经谓词模板处理的值
        - `rowspan` (number) - （可选）表头跨越的行数
        - `colspan` (number) - （可选）表头跨越的列数
        - `value` (any) - （必填）原始值，适用于属于 "columns" 区域的单元格
        - `field` (string) - （必填）显示值的字段，适用于属于 "columns" 区域的单元格
        - `method` (string) - （必填）字段谓词，适用于属于 "columns" 区域且定义了谓词的单元格
        - `format` (string 或 object) - 日期格式或数字格式（参阅[对字段应用格式](guides/working-with-data.md#applying-formats-to-fields)）
  - `footer` - （可选）表尾标签或与表头设置相同的表尾设置对象
 - `data` - （可选）表格数据对象数组，每个对象代表一行：
    - `id` (number) - （必填）行 id
    - `values` (array) - （必填）包含行数据的数组
    - `open` (boolean) - （可选）分支展开状态
    - `$level` (boolean) - （可选）分支索引
- `footer` - （可选）设置为 **true** 时，在表格底部显示表尾；默认设置为 **false** 且不可见
- `sizes` - （可选）包含表格尺寸设置的对象，具体包括 columnWidth、footerHeight、headerHeight、rowHeight
- `split` (object) - （可选）包含以下属性的对象：
    - `left` (number) - 从左侧固定的列数
    - `right` (number) - 从右侧固定的列数
- `tree` - （可选）定义是否启用树模式（启用时为 **true**）
- `cellStyle` - （可选）为单元格应用自定义样式的函数，接收行对象和列对象，返回 CSS 类名字符串：`(row, col) => string`

:::info
如需处理内部事件，可以使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

### 返回值 {#returns}

回调函数可返回 boolean 或 void。
若事件处理函数返回 **false**，将阻止相关操作。在此情况下，将阻止表格的渲染。

### 示例 {#example}

以下示例展示如何将 [`config`](api/config/config-property.md) 对象输出到控制台并添加表尾。

~~~jsx {20-28}
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

table.api.intercept("render-table", (ev) => {
    console.log(ev.config); //输出 config 对象
    console.log(ev.config.columns); //输出 columns 数组

    ev.config.footer = true;
    ev.config.columns[0].footer = ["Custom footer"];

    // 在此处返回 "false" 将阻止表格渲染
});
~~~

以下示例展示如何通过按钮点击展开/折叠所有行。树模式需通过 [`tableShape`](api/config/tableshape-property.md) 属性启用。

~~~jsx
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true,
    },
    fields,
    data: dataset,
    config: {
        rows: ["type", "studio"],
        columns: [],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            },
            {
                field: "episodes",
                method: "count"
            }
        ]
    }
});

const api = table.api;
const tableApi = api.getTable();

//  在表格配置更新时关闭所有分支
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // 在此处返回 "false" 将阻止表格渲染
    // return false;
});

function openAll() {
    tableApi.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
    tableApi.exec("close-row", { id: 0, nested: true });
}
~~~

另请参阅如何使用 `render-table` 事件配置拆分功能：[冻结列](guides/configuration.md#freezing-columns)。

**相关文章：** [pivot.template 辅助函数](api/helpers/template.md)

**相关示例：** [Pivot 2. 自定义冻结（固定）列（自定义数量）](https://snippet.dhtmlx.com/53erlmgp)
