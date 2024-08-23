---
sidebar_label: move-field
title: move-field Event
description: You can learn about the move-field event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# move-field

### Description

@short: Fires when reordering fields

### Usage

~~~jsx
"move-field": ({
    area: string,
    id: string | number,
    before?: id,
    after?: id
}) => void | boolean;
~~~

### Parameters

The callback of the action takes an object with the following parameters:

- `area` - (required) the name of the area where reordering takes place, which can be "rows", "columns" or "values" area
- `id` - (required) a field id that is moved
- `before` - (optional) the id of a field before which the moved field is placed
- `after` - (optional) the id of a field after which the moved field is placed

### Example

~~~jsx {20-23}
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

//output the id of the reordered field to console 
table.api.on("move-field", (ev) => {
    console.log("The id of the reordered field:", ev.id);
});
~~~

**Related articles**: [api.on()](/api/internal/on-method)
