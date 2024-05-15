---
sidebar_label: configPanel
title: configPanel Config
description: You can learn about the configPanel config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# configPanel

### Description

@short: Optional. Enables the visibility of the configuration panel 

### Usage

~~~jsx
 configPanel?: boolean;
~~~

### Parameters

The property can be set to **true** or **false**: 

- `true` - shows the configuration panel
- `false` - hides the configuration panel

## Example

~~~jsx {19}
const pivotWidget = new pivot.Pivot("#pivot", {
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

  configPanel: false

});
~~~