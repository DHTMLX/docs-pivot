---
sidebar_label: add-field
title: add-field Event
description: You can learn about the add-field event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# add-field

### Description

@short: Fires when a new field is added to the rows, columns or values area

### Usage

~~~jsx {}
"add-field": ({
   id?: string | number,
   area: string,
   field: string | number,
   method?: string
}) => boolean;
~~~

### Parameters

The callback of the action takes an object with the following parameters:

- `id` - (optional) the desired id of a new field; if it's not set, the auto-generated id is added
- `area` - (required) the name of the area where a new field is added, which can be "rows", "columns" or "values" area
- `field` - (required) a new auto-generated field id
- `method` - (optional) defines a method for data aggregation (if not specified, a default method is set); a method can be one of the following:
  - it's required for the **values** area, it's one of the data operation types:
      - for numbers: min, max, sum, count, counta, countunique, average, median, product, var, vapr, stdev, stdevp
      - for text values: count, countunique, counta
      - for date value: min, max, count, counta
  - it's optional for the **rows** and **columns** areas, it's a default data predicate with one of the next values: year, month, day, hour, minute. If it's a custom predicate, the id is specified for the **predicate** property.

### Example

In the example below we use the [`api.intercept()`](/api/internal/intercept-method) method to add a new method to the value field with the **number** data type: 

~~~jsx {20-27}
const widget = new pivot.Pivot("#pivot", {
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
//adding values with a predefined method
widget.api.intercept("add-field", (ev) => {
  const { fields } = widget.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "min";
  }
});
~~~

**Related articles**: [api.intercept()](/api/internal/intercept-method)