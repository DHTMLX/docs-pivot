---
sidebar_label: methods
title: methods Config
description: You can learn about the methods config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# methods

### Description

@short: Optional. TODO ... 

### Usage

~~~jsx 
 methods?: {
    [key: string]:
    {
      type?:string,
      label?:string,
      handler:(vals: any[]) => any }
    | { (vals: any[]) => any }
};
~~~

### Parameters

Each method object has the following parameters: 

- `key` - (required) the name of a method
- `values` - (required) a function that calculates an aggregated value from an array of numbers; the function takes an array of values as an input and returns a single value as an output.  
Instead of `values` there can be an object with the following parameters:
- `type` - (optional) data type ("number" | "date" | "string")
- `label` - (optional) the method label to be shown in GUI
- `handler` - (required) a function that calculates an aggregated value from an array of numbers; the function takes an array of values as an input and returns a single value as an output. 

There is no limit to the number of sub-properties that can be defined in the methods object. By default, the `methods` property is an empty object ({}), which means there are no default custom methods.

## Example

TODO!!!
