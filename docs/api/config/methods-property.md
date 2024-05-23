---
sidebar_label: methods
title: methods Config
description: You can learn about the methods config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# methods

### Description

@short: Optional. Defines custom mathematical methods for data aggregation 

### Usage

~~~jsx 
 methods?: {
    [method: string]:
    {
      type?: 'number' | 'date' | 'text' | [],
      label?:string,
      handler: (values: number[]|string[]|Date[]) => any,
      branchMode?: "raw"|"result",
      branchMath?: string,
    },
 };
~~~

### Parameters

Each method is represented by a key-value pair, where the `method` is the name of a method and the value is an object that describes the method's behavior. Each object has the following parameters:

- `handler` - (required) a function that calculates an aggregated value from an array of numbers; the function takes an array of values as an input and returns a single value as an output.  
- `type` - (optional) data type this method is suitable for; it can be "number", "date" or "text" or an array of these values
- `label` - (optional) the method label to be shown in GUI
- `branchMode` - (optional) defines the mode for the calculation of total values for the tree table; the branchMode can be set to `raw` for calculation based on all raw data; `result` (default) is set for calculation based on already processed data in the tree mode
- `branchMath` - (optional) the name of a method to calculate total values in the tree mode; the "sum" is set by default

By default, the `methods` property is an empty object ({}), which means that no custom methods are defined. There are 5 predefined methods: "sum", "min", "max", "count", "average". There is no limit to the number of sub-properties that can be defined in the methods object. 

Predefined methods:

~~~jsx
const methods = {
	sum: { label: "sum" },
	min: { type: ["number", "date"], label: "min" },
	max: { type: ["number", "date"], label: "max" },
	count: {
		type: ["number", "date", "text"],
		label: "count",
		branchMath: "sum",
	},
};
~~~

## Example

The example below shows how to calculate the exact count of unique values. The function takes an array of numbers (values) as an input and calculates the exact count of unique values using the **reduce** method. The **distinct_count** sub-property has a handler with a function that calculates the distinct count value from an array of numbers.

~~~jsx {}
function countDistinct(values, converter) {
  const valueMap = {};
  return values.reduce((acc, d) => {
    if (converter) d = converter(d);
    if (!valueMap[d]) {
      acc++;
      valueMap[d] = true;
    }
    return acc;
  }, 0);
}

const methods = {
  distinct_count: {
    handler: (values) => countDistinct(values),
    type: ["number", "text"],
    label: "distinct count",
  },
};

const widget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  methods: { ...pivot.defaultMethods, ...methods },
  config: {
    rows: ["state"],
    columns: ["product_line", "product_type"],
    values: [
      {
        field: "sales",
        method: "sum",
      },
      {
        field: "sales",
        method: "count",
      },
      {
        field: "sales",
        method: "distinct_count",
      },
    ],
  },
});
~~~
