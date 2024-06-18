---
sidebar_label: Loading and exporting data
title: Loading and exporting data
description: You can explore how to load and export data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

## Preparing data for loading

The following types of information can be loaded into Pivot:

- [`data`](/api/config/data-property) - an array of objects, where each object represents the data row.

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

See also how to define fields and Pivot structure: link to be added

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
      values: [
        "count(oil)",
        { field: "oil", method: "sum" },
        { field: "gdp", method: "sum" }],
      filters: {
      genre: {
        contains: "D",
        includes: ["Drama"],
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
const { data, config, fields } = getData();
const widget = new pivot.Pivot("#root", { data, config, fields });
~~~

To get server data, you can send the request for data using the native **fetch** method (or any other way):

~~~jsx
const widget = new pivot.Pivot("#pivot", {fields:[], data: []});
const server = "https://some-backend-url";

Promise.all([
   fetch(server + "/data").then((res) => res.json()),
   fetch(server + "/fields").then((res) => res.json())
 ]).then(([data, fields]) => {
   widget.setConfig({data, fields});
 });
~~~

## Loading CSV data

You can load CSV data and convert it to JSON and then continue working with this data in the Pivot table.

To convert data, you should use an external parsing library for JS to convert data from CSV to JSON.

In the example below we apply the external [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js) library and enable loading and converting data on a button click. In this example we use the `convert()` function which takes the following parameters:

- `data` - a string with CSV data
- `headers` - an array with the names of fields for CSV data
- `meta` - an object where keys are the names of fields and values are the data types

~~~jsx
const pivotWidget = new pivot.Pivot("#pivot", {
  fields, 
  data: dataset,
  config: {
    rows: [
      "studio",
      "genre"
    ],
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
    ]
  }
});

function convert(data, headers, meta) {
  const header = headers.join(",") + "\n";
  const processedData = header + data;

  return Papa.parse(processedData, { 
    header: true,
    dynamicTyping: true,
    transform: (v, f) => {
      return meta && meta[f] === "date" ? new Date(v) : v;
    }
  })
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
    values: [
      "count(oil)",
      { field: "oil", method: "sum" },
      { field: "gdp", method: "sum" },
    ],
  };

  const headers = [
    "name",
    "year",
    "continent",
    "form",
    "gdp",
    "oil",
    "balance",
    "when"
  ];
  
  // date fields must be explicitly marked for proper conversion
  const meta = { when: "date" };

  const dataURL = "https://some-backend-url";
  fetch(dataURL)
    .then(response => response.text())
    .then(text => convert(text, headers, meta))
    .then(data => {
    pivotWidget.setConfig({
      data: data.data,
      fields,
      config
    });
  });
}

const importButton = document.createElement("button");
importButton.addEventListener("click", fromCSV);
importButton.textContent = "Import";

document.body.appendChild(importButton);
~~~

## Exporting data

To export the table data to the XLSX or CSV format, it's necessary to get access to the underlying DataGrid instance inside Pivot and apply the [DataGrid public API](https://docs.svar.dev/svelte/grid/api/overview/api_overview) to export data.

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


