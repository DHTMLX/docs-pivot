---
sidebar_label: api.exec()
title: exec Method
description: You can learn about the exec method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.exec()

### Description

@short: Allows triggering the inner events

## Usage

~~~jsx {}
api.exec(
   event: string,
   config: object
): void;
~~~

## Parameters

- `event` - (required) an event to be fired
- `config` - (required) the config object with parameters (see the event to be fired)

## Actions

:::info
The full list of Pivot actions can be found [**here**](/api/overview/events-overview)
:::

## Example

In the example below, the [`delete-field`](/api/events/delete-field-event) event is triggered via the `api.exec()`method. The last field is removed from the **values** area. The [`api.getState()`](/api/internal/getstate-method) method here is used to get the current state of the Pivot [`config`](/api/config/config-property). The event will be triggered with the button click.

~~~jsx {}
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
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },
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
