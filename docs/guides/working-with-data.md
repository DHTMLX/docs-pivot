---
sidebar_label: Working with data
title: Working with Data
description: You can explore how to work with Data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Working with data

This page describes how to aggregate, format, sort, filter, and pre-process data in Pivot. For instructions on loading and exporting data, see [Loading data](/guides/loading-data) and [Exporting data](/guides/exporting-data).

## Define fields

Use the [`fields`](/api/config/fields-property) property to declare the fields that Pivot can place in rows, columns, and values. Each item in the `fields` array describes one field — its ID, label, and data type.

The following code snippet initializes Pivot with five fields:

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

## Apply formats to fields {#applying-formats-to-fields}

Pivot applies a default format to numeric and date fields based on the current locale. For details, see [Date formatting](/guides/localization/#date-formatting) and [Number formatting](/guides/localization/#number-formatting).

To override the default for a specific field, set the `format` parameter of the [`fields`](/api/config/fields-property) property.

### Format numeric fields

Use `prefix` and `suffix` to add text around numeric values, and `maximumFractionDigits` to control decimal precision. For example, to render `12.345` as `"12.35 EUR"`, set the suffix to `" EUR"` and `maximumFractionDigits` to `2`:

~~~js
const fields = [
     { id: "sales", type: "number", format: { suffix: " EUR", maximumFractionDigits: 2 } },
];
~~~

By default, Pivot limits numeric fields to 3 fraction digits and applies group separation to the integer part. To disable formatting entirely, set `format` to `false`:

~~~js
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

The example below marks `marketing`, `profit`, and `sales` as currency fields with a `$` prefix and fixed 2-digit decimals:

~~~jsx
// initialize Pivot with a pre-defined dataset and fields
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
        // custom format
        { id: "marketing", label: "Marketing", type:"number", format:{
                prefix: "$", minimumFractionDigits: 2, maximumFractionDigits: 2 }
        }
    ]
});
~~~

### Format date fields

To override the locale-wide `dateFormat` for a single field, set the `format` parameter of [`fields`](/api/config/fields-property) to a date-format string.

The following code snippet sets `"%M %d, %Y"` as the format for the `date` field:

~~~jsx
const fields = [
     { id: "date",  type: "date",  format: "%M %d, %Y" },
];
~~~

The example below converts string dates to `Date` objects, then initializes Pivot with the format `"%d %M %Y %H:%i"` for the `date` field, producing labels such as `"24 April 2025 14:30"`. To disable formatting for a field, set `format` to `false`.

~~~jsx
// convert date strings to Date objects
const dateFields = fields.filter(f => f.type === "date");
dataset.forEach(item => {
    dateFields.forEach(f => {
        const v = item[f.id];
        if (typeof v === "string") {
            item[f.id] = new Date(v);
        }
    });
});

// initialize Pivot with a field-specific date format
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
        // custom format: Day Month Year Hour:Minute
        { id: "date", label: "Date", type: "date", format: "%d %M %Y %H:%i" }
    ]
});
~~~

:::note
For the `xlsx` export format, Pivot exports date and number fields as raw values with their default format (or the format defined via the [`fields`](/api/config/fields-property) property). If a template is defined for a field (see the [`tableShape`](/api/config/tableshape-property) property), Pivot exports the rendered value produced by that template. If both `template` and `format` are set, the template overrides the format.
:::

## Define Pivot structure

Use the [`config`](/api/config/config-property) property to declare which fields appear as rows, columns, and aggregated values, and how the data is filtered. By default, `config` has no predefined values — you must set it to render any data. See the [`config`](/api/config/config-property) reference for the full parameter list.

The following code snippet places `continent` and `name` in rows, `year` in columns, three aggregations in values, and a filter on `name`:

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
        ]
    },
    fields,
    filters: {
        name: {
            contains: "B"
        }
    }
});
~~~

## Sort data {#sorting-data}

Pivot supports sorting in all three areas (values, columns, rows) during aggregation. In the UI, users click a column header to sort.

To set a default sort, use the `sort` parameter of the [`fields`](/api/config/fields-property) property. The parameter accepts `"asc"`, `"desc"`, or a custom comparator function.

The example below renders clickable field labels above Pivot and toggles the sort direction on click:

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
    // update Pivot fields
    table.setConfig({ fields }); 
    // refresh icons
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

Sorting in the UI is enabled by default. To disable it, set the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property to `false`.

The following code snippet disables UI sorting:

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

## Filter data {#filtering-data}

Pivot supports filters tied to field data types. Set filters through the Pivot UI after initialization or declaratively through the `filters` object of the [`config`](/api/config/config-property) property.

In the UI, filters appear as drop-down lists for each field.

#### Filter types

Pivot supports the following filter conditions per data type:

