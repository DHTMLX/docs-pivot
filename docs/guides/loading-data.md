---
sidebar_label: Loading data
title: Loading data
description: You can explore how to load data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Loading data

Pivot accepts data in JSON format via the [`data`](/api/config/data-property) property. Pivot also accepts CSV data after conversion to JSON.

## Prepare data for loading

The [`data`](/api/config/data-property) property accepts an array of objects, where each object represents one data row. The keys of each object define the dimensions and values used in the Pivot table.

The following code snippet defines a sample `data` array:

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
        when: new Date("4/21/2015")
    },
    {
        name: "Argentina",
        year: 2017,
        continent: "South America",
        form: "Republic",
        gdp: 212.507,
        oil: 1.732,
        balance: 7.167,
        when: new Date("1/15/2017")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 260.071,
        oil: 2.845,
        balance: 6.728,
        when: new Date("6/16/2014")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 324.405,
        oil: 4.333,
        balance: 5.99,
        when: new Date("2/20/2014")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 305.763,
        oil: 2.626,
        balance: 7.544,
        when: new Date("8/17/2014")
    },
    // other data
];
~~~

:::info
For information on defining fields and Pivot structure, see [Working with data](/guides/working-with-data).
:::

## Load data from a file

Pivot loads JSON data from an external file after initialization. Prepare a source file with the data, fields, and configuration.

The following code snippet defines `data`, `fields`, and a `getData()` accessor in a separate file:

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
                { field: "gdp", method: "sum" }
            ],
            filters: {
                genre: {
                    contains: "D",
                    includes: ["Drama"],
                }
            }
        },
        fields
    };
}
const fields = [
    { id: "year", label: "Year", type: "number" },
    { id: "continent", label: "Continent", type: "text" },
    { id: "form", label: "Form", type: "text" },
    { id: "oil", label: "Oil", type: "number" },
    { id: "balance", label: "Balance", type: "number" }
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
        when: new Date("4/21/2015")
    },
    // other data
];
~~~

Add the path to the source data file in the page markup:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">

<script src="./common/data.js"></script>
~~~

The following code snippet creates Pivot and loads data from the prepared file:

~~~jsx
const { data, config, fields } = getData();
const table = new pivot.Pivot("#root", { data, config, fields });
~~~

## Load data from a server

To load data from a server endpoint, send a request with the native `fetch` method (or any equivalent), then pass the response to [`setConfig`](/api/methods/setconfig-method), which updates the Pivot configuration and preserves previously set options.

The following code snippet initializes Pivot with empty data, fetches data and fields from a server, then applies them with `setConfig`:

~~~jsx
const table = new pivot.Pivot("#root", { fields: [], data: [] });
const server = "https://some-backend-url";

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({ data, fields });
});
~~~

## Load CSV data

Pivot accepts CSV data after you convert it to JSON with an external JS parsing library. The converted data behaves the same as native JSON.

The example below uses the external [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js) library to load and convert data on a button click. The `convert()` helper takes the following parameters:

- `data` — a string with CSV data
- `headers` — an array of CSV field names
- `meta` — an object mapping field names to data types

The following code snippet creates Pivot, defines the `convert()` helper, and applies parsed CSV data through [`setConfig`](/api/methods/setconfig-method) on a button click:

~~~jsx
const table = new pivot.Pivot("#root", {
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
            }
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
    });
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
        { id: "when", label: "When", type: "date" }
    ];
    
    const config = {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ]
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
  
    // mark date fields explicitly for proper conversion
    const meta = { when: "date" };

    const dataURL = "https://some-backend-url";
    fetch(dataURL)
        .then(response => response.text())
        .then(text => convert(text, headers, meta))
        .then(data => {
        table.setConfig({
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

## Example

The snippet below loads JSON and CSV data:

<iframe src="https://snippet.dhtmlx.com/wo6w9hf9?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related samples:**
- [Pivot 2. Date format](https://snippet.dhtmlx.com/shn1l794)
- [Pivot 2. Different datasets](https://snippet.dhtmlx.com/6xtqge4i)
- [Pivot 2. Large dataset](https://snippet.dhtmlx.com/e6qwqrys)

**Related articles**: [Date formatting](/guides/localization#date-formatting)
