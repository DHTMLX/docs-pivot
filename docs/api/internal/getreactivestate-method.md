---
sidebar_label: api.getReactiveState()
title: getReactiveState Method
description: You can learn about the getReactiveState method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.getReactiveState()

### Description

@short: Gets an object with the reactive properties of Pivot

### Usage

~~~jsx
api.getReactiveState(): object;
~~~

### Returns

The method returns an object with the following parameters:

~~~jsx
{
    config: {}, // current config (rows, columns, values, filters)
    activeFilter: {}, // active filter object (if any filter is open) 
    columnShape: {}, // pivot columns configuration
    data: [], // source data
    fields: [], // fields array
    filters: {}, // filtering rules
    headerShape: {}, // table header settings
    predicates: {}, // available predicates by fields
    limits: {}, // the maximum limit for the number of rows and columns in the dataset
    methods: {}, // methods for data aggregation
    tableShape: {}, // table settings (sizes, total row, templates)
    tableConfig: {}, // table configuration settings (columns, data, sizes, tree mode, footer)
    configPanel: boolean, // the state of the configuration panel visibility
    readonly: boolean, // whether the read-only mode is enabled
}  
~~~

### Example

~~~jsx {21-26}
// create Pivot
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

// subscribe to the reactive config store and log it on every change
const state = table.api.getReactiveState();

state.config.subscribe((config) => {
    console.log("Pivot config changed. Its current state:", config);
});
~~~
