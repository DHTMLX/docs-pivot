---
sidebar_label: delete-field
title: delete-field Event
description: You can learn about the delete-field event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# delete-field

### Description

@short: Fires when removing a field

### Usage

~~~jsx
"delete-field": ({
    area: string,
    id: string | number
}) => boolean | void;
~~~

### Parameters

The callback of the action takes an object with the following parameters:

- `area` - (required) the name of the area where a field is removed, which can be "rows", "columns" or "values" area
- `id` - (required) the id of a field that is removed

:::info
For handling the inner events you can use the [Event Bus methods](/api/overview/internal-eventbus-overview)
:::

### Example

In the example below, the `delete-field` action is triggered via the [`api.exec()`](/api/internal/exec-method) method. The last field is removed from the **values** area. The [`api.getState()`](/api/internal/getstate-method) method here is used to get the current state of the Pivot [`config`](/api/config/config-property). The action will be triggered with the button click.

~~~jsx {31-34}
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

//calling methods of API: remove a specific value from values in config
function removeLastField() {
    if (table.api) {
        const state = table.api.getState();
        const config = state.config;

        const count = config.values.length;

        if (count) {
            const lastValue = config.values[count - 1];

            table.api.exec("delete-field", {
                area: "values",
                id: lastValue.id, // auto-generated ID of an item added to config.values
            });
        }
    }
}

const button = document.createElement("button");

button.addEventListener("click", removeLastField);
button.textContent = "Remove";

document.body.appendChild(button);
~~~
