---
sidebar_label: Exporting data
title: Exporting data
description: You can explore how to export data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Exporting data

To export the table data to the XLSX or CSV format, it's necessary to get access to the underlying Table widget instance inside Pivot and apply its API to export data. To do this, you should use the [`getTable`](/api/methods/gettable-method) method and execute the [`export`](/api/table/export) event.

In the example below we get access to the Table instance and trigger the `export`action using the [`api.exec()`](/api/internal/exec-method) method.

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

In this snippet you can see how to export data:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related articles**: 

- [Date formatting](/guides/localization#date-formatting)
- [`export`](/api/table/export)