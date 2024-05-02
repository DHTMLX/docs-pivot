---
sidebar_label: api.getState()
title: getState Method
description: You can learn about the getState method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.getState()

### Description

@short: Gets an object with the StateStore properties of Pivot

### Usage

~~~jsx {}
api.getState(): object;
~~~

### Returns

The method returns an object with the following parameters:

~~~jsx {}
  {
   config: {}, // current config (rows, columns, values, filters)
   data: [], // source data
   fields: [],    // fields array
   result: [],   // calculated data
   operations: {}, // available data operations by fields types
   predicates: {}, // available predicates by fields
   activeFilter: {}, // active filter object (if any filter is open) 
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

~~~jsx
// create Pivot
const table = new pivot.Pivot("#root", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        id: "title",
        method: "count",
      },
      {
        id: "score",
        method: "max",
      },
    ],
  },
});

const { config } = table.api.getState();
console.log(config); //output the config state to console
~~~
