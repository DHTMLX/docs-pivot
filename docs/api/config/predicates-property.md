---
sidebar_label: predicates
title: predicates Config
description: You can learn about the predicates config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# predicates

### Description

@short: Optional. Provides custom pre-processing functions for the data dimensions (rows, columns)

It defines how data should be modified before it's applied.

### Usage

~~~jsx
predicates?: {
    [key: string]: {
        handler: (value: any) => any,
        type: 'number' | 'date' | 'text' | [],
        label?: string | (type: 'number' | 'date' | 'text') => string,
        template?: (value: any, locale?: any) => string,
        field?: (value:string) => boolean,
        filter?: { 
            type: "number"|"text"|"date"|"tuple",
            format?:(any) => string
        }
    }
};
~~~

### Parameters

The property is an object where a key is the name of a custom function and value is an object with actual function definitions. The predicate object can have multiple key-function pairs, and all of them will be available for use in the Pivot configuration. Each object has the following parameters:

- `label` - (optional) the label of a predicate displayed in GUI in the drop-down among data modifiers options for a row/column 
- `type` - (required) defines for which types of fields this predicate can be applied; it can be "number", "date", "text" or an array of these values
- `field` - (optional) the function that defines how data should be processed for the specified field, it takes the id of a field as a parameter and returns **true** if the predicate should be added to the specified field
- `filter` - (optional) by default, the filter type is taken from the `type` parameter, but if you need another one, you can use this `filter` object. It has the next parameters:
    - `type` - (optional) defines which field type will be applied: "number"|"text"|"date"|"tuple". "tuple" is a combo filter applied for numeric values (data will be filtered by the numeric value but in filter the text value will be displayed)
    - `format` - (optional) the function that defines the format for displaying filter options; if no format is defined, the one from the template parameter will be applied; if the type here (for the `filter` object) is not specified, the format will be applied for the type set for the `type` parameter of the predicate
- `handler` - (required for custom predicates) the function that defines how data should be processed; the function should take a single argument as the value to be processed and return the processed value
- `template` - (optional) the function that defines how data should be displayed; the function returns the processed value and it takes the value returned by `handler` and if necessary you can localize text values using [`locale`](/api/config/locale-property).
 
The following default predicates are applied in case no predicate is specified via the `predicates` property:

~~~jsx
const defaultPredicates = {
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

## Example

~~~jsx 
const predicates = {
    monthYear: {
        label: "Month-year",
        type: "date",
        handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1),
        template: (date, locale) => {
            const months = locale.getRaw().calendar.monthFull;
            return months[date.getMonth()] + " " + date.getFullYear();
        },
    },
    profitSign: {
        label: "Profit Sign",
        type: "number",
        filter: {
            type: "tuple",
            format: (v) => (v < 0 ? "Negative" : "Positive"),
        },
        field: (f) => f === "profit",
        handler: (v) => (v < 0 ? -1 : 1),
        template: (v) => (v < 0 ? "Negative profit" : "Positive profit"),
    },
};

// date string to Date
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    predicates: { ...pivot.defaultPredicates, ...predicates },
    tableShape: { tree: true },
    config: {
        rows: ["product_type", "product"],
        columns: [
            { field: "profit", method: "profitSign" },
            { field: "date", method: "monthYear" },
        ],
        values: ["sales", "expenses"],
    },
});
~~~

**Related article**: [Processing data with predicates](/guides/working-with-data#processing-data-with-predicates)

**Related sample**: [Pivot 2.0: Custom predicates](https://snippet.dhtmlx.com/mhymus00)
