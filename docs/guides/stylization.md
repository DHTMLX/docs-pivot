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
Future versions of Pivot may rename or change CSS variables. After each update, check the variable names and update your code to keep the component rendering correctly.
:::

## Built-in theme

Pivot ships with one built-in theme — Material.

To apply the theme, add the corresponding CSS class to the widget container:

~~~html
<!-- Pivot container -->
<div id="root" class="wx-material-theme"></div>
~~~

Or include the theme stylesheet from the skins folder:

~~~html
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## Customize built-in theme

The example below shows how to customize the Material theme:

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

To change the appearance of Pivot, apply the corresponding CSS variables. The example below shows how to apply a custom style to Pivot:

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

To apply a custom style to the Pivot scroll bar, use the `.wx-styled-scroll` CSS class. Check [browser compatibility](https://caniuse.com/css-scrollbar) before using it.

~~~html title="index.html"
<!--container for Pivot-->
<div id="root" class="wx-styled-scroll"></div>
~~~

## Cell style

To apply a CSS class to body or footer cells, use the `cellStyle` parameter of the [`tableShape`](/api/config/tableshape-property) property. To style header cells, use the `cellStyle` parameter of the [`headerShape`](/api/config/headershape-property) property. In both cases, `cellStyle` returns a string that Pivot uses as the CSS class name for the cell.

The example below customizes cell styles as follows:

- for body cells, styles depend on cell values in the `status` field (`Down`, `Up`, `Idle`) and on total values (greater than 40 or less than 5)
- for header cells, the value in the `streaming` field selects the class — `status-down` for `no` and `status-up` for any other value

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

## Marking values in cells

The widget API can mark specific values in cells via the `marks` parameter of the [`tableShape`](/api/config/tableshape-property) property. To mark cells:

- Create a CSS class for the marked cell.
- Add the CSS class name as a parameter of the `marks` object.
- Set its value to a custom function or one of the predefined strings (`"max"`, `"min"`). The function takes the checked value and returns a boolean; when it returns `true`, Pivot assigns the CSS class to the cell.

The example below marks cells with min and max values and uses a custom function to mark non-integer values greater than 2.

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

By default, the built-in `.wx-number` CSS class right-aligns numbers in the table body. The exception is the hierarchical column in the tree mode (when `tree` is set to `true` in the [`tableShape`](/api/config/tableshape-property) property). To reset the default number alignment, change the related CSS class.

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

You can also style total columns via the `.wx-total` CSS class:

~~~html
<style>
    .wx-cell.wx-total {
        background: #fafafb;
        font-weight: var(--wx-header-font-weight);
    }
</style>
~~~

## Example

The snippet below shows how to apply a custom style to Pivot:

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related samples:**

- [Pivot 2. Styling (custom CSS) for total column](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. Min/max and custom marks for cells (conditional format)](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. Alternate row color (striped rows, zebra-striping)](https://snippet.dhtmlx.com/0cm0uko2)
