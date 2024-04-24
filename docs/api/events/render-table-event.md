---
sidebar_label: render-table
title: render-table Event
description: You can learn about the render-table event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# render-table

### Description

@short: TODO!!!

It allows you to alter the final table configuration on the fly or prevent the rendering of the table altogether.

### Usage

~~~jsx {}
"render-table": ({
   tableConfig: {
    columns?: [],
    data?: [],
    footer?: boolean,
    sizes?: {},
    split?: {
      left?: number,
    },
    tree?: boolean,
    cellStyle?: (row: any, col: any) => string
}
}) => boolean | void;
~~~

### Parameters

The callback of the action takes the `tableConfig` object with the following parameters:

- `columns` -  (optional) columns array
- `data` - (optional) an array of objects with data for the table; each object represents a row
- `footer` - (optional) if it's set to **true**, the table footer is displayed at the bottom of the table; it's set to **false** and invisible by default
- `sizes` - (optional) an object with table sizes settings, namely, colWidth, footerHeight, headerHeight, rowHeight
- `split` - (optional) an object with data on the number of columns that are fixed on the left-size during the scrolling process
- `tree` - (optional) the boolean value with the tree mode setting (**true** if the tree mode is enabled)
- `cellStyle` - (optional) an object where each key is the field id and the value is a function that returns a string. All columns based on the specified field will have the related template applied.

### Returns

The callback may return boolean or void.  
If the event handler returns **false**, it will block the operation in question. In this case, it will prevent the rendering of the table.

### Example

TODO!!!
