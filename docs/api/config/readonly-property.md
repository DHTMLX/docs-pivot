---
sidebar_label: readonly
title: readonly Config
description: You can learn about the readonly config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# readonly

### Description

@short: Optional. Enables/disables the read-only mode 

In the read-only mode it's not possible to configure the Pivot structure via the UI.

### Usage

~~~jsx  
 readonly?: boolean;
~~~

### Parameters

The property can be set to **true** or **false**:

- `true` - enables the read-only mode
- `false` - default, disables the read-only mode

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
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },

  readonly: true

});
~~~