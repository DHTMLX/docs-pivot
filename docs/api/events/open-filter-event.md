---
sidebar_label: open-filter
title: open-filter Event
description: You can learn about the open-filter event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# open-filter

### Description

@short: Fires when a filter is activated for a field

### Usage

~~~jsx
"open-filter": ({
    id: string | null,
    area?: "values" | "rows" | "columns"
}) => boolean | void;
~~~

### Parameters

The callback of the action takes the next parameters:

- `area` - the area where a field is applied ("rows", "columns", "values")
- `id` - the id of a field; if there's a single id argument with null value, the filter will be closed.

:::info
For handling the inner events you can use the [Event Bus methods](/api/overview/internal-eventbus-overview)
:::

### Returns

The function may return either a boolean value or void. When it returns **false**, the event operation in question will be halted.

### Example

The example below shows how to make the Configuration panel hide upon closing the filter box:

~~~jsx {20-27}
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

table.api.on("open-filter", (ev) => {
    if(!ev.id) {
        table.api.exec("show-config-panel", {
            mode: false
        });
    }    
});
~~~

In the next example we output to console the id of the field for which filter is activated:

~~~jsx {20-22}
const table = new pivot.Pivot("#root", {
    fields,
    data,
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

table.api.on("open-filter", (ev) => {
    console.log("The field id for which filter is activated:", ev.id);
});
~~~
