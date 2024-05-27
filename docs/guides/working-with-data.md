---
sidebar_label: Working with data
title: Working with Data
description: You can explore how to work with Data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Working with data

## Preparing data for loading

The following types of information can be loaded into Pivot:

- [`fields`](/api/config/fields-property) - an array of objects where each object specifies the data type for each field

Example:

~~~js
const fields = [
   { id: "year", label: "Year", type: "number" },
   { id: "continent", label: "Continent", type: "text" },
   { id: "form", label: "Form", type: "text" },
   { id: "oil", label: "Oil", type: "number" },
   { id: "balance", label: "Balance", type: "number" },
];
~~~

- [`data`](/api/config/data-property) - an array of objects, where each object represents a data row.

Example:

~~~jsx
const data = [
   {
      name: "Argentina",
      year: 2015,
      continent: "South America",
      form: "Republic",
      gdp: 181.357,
      oil: 1.545,
      balance: 4.699,
      when: new Date("4/21/2015"),
   },
   {
      name: "Argentina",
      year: 2017,
      continent: "South America",
      form: "Republic",
      gdp: 212.507,
      oil: 1.732,
      balance: 7.167,
      when: new Date("1/15/2017"),
   },
   {
      name: "Argentina",
      year: 2014,
      continent: "South America",
      form: "Republic",
      gdp: 260.071,
      oil: 2.845,
      balance: 6.728,
      when: new Date("6/16/2014"),
   },
   {
      name: "Argentina",
      year: 2014,
      continent: "South America",
      form: "Republic",
      gdp: 324.405,
      oil: 4.333,
      balance: 5.99,
      when: new Date("2/20/2014"),
   },
   {
      name: "Argentina",
      year: 2014,
      continent: "South America",
      form: "Republic",
      gdp: 305.763,
      oil: 2.626,
      balance: 7.544,
      when: new Date("8/17/2014"),
   },
   //other data
];
~~~

Before loading data you can also define the Pivot structure via the [`config`](/api/config/config-property) object that also defines how data is aggregated. By default, it has no predefined values. You need to specify this property to define the configuration of the Pivot table.

Example:

~~~js
const config = {
   rows: ["continent"],
   columns: ["year"],
   values: [
      { id: "oil", method: "max" },
      { id: "balance", method: "max" },
   ],
};
~~~

## Loading data 

You can load data into Pivot from an external file or the server-side script after the component has been initialized.

To load local data from a separate file, first prepare the source file with data.

Example:

~~~jsx
function getData() {
  return {
    data,
    config: {
      rows: ["continent", "name"],
      columns: ["year"],
      values: ["count(oil)", { id: "oil", method: "sum" }, { id: "gdp", method: "sum" }],
      filters: {
        name: {
          condition: {
            filter: "A",
            type: "contains",
          },
        },
      },
    },
    fields,
  };
}
const fields = [
      { id: "year", label: "Year", type: "number" },
      { id: "continent", label: "Continent", type: "text" },
      { id: "form", label: "Form", type: "text" },
      { id: "oil", label: "Oil", type: "number" },
      { id: "balance", label: "Balance", type: "number" },
];

const data = [
  {
    name: "Argentina",
    year: 2015,
    continent: "South America",
    form: "Republic",
    gdp: 181.357,
    oil: 1.545,
    balance: 4.699,
    when: new Date("4/21/2015"),
  },
  //other data
];
~~~

Second, add the path to the source data file:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">

<script src="./common/data.js"></script>
~~~

Create Pivot and load data: 

~~~jsx {}
const { config } = getData();
const widget = new pivot.Pivot("#root", {
  data: getData().data,
  config,
  fields: getData().fields,
});
~~~

To get server data, you can send the request for data using the native **fetch** method (or any other way):

~~~jsx
const widget = new pivot.Pivot("#pivot", {fields:[], data: []});

const server = "https://some-backend-url";

let data = [];
let fields = [];

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
  ]).then(([f, d]) => {
    fields = f;
    data = d;
   });
~~~

## Importing data

You can import data to Pivot from CSV, data is converted to JSON and you can continue working with this data in the Pivot table.

To convert data, you should apply the ready-made `convert()` function which takes the following parameters:

- `stringCSV` (required) - CSV string 
- `headersMap` (optional) - an array of headers with one of the following:
   - for the "string" and "number" data types: strings which are columns IDs for CSV/fields for JSON
   - for the "date", "string" and "number" types - an object with the following parameters:
      - id (string) - (required) a column id or field name
      - type - (optional) data type which can be "date" | "string" | "number"
   The "string" and "number" types are detected automatically, which means that it's not necessary to specify the type for them and it's enough to apply only strings (columns ids/fields names) in the array of headers
   If the headers array is set and it's not empty, it means that there are no headers in CSV data and the first row in CSV data is the data row. In case the headers array is empty and does not exist, the first row in CSV data will be applied as headers. 
