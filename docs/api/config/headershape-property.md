---
sidebar_label: headerShape
title: headerShape Config
description: You can learn about the headerShape config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# headerShape

### Description

@short: Optional. Configures the look and behavior of headers in the Pivot table

### Usage

~~~jsx  
headerShape?: {
  collapsible?: boolean,
  vertical?: boolean,
  template?: (label: string, field: string, subLabel?: string) => string
};
~~~

### Parameters

- `collapsible` - (optional) if set to **true**, dimension groups in the table are collapsible; it's set to **false** by default
- `vertical` - (optional) if set to **true**, changes the text orientation in all headers from horizontal to vertical; the default value is **false**
- `template` - (optional) defines the format of text in headers; by default, for the fields applied as rows the value of the `label` parameter is displayed and for the fields applied as values the label and method are shown (e.g., *Oil(count)*); the function takes the field id, label and the method or predicate id (if any) and returns the processed value; the default template is as follows: 
~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~


## Example

~~~jsx {19-22}
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

  headerShape: {
    vertical: true,
    template: (label, field, subLabel) => field + (subLabel ? ` (${subLabel})` : ""),
  },
});
~~~

**Related samples**: 
- [Pivot 2.0: Vertical orientation of text in grid headers](https://snippet.dhtmlx.com/4qroi8ka)
- [Pivot 2.0: Collapsible columns](https://snippet.dhtmlx.com/pt2ljmcm)
- [Pivot 2.0. Headers template](https://snippet.dhtmlx.com/g89r9ryw)

**Related articles**: [Configuration](/api/guides/configuration)
