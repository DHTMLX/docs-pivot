---
sidebar_label: tableShape
title: tableShape Config
description: You can learn about the tableShape config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# tableShape

### Description

@short: Optional. Configures the look of the Pivot table 

### Usage

~~~jsx
tableShape?: {
    templates?: {
    [fieldName: string]: (value: any) => string
  },
  footer?: boolean | "sumOnly",
	totalColumn?: boolean | "sumOnly",
  marks?: {
    [className: string]: ((value: number) => boolean) | "max" | "min"
  },
  sizes?: {
    rowHeight?: number,
    headerHeight?: number,
    colWidth?: number,
    footerHeight?: number
  },
  tree?:boolean,
  totalColumn?: boolean,
  cleanRows?: boolean,
  dateToString?: (value: Date) => string,
  dateFormat?: string
};
~~~

### Parameters

- `templates` -  (optional) allows setting templates to a cell; it's an object where each key is a field id and the value is a function that returns a string. All columns based on the specified field will have the related template applied. For example, it allows setting the units of measurement or returning fixed decimal point for numeric values, etc. See the example below. 
- `marks` - (optional) allows marking a cell with the required values; it's an object where keys are CSS class names and values are either a function or one of the predefined strings ("max", "min"). The default value is {}. The function should return boolean for the checked value; if **true** is returned, the css class is assigned to the cell. More information with examples see here [Marking cells](/guides/configuration/mark_cells).
- `sizes` - (optional) defines the following size parameters of the table: 
  - `rowHeight` - (optional) the row height in the Pivot table in pixels; the default value is 34
  - `headerHeight` - (optional) the header height in pixels; the default value is 30
  - `footerHeight` - (optional) the footer height in pixels; the default value is 30
  - `colWidth` - (optional) the column width in pixels; the default value is 150
- `tree` - (optional) if set to **true**, enables the tree mode when data can be presented with expandable rows; the default value is **false**; more information with examples see here [Switching to the tree mode](/guides/configuration/tree_mode)
- `totalColumn` - (optional) enables generating the total column. The default value is **false**; it also enables calculating the "sum" values, if set to "sumOnly"
- `footer` - (optional) enables generating the footer with total values (if set to **true**) or sum values if set to "sumOnly"; the default value is **false**
- `cleanRows` - (optional) if set to **true**, the duplicate values in scale columns are hidden in the table view. The default value is **false**
- `dateToString` - (optional) a default template for the date type if no custom predicate is set; it's a function that transforms the date value to a string depending on the current locale; the function takes the date (JS Date object) and returns the string with the converted date
- `dateFormat` - (optional) date format; the default value is "%d %M %Y %H:%i"

## Example

In the example below we apply the template to the *score* values to display only 2 decimal points for these values and we add the "€" sign to the *price* values. 

~~~jsx {1,6}
const templates = { price: (v) => (v ? "€" + v : v), score: (v) => (v ? "$" + parseFloat(v).toFixed(2) : v) };

const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    tree: true,
    templates,
  },
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        id: "title",
        method: "count",
      },
      {
        id: "score",
        method: "max",
      },
      {
        id: "price",
        method: "count",
      },
    ],
  },
});
~~~
