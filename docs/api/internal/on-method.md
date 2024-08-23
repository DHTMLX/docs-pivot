---
sidebar_label: api.on()
title: on Method
description: You can learn about the on method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.on()

### Description

@short: Allows attaching a handler to the inner events

### Usage

~~~jsx
api.on(
    event: string,
    handler: function
): void;
~~~

### Parameters

- `event` - (required) an event to be fired
- `handler` - (required) a handler to be attached (the handler arguments will depend on the event to be fired)

### Events

:::info
The full list of the Pivot internal events can be found [**here**](/api/overview/main-overview/#root-events).
Use the `api.on()` method if you want to listen to the actions without modifying them. To make changes to the actions, apply the [`api.intercept()`](/api/internal/intercept-method) method.
:::

### Example

The example below shows how to output the label of a field for which the filter was activated: 

~~~jsx {21-28}
// create Pivot
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
    const fieldObj = ev.field;
    const field = fieldObj.base || fieldObj.field;

    if (field) {
        console.log("The field for which filter was activated:", ev.field.label);
    }
});
~~~
