---
sidebar_label: Working with data
title: Working with Data
description: You can explore how to work with Data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Work with data

This page covers how to aggregate data in Pivot. For loading and exporting data, see [Loading data](/guides/loading-data) and [Exporting data](/guides/exporting-data).

## Define fields

Use the [`fields`](/api/config/fields-property) property to add fields to the Pivot table. Add a new object to the `fields` array for each field.

The following code snippet defines a basic `fields` array:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields: [
        { id: "year", label: "Year", type: "number" },
        { id: "continent", label: "Continent", type: "text" },
        { id: "form", label: "Form", type: "text" },
        { id: "oil", label: "Oil", type: "number" },
        { id: "balance", label: "Balance", type: "number" }
    ],
    data,
    config: {...}
});
~~~

## Apply formats to fields

For default formatting of date and number fields, see [Date formatting](/guides/localization/#date-formatting) and [Number formatting](/guides/localization/#number-formatting).

Use the `format` parameter of the [`fields`](/api/config/fields-property) property to set a custom format for a specific field. Add text before or after numeric values with the `prefix` and `suffix` parameters. For example, to display `12.345` as `"12.35 EUR"`, set the `" EUR"` suffix and `maximumFractionDigits` to `2`:

~~~js
const fields = [
     { id: "sales", type: "number", format: {suffix: " EUR", maximumFractionDigits: 2}},
];
~~~

By default, numeric values are limited to 3 fraction digits with group separation for the integer part. Set `format` to `false` to cancel formatting:

~~~js
const fields = [
     { id: "year", label: "Year", type: "number", format: false},
];
~~~

The following code snippet applies currency formatting to the `marketing` field:

- `prefix: "$"` — displays a dollar sign before the value
- `minimumFractionDigits` and `maximumFractionDigits` set to `2` — ensures consistent decimal formatting

~~~jsx
// Initialize pivot with pre-defined dataset and fields
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            { field: "marketing", method: "sum" },
            // other values

        ],
    },
    fields:[
        // Custom format
        { id: "marketing", label: "Marketing", type:"number", format:{
                prefix: "$", minimumFractionDigits: 2, maximumFractionDigits: 2 }
        }
    ]
});
~~~

To override the locale-wide `dateFormat` for a specific field, set the `format` parameter of the [`fields`](/api/config/fields-property) property to a format string:

~~~jsx
const fields = [
     { id: "date",  type: "date",  format: "%M %d, %Y"},
];
~~~

The following code snippet sets the date format to `"%d %M %Y %H:%i"` for the `date` field (for example, `"24 April 2025 14:30"`). Set `format` to `false` to disable formatting for a field.

~~~jsx
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
    data,
    config: {
        rows: ["state"],
        columns: ["product_type"],
        values: [
            { field: "date", method: "min" },
            { field: "profit", method: "sum" },
            { field: "sales", method: "sum" }
        ]
    },
    fields:[
        // Custom format: Day Month Year Hour:Minute
        {id:"date", label:"Date", type:"date", format: "%d %M %Y %H:%i"}
    ]
});
~~~

:::note
By default, for the "xlsx" format, date and number fields export as raw values with the default format or the format defined via the [`fields`](/api/config/fields-property) property. If a template is defined for a field (see [`tableShape`](/api/config/tableshape-property)), the rendered value is exported instead. If both the template and `format` are set, the template takes precedence.
:::

## Define the Pivot structure

Use the [`config`](/api/config/config-property) property to define which fields apply as columns and rows, set data aggregation methods, and add filters. By default, `config` has no predefined values. See the [`config`](/api/config/config-property) property reference for details.

The following code snippet defines rows, columns, values, and a filter:

~~~jsx {4-18}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ],
        filters: {
            name: {
                contains: "B"
            }
        }
    }
});
~~~

## Sort data

The widget supports sorting across all areas (rows, columns, and values) during aggregation. Users enable sorting in the UI by clicking column headers.

Use the `sort` parameter of the [`fields`](/api/config/fields-property) property to set default sort order. It accepts `"asc"`, `"desc"`, or a custom sorting function.

