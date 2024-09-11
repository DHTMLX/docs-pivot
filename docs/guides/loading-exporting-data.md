---
sidebar_label: Loading and exporting data
title: Loading and exporting data
description: You can explore how to load and export data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

## Preparing data for loading

Pivot supports JSON data format. You can also load CSV data that will be converted to JSON. 

The following types of information can be loaded into Pivot:

- [`data`](/api/config/data-property) - an array of objects, where each object represents the data row

### Example

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

## Loading data

You can load JSON data into Pivot from an external file or the server-side script after the component has been initialized.

To load local data from a separate file, first prepare the source file with data.

### Example

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

Create Pivot and load data:

~~~jsx
const { data, config, fields } = getData();
const table = new pivot.Pivot("#root", { data, config, fields });
~~~

To get server data, you can send the request for data using the native **fetch** method (or any other way):

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

## Loading CSV data

You can load CSV data and convert it to JSON and then continue working with this data in the Pivot table.

To convert data, you should use an external parsing library for JS to convert data from CSV to JSON.

In the example below we apply the external [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js) library and enable loading and converting data on a button click. In this example we use the `convert()` function which takes the following parameters:

- `data` - a string with CSV data
- `headers` - an array with the names of fields for CSV data
- `meta` - an object where keys are the names of fields and values are the data types

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

## Exporting data

To export the table data to the XLSX or CSV format, it's necessary to get access to the underlying Table widget instance inside Pivot and apply its API to export data. To do this, you should use the [`getTable`](/api/methods/gettable-method) method.

In the example below we get access to the Table instance and trigger the `export`action on the button click using the [`api.exec()`](/api/internal/exec-method) method.

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        columns: [],
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
    }
});

function toCSV() {
    table.api.getTable().exec("export", {
        options: {
            format: "csv",
            cols: ";"
        }
    });
}

const exportButton = document.createElement("button");
exportButton.addEventListener("click", toCSV);
exportButton.textContent = "Export";

document.body.appendChild(exportButton);
~~~

## Setting date format

The Pivot accepts a date that is parsed into the Date object. By default, the `dateFormat` of the current locale is applied. To redefine the format, change the value of the `dateFormat` parameter in the `formats` object of the [`locale`](/api/config/locale-property). The default format is "%d.%m.%Y".

### Example

~~~jsx {17}
function setFormat(value) {
    table.setConfig({ locale: { formats: { dateFormat: value } } });
}

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

const table = new pivot.Pivot("#root", {
    locale: { formats: { dateFormat: "%d %M %Y %H:%i" } },
    fields,
    data: dataset,
    config: {
        rows: ["state"],
        columns: ["product_line", "product_type"],
        values: [
            {
                field: "date",
                method: "min"
            },
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            }
        ]
    }
});
~~~

Pivot uses the following characters for setting the date format:

| Character | Definition                                        |Example                  |
| :-------- | :------------------------------------------------ |:------------------------|
| %d        | day as a number with leading zero                 | from 01 to 31           |
| %j        | day as a number                                   | from 1 to 31            |
| %D        | short name of the day (abbreviation)              | Su Mo Tu Sat            |
| %l        | full name of the day                              | Sunday Monday Tuesday   |
| %W        | week as a number with leading zero (with Monday as the first day of the week) | from 01 to 52/53        |
| %m        | month as a number with leading zero               | from 01 to 12           |
| %n        | month as a number                                 | from 1 to 12            |
| %M        | short name of the month                           | Jan Feb Mar             |
| %F        | full name of the month                            | January February March  |
| %y        | year as a number, 2 digits                        | 24                      |
| %Y        | year as a number, 4 digits                        | 2024                    |
| %h        | hours 12-format with leading zero                 | from 01 to 12           |
| %g        | hours 12-format                                   | from 1 to 12            |
| %H        | hours 24-format with leading zero                 | from 00 to 23           |
| %G        | hours 24-format                                   | from 0 to 23            |
| %i        | minutes with leading zero                         | from 01 to 59           |
| %s        | seconds with leading zero                         | from 01 to 59           |
| %S        | milliseconds                                      | 128                     |
| %a        | am or pm                                          | am (for time from midnight until noon) and pm (for time from noon until midnight)|
| %A        | AM or PM                                          | AM (for time from midnight until noon) and PM (for time from noon until midnight)|
| %c        | displays date and time in the ISO 8601 date format| 2024-10-04T05:04:09     |


To present the 20th of June, 2024 with the exact time as *2024-09-20 16:47:08.128*, specify "%Y-%m-%d-%H:%i:%s.%u".

## Example

In this snippet you can see how to load JSON and CSV data:

<iframe src="https://snippet.dhtmlx.com/wo6w9hf9?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related samples:**
- [Pivot 2.0. Export to XLSX, CSV](https://snippet.dhtmlx.com/zjuloqxd)
- [Pivot 2.0: Date format](https://snippet.dhtmlx.com/shn1l794)
- [Pivot 2.0: Different datasets](https://snippet.dhtmlx.com/6xtqge4i)
- [Pivot 2.0. Large dataset](https://snippet.dhtmlx.com/e6qwqrys)
