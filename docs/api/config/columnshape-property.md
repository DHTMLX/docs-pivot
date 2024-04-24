---
sidebar_label: columnShape
title: columnShape Config
description: You can learn about the columnShape config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# columnShape

### Description

@short: Optional. TODO ...

### Usage

~~~jsx  
columnShape?: {
   splitLeft?: number,
   width?: string | number,
   autoWidth?: {
      columns?: string | boolean,
      header?: boolean,
      data?: boolean,
      rows?: number,
      firstOnly?: boolean
   }
}; 
~~~

### Parameters

- `splitLeft` - (optional) defines how many of the leftmost columns are frozen. The default value is 0. 
- `width` - (optional) defines the width of a column; it's an object where each key is a field id and the value is the width of the column in pixels
- `autoWidth` - (optional) an object that defines how column width should be calculated automatically. The default configuration uses 20 rows, and the width is calculated based on the header and data, with each field analyzed only once. The object parameters are the following: 
   - `columns` - (optional) an object where each key is a field id and the boolean value defines whether column width should be calculated automatically
   - `header` - (optional) if set to **true** (default), adjusts the width to the header text
   - `data` - (optional) if set to **true** (default), adjusts the width to the cell with the widest content
   - `rows` - (optional) the number of rows to be processed for the autoWidth calculation
   - `firstOnly` - (optional) if set to **true** (default), each field of the same data is analyzed only once to calculate the column width; in case of multiple columns based on the same data (e.g., the *oil* field with the *count* operation and the *oil* field with the *sum* operation), only data in the first one will be analyzed and the others will inherit this width

## Example

~~~jsx {}
// TODO
~~~
