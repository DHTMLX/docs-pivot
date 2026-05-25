---
sidebar_label: Styling
title: Styling
description: You can learn about the styling in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Styling

Pivot ships with a default theme and exposes CSS variables and utility classes for customization. Override the variables on the widget container (or any ancestor) to change colors, borders, and other visual properties.

## Default style

The default Pivot theme is **Material**. The following CSS snippet shows the variables that the Material theme sets on the widget container:

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

:::tip Note
Future versions of Pivot may rename CSS variables. Check the variable names after upgrading and update them in your code to avoid display issues.
:::

## Built-in theme

Pivot provides one built-in theme: **Material**. Apply the theme either by adding the theme class to the widget container or by including the prebuilt skin stylesheet on the page.

The following code snippet applies the Material theme by adding the `wx-material-theme` class to the widget container:

~~~html {}
<!-- Pivot container -->
<div id="root" class="wx-material-theme"></div>
~~~

The following code snippet includes the Material skin stylesheet directly:

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## Customize built-in theme

Override the Material theme variables on the `.wx-material-theme` selector to change colors, borders, and other visual properties.

The example below overrides Material theme variables to render Pivot in a dark color scheme:

~~~html
<!-- custom styles -->
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

## Custom style

Change the appearance of Pivot by overriding the CSS variables on a custom class applied to the widget container.

The example below applies a custom style to Pivot via the `.demo` class:

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

## Scroll style

Apply a custom style to the Pivot scroll bar with the `.wx-styled-scroll` CSS class. Check browser compatibility before use: [caniuse: CSS Scrollbar](https://caniuse.com/css-scrollbar).

The following code snippet enables the styled scroll bar on the widget container:

~~~html {} title="index.html"
<!-- container for Pivot -->
<div id="root" class="wx-styled-scroll"></div> 
~~~

## Cell style

To style body or footer cells, use the `cellStyle` parameter of the [`tableShape`](/api/config/tableshape-property) property. To style header cells, use the `cellStyle` parameter of the [`headerShape`](/api/config/headershape-property) property. In both cases, the `cellStyle` function returns a CSS class name that Pivot applies to the cell.

The example below applies styles to body and header cells:

- body cells receive a class based on cell values (e.g., `"Down"`, `"Up"`, `"Idle"` in the `status` field) and on total values (greater than 40 or less than 5)
- header cells receive a class based on the value of the `streaming` field — `status-down` for `"no"` and `status-up` for any other value

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

## Mark values in cells

Use the `marks` parameter of the [`tableShape`](/api/config/tableshape-property) property to apply a CSS class to cells that meet a condition. Each entry in `marks` pairs a CSS class name (the key) with a rule (the value).

The rule is either a predefined string (`"max"` or `"min"`) or a custom function `(value, columnData, rowData) => boolean`. When the function returns `true`, Pivot adds the CSS class to the cell.

Create the CSS classes in your stylesheet before applying `marks`.

The example below highlights cells with the minimum and maximum values, and uses a custom function to mark non-integer values greater than 2:

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
            // built-in marks (min/max highlight)
            min_cell: "min",
            max_cell: "max",
            // custom mark
            g_avg: v => (v % 1 !== 0) && v > 2
        }
    }
});
~~~

The following code snippet defines the CSS classes referenced by the `marks` object above:

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

## Specific CSS classes

Pivot includes several utility CSS classes that you can override for fine-grained control over table elements.

Pivot aligns numbers in body cells to the right via the built-in `.wx-number` CSS class. The exception is the hierarchical column in tree mode (when `tree: true` is set in [`tableShape`](/api/config/tableshape-property)). To reset the default number alignment, override the class.

The following code snippet left-aligns numbers in body cells:

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

To style total columns, override the `.wx-total` CSS class.

The following code snippet styles total cells with a light background and a heavier font weight:

~~~html
<style>
    .wx-cell.wx-total {
        background: #fafafb;
        font-weight: var(--wx-header-font-weight);
    }
</style>
~~~

## Example

The snippet below applies a custom style to Pivot:

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related samples**: 

- [Pivot 2. Styling (custom CSS) for total column](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. Min/max and custom marks for cells (conditional format)](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. Alternate row color (striped rows, zebra-striping)](https://snippet.dhtmlx.com/0cm0uko2)
