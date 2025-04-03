---
sidebar_label: Exporting data
title: Exporting data
description: You can explore how to export data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Exporting data

To export the table data to the XLSX or CSV format, it's necessary to get access to the underlying Table widget instance inside Pivot and apply its API to export data. To do this, you should use the [`getTable`](/api/methods/gettable-method) method and execute the `export` action:

```js
"export": ({
    options: {},
    result: any
}) => boolean|void;
```

The `export` action of the Table widget has the next parameters that you can configure to your needs: 

- `options` - an object with the export options; options differ depending on the format type:
    - `format` (string) - (optional) the export format that can be "csv" or "xlsx"  
    **Options for "xlsx" format:**
    - `fileName` (string) - (optional) a name of .xlsx file ("data" by default)
    - `sheetName` (string) - a name of Excel sheet ( "data" by default)
    - `styles` - custom styles for cells in the header, body, and footer. Can be configured using a hash of style properties:
        ~~~
        header: { /* style properties for header cells */ }
        // Names of style properties should be written in camelCase, for example:
        //header: { borderBottom:  "0.5px solid #dfdfdf", borderRight:  "0.5px solid #dfdfdf" },
        lastHeaderCell:  { /*  style properties for the last row of header cells ( optional ) */  },
        cell: { /* style properties for body cells */ },
        firstFooterCell: { /*style properties for the first row of footer cells ( optional ) */ },
        footer: { /* style properties for footer cells */ }
        ~~~
        If `styles` is set to **false**, grid will be exported without any styling.
	- `cellTemplate` - a function to customize the export value of each cell. It takes the value, row, and column objects as parameters and returns the custom value to be exported: `(value, rowObj, columnObj) => string`
	- `headerCellTemplate` -  a function that customizes the value of a header or footer cell during export. It is called with the text, header cell object, column object, and cell type ("header" or "footer"). This allows users to modify the exported header/footer values: `(text, headerCell, columnObj, type: "header"| "footer") => string`
	- `cellStyle` -  a function that allows customizing the style and format of individual cells during export. It takes the value, row, and column objects as parameters and should return an object with style properties (e.g., alignment or format): `(value, rowObj, columnObj) => any | null`
	- `headerCellStyle` - similar to cellStyle, but specifically for the header and footer cells. This function takes the text, header cell object, column object, and type ("header" or "footer") and returns style properties: `(text, headerCell, columnObj, type: "header"| "footer") => any | null`
    - `header` (boolean) - (optional) defines if a header should be exported (**true** by default)
    - `footer` (boolean) - (optional) defines if a footer should be exported (**true** by default)
    - `download` (boolean) - (optional) defines whether to download a file. **true** is set by default. if set to **false**, the file will not be downloaded, Excel data (Blob) will be available as `ev.result`  
    **Options for "csv" format:**
    - `fileName` (string) - (optional) a file name ("data" by default)
    - `rows` (string) - (optional) rows delimiter, "\n" by default
    - `cols` (string) - (optional) columns delimiter, "\t" by default
    - `header` (boolean) - (optional) defines if a header should be exported (**true** by default)
    - `footer` (boolean) - (optional) defines if a footer should be exported (**true** by default)
    - `download` (boolean) - (optional) defines whether to download a file. **true** is set by default. if set to **false**, the file will not be downloaded, CSV data (Blob) will be available as `ev.result`
- `result` - the exported data result (usually Blob or file depending on the `download` option)

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

:::info
Raw values are exported for date and number fields with visible formatting, but if a template is defined for a field, it exports the rendered value defined by that template. You can also configure the export settings via the `format` parameter of the [`fields`](/api/config/fields-property) property. In case both the template and format are set, the template settings will override the format ones. 
:::

## Example

In this snippet you can see how to export data:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related articles**: [Date formatting](/guides/localization#date-formatting)