- text fields — `equal`, `notEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`, `includes`
- numeric fields — `equal`, `notEqual`, `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`
- date fields — `equal`, `notEqual`, `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `between`, `notBetween`, `includes`

The `includes` rule restricts a filter to a specific set of allowed values.

#### Add a filter

To declare a filter, add the `filters` object to the [`config`](/api/config/config-property) property, keyed by field ID. Each value is an object of filter conditions.

The following code snippet filters the `genre` field to values containing `"D"` and restricts to `"Drama"`, and filters the `title` field to values containing `"A"`:

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
To filter data through the Table widget API instead, access the Table instance with the [`getTable`](/api/methods/gettable-method) method and use the [`filter-rows`](/api/table/filter-rows) event.
:::

## Limit loaded data {#limiting-loaded-data}

To prevent the component from hanging on very large datasets, cap the number of rows and columns in the final dataset with the [`limits`](/api/config/limits-property) property. Pivot interrupts rendering once the limit is reached. The default cap is 10000 for rows and 5000 for columns.

:::note
Limits apply to large datasets. The numbers are approximate — Pivot does not guarantee an exact row/column count.
:::

The following code snippet caps the dataset at 10 rows and 3 columns:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio"],
        columns: ["genre"],
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
    limits: { rows: 10, columns: 3 }
});
~~~

## Apply math methods {#applying-maths-methods}

### Default methods

Pivot provides the following built-in aggregation methods:

- `sum` (numeric values only) — sums all selected values; ignores empty cells, logical values like `TRUE`, and text
- `min` (numeric and date values) — returns the minimum value; ignores empty cells, logical values, and text. Returns `0` if the input contains no numbers
- `max` (numeric and date values) — returns the maximum value; ignores empty cells, logical values, and text. Returns `0` if the input contains no numbers
- `count` (numeric, text, and date values) — counts non-blank cells; this is the default method assigned to every newly added field
- `countunique` (numeric and text values) — counts the number of unique values in the input
- `average` (numeric values only) — calculates the arithmetic mean of the input; ignores empty cells, logical values, and text. Includes cells with the value zero
- `counta` (numeric, text, and date values) — counts all non-blank values, including numbers, dates, and text
- `median` (numeric values only) — returns the median of the input
- `product` (numeric values only) — returns the product of all numbers in the input
- `stdev` (numeric values only) — standard deviation, treating the input as a sample of a larger set
- `stdevp` (numeric values only) — standard deviation, treating the input as the entire population
- `var` (numeric values only) — variance, treating the input as a sample of a larger set
- `varp` (numeric values only) — variance, treating the input as the entire population

The following code snippet shows the built-in method definitions:

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

Apply a default method through the `values` parameter of the [`config`](/api/config/config-property) property. See [Define values](#options-for-defining-values) below.

The following code snippet assigns `count` to the `title` field and `max` to the `score` field:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                // field id
                field: "title",
                // method
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

### Define values {#options-for-defining-values}

Define each entry in `values` in one of two equivalent forms:

- a string of the form `"operation(fieldID)"`
- an object `{ field: string, method: string }` (both fields required)

The following code snippet uses both forms in the same `values` array:

~~~jsx
values: [
    "sum(sales)", // option one
    { field: "sales", method: "sum" } // option two
]
~~~

### Override the default method

For each newly added field, Pivot assigns the first available method for the data type. To change this behavior, intercept the `add-field` event with the [`api.intercept`](/api/internal/intercept-method) method.

The example below intercepts `add-field` and forces the `max` method whenever a numeric field is added:

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
// override the default method for newly added numeric fields
table.api.intercept("add-field", (ev) => {
  const { fields } = table.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "max";
  }
});
~~~

### Add custom math methods

To add a custom aggregation method, use the [`methods`](/api/config/methods-property) property. Each entry pairs a method name (the key) with a configuration object containing a `handler` function and metadata. The `handler` takes an array of values and returns a single aggregated value.

The example below adds two date-specific methods. `countunique_date` counts distinct dates by their numeric timestamps. `average_date` returns the average date by averaging timestamps:

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

// convert date strings to Date objects
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

## Process data with predicates {#processing-data-with-predicates}

Predicates are pre-processing functions that transform raw field data before Pivot uses the data in rows or columns. For example, a predicate can group dates by month before aggregation.

The following code snippet shows the built-in date predicates that Pivot applies by default:

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

To add a custom predicate, configure the [`predicates`](/api/config/predicates-property) property. Each entry pairs a predicate ID (the key) with a configuration object:

- `type` — the field types this predicate accepts (`"number"`, `"date"`, `"text"`, or an array)
- `label` — the predicate label shown in the GUI drop-down for a row/column
- `handler` — function that transforms a value and returns the processed value
- `template` — optional function that controls how the processed value is displayed
- `field` — optional function that limits the predicate to specific fields
- `filter` — optional filter configuration when the filter type should differ from `type`, or when the data format should differ from `template`

To use a custom predicate, set its ID as the `method` of the row or column where the predicate should apply.

The following code snippet registers two custom predicates (`monthYear` and `profitSign`) and applies them in the `columns` configuration:

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

// convert date strings to Date objects
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

## Add columns and rows with total values

Use the [`tableShape`](/api/config/tableshape-property) property to render a total column on the right (`totalColumn: true`) or a total footer row (`totalRow: true`).

The following code snippet enables both the total column and the total row:

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

## Example

The snippet below demonstrates applying custom math operations:

<iframe src="https://snippet.dhtmlx.com/lv90d8q2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related samples:**

- [Pivot 2. Dataset with aliases](https://snippet.dhtmlx.com/7vc68rqd)
- [Pivot 2. Defining fields formats](https://snippet.dhtmlx.com/77nc4j8v)
- [Pivot 2. External filter](https://snippet.dhtmlx.com/s7tc9g4z)
- [Pivot 2. Grand total for columns and rows](https://snippet.dhtmlx.com/f0ag0t9t)
