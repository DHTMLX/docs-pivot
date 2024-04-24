---
sidebar_label: headerShape
title: headerShape Config
description: You can learn about the headerShape config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# headerShape

### Description

@short: Optional. TODO ...

### Usage

~~~jsx  
headerShape?: {
  columnCollapsing?: boolean,
  verticalText?: boolean,
  template?: (label: string, fieldId: string, subLabel?: string) => string
};
~~~

### Parameters

- `columnCollapsing` - (optional) if set to **true**, enables columns collapsing in all headers; it's set to **false** by default
- `verticalText` - (optional) if set to **true**, changes the text orientation in all headers from horizontal to vertical; the default value is **false**
- `template` - (optional) defines the format of text in headers; by default, for the fields applied as rows the value of the `label` parameter is displayed (see the [config](/api/config/config-property) property) and for the fields applied as values  the label and method are shown (e.g., *Oil(count)*); the function takes the field id, label and the method or predicate id (if any) and returns the processed value.

## Example

TODO!!!
