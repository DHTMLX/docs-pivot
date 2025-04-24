---
sidebar_label: Custom fields formatting
title: Custom fields formatting
description: You can learn about date and custom formatting in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

## Default formatting 

About default formatting that depends on locale, please refer to [Date formatting](/guides/localization/#date-formatting) and [Number formatting](/guides/localization/#number-formatting).

## Custom number formatting

In case you need to set a custom format to a specific field, use the `format` parameter of the [`fields`](/api/config/fields-property) property. You can add text before and after numeric values using the `prefix` and `suffix` parameters. For example, to convert the value *12.345* to "12.35 EUR", `format` should contain the " EUR" suffix and maximumFractionDigits of 2:

~~~js
const fields = [
     { id: "sales", type: "number", format: {suffix: " EUR", maximumFractionDigits: 2}},
];
~~~

By default, the format for numeric values limits fraction digits to 3 and applies group separation for the integer part. The `format` parameter allows you to display numeric values without group separation (for example, years):

~~~js
const fields = [
     { id: "year", label: "Year", type: "number", format: false},
];
~~~

In the example below, fields like marketing, profit, and sales are identified as currency-related. A formatting object is applied to these fields with:

- prefix: "$" to display a dollar sign
- *minimumFractionDigits* and *maximumFractionDigits* set to 2 for consistent decimal formatting

~~~jsx
const dataset = [...]; // your dataset array
const fields = [
    { id: "profit", type: "number" },
    { id: "sales", type: "number" },
    { id: "marketing", type: "number" },
    { id: "date", type: "date" },
    // other fields...
];

// Apply custom formatting
const currencyFields = ["marketing", "profit", "sales"];

fields.forEach(field => {
    if (currencyFields.includes(field.id)) {
        // Apply currency formatting
        field.format = {
            prefix: "$",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
    } else if (field.type === "date") {
        // Apply date formatting
        field.format = "%M %d, %Y";
    }
});

// Initialize pivot with pre-defined dataset and fields
new pivot.Pivot("#pivot", {
    data: dataset,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            { field: "profit", method: "sum" },
            { field: "sales", method: "sum" },
            { field: "marketing", method: "sum" },
            { field: "date", method: "min" },
            { field: "cogs", method: "sum" },
        ],
    },
    fields
});
~~~

## Custom date formatting

To override the default locale-wide `dateFormat`, apply the `format` parameter of the [`fields`](/api/config/fields-property) property. Date format is a string, for example:

~~~jsx
const fields = [
     { id: "date",  type: "date",  format: "%M %d, %Y"},
];
~~~

In the example below we set the date format to "%d %M %Y %H:%i" for the "date" field only. The format displays day, full month name, year, hours, and minutes, e.g., "24 April 2025 14:30".

~~~jsx
const fields = [
    {
        id: "date",
        type: "date",
        label: "Order Date",
        format: "%d %M %Y %H:%i" // Custom format: Day Month Year Hour:Minute
    },
    {
        id: "profit",
        type: "number"
    },
    {
        id: "sales",
        type: "number"
    },
    // other fields...
];

// Convert date strings to Date objects
const dateFields = fields.filter(f => f.type === "date");
dataset.forEach(item => {
    dateFields.forEach(f => {
        const v = item[f.id];
        if (typeof v === "string") {
            item[f.id] = new Date(v);
        }
    });
});

// Initialize Pivot with field-specific date format
new pivot.Pivot("#pivot", {
    data: dataset,
    fields,
    config: {
        rows: ["state"],
        columns: ["product_type"],
        values: [
            { field: "date", method: "min" },
            { field: "profit", method: "sum" },
            { field: "sales", method: "sum" }
        ]
    }
});
~~~

:::info
In case you need to disable formatting of some fields, set the `format` parameter of the [`fields`](/api/config/fields-property) property to *false*. 
:::

## Example

In this snippet you can see how to apply custom formats:

<iframe src="https://snippet.dhtmlx.com/77nc4j8v?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related articles:** 

- [Localization](/guides/localization)
- [`fields`](/api/config/fields-property)