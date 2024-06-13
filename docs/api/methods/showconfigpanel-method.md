---
sidebar_label: showConfigPanel()
title: showConfigPanel()
description: You can learn about the showConfigPanel() method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# showConfigPanel()

### Description

@short: Shows or hides the configuration panel

This TypeScript method can be useful when there's a need to control the visibility of the configuration panel without user interaction. For instance, you might want to hide or display the panel based on some other interaction or state in your application.


### Usage

~~~jsx {}
showConfigPanel({mode: boolean}): void;
~~~

### Parameters

- `mode` (boolean) - (required) if the value is set to **true** (default), the configuration panel is shown, and set to **false** when the configuration panel is hidden

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

widget.showConfigPanel ({
    mode: false
})
~~~
