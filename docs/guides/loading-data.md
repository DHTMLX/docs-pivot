---
sidebar_label: Loading data
title: Loading data
description: You can explore how to load data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Load data

## Prepare data for loading

Pivot supports JSON data format. You can also load CSV data that will be converted to JSON.

Pivot accepts the following types of information:

- [`data`](/api/config/data-property) — an array of objects where each object represents a data row
- [`fields`](/api/config/fields-property) — an array of field definitions that control how Pivot interprets data types
- [`config`](/api/config/config-property) — an object that defines the table structure (rows, columns, values, and filters)

The following code snippet shows the structure of a `data` array:

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
    //other data
];
~~~

:::info
See also how to define fields and Pivot structure: [Working with data](/guides/working-with-data)
:::

### Define fields

Use the [`fields`](/api/config/fields-property) property to tell Pivot how to interpret each data column. If `fields` is not set, Pivot analyzes the incoming data and infers field types automatically.

Each object in the `fields` array supports the following parameters:

- `id: string` — (required) the field identifier; must match a key in the `data` objects
- `label: string` — (optional) the display name shown in the configuration panel
- `type: "number" | "date" | "text"` — (required) the data type for the field
- `sort: "asc" | "desc" | function` — (optional) the default sort order for the field
- `format: string | boolean | object` — (optional) the display format for numbers and dates; also applied during export

The following code snippet defines a `fields` array with number, text, and date types:

~~~jsx
const fields = [
    { id: "year",      label: "Year",      type: "number" },
    { id: "continent", label: "Continent", type: "text"   },
    { id: "form",      label: "Form",      type: "text"   },
    { id: "oil",       label: "Oil",       type: "number" },
    { id: "balance",   label: "Balance",   type: "number" },
    { id: "when",      label: "Date",      type: "date"   }
];
~~~

## Load JSON data

You can load JSON data into Pivot from an external file or a server-side endpoint after the component has been initialized.

### Load from a local file

Prepare the source file with data:

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
    //other data
];
~~~

Second, add the path to the source data file:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">

<script src="./common/data.js"></script>
~~~

The following code snippet initializes Pivot with data from the local file:

~~~jsx
const { data, config, fields } = getData();
const table = new pivot.Pivot("#root", { data, config, fields });
~~~

### Load from a server

Use the native `fetch` method (or any other approach) to request server data and apply it with `setConfig()`:

~~~jsx
const table = new pivot.Pivot("#root", {fields:[], data: []});
const server = "https://some-backend-url";

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({data, fields});
});
~~~

## Load CSV data

Load CSV data, convert it to JSON, and use it in the Pivot table. Use an external JS library to convert CSV data to JSON.

The following code snippet uses the external [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js) library to convert CSV data on a button click. The `convert()` function takes the following parameters:

- `data` — a string with CSV data
- `headers` — an array with the names of fields for CSV data
- `meta` — an object where keys are the names of fields and values are the data types

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
  
    // date fields must be explicitly marked for proper conversion
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

The live example below demonstrates loading JSON and CSV data:

<iframe src="https://snippet.dhtmlx.com/wo6w9hf9?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related samples:**

- [Pivot 2. Date format](https://snippet.dhtmlx.com/shn1l794)
- [Pivot 2. Different datasets](https://snippet.dhtmlx.com/6xtqge4i)
- [Pivot 2. Large dataset](https://snippet.dhtmlx.com/e6qwqrys)

**Related articles**: [Date formatting](/guides/localization#date-formatting)
