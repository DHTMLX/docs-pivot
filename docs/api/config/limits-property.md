---
sidebar_label: limits
title: limits Config
description: You can learn about the limits config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# limits

### Description

@short: Optional. Defines the maximum limit for the number of rows and columns in the final dataset

### Usage

~~~jsx
limits?: {
  rows?: number,
  columns?: number,
  raws?: number
};
~~~

### Parameters

- `rows` - (optional) sets the maximum number of rows in the final dataset
- `columns` - (optional) sets the maximum number of columns in the final dataset
- `raws` - (optional) the maximum number of source data rows before data is grouped (raw data records used for aggregating) 

The default values for both rows and columns are `undefined`, which means there's no limit.

## Example

~~~jsx {19}
const pivotWidget = new pivot.Pivot("#pivot", {
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

  limits:{ rows: 25, columns: 4 },
  
});
~~~
