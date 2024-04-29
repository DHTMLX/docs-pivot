---
sidebar_label: update-field
title: update-field Event
description: You can learn about the update-field event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# update-field

### Description

@short: Fires when updating a field

### Usage

~~~jsx {}
"update-field": ({
    id: string | number,
    method: string,
    area: string
}) => boolean;
~~~

### Parameters

The callback of the action takes an object with the following parameters:

- `id` - (required) the id of a field that is updated
- `method` - (required) the method can be one of the following:
  - for the **values** area, it's one of the data operation types:
      - for numbers: min, max, sum, count
      - for text values: count
      - for date value: min, max, count
  - for the **rows** and **columns** areas and the **when** field, it's a default data predicate with one of the next values: year, month, day, hour, minute. If it's a custom predicate, the id is specified for the **predicate** property. 
- `area` - (required) the name of the area where a field is updated, which can be "rows", "columns" or "values" area

### Example

~~~jsx {19-22}
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
//output the id of a field that is updated to console
widget.api.on("update-field", (ev) => {
  console.log("The id of the field that is updated:", ev.id);
});
~~~