- `extSettings` (optional) - an object with additional settings supported by CSV parser: 
    - `cellDelimiter` (string | array, default: `","`) - seta a delimiter for columns in a row. Use "auto" if delimiter is unknown in advance, in this case, delimiter will be auto-detected (by best attempt). Use an array to give a list of potential delimiters e.g. [",","|","$"]. 
   - `rowDelimiter` (string, not set by default) - sets a delimiter for rows (i.e., the end of line character). If omitted, parser will attempt to retrieve it from the first chunks of CSV data.
   - `trim` (boolean, default: `true`) - trims end spaces in a cell (for example, " content " will be trimmed to "content")
   - `escapeChar` - escape character used in quoted column. The default value is double quote (") according to RFC4108. It can be changed to back slash (`\`) or other chars.
   - `complexData` (boolean, default: `true`) - allows interpreting dots (.) and square brackets in header fields as a nested object or an array of identifiers at all (treat them like regular characters for JSON field identifiers). 

Example:

~~~jsx
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
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
});

const dateParser = (value) => new Date(value);

// match custom names of available settings with csv() parameters
const names = {
  cellDelimiter: "delimiter",
  rowDelimiter: "eol",
  trim: "trim",
  escapeChar: "escape",
  complexData: "flatKeys", // inverted value!
};

function convert(stringCSV, headersArr, userSettings) {
  const headers = [];
  const colParser = {};
  const extraSettings = {};
  // custom headers are set => expect no header row in CSV data
  const noheader = headersArr && headersArr.length ? true : false;

  // add custom headers
  if (noheader) {
    for (let h of headersArr) {
      if (typeof h === "string") {
        headers.push(h);
      } else if (h.id) {
        headers.push(h.id);
        if (h.type) colParser[h.id] = h.type === "date" ? dateParser : h.type;
      }
    }
  }

  // add allowed user settings
  if (userSettings && typeof userSettings === "object") {
    for (let key in userSettings) {
      const name = names[key];
      if (name) {
        const invertValue = !!(name === "complexData");
        extraSettings[name] = invertValue ? !userSettings[key] : userSettings[key];
      }
    }
  }

  return csv({
    ...extraSettings,
    output: "json",
    checkType: true,
    colParser,
    headers,
    noheader,
  }).fromString(stringCSV || "");
}

function fromCSV() {
  const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "continent", label: "Continent", type: "text" },
    { id: "form", label: "Form", type: "text" },
    { id: "gdp", label: "GDP", type: "number" },
    { id: "oil", label: "Oil", type: "number" },
    { id: "balance", label: "Balance", type: "number" },
    { id: "year", label: "Year", type: "number" },
    { id: "when", label: "When", type: "date" },
  ];
  const config = {
    rows: ["continent", "name"],
    columns: ["year"],
    values: ["count(oil)", { id: "oil", method: "sum" }, { id: "gdp", method: "sum" }],
  };

  const headers = [
    // parser will automatically detect "string" and "number" values
    "name",
    "year",
    "continent",
    "form",
    "gdp",
    "oil",
    "balance",
    // type "date" should be defined explicitly
    { id: "when", type: "date" },
  ];

  const dataURL = "https://some-backend-url";
  fetch(dataURL)
    .then((response) => response.text())
    .then((text) => convert(text, headers))
    .then((data) => {
      pivotWidget.setConfig({
        data,
        fields,
        config,
      });
    });
}
~~~

## Exporting data

To export the table data to the xlsx or csv format, it's necessary to get access to the underlying Table instance inside Pivot and apply the [Grid public API](https://docs.svar.dev/svelte/grid/api/overview/api_overview) to export data.

To do this, apply the [`getTable`](/api/methods/getTable) method.

In the example below we get access to the DataGrid widget API and trigger the [`export`](https://docs.svar.dev/svelte/grid/api/actions/export) action on the button click using the [`api.exec()`](/api/internal/exec-method) method.

~~~jsx
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
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
});

function toCSV() {
  pivotWidget.api.getTable().exec("export", {
    options: {
      format: "csv",
      cols: ";",
    },
  });
}

const exportButton = document.createElement("button");
exportButton.addEventListener("click", toCSV);
exportButton.textContent = "Export";

document.body.appendChild(exportButton);
~~~

## Sorting data

The widget API allows configuring default sorting settings and enabling the sorting in UI by clicking the column header.

To set default sorting values, apply the **sort** parameter of the [`fields`](/api/properties/fields-property) property. It accepts either the "asc" or "desc" value, or a custom sorting function.

In the example below we add clickable field labels and the sorting functionality on the icon click:

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
        "rows": [
            "studio",
            "genre"
        ],
        "columns": [
        ],
        "values": [
            {
                "id": "title",
                "method": "count"
            },
            {
                "id": "score",
                "method": "max"
            },
        ]
    }
});
~~~

