---
sidebar_label: Exporting data
title: Exporting data
description: You can explore how to export data in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Exporting data

To export the table data to the XLSX or CSV format, it's necessary to get access to the underlying Table widget instance inside Pivot and apply its API to export data. To do this, you should use the [`getTable`](/api/methods/gettable-method) method and execute the `export` action:

```js
"export": ({
    options: {
        format: "csv" | "xlsx";
        fileName?: string;
        sheetName?: string; 
        header?: boolean;
        footer?: boolean;
        download?: boolean;

        /* XLSX settings*/
        styles?: boolean | {
            header?: {
                fontWeight?: "bold";
                color?: string;
                background?: string;
                align?: "left"|"right"|"center";
                borderBottom?:  string;
                borderRight?:  string;
            }
            lastHeaderCell?:  { /*  same as header */  };
            cell?: { /*  same as header */ };
            firstFooterCell?: { /*  same as header */ };
            footer?: {/*  same as header */};
        }
        cellTemplate?: (value: any, row: any, column: object ) 
            => string | null;
        headerCellTemplate?: (text: string, cell: object, column: object, type: "header"| "footer") 
            => string | null;
        cellStyle?: (value: any, row: any, column: object) 
            => { format: string; align: "left"|"right"|"center" } | null; 
        headerCellStyle?: (text: string, cell: object, column: object, type: "header"| "footer") 
            => { format: string; align: "left"|"right"|"center" } | null;

        /* CSV settings */
        rows: string;
        cols: string;
    },
    result?: any;
}) => boolean|void;
```

The `export` action of the Table widget has the next parameters that you can configure to your needs: 

- `options` - an object with the export options; options differ depending on the format type:
    - `header` (boolean) - (optional) defines if a header should be exported (**true** by default)
    - `footer` (boolean) - (optional) defines if a footer should be exported (**true** by default)
    - `download` (boolean) - (optional) defines whether to download a file. **true** is set by default. if set to **false**, the file will not be downloaded, CSV data (Blob) will be available as `ev.result`
    - `format` (string) - (optional) the export format that can be "csv" or "xlsx"  
    **Options for "xlsx" format:**
    :::note
    By default, for the "xlsx" format, date and number fields are exported as raw values with default format or the format defined via the [`fields`](/api/config/fields-property) property. But if a template is defined for a field (see the [`tableShape`](/api/config/tableshape-property) property), it exports the rendered value defined by that template. In case both the template and `format` are set, the template settings will override the format ones. 
    :::
    - `fileName` (string) - (optional) a name of .xlsx file ("data" by default)
    - `sheetName` (string) - a name of Excel sheet ( "data" by default)
    - `styles` (boolean or object) - if set to **false**, grid will be exported without any styling; an object includes parameters for custom styles for cells in the header, body, and footer. Can be configured using a hash of style properties:  
        - header - style properties for header cells with the next properties: 
            - `fontWeight` (string) - (optional) can be set to "bold" or if not set, the font will be normal
            - `color` (string) - (optional) text color in header
            - `background` (string) - (optional) background color for header
            - `align` - (optional) text alignment that can be "left"|"right"|"center"; if not set, alignment set in Excel will be applied
            - `borderBottom` (string) - (optional) the style of the bottom border
            - `borderRight` (string) - (optional) the style of the right border (e.g., *borderRight:  "0.5px solid #dfdfdf"* )
        - lastHeaderCell - style properties for the last row of header cells; properties are the same as for *header*
        - cell - style properties for body cells; properties are the same as for *header*
        - firstFooterCell - style properties for the first row of footer cells; properties are the same as for *header*
        - footer - style properties for footer cells; properties are the same as for *header*
    - `cellTemplate` - a function to customize the export value of each cell. It takes the value, row, and column objects as parameters and returns the custom value to be exported;
	- `headerCellTemplate` -  a function that customizes the value of a header or footer cell during export. It is called with the text, header cell object, column object, and cell type ("header" or "footer"). This allows users to modify the exported header/footer values. 
	- `cellStyle` -  a function that allows customizing the style and format of individual cells during export. It takes the value, row, and column objects as parameters and should return an object with style properties (e.g., alignment or format)
	- `headerCellStyle` - similar to cellStyle, but specifically for the header and footer cells. This function takes the text, header cell object, column object, and type ("header" or "footer") and returns style properties
    - `header` (boolean) - (optional) defines if a header should be exported (**true** by default)
    - `footer` (boolean) - (optional) defines if a footer should be exported (**true** by default)
    - `download` (boolean) - (optional) defines whether to download a file. **true** is set by default. if set to **false**, the file will not be downloaded, Excel data (Blob) will be available as `ev.result`  
    **Options for "csv" format:**
    - `fileName` (string) - (optional) a file name ("data" by default)
    - `rows` (string) - (optional) rows delimiter, "\n" by default
    - `cols` (string) - (optional) columns delimiter, "\t" by default
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

## Example

In this snippet you can see how to export data:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related articles**: [Date formatting](/guides/localization#date-formatting)