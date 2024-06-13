---
sidebar_label: getTable()
title: getTable Method
description: You can learn about the getTable method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# getTable()

### Description

@short: Gets access to the underlying Grid widget instance in the Pivot

This method is used when there's a need to access the underlying Grid widget instance in the Pivot. It provides direct access to all table functionality ([Grid API](https://docs.svar.dev/svelte/grid/api/overview/api_overview)), allowing for operations such as data serialization and exporting in various formats.

### Usage

~~~jsx {}
getTable(wait:boolean): Table | Promise;
~~~


### Parameters

`wait` - defines to wait until Grid API is available in Pivot (necessary when Grid API is used during with Pivot initialization). If `wait` is set to **true**, the method returns a promise with Grid API.

### Example

In the example below we get access to the DataGrid widget API and trigger the Grid [`export`](https://docs.svar.dev/svelte/grid/api/actions/export) action with the button click using the [`api.exe()`](/api/methods/exec) method.

~~~jsx {}
// create Pivot
const widget = new pivot.Pivot("#root", {
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
});

let table = widget.getTable();

function toCSV() {
  table.exeс("export", {
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
