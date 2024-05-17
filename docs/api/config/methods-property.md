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

Each method is represented by a key-value pair, where the key is the name of a method and the value is an object that describes the method's behavior. Each object has the following parameters:

- `handler` - (required) a function that calculates an aggregated value from an array of numbers; the function takes an array of values as an input and returns a single value as an output.  
- `type` - (optional) data type this method is suitable for; it can be "number", "date" or "text" or an array of these values
- `label` - (optional) the method label to be shown in GUI
- `branchMode` - (optional)
- `branchMath` - (optional) 

There is no limit to the number of sub-properties that can be defined in the methods object. By default, the `methods` property is an empty object ({}), which means there are no default custom methods.

## Example

The example below shows how to calculate the average value of an array. The function takes an array of numbers (vals) as an input, calculates the sum of these numbers using the **reduce** method, and then divides the sum by the length of the array to obtain the average value.

~~~jsx {1-6,17}
const methods = {
  average: (vals) => {
      const sum = vals.reduce((acc, v) => acc + v, 0);
      return sum / vals.length;
    },
};

const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data,
  config: {
    rows: ["continent", "name"],
    columns: ["year"],
    values: ["average(oil)", { id: "oil", method: "average" }, { id: "gdp", method: "average" }],
  },

  methods: { ...pivot.defaultMethods, ...methods },
});
~~~
