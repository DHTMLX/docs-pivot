---
sidebar_label: api.on()
title: on Method
description: You can learn about the on method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.on()

### Description

@short: Allows attaching a handler to the inner events

### Usage

~~~jsx {}
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
The full list of the Pivot internal events can be found [**here**](api/overview/main_overview.md/#pivot-events)
:::

### Example

~~~jsx {}
// create Pivot
const table = new pivot.Pivot("#root", {
    ...
});

table.api.on(...) => {
    console.log("...");
});
~~~
