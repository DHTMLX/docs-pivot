---
sidebar_label: Exporting data
title: Exporting data
description: You can explore how to export data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Exporting data

Pivot exports table data to the XLSX or CSV format through the underlying Table widget. Access the Table instance with the [`getTable`](/api/methods/gettable-method) method, then trigger the [`export`](/api/table/export) event with the Table's [`api.exec`](/api/internal/exec-method) method.

The example below accesses the Table instance and triggers the `export` event in CSV and XLSX formats:

~~~jsx
const widget = new pivot.Pivot("#root", { /* settings */ });

widget.getTable().api.exec("export", {
    options: {
        format: "csv",
        cols: ";"
    }
});

widget.getTable().api.exec("export", {
    options: {
        format: "xlsx",
        fileName: "My Report",
        sheetName: "Quarter 1"
    }
});
~~~

:::tip
The [`getTable`](/api/methods/gettable-method) method accepts an optional `wait` boolean parameter. Pass `true` to receive a promise that resolves once the Table API is available. This form is useful when calling the Table API during Pivot initialization.
:::

## Example

The snippet below demonstrates exporting data:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related articles**: 

- [Date formatting](/guides/localization#date-formatting)
- [`export`](/api/table/export)
