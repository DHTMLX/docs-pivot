---
sidebar_label: setConfig()
title: setConfig()
description: You can learn about the setConfig() method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# setConfig()

### Description

@short: Updates the current configuration of the Pivot widget

The method is used to update the current configuration of the Pivot widget. It's useful when there's a need to update the underlying data set of the widget. The method preserves all the previously set options that are not explicitly provided in the `setConfig` call.

### Usage

~~~jsx {}
setConfig(config: { [key:any]: any }): void;
~~~

### Parameters

- `config` - (required) an object of the Pivot configuration. See the full list of properties [here](/api/overview/properties-overview)

:::important
The method changes only the parameters you passed. It destroys the current component and initializes a new one.
:::

### Example

~~~jsx
// create Pivot
const widget = new pivot.Pivot("#root", {
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

//update configuration parameters
widget.setConfig({
  config: {
    rows: ["studio", "genre", "duration"],
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
      {
        field: "type",
        method: "count",
      },
    ],
  },
});
~~~