The following code snippet adds clickable field labels with sort icons:

~~~jsx
const bar = document.getElementById("bar");

let sorted = ["studio", "genre"];
setFields();
bar.addEventListener('click', (e) => switchSort(e.target.id), false);

function setFields(){
    let html = "";
    let sortedFields = fields.filter(f => (sorted.indexOf(f.id) != -1));

    sortedFields.forEach((f) =>{
        const order = f.sort || "asc";
        html += `<div class="field" id="${f.id}">
                    ${f.label}<i class="icon wxi-${order}" ></i>
                </div>`;
    });
    bar.innerHTML = html;
}

function switchSort(id){
    fields.forEach(f => {
        if(f.id == id){
             f.sort =  f.sort != "desc" ? "desc" : "asc";
        }
    });
    // change fields in Pivot config
    table.setConfig({fields}); 
    // update icons
    setFields(bar, fields);
}

const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: [
            "studio",
            "genre"
        ],
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

Sorting is enabled by default. To disable or enable sorting, use the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property. The following code snippet disables sorting:

~~~jsx {19}
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
        sort: false 
    }
});
~~~

## Filter data

Set filters for fields based on data type. Specify filters through the Pivot UI after initialization or via the [`config`](/api/config/config-property) property. In the UI, filters appear as drop-down lists for each field.

### Filter types

Pivot supports the following condition types for filtering:

- text: `equal`, `notEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`
- number: `greater`, `less`, `greaterOrEqual`, `lessOrEqual`, `equal`, `notEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`
- date: `greater`, `less`, `greaterOrEqual`, `lessOrEqual`, `equal`, `notEqual`, `between`, `notBetween`

Use the `includes` rule to define the set of values to display.

### Add a filter

Add the `filters` object with the field ID and filter type to the [`config`](/api/config/config-property) property.

The following code snippet filters by `genre` and `title`:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ],
        filters: {
            genre: {
                contains: "D",
                includes: ["Drama"]
            },
            title: {
                // filter for another field ("title")
                contains: "A"
            }
        }
    }
});
~~~

:::info
You can also filter data using the [`filter-rows`](/api/table/filter-rows) event of the Table widget by getting access to its API via the [`getTable`](/api/methods/gettable-method) method.
:::

### Track configuration changes

Use the [`update-config`](/api/events/update-config-event) event to listen for changes made to rows, columns, values, or filters via the Pivot UI. This is useful for saving a user's configuration between sessions.

The following code snippet logs the updated config when the user modifies the Pivot structure:

~~~jsx
table.api.on("update-config", (config) => {
    console.log("Config updated:", config);
});
~~~

## Limit loaded data

Use the [`limits`](/api/config/limits-property) property to cap the number of rows and columns in the final dataset and prevent the component from hanging on large data. Limits apply based on the rows and columns defined in the Pivot config. The default limit is 10,000 rows and 5,000 columns.

:::note
Limits are used for large datasets. Limit values are approximate and do not reflect the exact number of rows and columns.
:::

The following code snippet sets a row limit of 10 and a column limit of 3:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio"],
        columns: ["genre"],
        values: [
            {
                id: "title",
                method: "count"
            },
            {
                id: "score",
                method: "max"
            }
        ]
    },
    limits: { rows: 10, columns: 3 }
});
~~~

## Apply maths methods

Pivot provides a set of predefined aggregation methods and supports adding custom ones.

### Default methods

The widget provides the following default methods for data aggregation:

- `sum` (number) — sums all values; ignores empty cells, logical values, and text
- `min` (number, date) — finds the minimum value; ignores empty cells, logical values, and text; returns `0` if no numbers are found
- `max` (number, date) — finds the maximum value; ignores empty cells, logical values, and text; returns `0` if no numbers are found
- `count` (number, text, date) — counts all occurrences of the selected data; the default operation for newly added fields
- `countunique` (number, text) — counts the number of unique values
- `average` (number) — calculates the arithmetic mean; ignores logical values, empty cells, and text; includes cells with zero
- `counta` (number, text, date) — counts all non-blank values including numbers, dates, and text
- `median` (number) — calculates the median of the given numbers
- `product` (number) — calculates the product of all numbers in the range
- `stdev` (number) — calculates the standard deviation treating the data as a sample
- `stdevp` (number) — calculates the standard deviation treating the data as the entire population
- `var` (number) — calculates the variance treating the data as a sample
- `varp` (number) — calculates the variance treating the data as the entire population

