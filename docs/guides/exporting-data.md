---
sidebar_label: Exporting data
title: Exporting data
description: You can explore how to export data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Export data

To export Pivot data to XLSX or CSV, access the underlying Table widget instance with the [`getTable()`](/api/methods/gettable-method) method and call `exec("export", ...)` with the required options.

The following code snippet accesses the Table instance with `getTable()` and triggers the `export` action for both CSV and XLSX formats:

~~~jsx
const widget = new pivot.Pivot("#root", { /* config */ });

// export to CSV
widget.api.getTable().exec("export", {
    options: {
        format: "csv",
        cols: ";"
    }
});

// export to XLSX
widget.api.getTable().exec("export", {
    options: {
        format: "xlsx",
        fileName: "My Report",
        sheetName: "Quarter 1",
    }
});
~~~

## Export to CSV

Use the [`getTable()`](/api/methods/gettable-method) method to access the Table widget instance and call `exec("export", ...)` with `format: "csv"`.

The following code snippet exports the table to CSV with a semicolon as column delimiter:

~~~jsx
widget.api.getTable().exec("export", {
    options: {
        format: "csv",
        fileName: "report",
        cols: ";",    // column delimiter, "\t" by default
        rows: "\n"    // row delimiter, "\n" by default
    }
});
~~~

## Export to XLSX

The following code snippet exports the table to XLSX with a custom file and sheet name:

~~~jsx
widget.api.getTable().exec("export", {
    options: {
        format: "xlsx",
        fileName: "My Report",
        sheetName: "Quarter 1",
        header: true,    // include header, true by default
        footer: true,    // include footer, true by default
        download: true   // trigger file download, true by default
    }
});
~~~

Set `download` to `false` to suppress the file download and access the exported data as a Blob via `ev.result` instead.

## Customize export output

Use the following XLSX-specific options to control cell values and styling during export:

- `cellTemplate` — a function to override the exported value of each data cell; receives `value`, `row`, and `column` and returns the custom value
- `headerCellTemplate` — a function to override the exported value of header or footer cells; receives `text`, header cell object, `column`, and `type` (`"header"` or `"footer"`)
- `cellStyle` — a function that returns alignment and format for a data cell
- `headerCellStyle` — a function that returns alignment and format for a header or footer cell
- `styles` — set to `false` to export without styling, or pass an object with style settings for `header`, `cell`, `footer`, `lastHeaderCell`, and `firstFooterCell` cells

:::note
By default, date and number fields export as raw values with the format defined via the [`fields`](/api/config/fields-property) property. If a template is set via [`tableShape`](/api/config/tableshape-property), the rendered value is exported instead. If both `cellTemplate` and `format` are set, `cellTemplate` takes precedence.
:::

The live example below demonstrates both export formats:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>

**Related articles**:

- [Date formatting](/guides/localization#date-formatting)
- [`export`](/api/table/export)
