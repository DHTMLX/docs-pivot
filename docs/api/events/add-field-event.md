---
sidebar_label: add-field
title: add-field Event
description: You can learn about the add-field event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# add-field

### Description

@short: TODO!!! 

### Usage

~~~jsx {}
"add-field": ({
   id?: string | number,
   area: string,
   field: string | number,
   method?: string
}) => boolean;
~~~

### Parameters

The callback of the action takes an object with the following parameters:

- `id` - (optional) the desired id of a new field; if it's not set, the auto-generated id is added
- `area` - (required) the name of the area where a new field is added, which can be "rows", "columns" or "values" area
- `field` - (required) a new auto-generated field id
- `method` - (optional) defines a method for data aggregation (if not specified, a default method is set); a method can be one of the following:
  - for the **values** area, it's one of the data operation types:
      - for numbers: min, max, sum, count
      - for text values: count
      - for date value: min, max, count
  - for the **rows** and **columns** areas and the **when** field, it's a default data predicate with one of the next values: year, month, day, hour, minute. If it's a custom predicate, the id is specified for the **predicate** property.

### Example

TODO!!!