The predefined method definitions:

~~~jsx
const defaultMethods = {
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

Apply default methods with the `values` parameter of the [`config`](/api/config/config-property) property. See [Define values](#define-values) below.

The following code snippet applies `count` and `max` methods:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                //field id
                field: "title",
                //method
                method: "count"
            },
            {
                id: "score",
                method: "max"
            }
        ]
    }
});
~~~

### Define values

Define `values` in either of two equivalent ways:

- a string with the field ID and operation: `"operation(fieldID)"`
- an object with `field` and `method`: `{ field: string, method: string }`

The following code snippet shows both formats:

~~~jsx
values: [
    "sum(sales)", // option one
    { field: "sales", method: "sum" } // option two
]
~~~

### Redefine the default method

By default, Pivot selects the first available method for the field's data type. Use [`api.intercept()`](/api/internal/intercept-method) to override this behavior.

The following code snippet sets `max` as the default method when a numeric field is added to the `values` area:

~~~jsx {20-27}
const table = new pivot.Pivot("#root", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },
});
//adding values with a predefined method
table.api.intercept("add-field", (ev) => {
  const { fields } = table.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "max";
  }
});
~~~

### Add custom maths methods

Use the [`methods`](/api/config/methods-property) property to add a custom aggregation method. Set the key to the method name and provide a `handler` function that takes an array of values as input and returns a single value.

The following code snippet adds `countunique_date` and `average_date` methods for the date type:

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
        label: "CountUnique",
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

## Process data with predicates

Predicates (data modifiers) pre-process field values before Pivot uses them as rows or columns. For example, use a predicate to group dates by month or quarter before displaying. The following predicates apply by default:

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

To add a custom predicate, configure the [`predicates`](/api/config/predicates-property) property as follows:

- each key is a predicate ID
- each value is a configuration object with the following parameters:
  - `type` — (required) the field types this predicate applies to: `"number"`, `"date"`, or `"text"`
  - `label` — (optional) the label shown in the UI drop-down for rows and columns
  - `handler` — (required for custom predicates) a function that takes a single value and returns the processed value
  - `template` — (optional) a function that defines how the processed value is displayed
  - `field` — (optional) a function that specifies how data is filtered for the field
  - `filter` — (optional) overrides the filter type or format; use when the `type` filter or `template` format is not sufficient

Set the predicate ID as the `method` value for the row or column where the predicate applies.

The following code snippet defines two custom predicates — one for grouping dates by month-year and one for labeling profit sign:

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

## Add total rows and columns

Use the `totalColumn` parameter of the [`tableShape`](/api/config/tableshape-property) property to add a rightmost column with total values. Use `totalRow` to add a footer row with totals. Set either to `true` to enable, or `"sumOnly"` to show totals only for sum operations.

The following code snippet enables both total row and total column:

~~~jsx {2-5}
const table = new pivot.Pivot("#root", {
    tableShape: {
        totalRow: true,
        totalColumn: true
    },
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["type"],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            }
        ]
    }
});
~~~

The live example below demonstrates custom maths operations:

<iframe src="https://snippet.dhtmlx.com/lv90d8q2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related samples:**

- [Pivot 2. Dataset with aliases](https://snippet.dhtmlx.com/7vc68rqd)
- [Pivot 2. Defining fields formats](https://snippet.dhtmlx.com/77nc4j8v)
- [Pivot 2. External filter](https://snippet.dhtmlx.com/s7tc9g4z)
- [Pivot 2. Grand total for columns and rows](https://snippet.dhtmlx.com/f0ag0t9t)
