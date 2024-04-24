---
sidebar_label: apply-filter
title: apply-filter Event
description: You can learn about the apply-filter event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# apply-filter

### Description

@short: TODO!!!

### Usage

~~~jsx {}
"apply-filter": ({
    rule: {} 
}) => boolean | void;
~~~

### Parameters

The callback of the action takes an object with the following parameters:

- `rule` - any filter configuration object with such parameters as below:
  - `field` - (required) the field id to which filter will be applied
  - `type` - (required) data type in a field (text, number, date)
  - `filter` - (required) filter type:
     - for text values: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith
     - for numeric values: greater: less, greaterOrEqual, lessOrEqual, equal,	notEqual, contains, notContains
     - for date types: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween
  - `value` - (optional) the value to filter by
  - `includes` - (optional) an array of values to be displayed from those that are already filtered; available for text and date values

### Example

TODO!!!