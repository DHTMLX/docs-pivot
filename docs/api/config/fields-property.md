---
sidebar_label: fields
title: fields Config
description: You can learn about the fields config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# fields

### Description

@short: Optional. An array of objects with fields for the Pivot table

The `fields` property in the configuration object controls how the widget interprets the types of the data fields it receives and allows defining the sorting order for a field.

### Usage

~~~jsx
fields?: [{
    id: string,
    label?: string,
    type: "number" | "date" | "text",
    sort?: "asc" | "desc" | ((a: any, b: any) => number),
    format?: string | boolean | numberFormatOptions{}
}];
~~~

### Parameters

By default, if the property is not set, the widget automatically analyzes the incoming data and populates the `fields` object accordingly. 

Each object in the `fields` array should have the following properties:

- `id` - (required) the ID of a field
- `label` - (optional) the field label to be displayed in GUI
- `type` - (required) data type in a field ( "number", "date", or "string")
- `sort` - (optional) defines the default sorting order for the field. Accepts "asc", "desc", or a custom sorting function
- `format` - (optional) allows customizing the format of numbers and dates in a cell; by default, the format is taken from locale; the format will be also applied during export
    - `string` - (optional) the format for dates
    - `boolean` - (optional) defines if date or number should be formatted: **false** (not formatted) or **true** (formatted); useful for numeric values like years
    - `numberFormatOptions` - (optional) an object with options for formatting:
        - `minimumIntegerDigits`(number) - (optional) the minimum number of integer digits to use; possible values are from 1 to 21; the default is 1;
        - `minimumFractionDigits`(number) - (optional) the minimum number of fraction digits to use; possible values are from 0 to 100; the default is 1;
        - `maximumFractionDigits`(number) - (optional) the maximum number of fraction digits to use; possible values are from 0 to 100; the default is 3;  
        For more details about digit options refer to  [Digit options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumintegerdigits)
        - `prefix` (string) - (optional) a string (before a number) for additional symbols like currency
        - `suffix` (string) - (optional) a string (after a number) for additional symbols like currency

:::info
If a template is applied via the [`tableShape`](/api/config/tableshape-property) property, it will override the `format` settings.
:::

### Example

~~~jsx {2-34}
const table = new pivot.Pivot("#root", {
    fields: [
        {
            id: "rank",
            label: "Rank",
            type: "number"
        },
        {
            id: "title",
            label: "Title",
            type: "text"
        },
        {
            id: "genre",
            label: "Genre",
            type: "text"
        },
        {
            id: "studio",
            label: "Studio",
            type: "text"
        },
        {
            id: "type",
            label: "Type",
            type: "text"
        },
        {
            id: "score",
            label: "Score",
            type: "number"
        },
        //other fields
    ],
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
    }
});
~~~

**Related article**: [Number formatting](/guides/localization/#number-formatting)