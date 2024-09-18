---
sidebar_label: columnShape
title: columnShape Config
description: You can learn about the columnShape config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# columnShape

### Description

@short: Optional. Configures the look and behavior of the Pivot columns

### Usage

~~~jsx  
columnShape?: {
    sort?: boolean,
    width?: {
        [field: string]: number
    },
    autoWidth?: {
        columns?: {
            [field: string]: boolean
        },
        auto: boolean | "header" | "data",
        maxRows?: number,
        firstOnly?: boolean
    }
};
~~~

### Parameters

- `sort` - (optional) if **true** (default), the sorting is enabled in UI by clicking the column header; if **false**, the sorting is disabled
- `width` - (optional) defines the width of a column; it's an object where each key is a field id and the value is the width of the column in pixels
- `autoWidth` - (optional) an object that defines how column width should be calculated automatically. The default configuration uses 20 rows, and the width is calculated based on the header and data, with each field analyzed only once. The object parameters are the following: 
    - `columns` - (optional) an object where each key is a field id and the boolean value defines whether column width should be calculated automatically
    - `auto` - (required) if set to **header**, adjusts the width to the header text; if set to **data**, adjusts the width to the cell with the widest content; if set to **true**, the width is adjusted to the content of both headers and cell.
    If autowidth is set  to **false**, the `width` value is set or the value of the `colWidth` from the [`tableShape`](/api/config/tableshape-property) property is applied.
    - `maxRows` - (optional) the number of rows to be processed for the autoWidth calculation
    - `firstOnly` - (optional) if set to **true** (default), each field of the same data is analyzed only once to calculate the column width; in case of multiple columns based on the same data (e.g., the *oil* field with the *count* operation and the *oil* field with the *sum* operation), only data in the first one will be analyzed and the others will inherit this width

## Example

~~~jsx {18-30}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    columnShape: {
        autoWidth: {
            // calculate column width for these fields
            columns: {
                studio: true,
                genre: true,
                title: true,
                score: true
            },
            auto: true,
            // analyze all fields
            firstOnly: false
        }
    }
});
~~~

**Related samples:**
- [Pivot 2.0. Auto width. Sizing columns to content](https://snippet.dhtmlx.com/tn1yw14m)
- [Pivot 2.0. Set columns width](https://snippet.dhtmlx.com/ceu34kkn)
