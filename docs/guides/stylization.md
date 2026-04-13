---
sidebar_label: Styling
title: Styling
description: You can learn about the styling in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Styling

## Default style

Use CSS variables to override the default appearance of Pivot components.

The following CSS variables are available for customization in the default Material theme:

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
Next versions of Pivot can bring some changes for the variables and their names. Check the names after updating to newer versions and modify them in your code to avoid display issues.
:::

## Built-in theme

The widget includes one built-in theme: the Material theme.

Apply the theme by adding the corresponding CSS class to the widget container:

- `wx-material-theme` — Material theme

~~~html {}
<!-- Pivot container -->
<div id="root" class="wx-material-theme"></div>
~~~

Or include the theme directly from the `skins` folder:

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## Customize the built-in theme

The following code snippet overrides Material theme variables to apply a dark color scheme:

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

## Apply a custom style

The following code snippet applies custom CSS variables to a Pivot container:

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

## Style the scrollbar

Use the `.wx-styled-scroll` CSS class to apply a custom style to the Pivot scrollbar. Check browser compatibility [here](https://caniuse.com/css-scrollbar) before using the class.

The following code snippet enables the styled scrollbar:

~~~html {} title="index.html"
<!-- container for Pivot -->
<div id="root" class="wx-styled-scroll"></div>
~~~

## Style cells

Use the `cellStyle` parameter of the [`tableShape`](/api/config/tableshape-property) property to apply a CSS class to table body or footer cells. Use the `cellStyle` parameter of the [`headerShape`](/api/config/headershape-property) property to style header cells. In both cases the `cellStyle` function returns a string used as a CSS class name.

The following code snippet applies dynamic styles to table body and header cells:

- body cells: styles change based on values in the `status` field (`"Down"`, `"Up"`, `"Idle"`) and on total values greater than 40 or less than 5
- header cells: style depends on the value in the `streaming` field — `"status-down"` for `"no"` and `"status-up"` for any other value

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

Use the `marks` parameter of the [`tableShape`](/api/config/tableshape-property) property to mark cells that match specific conditions.

To configure `marks`:

- create a CSS class to apply to the marked cell
- add the CSS class name as a key in the `marks` object
- set its value to a custom function or one of the predefined strings (`"max"`, `"min"`); the function receives the cell value and returns `true` to assign the CSS class

The following code snippet marks cells with minimum and maximum values using built-in strings, and uses a custom function to mark non-integer values greater than 2:

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

## Use built-in CSS classes

By default, Pivot aligns numbers to the right using the built-in `.wx-number` CSS class. The hierarchical column in tree mode (when `tree` is `true` in [`tableShape`](/api/config/tableshape-property)) is an exception. To reset the default alignment, override the `.wx-number` class:

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

Use the `.wx-total` class to customize the style of total columns:

~~~html
<style>
    .wx-cell.wx-total {
        background: #fafafb;
        font-weight: var(--wx-header-font-weight);
    }
</style>
~~~

The live example below demonstrates applying a custom style to Pivot:

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related samples**:

- [Pivot 2. Styling (custom CSS) for total column](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. Min/max and custom marks for cells (conditional format)](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. Alternate row color (striped rows, zebra-striping)](https://snippet.dhtmlx.com/0cm0uko2)
