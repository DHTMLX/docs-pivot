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
    template?: (label: string, field: string, subLabel?: string) => string,
    cellStyle?: (
        field: string, 
        value: any, 
        area: "rows"|"columns"|"values", 
        method?: string,
        isTotal?: boolean) 
        => string,
};
~~~

### Parameters

- `collapsible` - (optional) if set to **true**, dimension groups in the table are collapsible. It's set to **false** by default
- `vertical` - (optional) if set to **true**, changes the text orientation in all headers from horizontal to vertical. The default value is **false**
- `cellStyle` - (optional) a function that applies a custom style to a header cell. The function returns a name of css class and takes the following parameters:
    - `field` (string) - (required) a string representing the field name the cell corresponds to. For the header of the tree column the field is ""
    - `value` (string | number | date) - (required) the value of a cell 
    - `area` - (required) a string indicating the area of the table where a cell resides ("rows", "columns" or "values" area)
    - `method` (string) - (optional) a string that can represent the operation performed for a field from the "values` area (e.g., "sum", "count", etc.) or the name of a predicate set for a field from the "columns" area
    - `isTotal` - (optional) defines whether a cell belongs to a total column
- `template` - (optional) defines the format of text in headers. By default, for the fields applied as rows the value of the `label` parameter is displayed and for the fields applied as values the label and method are shown (e.g., *Oil(count)*). The function takes the field id, label and the method or predicate id (if any) and returns the processed value. The default template is as follows: 
~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

## Example

In the example below for the **values** fields the header will display the label, the method name (subLabel) and converts the result to lowercase (e.g., *profit (sum)*):

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // a custom template for header text 
        template: (label, id, subLabel) => (label + (subLabel ? ` (${subLabel})` : "")).toLowerCase(),
        },
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // other values
        ],
    },
    fields,
});
~~~

**Related samples**:
- [Pivot 2. Vertical orientation of text in grid headers](https://snippet.dhtmlx.com/4qroi8ka)
- [Pivot 2. Collapsible columns](https://snippet.dhtmlx.com/pt2ljmcm)
- [Pivot 2. Adding сustom CSS for table and header cells](https://snippet.dhtmlx.com/nfdcs4i2)

**Related articles**: 
- [Configuration](/guides/configuration)
- [Cell style](/guides/stylization/#cell-style)
