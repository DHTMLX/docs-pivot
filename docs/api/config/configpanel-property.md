---
sidebar_label: configPanel
title: configPanel Config
description: You can learn about the configPanel config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# configPanel

### Description

@short: Optional. Controls the visibility of the Configuration panel in UI

In UI the panel is hidden/shown by clicking the **Hide Settings** button. 

### Usage

~~~jsx  
configPanel?: boolean;
~~~

### Parameters

The property can be set to **true** or **false**:

- `true` - default, shows the Configuration panel
- `false` - hides the Configuration panel

## Example

~~~jsx 
// The configuration panel is hidden on init
const widget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,

  configPanel: false,

  config: {
    rows: ["hobbies"],
    columns: ["relationship_status"],
    values: [
      {
        field: "age",
        method: "min",
      },
      {
        field: "age",
        method: "max",
      },
    ],
  },
});
~~~

**Related articles:** 
- [`show-config-panel` event](/api/events/show-config-panel-event)
- [`showConfigPanel()` method](/api/methods/showconfigpanel-method)

**Related sample:** [Pivot 2.0: Toggle visibility of configuration panel](https://snippet.dhtmlx.com/1xq1x5bo)