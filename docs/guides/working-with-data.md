---
sidebar_label: Working with data
title: Working with Data
description: You can explore how to work with Data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Working with data

This page describes how to aggregate data in Pivot. For the instructions about loading and exporting data refer to [Loading and exporting data](/guides/loading-exporting-data).

## Defining fields

Use the [`fields`](/api/config/fields-property) property to add fields to the Pivot table. To add a new field, you should add a new object to the `fields` array.  

Example:

~~~jsx {}
const widget = new pivot.Pivot("#pivot", {
  fields: [
   { id: "year", label: "Year", type: "number" },
   { id: "continent", label: "Continent", type: "text" },
   { id: "form", label: "Form", type: "text" },
   { id: "oil", label: "Oil", type: "number" },
   { id: "balance", label: "Balance", type: "number" },
  ],
  data,
  config: {...},
});
~~~

## Defining Pivot structure 

Create the Pivot structure using the [`config`](/api/config/config-property) property that also defines how data is aggregated. By default, it has no predefined values. You need to specify this property to define the configuration of the Pivot table, namely, which fields should be applied as columns and rows. The property also allows adding data aggregation methods to be applied to the fields. Here you can also add filters. Please, refer to the [`config`](/api/config/config-property) property description for details. 

Example:

~~~jsx {4-15}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data,
  config: {
    rows: ["continent", "name"],
    columns: ["year"],
    values: [
      "count(oil)",
      { field: "oil", method: "sum" },
      { field: "gdp", method: "sum" },
    ],
  },
		fields,
    filters: {
      name: {
        contains: "B",
      },
    },
});
~~~

## Sorting data

The widget API allows configuring the sorting settings that are applied applied to all areas (values, columns and rows) during aggregation. The sorting in UI is enabled by clicking the column header.

To set default sorting values, apply the **sort** parameter of the [`fields`](/api/config/fields-property) property. It accepts either the "asc" or "desc" value, or a custom sorting function.

In the example below we add clickable field labels and the sorting functionality that is enabled with the icon click:

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
    widget.setConfig({fields}); 
    // update icons
    setFields(bar, fields);
}


const widget = new pivot.Pivot("#pivot", {
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
            },
        ]
    }
});
~~~

The sorting functionality is enabled by default. A user can click the column's header to sort data. To disable/enable sorting, apply the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property. In the example below we disable sorting.

~~~jsx {19}
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data,
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
  columnShape: {
    sort: false, 
  },
});
~~~

## Filtering data

The widget allows you to set various filters for fields depending on the type of data. It's possible to specify filters both via the Pivot interface after initialization or through the corresponding API using the [`config`](/api/config/config-property) property.

In GUI, filters appear as drop-down lists for each field.

#### Types of filters

The Pivot widget provides the next condition types for filtering:

- for text values: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith  
- for numeric values: greater: less, greaterOrEqual, lessOrEqual, equal,	notEqual, contains, notContains, begins with, not begins with, ends with, not ends with  
- for date types: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween

The filter provides the **includes** filtering rule to define the set of values to be displayed. Fields with the additional filter are marked with a special sign in GUI (please, see [Filters](/#filters))

#### Adding a filter

To set a filter, add the **filters** object with the field ID and filter type to the [`config`](/api/config/config-property) property.

~~~jsx {}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
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
    filters: {
      genre: {
        contains: "D",
        includes: ["Drama"],
      },

      title: {
        // filter for another field ("title")
        contains: "A",
      },
    },
  },
});
~~~

## Limiting loaded data

To limit the number of rows and columns in the final dataset, specify the values using the [`limits`](/api/config/limits-property) property. The values define when to interrupt rendering data (when the specified number of row/columns is reached, the data rendering is stopped). The default values for both rows and columns are undefined, which means there's no limit.

Example:

~~~jsx
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  config: {
    rows: ["studio"],
    columns: ["genre"],
    values: [
      {
        id: "title",
        method: "count",
      },
      {
        id: "score",
        method: "max",
      },
    ],
  },
  limits: { rows: 10, columns: 3 },
});
~~~

## Applying maths methods

### Default methods

The widget provides the following default methods for data aggregation:

- sum (for numeric values only) - sums all the values of the selected data; empty cells, logical values like TRUE, or text are ignored
- min (for numeric and date values)- finds and displays the minimum value of the selected data; empty cells, logical values, or text in the array or reference are ignored. If the arguments contain no numbers, MIN returns 0 (zero)
- max (for numeric and date values) - finds the largest value in a set of values; the function ignores empty cells, the logical values TRUE and FALSE, and text values. If the arguments contain no numbers, MAX returns 0 (zero)
- count (for numeric, text, and date values) - looks for all occurrences of the selected data and displays their number; generally used to count a range of cells containing numbers or dates excluding blanks; this is the default operation assigned to each newly added field
- countunique (for numeric and text values) - сounts the number of unique values in a list of specified values and ranges
- average (for numeric values only) - calculates the average (arithmetic mean) of a group of numbers; logical values, empty cells and cells that contain text in the array or reference are ignored; cells with the value zero are included
- counta (for numeric, text, and date values) - returns the number of values in a dataset; counts numbers, dates, text or a range containing a mixture of these items, but does not count blank cells
- median (for numeric values only) - calculates the median of the given numbers
- product (for numeric values only) - calculates the product of all numbers in the given range
- stdev (for numeric values only) - calculates the standard deviation of the values, treating it as a sample of a bigger set of values
- stdevp (for numeric values only) - calculates the standard deviation of the values, treating it as the entire set of values
- var (for numeric values only) - calculates the variance of the values, treating it as a sample of a bigger set of values
- varp (for numeric values only) - calculates the variance of the values, treating it as the entire set of values

Predefined methods:

~~~jsx
defaultMethods = {
  sum: { type: "number", label: "sum" },
  min: { type: ["number", "date"], label: "min" },
  max: { type: ["number", "date"], label: "max" },
  count: {
    type: ["number", "date", "text"],
    label: "count",
    branchMath: "sum",
  },
  counta: {
    type: ["number", "date", "text"],
    label: "counta",
    branchMath: "sum",
  },
  countunique: {
    type: ["number", "text"],
    label: "countunique",
    branchMath: "sum",
  },
  average: { type: "number", label: "average", branchMode: "raw" },
  median: { type: "number", label: "median", branchMode: "raw" },
  product: { type: "number", label: "product" },
  stdev: { type: "number", label: "stdev", branchMode: "raw" },
  stdevp: { type: "number", label: "stdevp", branchMode: "raw" },
  var: { type: "number", label: "var", branchMode: "raw" },
  varp: { type: "number", label: "varp", branchMode: "raw" },
};
~~~

You can apply default methods using the `values` parameter of the [`config`](/api/config/config-property) property. See [Options for defining values](#options-for-defining-values) below.

Example: 

~~~jsx
const widget = new pivot.Pivot("#pivot", {
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
        method: "count",
      },
      {
        id: "score",
        method: "max",
      },
    ],
  },
});
~~~

### Options for defining values

You can define `values`in either of the two equally valid ways: 
- option one is a string representing a data field ID: `operation(fieldID)`
- option two is an object containing the field ID and the method for data aggregation (both are required): `{ field: string, method: string }`

Example:

~~~jsx
   values: [
      "sum(sales)", // option one
      { field: "sales", method: "sum" }, // option two
   ],
~~~

### Redefining the default method

By default, the first available method for the data type is selected. You can redefine a method using the [`api.intercept()`](/api/methods/intercept-method) method.

In the example below, we check whether a new field is added, and set the **max** method in case a numeric field is added.

