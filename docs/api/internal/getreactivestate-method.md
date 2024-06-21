---
sidebar_label: api.getReactiveState()
title: getReactiveState Method
description: You can learn about the getReactiveState method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.getReactiveState()

### Description

@short: Gets an object with the reactive properties of Pivot

### Usage

~~~jsx {}
api.getReactiveState(): object;
~~~

### Returns

The method returns an object with the following parameters:

~~~jsx {}
{
   config: {}, // current config (rows, columns, values, filters)
   data: [], // current source data
   fields: [], // current fields array
   result: [], // currently calculated data
   operations: {}, // currently available data operations by fields types
   predicates: {}, // currently available predicates by fields
   activeFilter: {}, // current active filter object (if any filter is open) 
   headerShape: {}, // table header settings
   tableShape: {}, //table settings
   methods: {}, // methods for data aggregation
   showConfig: boolean, // the state of the configuration panel visibility
   readonly: boolean, // the state of the read-only mode
   columnShape: {}, // pivot columns configuration
   limits: {} // the maximum limit for the number of rows and columns in the dataset
}  
~~~  

### Example

~~~jsx {22-28}
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
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },
});

// output the current config state to the console
let config;
let state = table.api.getReactiveState();

if (config) {
  console.log("There were some changes in Pivot config. Its current state:");
  console.log(config);
}
~~~
