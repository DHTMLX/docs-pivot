---
sidebar_label: Working with data
title: Working with Data
description: You can explore how to work with Data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Working with data

This page describes how to aggregate data in Pivot. For instructions on loading and exporting data, refer to [Loading data](/guides/loading-data) and [Exporting data](/guides/exporting-data).

## Define fields

Use the [`fields`](/api/config/fields-property) property to add fields to the Pivot table. To add a new field, add a new object to the `fields` array.

The following code snippet defines sample fields:

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

For the default formatting of date and numeric fields (which depends on locale), refer to [Date formatting](/guides/localization/#date-formatting) and [Number formatting](/guides/localization/#number-formatting).

To set a custom format for a specific field, use the `format` parameter of the [`fields`](/api/config/fields-property) property. Add text before and after numeric values with the `prefix` and `suffix` parameters. For example, to convert the value *12.345* to "12.35 EUR", set the `format` to `{ suffix: " EUR", maximumFractionDigits: 2 }`:

~~~js
const fields = [
     { id: "sales", type: "number", format: {suffix: " EUR", maximumFractionDigits: 2}},
];
~~~

By default, the format for numeric values limits fraction digits to 3 and applies group separation for the integer part. Cancel formatting by setting `format` to `false` in the field configuration:

~~~js
const fields = [
     { id: "year", label: "Year", type: "number", format: false},
];
~~~

The following code snippet applies a formatting object to currency-related fields (marketing, profit, and sales):

- `prefix: "$"` to display a dollar sign
- `minimumFractionDigits` and `maximumFractionDigits` set to 2 for consistent decimal formatting

~~~jsx
// initialize Pivot with a predefined dataset and fields
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

To override the default locale-wide `dateFormat`, apply the `format` parameter of the [`fields`](/api/config/fields-property) property. Date format is a string, for example:

~~~jsx
const fields = [
     { id: "date",  type: "date",  format: "%M %d, %Y"},
];
~~~

The following code snippet sets the date format to `"%d %M %Y %H:%i"` for the "date" field only. The format displays day, full month name, year, hours, and minutes (e.g., "24 April 2025 14:30"). If you need to disable formatting for specific fields, set the `format` parameter of the [`fields`](/api/config/fields-property) property to `false`.

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
        // Custom format: Day Month Year Hour:Minute
        {id:"date", label:"Date", type:"date", format: "%d %M %Y %H:%i"}
    ]
});
~~~

:::note
By default, for the "xlsx" format, date and number fields are exported as raw values with the default format or the format defined via the [`fields`](/api/config/fields-property) property. If a template is defined for a field (see the [`tableShape`](/api/config/tableshape-property) property), Pivot exports the rendered value defined by that template. If both the template and `format` are set, the template settings override the format ones.
:::

## Define the Pivot structure

Use the [`config`](/api/config/config-property) property to define the Pivot table structure and data aggregation. Specify which fields appear as rows and columns, add aggregation methods, and configure filters. For the full parameter reference, see [`config`](/api/config/config-property).

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

## Sort data

Set the `sort` parameter of the [`fields`](/api/config/fields-property) property to configure the default sorting applied during aggregation across all areas (values, columns, and rows). The parameter accepts `"asc"`, `"desc"`, or a custom sorting function.

The following code snippet adds clickable field labels and enables sorting on icon click. Use the [`setConfig()`](/api/methods/setconfig-method) method to update the Pivot configuration dynamically without reinitializing the component:

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

Sorting is enabled by default. Users can click the column header to sort data. Use the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property to disable or enable sorting. The following code snippet disables sorting:

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

Set filters for fields depending on the data type. Specify filters through the Pivot UI after initialization or through the [`config`](/api/config/config-property) property.

In the UI, filters appear as drop-down lists for each field.

### Types of filters

Pivot supports the following filter condition types:

- for text values: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith
- for numeric values: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, contains, notContains, begins with, not begins with, ends with, not ends with
- for date types: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween

Use the `includes` rule to define the set of values to display.

### Add a filter

To set a filter, add the `filters` object with the field ID and filter condition to the [`config`](/api/config/config-property) property.

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
Filter data using the [`filter-rows`](/api/table/filter-rows) event of the Table widget by getting access to the Table API via the [`getTable`](/api/methods/gettable-method) method.
:::

## Limit loaded data

Use the [`limits`](/api/config/limits-property) property to cap the number of rows and columns in the final dataset and prevent the component from hanging. The default limit is 10,000 rows and 5,000 columns. Limits apply based on the rows/columns defined in the Pivot configuration.

:::note
Use limits for large datasets. Limit values are approximate and do not reflect the exact number of rows and columns.
:::

The following code snippet sets row and column limits:

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

