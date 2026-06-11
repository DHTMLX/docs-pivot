---
sidebar_label: tableShape
title: tableShape 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 tableShape 配置项。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天试用版。
---

# tableShape

### 描述 {#description}

@short: 可选。配置 Pivot 表格的外观

### 用法 {#usage}

~~~jsx
tableShape?: {
    templates?: {
        [field: string]: (
            value: any,
            operation: string
        ) => any;
    },
	totalRow?: boolean | "sumOnly",
	totalColumn?: boolean | "sumOnly",
    marks?: {
        [cssClass: string]: ((v: any, columnData: any, rowData: any) => boolean)
        | "max" 
        | "min"
    },
    sizes?: {
        rowHeight?: number,
        headerHeight?: number,
        columnWidth?: number,
        footerHeight?: number
    },
    tree?:boolean,
    cleanRows?: boolean,
    split?: {
        left?: boolean,
        right?: boolean,
    },
    cellStyle?: (
        field: string, 
        value: any, 
        area: "rows"|"columns"|"values", 
        method?: string,
        isTotal?: "row"|"column"|"both") 
        => string,
};
~~~

### 参数 {#parameters}

- `templates` - （可选）允许为单元格设置模板；它是一个对象，其中：
  - 每个键是字段 id
  - 值是一个函数，该函数返回字符串并接收单元格的值和操作类型。基于指定字段的所有列都将应用对应的模板。例如，可以设置计量单位，或对数值返回指定小数位数等。详见下方示例。
- `marks` - （可选）允许为满足条件的单元格标记样式。它是一个对象，键为 CSS 类名，值为函数或预定义字符串（"max"、"min"）之一。函数应为被检查的值返回布尔值，若返回 **true**，则将该 CSS 类应用到单元格上。更多信息及示例请参阅 [单元格样式](guides/stylization.md#cell-style)。
- `sizes` - （可选）定义表格的以下尺寸参数：
  - `rowHeight` - （可选）Pivot 表格中行的高度，单位为像素，默认值为 34
  - `headerHeight` - （可选）表头高度，单位为像素，默认值为 30
  - `footerHeight` - （可选）表尾高度，单位为像素，默认值为 30
  - `columnWidth` - （可选）列宽度，单位为像素，默认值为 150
- `cellStyle` - （可选）为单元格应用自定义样式的函数。该函数包含以下参数：
    - `field` - （必填）表示所应用样式的字段名的字符串
    - `value` - （必填）单元格的值（该行列对应的实际数据）
    - `area` - （必填）指示单元格所在表格区域的字符串（"rows"、"columns" 或 "values" 区域）
    - `method` - （可选）表示单元格所执行操作的字符串（如 "sum"、"count" 等）
    - `isTotal` - （可选）定义单元格是否属于总计行、总计列或两者兼属："row"|"column"|"both"
    `cellStyle` 函数返回一个字符串，可作为 CSS 类名用于为单元格应用特定样式。
- `tree` - （可选）若设为 **true**，则启用树形模式，数据将以可展开的行形式呈现，默认值为 **false**。更多信息及示例请参阅 [切换到树形模式](guides/configuration.md#enabling-the-tree-mode)
- `totalColumn` - （可选）若为 **true**，则启用总计列，显示各行的汇总值（默认值为 **false**）。若值设为 "sumOnly"，则仅生成包含总和值的列（仅适用于求和操作）
- `totalRow` - （可选）若为 **true**，则启用总计行，在表尾显示汇总值（默认值为 **false**）。若值设为 "sumOnly"，则仅生成包含总计值的行（仅适用于求和操作）
- `cleanRows` - （可选）若设为 **true**，则在表格视图中隐藏比例列中的重复值，默认值为 **false**
- `split` - （可选）根据指定参数冻结左侧或右侧的列（参阅 [冻结列](guides/configuration.md#freezing-columns)）：
    - `left`（boolean）- 若设为 **true**（默认值为 **false**），则固定左侧列，使列在滚动时保持静止可见。被固定的列数等于 [`config`](api/config/config-property.md) 属性中定义的行字段数量
    - `right`（boolean）- 在右侧固定总计列，默认值为 **false**

默认情况下，`tableShape` 为 undefined，即不显示总计行和总计列，不应用任何模板和标记，数据以普通表格形式展示（而非树形），且列在滚动时不会固定。

## 示例 {#example}

在以下示例中，我们对 *state* 单元格应用模板，以显示州的完整名称与缩写的组合。

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
// 其他值,
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // 设置模板以自定义 "state" 单元格的值
            state: v => v+ ` (${states[v]})`,
        }
    },
    fields,
    data,
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

- [Pivot 2. 树形模式](https://snippet.dhtmlx.com/6ylkoukn)
- [Pivot 2. 冻结（固定）列](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. 设置行高、表头高、表尾高及所有列宽](https://snippet.dhtmlx.com/x46uyfy9)
- [Pivot 2. 清除重复行](https://snippet.dhtmlx.com/rwwhgv2w?tag=pivot)
- [Pivot 2. 为表格和表头单元格添加自定义 CSS](https://snippet.dhtmlx.com/nfdcs4i2)

**相关文章**：
- [配置](guides/configuration.md)
- [单元格样式](guides/stylization.md#cell-style)
