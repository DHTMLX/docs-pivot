---
sidebar_label: Styling
title: Styling
description: You can learn about the styling in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Styling

## Default style

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
Future versions of Pivot may change variable names. Check variable names after each update to avoid display issues.
:::

## Built-in theme

The widget provides one built-in theme: **Material**.

Apply the theme by adding the CSS class to the widget container:

- **Material theme**

~~~html {}
<!-- Pivot container -->
<div id="root" class="wx-material-theme"></div>
~~~

Or include the theme from the skins folder:

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## Customize the built-in theme

The following code snippet customizes the **Material** theme applied to the Pivot table:

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

Change the appearance of Pivot by applying CSS variables.

The following code snippet applies a custom style to Pivot:

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

## Style the scroll bar

Apply a custom style to the Pivot scroll bar with the `.wx-styled-scroll` CSS class. Check browser compatibility [here](https://caniuse.com/css-scrollbar) before using it.

~~~html {} title="index.html"
<!--container for Pivot-->
<div id="root" class="wx-styled-scroll"></div> 
~~~

## Style cells

Use the `cellStyle` parameter of the [`tableShape`](/api/config/tableshape-property) property to apply a CSS class to table body or footer cells. Use the `cellStyle` parameter of the [`headerShape`](/api/config/headershape-property) property to style header cells. In both cases, the `cellStyle` function returns a string used as a CSS class name.

The following code snippet applies dynamic styles to body cells based on field values and applies header styles based on the "streaming" field:

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

Use the `marks` parameter of the [`tableShape`](/api/config/tableshape-property) property to mark values in cells:

- create a CSS class to apply to the marked cell
- add the CSS class name as a key in the `marks` object
- set its value to a custom function or one of the predefined strings (`"max"`, `"min"`); the function returns a boolean — if `true`, the CSS class is assigned to the cell

The following code snippet marks cells with min and max values, and uses a custom function to mark non-integer values greater than 2:

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

## Specific CSS classes

By default, numbers in the table body are aligned to the right with the `.wx-number` CSS class. The exception is the hierarchical column in tree mode (when `tree` is set to `true` for the [`tableShape`](/api/config/tableshape-property) property). To reset the default number alignment, change the CSS class:

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

Customize total column styles with the `.wx-total` CSS class:

~~~html
<style>
    .wx-cell.wx-total {
        background: #fafafb;
        font-weight: var(--wx-header-font-weight);
    }
</style>
~~~

## Example

The following code snippet applies a custom style to Pivot:

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related samples**:

- [Pivot 2. Styling (custom CSS) for total column](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. Min/max and custom marks for cells (conditional format)](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. Alternate row color (striped rows, zebra-striping)](https://snippet.dhtmlx.com/0cm0uko2)