## Apply math methods

### Default methods

The widget provides the following default methods for data aggregation:

- sum (for numeric values only) — sums all the values of the selected data; empty cells, logical values like TRUE, or text are ignored
- min (for numeric and date values) — finds and displays the minimum value of the selected data; empty cells, logical values, or text in the array or reference are ignored; if the arguments contain no numbers, MIN returns 0 (zero)
- max (for numeric and date values) — finds the largest value in a set of values; the function ignores empty cells, the logical values TRUE and FALSE, and text values; if the arguments contain no numbers, MAX returns 0 (zero)
- count (for numeric, text, and date values) — looks for all occurrences of the selected data and displays their number; generally used to count a range of cells containing numbers or dates excluding blanks; this is the default operation assigned to each newly added field
- countunique (for numeric and text values) — counts the number of unique values in a list of specified values and ranges
- average (for numeric values only) — calculates the average (arithmetic mean) of a group of numbers; logical values, empty cells, and cells that contain text in the array or reference are ignored; cells with the value zero are included
- counta (for numeric, text, and date values) — returns the number of values in a dataset; counts numbers, dates, text or a range containing a mixture of these items, but does not count blank cells
- median (for numeric values only) — calculates the median of the given numbers
- product (for numeric values only) — calculates the product of all numbers in the given range
- stdev (for numeric values only) — calculates the standard deviation of the values, treating them as a sample of a larger set
- stdevp (for numeric values only) — calculates the standard deviation of the values, treating them as the entire set
- var (for numeric values only) — calculates the variance of the values, treating them as a sample of a larger set
- varp (for numeric values only) — calculates the variance of the values, treating them as the entire set

The following code snippet lists all predefined methods:

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

Use the `values` parameter of the [`config`](/api/config/config-property) property to apply default methods. See [Define values](#define-values) below.

The following code snippet applies `count` and `max` methods to fields:

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

Define `values` in either of the following ways:

- option one is a string representing a data field ID: `operation(fieldID)`
- option two is an object containing the field ID and the method for data aggregation (both are required): `{ field: string, method: string }`

The example below shows both formats:

~~~jsx
values: [
    "sum(sales)", // option one
    { field: "sales", method: "sum" } // option two
]
~~~

### Redefine the default method

By default, Pivot selects the first available method for the data type. Use the [`api.intercept()`](/api/internal/intercept-method) method to redefine the default method.

The following code snippet intercepts the `add-field` event and sets the `max` method for numeric fields:

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
// add values with a predefined method
table.api.intercept("add-field", (ev) => {
  const { fields } = table.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "max";
  }
});
~~~

### Add custom math methods

Use the [`methods`](/api/config/methods-property) property to add a custom aggregation method. Set the key to the method name and the value to a function that takes an array of numbers and returns a single number.

The following code snippet defines two custom methods for date fields: `countunique_date` (counts unique date values) and `average_date` (calculates the average date):

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

// convert date strings to Date
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

Predicates (data modifiers) process data before Pivot uses the data as rows or columns. For example, pre-process date values before displaying data. The following predicates are applied by default:

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

To add a custom predicate, specify the following parameters in the [`predicates`](/api/config/predicates-property) property:

- Add keys that are predicate IDs
- Add values that are objects with the predicate configuration:
  - specify the `type` to define fields types for which the predicate can be applied ("number", "date", "text")
  - add a label that appears in the UI drop-down among data modifier options for a row/column
  - for the custom predicate, add the `handler` function that defines how data is processed; the function takes a single argument as the value to process and returns the processed value
  - if you want data to appear differently from what the `handler` function returns, add the `template` that defines how data is displayed (optional)
  - if necessary, add the `field` function to specify how data is filtered for the field
  - apply the `filter` parameter if you need a filter type other than the one in the `type` parameter or a data format different from the `template`

Add the predicate id as the `method` parameter value for the row/column where the predicate applies.

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

## Add total columns and rows

Use the [`tableShape`](/api/config/tableshape-property) property to add total columns and rows. Set `totalColumn` to `true` to enable the rightmost column with total values. Set `totalRow` to `true` to enable the footer with totals.

The following code snippet enables total columns and rows:

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

The following code snippet applies custom math methods:

<iframe src="https://snippet.dhtmlx.com/lv90d8q2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related samples:**

- [Pivot 2. Dataset with aliases](https://snippet.dhtmlx.com/7vc68rqd)
- [Pivot 2. Defining fields formats](https://snippet.dhtmlx.com/77nc4j8v)
- [Pivot 2. External filter](https://snippet.dhtmlx.com/s7tc9g4z)
- [Pivot 2. Grand total for columns and rows](https://snippet.dhtmlx.com/f0ag0t9t)
