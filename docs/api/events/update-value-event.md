---
sidebar_label: update-field
title: update-field Event
description: You can learn about the update-field event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# update-field

### Description

@short: Fires when updating a field

### Usage

~~~jsx
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
  - for the **values** area, it's a string with one of the data operation types: [Default methods](/guides/working-with-data#default-methods)
  - for the **rows** and **columns** areas it can be data predicate value with one of the next values: "year", "quarter", "month", "week", "day", "hour", "minute". By default, a raw value is set.
  If a custom predicate or method is set, the id should be specified for the [predicate](/api/config/predicates-property) or [methods](/api/config/methods-property) property.
- `area` - (required) the name of the area where a field is updated, which can be "rows", "columns" or "values" area

:::info
For handling the inner events you can use the [Event Bus methods](/api/overview/internal-eventbus-overview)
:::

### Example

~~~jsx {19-22}
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
//output the id of a field that is updated to console
table.api.on("update-field", (ev) => {
    console.log("The id of the field that was updated:", ev.id);
});
~~~

**Related articles**:
- [api.on()](/api/internal/on-method)
- [methods](/api/config/methods-property)
