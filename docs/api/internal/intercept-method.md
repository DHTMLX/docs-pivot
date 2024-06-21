---
sidebar_label: api.intercept()
title: intercept Method
description: You can learn about the intercept method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.intercept()

### Description

@short: Allows intercepting and preventing the inner events

### Usage

~~~jsx {}
api.intercept(
    event: string,
    callback: function
): void;
~~~

### Parameters

- `event` - (required) an event to be fired 
- `callback` - (required) a callback to be performed (the callback arguments will depend on the event to be fired)

### Events

:::info
The full list of the Pivot internal events can be found [**here**](api/overview/main_overview.md/#pivot-events).
Use the `api.on()` method if you want to listen to the actions without modifying them. To make changes to the actions, apply the `api.intercept()` method.
:::

### Example

~~~jsx
// create Pivot
consttable = new pivot.Pivot("#root", {
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

//make all rows closed at the initialization
table.api.intercept("render-table", (ev) => {
    ev.config.data.forEach((row) => (row.open = false));
})
~~~
