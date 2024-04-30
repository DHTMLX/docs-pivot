---
sidebar_label: predicates
title: predicates Config
description: You can learn about the predicates config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# predicates

### Description

@short: Optional. Defines how data should be modified before it's applied 

### Usage

~~~jsx
predicates: {
  [type:  "number" | "date" | "string"]:
  [
    {
      id: string,
      label: string,
      handler?: (value: any) => any,
      template?: (value: any, params: any) => any
    }
  ]
} 
~~~

### Parameters

- `type` - (required) data type ("number" | "date" | "string") that should be the same for an array of objects with the next parameters for each object:
  - `id`- (required) a predicate's id which is specified as the `method` value of the `rows` or `columns` property
	- `label` - (required) a predicate's label displayed in GUI in the drop-down among data modifiers options for a row/column  
	- `handler` - (optional) the function that defines how data should be processed; the function should take a single argument as the value to be processed and return the processed value
	- `template` - (optional) the function that defines how data should be displayed; the function returns the processed value and it takes the value returned by the `handler` and if necessary the `params` object is defined with the following parameters:
  - `locale` - (optional) the locale to localize text values
  - `state` - (optional) the Pivot state object (see [`getState()`](TODO))

The following default predicates are applied in case no predicate is specified via the `predicates` property:

~~~jsx
const predicates = {
   date: [
      { id: "$empty", label: "(date)" },
      { id: "year", label: "year" },
      { id: "month", label: "month" },
      { id: "day", label: "day" },
      { id: "hour", label: "hour" },
      { id: "minute", label: "minute" },
   ]
};
~~~

:::note
If no custom predicate is set, for the **date** type the default *$empty* template is applied where the value of the `dateToString` parameter of the [`tableShape`](/api/properties/tableshape-property) property is taken and depends on the current locale.
:::

## Example

TODO!!!