To make the sorting possible in UI by clicking the column header, apply the `sort` parameter of the [`columnShape`](/api/config/columnshape-properties) property.

~~~jsx {19}
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data,
  config: {
    rows: ["studio", "genre"],
    columns: [],
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
  columnShape: {
    sort: false, 
    autoWidth: {
      // calculate column width for these fields
      columns: {
        studio: true,
        genre: true,
        title: true,
        score: true,
      },
    },
  },
});
~~~

## Filtering data

The instructions about adding filters see here: [Working with filters](/guides/configuration/#working-with-filters)

## Limiting loaded data

To limit the number of rows and columns in the final dataset, specify the values using the [`limits`](/api/config/limits-property) property. The values define when to interrupt rendering data (and when the specified number of row/columns is reached, the data rendering is stopped). The default values for both rows and columns are undefined, which means there's no limit.

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

- Sum (for numeric values only) - sums all the values of the selected data property and displays the sum
- Min (for numeric and date values)- finds and displays the minimum value of the selected data property  
- Max (for numeric and date values) - finds and displays the maximum value of the selected data property  
- Count (for numeric, text, and date values) - looks for all occurrences of the selected data property and displays their number; this is the default operation assigned to each newly added field

Predefined methods:

~~~jsx
const methods = {
	sum: { label: "sum" },
	min: { type: ["number", "date"], label: "min" },
	max: { type: ["number", "date"], label: "max" },
	count: {
		type: ["number", "date", "text"],
		label: "count",
		branchMath: "sum",
	},
	average: { type: "number", label: "average", branchMode: "raw" },
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
        id: "title",
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
- option two is an object containing the field ID and the method for data aggregation: `{ id: string, method?: string }`

Example:

~~~jsx
   values: [
      "sum(sales)", // option one
      { id: "sales", method: "sum" }, // option two
   ],
~~~

### Redefining the default method

By default, the **count** operation is assigned to each newly added field. To set another operation to each new field, you should use the [`api.intercept()`](/api/methods/intercept-method) method.

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
        id: "title",
        method: "count",
      },
      {
        id: "score",
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

The example below shows how to calculate the exact count of unique values. The function takes an array of numbers (values) as an input and calculates the exact count of unique values using the **reduce** method. The **distinct_count** sub-property has a handler with a function that calculates the distinct count value from an array of numbers.

~~~jsx {}
function countDistinct(values, converter) {
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
  distinct_count: {
    handler: (values) => countDistinct(values),
    type: ["number", "text"],
    label: "distinct count",
  },
};

const widget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  methods: { ...pivot.defaultMethods, ...methods },
  config: {
    rows: ["state"],
    columns: ["product_line", "product_type"],
    values: [
      {
        field: "sales",
        method: "sum",
      },
      {
        field: "sales",
        method: "count",
      },
      {
        field: "sales",
        method: "distinct_count",
      },
    ],
  },
});
~~~

## Processing data with predicates

Predicates or data modifiers allow you to process data in the required way before this data is used as rows or columns. 
For example, you can pre-process the date format before applying and displaying data.

To add a predicate, you should use the [`predicates`](/api/config/predicates-property) property:
- specify the data type for each array of the same data type
- for each predicate object in the array:
  - specify the predicate id
  - add a label that will be displayed in GUI in the drop-down among data modifiers options for a row/column  
  - add the `handler` function that defines how data should be processed; the function should take a single argument as the value to be processed and return the processed value. 
  - if you want the data to be displayed in the way other than the `handler` function returns, add the template that defines how data should be displayed (optional)  
 You should also add the predicate id as the value of the `method` parameter for the row/column where this predicate should be applied. 

The following default predicates are applied:

~~~jsx
const predicates = {
$empty: {
		label: (v: any, type: any) => `(${type})`,
		type: ["number", "date", "text"],
	},
	year: { label: "year", type: "date" },
	month: { label: "month", type: "date" },
	day: { label: "day", type: "date" },
	hour: { label: "hour", type: "date" },
	minute: { label: "minute", type: "date" },
};
~~~


TBD!!!
:::note 
If no custom predicate is set, for the **date** type the default *$empty* template is applied where the value of the `dateToString` parameter of the [`tableShape`](/api/properties/tableshape-property) property is taken and depends on the current locale.
:::

~~~jsx
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
      { id: "date", method: "year" },
      { id: "date", method: "monthYear" },
      { id: "profit", method: "balanceSign" },
    ],
    values: [{ id: "sales", method: "sum" }],
  },
});
~~~


## Example

In this snippet you can see how to use Pivot API for working with data:

<iframe src="https://snippet.dhtmlx.com/" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> TODO!!!
