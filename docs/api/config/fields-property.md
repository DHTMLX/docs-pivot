---
sidebar_label: fields
title: fields Config
description: You can learn about the fields config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# fields

### Description

@short: Optional. TODO ... 

### Usage

~~~jsx
fields?: [{
   id: string,
   label?: string,
   type: string,
   sort?: "asc" | "desc" | ((a: any, b: any) => number),   
}];
~~~

### Parameters

Each object in the `fields` array should have the following properties: 

- `id` - (required) the ID of a field
- `label` - (optional) the field label to be displayed in GUI
- `type` - (required) data type in a field ( "number", "date", or "string")
- `sort` - (optional) defines the default sorting order for the field. Accepts either "asc", "desc", or a custom sorting function

### Example

TODO!!!
