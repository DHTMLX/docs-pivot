---
sidebar_label: methods
title: methods Config
description: You can learn about the methods config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# methods

### Description

@short: Optional. Defines custom mathematical methods for data aggregation 

### Usage

~~~jsx
methods?: {
    [method: string]: {
        type?: 'number' | 'date' | 'text' | [],
        label?: string,
        handler?: (values: number[]) => number,
        branchMode?: "raw"|"result",
        branchMath?: string
    }
};
~~~

### Parameters

Each method is represented by a key-value pair, where the `method` is the name of a method and the value is an object that describes the method's behavior. Each object has the following parameters:

- `handler` - (required for custom methods) a function that calculates an aggregated value from an array of numbers; the function takes an array of values as an input and returns a single value as an output
- `type` - (optional) data type this method is suitable for; it can be "number", "date" or "text" or an array of these values
- `label` - (optional) the method label to be shown in GUI
- `branchMode` - (optional) defines the mode for the calculation of total values for the tree table; the branchMode can be set to `raw` for calculation based on all raw data; `result` (default) is set for calculation based on already processed data in the tree mode
- `branchMath` - (optional) the name of a method to calculate total values in the tree mode; the same as the method name by default (for "max" method branchMath is also "max")

By default, the `methods` property is an empty object {}, which means that no custom methods are defined. There is no limit to the number of sub-properties that can be defined in the methods object.

Predefined methods:

~~~jsx
defaultMethods = {
    sum: { type: "number", label: "sum" },
    min: { type: ["number", "date"], label: "min" },
    max: { type: ["number", "date"], label: "max" },
    count: {
        type: ["number", "date", "text"],
        label: "count",
        branchMath: "sum"
    },
    counta: {
        type: ["number", "date", "text"],
        label: "counta",
        branchMath: "sum"
    },
    countunique: {
        type: ["number", "text"],
        label: "countunique",
        branchMath: "sum"
    },
    average: { type: "number", label: "average", branchMode: "raw" },
    median: { type: "number", label: "median", branchMode: "raw" },
    product: { type: "number", label: "product" },
    stdev: { type: "number", label: "stdev", branchMode: "raw" },
    stdevp: { type: "number", label: "stdevp", branchMode: "raw" },
    var: { type: "number", label: "var", branchMode: "raw" },
    varp: { type: "number", label: "varp", branchMode: "raw" }
};
~~~

The definition of each method you can see here: [Applying methods](/guides/working-with-data#default-methods)

## Example

The example below shows how to calculate the count of unique and average values for the date type. The **countUnique** function takes an array of numbers (values) as an input and calculates the exact count of unique values using the **reduce** method. The **countunique_date** sub-property has a handler with a function that gets the unique values from an array of the date values. The **average_date** sub-property has a handler that calculates the average values from an array of the date values.

~~~jsx
function countUnique(values, converter) {
    const valueMap = {};
    return values.reduce((acc, d) => {
        if (converter) d = converter(d);
        if (!valueMap[d]) {
            acc++;
            valueMap[d] = true;
        }
        return acc;
    }, 0);
}

const methods = {
    countunique_date: {
        handler: values => countUnique(values, v => new Date(v).getTime()),
        type: "date",
        label: "CountUnique"
    },
    average_date: {
        type: "date",
        label: "Average",
        branchMode: "raw",
        handler: values => {
            if (!values.length) return null;
            const sum = values.reduce((acc, d) => acc + d.getTime(), 0);
            const avgTime = sum / values.length;
            return new Date(avgTime);
        }
    }
};

// show integers for "count" and "unique count" results
const templates = {};
fields.forEach(f => {
    if (f.type == "number")
        templates[f.id] = (v, method) =>
        v && method.indexOf("count") < 0 ? parseFloat(v).toFixed(3) : v;
});

// date string to Date 
const dateFields = fields.filter(f => f.type == "date");
if (dateFields.length) {
    dataset.forEach(item => {
        dateFields.forEach(f => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    tableShape: { templates },
    methods: { ...pivot.defaultMethods, ...methods },
    config:{
        rows: ["state"],
        columns: [
            "product_line",
            "product_type"
        ],
        values: [
            {
                field: "sales",
                method: "sum"
            },
            {
                field: "sales",
                method: "count"
            },
            {
                field: "date",
                method: "countunique_date"
            },
            {
                field: "date",
                method: "average_date"
            }
        ]
    }
});
~~~

**Related sample:** [Pivot 2.0: Custom math methods](https://snippet.dhtmlx.com/lv90d8q2)

**Related article**: [Applying maths methods](/guides/working-with-data#applying-maths-methods)
