---
sidebar_label: 样式
title: 样式
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解有关样式的相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载免费的 30 天评估版 DHTMLX Pivot。
---

# 样式 {#styling}

Pivot 内置了默认主题，并提供 CSS 变量和工具类以供自定义。在 widget 容器（或任意祖先元素）上覆盖这些变量，即可更改颜色、边框等视觉属性。

## 默认样式 {#default-style}

Pivot 的默认主题为 **Material**。以下 CSS 代码片段展示了 Material 主题在 widget 容器上设置的变量：

~~~css
.wx-material-theme {
    --wx-theme-name: material;
    --wx-pivot-primary-hover: #194e9e;
    --wx-pivot-border-color: var(--wx-color-font-disabled);
    --wx-pivot-field-hover: linear-gradient(
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.1) 100%
    );
}
~~~

:::tip 注意
未来版本的 Pivot 可能会重命名 CSS 变量。升级后请检查变量名称，并在代码中更新，以避免显示问题。
:::

## 内置主题 {#built-in-theme}

Pivot 提供一个内置主题：**Material**。可通过向 widget 容器添加主题类，或在页面中引入预构建的皮肤样式表来应用该主题。

以下代码片段通过向 widget 容器添加 `wx-material-theme` 类来应用 Material 主题：

~~~html {}
<!-- Pivot 容器 -->
<div id="root" class="wx-material-theme"></div>
~~~

以下代码片段直接引入 Material 皮肤样式表：

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## 自定义内置主题 {#customize-built-in-theme}

在 `.wx-material-theme` 选择器上覆盖 Material 主题变量，即可更改颜色、边框等视觉属性。

以下示例通过覆盖 Material 主题变量，将 Pivot 渲染为深色配色方案：

~~~html
<!-- 自定义样式 -->
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-table-header-background: #2ca0e3;
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-pivot-background: #444;
        --wx-background: #444;
        --wx-background-alt: #666;
        --wx-pivot-content-background: #666;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #818080;
        --wx-input-background: #9e9e9e;
        --wx-color-font-disabled: #878585;
    }
</style>
~~~

## 自定义样式 {#custom-style}

通过在应用于 widget 容器的自定义类上覆盖 CSS 变量，来更改 Pivot 的外观。

以下示例通过 `.demo` 类为 Pivot 应用自定义样式：

~~~html
<div id="pivot" class="demo"></div>
<style>
    .demo {
        --wx-background: #444;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-pivot-primary-hover: #194e9e;
        --wx-pivot-border-color: 1px solid #818080;
        --wx-table-header-background: #2ca0e3;
    }
</style>
~~~

## 滚动条样式 {#scroll-style}

使用 `.wx-styled-scroll` CSS 类为 Pivot 滚动条应用自定义样式。使用前请检查浏览器兼容性：[caniuse: CSS Scrollbar](https://caniuse.com/css-scrollbar)。

以下代码片段在 widget 容器上启用自定义滚动条样式：

~~~html {} title="index.html"
<!-- Pivot 的容器 -->
<div id="root" class="wx-styled-scroll"></div> 
~~~

## 单元格样式 {#cell-style}

若要为正文或页脚单元格设置样式，请使用 [`tableShape`](api/config/tableshape-property.md) 属性的 `cellStyle` 参数。若要为表头单元格设置样式，请使用 [`headerShape`](api/config/headershape-property.md) 属性的 `cellStyle` 参数。两种情况下，`cellStyle` 函数均返回一个 CSS 类名，Pivot 会将其应用于对应单元格。

以下示例为正文和表头单元格应用样式：

- 正文单元格根据单元格值（例如 `status` 字段中的 `"Down"`、`"Up"`、`"Idle"`）以及汇总值（大于 40 或小于 5）接收相应类名
- 表头单元格根据 `streaming` 字段的值接收类名——值为 `"no"` 时使用 `status-down`，其他值使用 `status-up`

~~~jsx
const widget = new pivot.Pivot("#pivot", {
    tableShape: {
        totalColumn: true,
        totalRow:true,
        cellStyle: (field, value, area, method, isTotal) => {
            if (field === "status" && area === "rows" && value) {
                if (value === "Down") {
                    return "status-down";
                } else if (value === "Up") {
                    return "status-up";
                } else if (value === "Idle") {
                    return "status-idle";
                }
            }
            if(isTotal ==="column" && area == "values"){
                if(value > 40)
                    return "status-up";
                else if (value < 5)
                    return "status-down";
            }
        }
    },
    headerShape:{
        cellStyle:(field, value, area, method, isTotal) => {
            if(field == "streaming")
                return value ==="no"?"status-down":"status-up";
        }
    },
    fields,
    data: dataset,
    config: {
        rows: [
            "protocol",
            "status",
        ],
        columns: [
            "streaming"
        ],
        values: [
            {
                field: "id",
                method: "count"
            }
        ]
    }
});
~~~

## 标记单元格中的值 {#mark-values-in-cells}

使用 [`tableShape`](api/config/tableshape-property.md) 属性的 `marks` 参数，对满足条件的单元格应用 CSS 类。`marks` 中的每个条目将 CSS 类名（键）与规则（值）配对。

规则可以是预定义字符串（`"max"` 或 `"min"`），也可以是自定义函数 `(value, columnData, rowData) => boolean`。当函数返回 `true` 时，Pivot 会将该 CSS 类添加到对应单元格。

在应用 `marks` 之前，请先在样式表中创建相应的 CSS 类。

以下示例高亮显示最小值和最大值所在的单元格，并使用自定义函数标记大于 2 的非整数值：

~~~jsx {18-26}
const table = new pivot.Pivot("#root", {
    fields,
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
    },
    tableShape: {
        marks: {
            // 内置标记（最小值/最大值高亮）
            min_cell: "min",
            max_cell: "max",
            // 自定义标记
            g_avg: v => (v % 1 !== 0) && v > 2
        }
    }
});
~~~

以下代码片段定义了上述 `marks` 对象所引用的 CSS 类：

~~~html title="index.html"
<style>
    .min_cell {
        background: #4caf50 !important;
        color: #fff;
    }

    #root .max_cell {
        background: #ff5722 !important;
        color: #fff;
    }

    .g_avg {
        background: #57a5c9 !important;
        color: #fff;
    }
</style>
~~~

## 特定 CSS 类 {#specific-css-classes}

Pivot 内置了若干工具 CSS 类，您可以覆盖它们以对表格元素进行精细控制。

Pivot 通过内置的 `.wx-number` CSS 类将正文单元格中的数字右对齐。树形模式下（在 [`tableShape`](api/config/tableshape-property.md) 中设置 `tree: true` 时）的层级列除外。若要重置默认的数字对齐方式，请覆盖该类。

以下代码片段将正文单元格中的数字左对齐：

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

若要为汇总列设置样式，请覆盖 `.wx-total` CSS 类。

以下代码片段为汇总单元格设置浅色背景和较粗的字体粗细：

~~~html
<style>
    .wx-cell.wx-total {
        background: #fafafb;
        font-weight: var(--wx-header-font-weight);
    }
</style>
~~~

## 示例 {#example}

以下代码片段为 Pivot 应用自定义样式：

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**相关示例**：

- [Pivot 2. 汇总列的样式（自定义 CSS）](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. 单元格的最小值/最大值与自定义标记（条件格式）](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. 交替行颜色（条纹行/斑马线）](https://snippet.dhtmlx.com/0cm0uko2)
