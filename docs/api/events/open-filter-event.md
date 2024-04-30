---
sidebar_label: open-filter
title: open-filter Event
description: You can learn about the open-filter event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# open-filter

### Description

@short: Fires when a filter is activated for a field

### Usage

~~~jsx {}
"open-filter": ({
    field: {}
}) => boolean | void;
~~~

### Parameters

The callback function type takes a single argument which is the `field` object with the next parameters:

- `area` - the area where a field is applied (rows, columns, values)
- `field` (only for fields without predicates) - the id of a field 
- `base` (only for fields with predicates) - the id of a field
- `label` - the label of a field
- `method` - the method applied to a field
- `type` - field data type

### Returns

The function may return either a boolean value or void. When it returns **false**, the event operation in question will be halted.

### Example

The example below shows how to make the configuration panel close upon closing the filter box:

~~~jsx {20-27}
const widget = new pivot.Pivot("#pivot", {
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

 widget.api.intercept("open-filter", (ev) => {

    if(!ev.field) {
      widget.api.exec("show-config-panel", {
        mode: false,
      });
    }    
});
~~~

In the next example we output to console the id of the field for which filter is activated:

~~~jsx {20-22}
const widget = new pivot.Pivot("#pivot", {
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

widget.api.on("open-filter", (ev) => {
    console.log("The field id for which filter is activated:", ev.field.field);
});
~~~
