---
sidebar_label: Exporting data
title: Exporting data
description: You can explore how to export data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Exporting data

To export table data to XLSX or CSV format, get access to the underlying Table widget instance inside Pivot and apply the Table API. Use the [`getTable`](/api/methods/gettable-method) method to access the Table instance, then execute the [`export`](/api/table/export) event.

The following code snippet accesses the Table instance and triggers the `export` action with [`api.exec()`](/api/internal/exec-method):

~~~jsx
const widget = new pivot.Pivot("#root", { /*setting*/});
widget.api.getTable().exec("export", {
        options: {
            format: "csv",
            cols: ";"
        }
});
widget.api.getTable().exec("export", {
        options: {
            format: "xlsx",
            fileName: "My Report",
            sheetName: "Quarter 1",
        }
});
~~~

## Example

The following code snippet exports data to XLSX and CSV:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles**:

- [Date formatting](/guides/localization#date-formatting)
- [`export`](/api/table/export)
