---
sidebar_label: tableConfig
title: tableConfig Config
description: You can learn about the tableConfig config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# tableConfig

### Description

@short: Optional. A reactive object with the Pivot table configuration settings

You can use this reactive property to change the table settings on the fly.

### Usage

~~~jsx
tableConfig?: {
    columns?: [],
    data?: [],
    footer?: boolean,
    sizes?: {},
    split?: {
      left?: number,
    },
    tree?: boolean,
    cellStyle?: (row: any, col: any) => string
}
~~~

### Parameters

The object has the following parameters:

- `columns` -  (optional) columns array
- `data` - (optional) an array of objects with data for the table; each object represents a row
- `footer` - (optional) if it's set to **true**, the table footer is displayed at the bottom of the table; it's set to **false** and invisible by default
- `sizes` - (optional) an object with table sizes settings, namely, colWidth, footerHeight, headerHeight, rowHeight
- `split` - (optional) an object with data on the number of columns that are fixed on the left side during the scrolling process
- `tree` - (optional) the boolean value with the tree mode setting (to enable the tree mode, set to **true**)
- `cellStyle` - (optional) an object where each key is the field id and the value is a function that returns a string. All columns based on the specified field will have the related template applied.

### Example

TBD!!!

~~~jsx
const widget = new pivot.Pivot("#pivot", {
    tableShape: {
        tree: true,
        templates: {
            rank: (v) => v,
            members: (v) => v,
        }
    },
    fields,
    data,
    config: {
        "rows": [
            "studio",
            "genre"
        ],
        "columns": [
        ],
        "values": [
            {
                "id": "title",
                "method": "count"
            },
            {
                "id": "score",
                "method": "max"
            },
            {
                "id": "episodes",
                "method": "count"
            },
            {
                "id": "rank",
                "method": "min"
            },
            {
                "id": "members",
                "method": "max"
            },
        ]
    }
});

    widget.api.intercept("render-table", (ev) => {
            ev.config.data.forEach((row) => (row.open = false));
    })
    
let mode = "tree";

let tableConfig;

let tableShape = {};

// Function to open all rows
function openAll() {
    tableConfig.data.forEach((row) => (row.open = true))    
    tableConfig.data = [...tableConfig.data];
}

// Function to close all rows
function closeAll() {
    tableConfig.data.forEach((row) => (row.open = false));
    // make a copy to create a new object for update
    tableConfig.data = [...tableConfig.data];
}

// Reactive statement to update table shape based on mode
tableShape.tree = mode == "tree";

// Rendering buttons
const openAllButton = document.createElement('button');
openAllButton.addEventListener('click', openAll);
openAllButton.textContent = 'Open all';

const closeAllButton = document.createElement('button');
closeAllButton.addEventListener('click', closeAll);
closeAllButton.textContent = 'Close all';

document.body.appendChild(openAllButton);
document.body.appendChild(closeAllButton);
~~~