~~~jsx {20-27}
const widget = new pivot.Pivot("#pivot", {
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
widget.api.intercept("add-field", (ev) => {
  const { fields } = widget.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "max";
  }
});
~~~

### Adding custom maths methods

To add a custom method, use the [`methods`](/api/config/methods-property) property by setting the `key` parameter value to the method name and the `value` parameter should be a function that defines how a method should process data. The function should take an array of numerical values as an input and return a single numerical value. 

The example below shows how to calculate the count of unique and average values for the date type. The **countUnique** function takes an array of numbers (values) as an input and calculates the exact count of unique values using the **reduce** method. The **countunique_date** sub-property has a handler with a function that gets the unique values from an array of the date values. The **average_date** sub-property has a handler that calculates the average values from an array of the date values.

~~~jsx {}
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
    },
  },
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

const widget = new pivot.Pivot("#pivot", {
    fields, 
    data: dataset,
    tableShape: { templates },
    methods: { ...pivot.defaultMethods, ...methods },
    config:{
		rows: [
            "state"
        ],
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
            },   
        ]
	}
});
~~~

## Processing data with predicates

Predicates or data modifiers allow you to process data in the required way before this data is used as rows or columns. 
For example, you can pre-process the date format before applying and displaying data. The following predicates are applied by default:

~~~jsx
const defaultPredicates = {
	year: { label: "Year", type: "date" },
	quarter: { label: "Quarter", type: "date" },
	month: { label: "Month", type: "date" },
	week: { label: "Week", type: "date" },
	day: { label: "Day", type: "date" },
	hour: { label: "Hour", type: "date" },
	minute: { label: "Minute", type: "date" },
};
~~~

To add a custom predicate, you should specify the parameters of the [`predicates`](/api/config/predicates-property) property:
- Add keys that are predicate IDs
- Add values that are objects with predicate configuration:
  - add a label that will be displayed in GUI in the drop-down among data modifiers options for a row/column  
  - for the custom predicate, add the `handler` function that defines how data should be processed; the function takes a single argument as the value to be processed and returns the processed value.
  - if you want the data to be displayed in the way other than the `handler` function returns, add the template that defines how data should be displayed (optional)
  - if necessary, add the `filter` function to specify how data should be filtered for the field 

You should also add the predicate id as the value of the `method` parameter for the row/column where this predicate should be applied. 

~~~jsx
// custom predicate
const predicates = {
  monthYear: {
    id: "monthYear",
    label: "month-year",
    type: "date",
    handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1).getTime(),
    template: (value, params) => {
      const locale = params.locale;
      const date = new Date(value);
      const months = locale.getRaw().calendar.monthFull;
      return months[date.getMonth()] + " " + date.getFullYear();
    },
  },
};

const widget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  predicates: { ...pivot.defaultPredicates, ...predicates },
  config: {
    rows: ["state"],
    columns: [
      { field: "date", method: "year" },
      { field: "date", method: "monthYear" },
      { field: "profit", method: "balanceSign" },
    ],
    values: [{ field: "sales", method: "sum" }],
  },
});
~~~

## Adding columns and rows with total values

To enable generating the rightmost column with total values, apply the [`tableShape`](/api/config/tableshape-property) property and set the value of the `totalColumn` parameter to **true**.

To enable generating the footer with totals, apply the [`tableShape`](/api/config/tableshape-property)property and set the value of the `totalRow` parameter to **true**.

Example:

~~~jsx {2-5}
const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    totalRow: true,
    totalColumn: true,
  },
  fields,
  data,
  config: {
    rows: ["studio"],
    columns: ["type"],
    values: [
      {
        field: "score",
        method: "max",
      },
      {
        field: "episodes",
        method: "count",
      },
      {
        field: "rank",
        method: "min",
      },
      {
        field: "members",
        method: "sum",
      },
    ],
  },
});
~~~

## Example

In this snippet you can see how to apply maths operations:

<iframe src="https://snippet.dhtmlx.com/lv90d8q2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
