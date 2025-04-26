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
Next versions of Pivot can bring some changes for the variables and their names. Please, do not forget to check the names after updating to the newer versions and modify them in your code to avoid problems with display of the component.
:::

## Built-in theme

The widget provides one built-in theme which is the **Material** theme. 

You can apply the theme via adding the corresponding *CSS* classes to the widget container:

- **Material theme**
~~~html {}
<!-- Pivot container -->
<div id="root" class="wx-material-theme"></div>
~~~

or just include the theme on the page from the skins folder:

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## Customize built-in theme

The example below demonstrates how to customize the **Material** theme that is applied to the Pivot table:

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

You can change the appearance of Pivot by applying the corresponding CSS variables.

The example below shows how to apply a custom style to Pivot:

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

You can also apply a custom style to the scroll bar of Pivot. For this, you can use the `.wx-styled-scroll` CSS class. Before using it, check compatibility with the modern browsers [here](https://caniuse.com/css-scrollbar).

~~~html {} title="index.html"
<!--container for Pivot-->
<div id="root" class="wx-styled-scroll"></div> 
~~~

## Cell style

To apply a CSS class to the table body cell, use the `cellStyle` parameter of the [`tableShape`](/api/config/tableshape-property) property. The style of the header and footer cells can be customized via the `cellStyle` parameter of the [`headerShape`](/api/config/tableshape-property) property. In both cases the `cellStyle` function returns a string, which can be used as a CSS class name to apply specific styles to a cell.   

In the example below the styles of cells in the table body and headers are customized in the following way:
- for the table body cells, styles are applied dynamically based on cell values (e.g., "Down", "Up", "Idle") in the "status" field and on total values (greater than 40 or less than 5) 
- the style of header cells is determined by the value in the "streaming" field, with specific styles applied for "no" or other values (the CSS class "status-down" is applied for the "no" value and "status-up" is applied for the not "no" value)

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


## Marking cells

The widget API allows marking cells with the required values. You can do it by applying the `marks` parameter of the [`tableShape`](/api/config/tableshape-property) property. You need to do the following:
- create a CSS class to be applied to the marked cell
- add the CSS class name as the parameter of the `marks` object
- set its value which can be a custom function or one of the predefined strings ("max", "min"). The function should return boolean for the checked value; if **true** is returned, the css class is assigned to the cell.

In the example below, cells with min and max values are marked, and custom function is used to mark cells with values that are non-integer and greater than 2. 

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

## Aligning numbers in a cell

By default, in the table body numbers are aligned to the right with the help of the built-in `.wx-number` CSS class. The exception is the hierarchical column in the tree mode (when `tree` is set to **true** for the [`tableShape`](/api/config/tableshape-property) property). To reset the default number alignment, change the related CSS class. 

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

## Example

In this snippet you can see how to apply a custom style to Pivot

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related samples**: 

- [Pivot 2. Styling (custom CSS) for total column](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. Min/max and custom marks for cells (conditional format)](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. Alternate row color (striped rows, zebra-striping)](https://snippet.dhtmlx.com/0cm0uko2)
