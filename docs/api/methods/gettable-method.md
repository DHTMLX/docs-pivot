---
sidebar_label: getTable()
title: getTable Method
description: You can learn about the getTable method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# getTable()

### Description

@short: Gets access to the underlying Table widget instance in the Pivot table

This method is used when there's a need to access the underlying Table widget instance in Pivot. It provides direct access to the Table functionality allowing for operations such as data serialization and exporting in various formats. The Table API has its own `api.exec()` method that can call the `open-row`, `close-row`, `export` events. Usage examples with the events you can see here: [Expanding/collapsing all rows](/guides/configuration#expandingcollapsing-all-rows), [Exporting data](/guides/loading-exporting-data#exporting-data)

### Usage

~~~jsx
getTable(wait:boolean): Table | Promise;
~~~

### Parameters

`wait` - defines if to wait until Table API is available in Pivot (necessary when Table API is used during Pivot initialization). If the value is set to **true**, the method returns a promise with Table API.

### Example

In the example below we get access to the Table widget API and trigger the Table `export`event with the button click using the [`api.exec()`](/api/internal/exec-method) method.

~~~jsx
// create Pivot
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
    }
});

// access table instance
let table_instance = table.getTable();

function toCSV() {
    table_instance.exeс("export", {
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
