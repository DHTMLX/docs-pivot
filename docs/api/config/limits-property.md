---
sidebar_label: limits
title: limits Config
description: You can learn about the limits config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# limits

### Description

@short: Optional. Defines the maximum limit for the number of rows and columns in the final dataset

Please, also refer to [Limiting data](/guides/working-with-data#limiting-loaded-data).

### Usage

~~~jsx
limits?: {
    rows?: number,
    columns?: number,
    raws?: number
};
~~~

### Parameters

The parameters define when to interrupt rendering data:

- `rows` - (optional) sets the maximum number of rows in the final dataset; the default value is 10000.
- `columns` - (optional) sets the maximum number of columns in the final dataset; the default value is 5000.
- `raws` - (optional) the maximum number of source data rows before data is grouped (raw data records used for aggregating); the default value is infinity.

:::note
Limits are used for large dataset. Limits values are approximate values and do not show the exact values of the rows and columns.
:::

## Example

~~~jsx {18}
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
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
            },
        ],
    },
    limits:{ rows: 25, columns: 4 }
});
~~~

**Related sample:** [Pivot 2.0. Data limits](https://snippet.dhtmlx.com/7ryns8oe)
