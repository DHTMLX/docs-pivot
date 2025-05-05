---
sidebar_label: filter-rows
title: filter-rows
description: You can learn about the filter-rows event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot
---

# filter-rows

### Description

@short: Fires when filtering data

To trigger the Table event, it's necessary to get access to the Table instance inside Pivot via the [`getTable`](/api/methods/gettable-method) method. 

### Usage

```jsx {}
"filter-rows": ({
    filter?: any
}) => boolean|void;
```

### Parameters

The callback of the action takes an object with the following parameters:

- `filter` - (optional) any filtering function that takes each item from the data array and returns **true** or **false** for each item

### Example

The snippet below demonstrates how to filter data by input value:

<iframe src="https://snippet.dhtmlx.com/s7tc9g4z?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 


**Related article**: [`getTable`](/api/methods/gettable-method)

