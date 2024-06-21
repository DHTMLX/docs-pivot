---
sidebar_label: apply-filter
title: apply-filter Event
description: You can learn about the apply-filter event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# apply-filter

### Description

@short: Fires when a filter is applied

### Usage

~~~jsx {}
"apply-filter": ({
    rule: {} 
}) => boolean | void;
~~~

### Parameters

The callback of the action takes an object with the following parameters:

- `rule` - any filter configuration object with such parameters as below:
  - `field` - (required) the field id to which filter will be applied
  - `filter` - (required) filter type:
     - for text values: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith
     - for numeric values: greater: less, greaterOrEqual, lessOrEqual, equal,	notEqual, contains, notContains
     - for date types: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween
  - `value` - (required) the value to filter by
  - `includes` - (required) an array of values to be displayed from those that are already filtered; available for text and date values

### Example

~~~jsx {20-23}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data,
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
//output to console the label of the field to which filter was applied
widget.api.on("apply-filter", (ev) => {
  console.log("The field to which filter was applied:", ev.rule.field);
});
~~~

**Related articles**: [api.on()](/api/internal/on-method)