---
sidebar_label: render-table
title: render-table Event
description: You can learn about the render-table event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# render-table

### Description

@short: Fires after the widget configuration has been processed and just before the table is rendered

It allows you to alter the final table configuration on the fly or prevent the rendering of the table altogether.

### Usage

~~~jsx {}
"render-table": ({
   config: {
    columns?: [],
    data: [],
    footer?: boolean,
    sizes: {},
    split?: {
      left?: number,
    },
    tree?: boolean,
    cellStyle?: (row: any, col: any) => string
}
}) => boolean | void;
~~~

### Parameters

The callback of the action takes the `config` object with the following parameters:

- `columns` - (optional) columns array with the next parameters for each object:
  - `id` (number) - (optional) the id of a column
  - `header`- (optional) an object with header settings:
      - `text` (string) - (optional) a header label
      - `rowspan` (number) - (optional) the number of rows a header should span
      - `colspan` (number) - (optional) the number of columns a header should span
  - `footer` - (optional) a header label or an object with footer settings which are the same as the header settings
  - `field` - (optional) it's a string which is the id of a field
  - `template` - (optional) the template that is defined via the [`tableShape`](/api/config/tableshape-property) property
- `data` - (optional) an array of objects with data for the table; each object represents a row
- `footer` - (optional) if it's set to **true**, the table footer is displayed at the bottom of the table; it's set to **false** and invisible by default
- `sizes` - (optional) an object with table sizes settings, namely, colWidth, footerHeight, headerHeight, rowHeight
- `split` - (optional) an object with the number of columns that are fixed on the left-size during the scrolling process
- `tree` - (optional) the boolean value with the tree mode setting (**true** if the tree mode is enabled)
- `cellStyle` - (optional) an object where each key is the field id and the value is a function that returns a string. All columns based on the specified field will have the related template applied.

### Returns
 
The callback may return boolean or void.  
If the event handler returns **false**, it will block the operation in question. In this case, it will prevent the rendering of the table.

### Example

The next example shows how to output the `config` object to console and add a footer.

~~~jsx {20-28}
const widget = new pivot.Pivot("#pivot", {
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
    ],
  },
});

widget.api.intercept("render-table", (ev) => {
  console.log(ev.config); //output the config object
  console.log(ev.config.columns); //output the columns array

  ev.config.footer = true;
  ev.config.columns[0].footer = ["Custom footer"];

  // returning "false" here will prevent the table from rendering
});
~~~

The next example shows how to make all rows expand/collapse with the button click. The tree mode should be enabled via the [`tableShape`](/api/properties/tableshape-property) property.

to be changed (eventSource)!!!!!

~~~jsx
const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    tree: true,
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
        id: "episodes",
        method: "count",
      },
      {
        id: "rank",
        method: "min",
      },
      {
        id: "members",
        method: "max",
      },
    ],
  },
});

let mode = "tree";
const options = [
  { value: "tree", label: "Tree mode" },
  { value: "plain", label: "Plain table" },
];

let tableShape = {};
tableShape.tree = mode == "tree";

widget.api.intercept("render-table", (ev) => {
  // close all top-level branches on pivot configuration change
  if (ev.eventSource == "store") ev.config.data.forEach((r) => (r.open = false));
  // returning "false" here will prevent the table from rendering
  // return false;
});

function openAll() {
  setOpenState(true);
}
function closeAll() {
  setOpenState(false);
}
function setOpenState(state) {
  const config = widget.api.getState().tableConfig;
  config.data.forEach((r) => (r.open = state));
  // make a copy to create a new object for update
  config.data = [...config.data];
  // call 'render-table' event with updated 'config'
  // if needed, use another property as a flag for the custom handler ('myEvent' in this demo)
  widget.api.exec("render-table", { config });
}

const openAllButton = document.createElement("button");
openAllButton.addEventListener("click", openAll);
openAllButton.textContent = "Open all";

const closeAllButton = document.createElement("button");
closeAllButton.addEventListener("click", closeAll);
closeAllButton.textContent = "Close all";

document.body.appendChild(openAllButton);
document.body.appendChild(closeAllButton);
~~~

See also how to configure the split feature using the `render-table` event: [Freezing columns](/guides/configuration/###freezing-columns).