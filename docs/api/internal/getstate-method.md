---
sidebar_label: api.getState()
title: getState Method
description: You can learn about the getState method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.getState()

### Description

@short: Gets an object with the StateStore properties of Pivot

### Usage

~~~jsx
api.getState(): object;
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
    limits: {} // the maximum limit for the number of rows and columns in the dataset
    methods: {}, // methods for data aggregation
    tableShape: {}, // table settings (sizes, total row, templates)
    tableConfig: {}, // table configuration settings (columns, data, sizes, tree mode, footer)
    configPanel: boolean, // the state of the configuration panel visibility 
}  
~~~

### Example

~~~jsx {21-22}
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

const { config } = table.api.getState();
console.log(config); //output the config state to console
~~~
