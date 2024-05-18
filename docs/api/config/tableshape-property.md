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
    [fieldName: string]: (
      value: any,
      operation: string
    ) => any;
  },
  totalRow?: boolean | "sumOnly",
	totalColumn?: boolean | "sumOnly",
  marks?: {
    [cssClass: string]: ((v: any, columnData: any, rowData: any) => boolean)
     | "max" 
     | "min"
  },
  sizes?: {
    rowHeight?: number,
    headerHeight?: number,
    colWidth?: number,
    footerHeight?: number
  },
  tree?:boolean,
  cleanRows?: boolean,
  split?: {
    left?: number;
  },
};
~~~

### Parameters

- `templates` -  (optional) allows setting templates to a cell; it's an object where:
 - each key is a field id
 - the value is a function that returns a string and receives cell value and operation 
 All columns based on the specified field will have the related template applied. For example, it allows setting the units of measurement or returning the required number of digits after the decimal point for numeric values, etc. See the example below. 
- `marks` - (optional) allows marking a cell with the required values; it's an object where keys are CSS class names and values are either a function or one of the predefined strings ("max", "min"). The default value is {}. The function should return boolean for the checked value; if **true** is returned, the css class is assigned to the cell. More information with examples see here [Marking cells](/guides/configuration#marking-cells).
- `sizes` - (optional) defines the following size parameters of the table: 
  - `rowHeight` - (optional) the row height in the Pivot table in pixels; the default value is 34
  - `headerHeight` - (optional) the header height in pixels; the default value is 30
  - `footerHeight` - (optional) the footer height in pixels; the default value is 30
  - `colWidth` - (optional) the column width in pixels; the default value is 150
- `tree` - (optional) if set to **true**, enables the tree mode when data can be presented with expandable rows; the default value is **false**; more information with examples see here [Switching to the tree mode](/guides/configuration/#switching-to-the-tree-mode)
- `totalColumn` - (optional) enables generating the total column. The default value is **false**; 
- `totalRow` - (optional) enables generating the footer with total values (if set to **true**) the default value is **false**
- `cleanRows` - (optional) if set to **true**, the duplicate values in scale columns are hidden in the table view. The default value is **false**
- `split` - (optional) defines the number of fixed columns from the left. Contains an object with the `left` property that has the value of the number of columns to be frozen

By default, `tableShape` is undefined, implying that no total row, no total column is present, no templates and marks are applied, the data is shown as a table and not a tree, and left columns are not fixed during scroll.

## Example

In the example below we apply the template to the *score* values to display 2 digits after the decimal point for these values and we add the "€" sign to the *price* values. 

~~~jsx {1,6}
const templates = { price: (v) => (v ? "€" + v : v), score: (v) => (v ? parseFloat(v).toFixed(2) : v) };

const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    tree: true,
    templates,
  },
  fields,
  data,
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
