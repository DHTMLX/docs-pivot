---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Configuration

You can configure Pivot appearance and functionality via the corresponding API, namely, you can configure the Pivot table elements and the configuration panel. The available parameters will allow you to:

- define the structure of the Pivot table and how data is aggregated via the [`config`](/api/config/config-property) property
- change the table configuration on the fly via the [`render-table`](/api/events/render-table-event) event
- configure the look of the Pivot table via the [`tableShape`](/api/config/tableshape-property) property
- configure the look and behavior of the Pivot columns via the [`columnShape`](/api/config/columnshape-property) property
- configure the look and behavior of headers in the Pivot table via the [`headerShape`](/api/config/headershape-property) property
- control the visibility of the configuration panel via the [`configPanel`](/api/config/configpanel-property) property
- apply the desired locale via the [`setLocale()`](/api/methods/setlocale-method) method (see the [Localization](/guides/localization) section)
- load data and fields via the corresponding [`data`](/api/config/data-property) and [`fields`](/api/config/fields-property) properties
- define how data should be modified before it's applied via the [`predicates`](/api/config/predicates-property) property
- define custom mathematical methods for data aggregation via the [`methods`](/api/config/methods-property) property
- control the maximum limit for the number of rows and columns in the final dataset via the [`limits`](/api/config/limits-property) property

All instructions about working with data see here: [Working with data](/guides/working-with-data)

You can configure and/or customize the following elements of the Pivot table:

- columns and rows
- headers and footers
- cells
- the table sizes

## Resizing the table

You can change the size of the table rows and columns, header and footer using the [`tableShape`](/api/config/tableshape-property) property.

The next sizes are applied by default:

~~~jsx
const sizes = {
  rowHeight: 34,
  headerHeight: 30,
  footerHeight: 30,
  colWidth: 150,
};
~~~

Example:

~~~jsx {4-11}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data,
  tableShape: {
    sizes: {
      rowHeight: 44,
      headerHeight: 60,
      footerHeight: 30,
      colWidth: 170,
    },
  },
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
~~~

:::info
To set the width of specific column(s), apply the `width` parameter of the [columnShape property](/api/config/columnshape-property).
:::

## Autosizing columns to content

The widget allows setting the minimum width value for all columns and it also enables sizing for the table data only, the table header or combined auto sizing. To configure all these autosizing settings, you should apply the `autoWidth` parameter of the [`columnShape`](/api/config/columnshape-property) property. 

All parameters of `autoWidth` are optional and for detailed description of each parameter refer to the [columnShape](/api/config/columnshape-property) property.

- use the `columns` parameter to define if the width of columns should be calculated automatically and which columns will be affected
- use the `auto` parameter to adjust the width to the header or cell content (or both)
- use `maxRows` to specify how many data rows will be applied to detect the size of a column; by default 20 rows are used

If `firstOnly` is set to **true** (default), each field of the same data is analyzed only once to calculate the column width. In case of multiple columns based on the same data (e.g., the *oil* field with the *count* operation and the *oil* field with the *sum* operation), only data in the first one will be analyzed and the others will inherit this width.

Example:

~~~jsx {18-30}
const pivotWidget = new pivot.Pivot("#pivot", {
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
  columnShape: {
    autoWidth: {
      // calculate column width for these fields
      columns: {
        studio: true,
        genre: true,
        title: true,
        score: true,
      },
      // analyze all fields
      firstOnly: false,
    },
  },
});
~~~

## Applying templates to cells

To set a template to cells, use the `templates` parameter of the [`tableShape`](/api/config/tableshape-property) property. It's an object where each key is a field id and the value is a function that returns a string. All columns based on the specified field will have the related template applied. 

In the example below we apply the template to the *score* values to display 2 digits after the decimal point for these values and we add the "€" sign to the *price* values. 

~~~jsx {1-4,8}
const templates = { 
price: (v) => (v ? "€" + v : v),
score: (v) => (v ? parseFloat(v).toFixed(2) : v) 
};

const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    templates,
  },
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
      {
        field: "price",
        method: "count",
      },
    ],
  },
});
~~~

## Applying templates to headers

To define the format of text in headers, apply the `template` parameter of the [`headerShape`](/api/config/headershape-property) property. The parameter is the function that:
- takes the field id, label and sublabel (the name of a method if any is applied)
- returns the processed value 

A default template is as follows: *template: (label, id, subLabel) => label + (subLabel ? `(${subLabel})` : "")*. By default, for the fields applied as values the label and method are shown (e.g., *Oil(count)*). 
If no other template is applied to columns, the value of the `label` parameter is displayed. If any [`predicates`](/api/config/predicates-property) template is applied, it will override the template of the `headerShape` property. 

Example:

In the example below for the **values** fields the header will display the method name (subLabel) and the label:

~~~jsx {19-22}
const pivotWidget = new pivot.Pivot("#pivot", {
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

  headerShape: {
    vertical: true,
    template: (label, id, subLabel) => id + (subLabel ? ` (${subLabel})` : ""),
  },
});
~~~

## Making columns collapsible

It's possible to collapse/expand columns that are under one header. To make columns collapsible, use the value of the `collapsible` parameter of the [`headerShape`](/api/config/headershape-property) property by setting it to **true**.

~~~jsx {4-6}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data,
  headerShape: {
    collapsible: true,
  },
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
~~~

## Freezing columns

The widget allows freezing columns on the left side, which makes the leftmost columns static and visible while scrolling. To freeze columns, apply the **split** parameter of the [`tableShape`](/api/config/tableshape-property) property by setting the value of the `left` property to **true**.

:::info
The number of columns that are split is equal to the number of the rows fields that are defined in the [`config`](/api/config/config-property) property. 2 columns are fixed by default. In the **tree** mode only one columns gets frozen regardless of the number of the rows fields that are defined. 
:::

~~~jsx {18-21}
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data,
  config: {
    rows: ["studio"],
    columns: ["genre"],
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
  tableShape: { split: {
    left: true //freezes all fields from rows on the left side 
    },
  },
});
~~~

You can also apply a custom split using the [`render-table`](/api/events/render-table-event) event. 

:::info
For the custom split, the number of columns that are split depends on the number of the rows and values fields that are defined in the [`config`](/api/config/config-property) property.
It's not recommended to split columns with colspans.
:::

In the example below we split all rows fields (two rows are defined in the config) and the first two columns (the first two values fields).

~~~jsx {19-24}
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data,
  config: {
    rows: ["continent", "name"],
    columns: ["year"],
    values: [
      {
        field: "oil",
        method: "sum",
      },
      {
        field: "oil",
        method: "count",
      },
    ],
  },
});
pivotWidget.api.on("render-table", (tableConfig) => {
  const config = api.getState().config;

  tableConfig.split = {
    left: config.rows.length + config.values.length * 2,
  };
});
~~~

## Sorting in columns

The sorting functionality is enabled by default. A user can click the column's header to sort data. To disable/enable sorting, apply the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property. In the example below we disable sorting.

~~~jsx {19}
const pivotWidget = new pivot.Pivot("#pivot", {
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
  columnShape: {
    sort: false, 
  },
});
~~~

For more information about sorting data, refer to [Sorting data](/guides/working-with-data#sorting-data).

## Enabling the tree mode

The widget allows presenting data in a hierarchical format with expandable rows. To switch to the tree mode, apply the `tree` parameter of the [`tableShape`](/api/config/tableshape-property) property by setting its value to **true** (default is **false**).
To specify the parent row, put its name first in the `rows` array of the [`config`](/api/config/config-property) property. 

~~~jsx {3}
const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    tree: true,
  },
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
      {
        field: "episodes",
        method: "count",
      },
      {
        field: "rank",
        method: "min",
      },
      {
        field: "members",
        method: "max",
      },
    ],
  },
});
~~~

## Expanding/collapsing all rows

To expand/collapse all rows, the **tree** mode should be enabled via the [`tableShape`](/api/config/tableshape-property) property and you should use the [`render-table`](/api/events/render-table-event) event that allows changing configuration settings, namely, making data rows expand or collapse (via the `row.open` parameter of the [`config`](/api/config/config-property) object).

The example below shows how to expand/collapse all data rows with the button click in the table tree mode.

~~~jsx
const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    tree: true,
  },
  fields,
  data: dataset,
  config: {
    rows: ["type", "studio"],
    columns: [],
    values: [
      {
        field: "score",
        method: "max",
      },
      {
        field: "rank",
        method: "min",
      },
      {
        field: "members",
        method: "sum",
      },
      {
        field: "episodes",
        method: "count",
      },
    ],
  },
});

const api = widget.api;
const table = api.getTable();
//  setting all table branches closed on the table config update
api.intercept("render-table", (ev) => {
  ev.config.data.forEach((r) => (r.open = false));

  // returning "false" here will prevent the table from rendering
  // return false;
});

function openAll() {
  table.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
  table.exec("close-row", { id: 0, nested: true });
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

## Changing text orientation in headers

To change text orientation from default horizontal to vertical, use the [`headerShape`](/api/config/headershape-property) property and set its `vertical` parameter to **true**. 

~~~jsx {4-6}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data,
  headerShape: {
    vertical: true,
  },
  config: {
    rows: ["studio"],
    columns: ["type"],
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
~~~

## Controlling visibility of Configuration panel

The Configuration panel is displayed by default. The widget provides the default functionality that allows controlling the visibility of the Configuration panel with the button click. It's made possible via the [`configPanel`](/api/config/configpanel-property) property or [`show-config-panel`](/api/events/show-config-panel-event) event.

### Hiding Configuration panel

To hide the panel, set the value of the [`configPanel`](/api/config/configpanel-property) property to **false**.

~~~jsx 
// The configuration panel is hidden on init
const widget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  
  configPanel: false,

  config: {
    rows: ["hobbies"],
    columns: ["relationship_status"],
    values: [
      {
        field: "age",
        method: "min",
      },
      {
        field: "age",
        method: "max",
      },
    ],
  },
});
~~~

You can also trigger the [`show-config-panel`](/api/events/show-config-panel-event) event with the [`api.exec()`](/api/internal/exec-method) method, and set the `mode` parameter to **false**.

~~~jsx {19-22}
const widget = new pivot.Pivot("#pivot", {
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
//hide the configuration panel
widget.api.exec("show-config-panel", {
  mode: false,
});
~~~

### Disabling the default toggling functionality

You can block toggling the visibility of the Configuration panel on the button click via the [`api.intercept()`](/api/internal/intercept-method) method (by listening to the [`show-config-panel`](/api/events/show-config-panel-event) event and returning *false*).

Example:

~~~jsx {20-22}
const pivotWidget = new pivot.Pivot("#pivot", {
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

pivotWidget.api.intercept("show-config-panel", () => {
  return false;
});
~~~

You can also control the visibility of the Configuration panel using the [`showConfigPanel()`](api/methods/showconfigpanel-method) method.

### Actions with fields in the panel

In the Configuration panel it's possible to perform the next operations with fields:

- [add-field](/api/events/add-field-event)
- [delete-field](/api/events/delete-field-event)
- [update-field](/api/events/update-field-event)
- [move-field](/api/events/reorder-fields-event)

## Example

In this snippet you can see how to apply templates to the Pivot cells:

<iframe src="https://snippet.dhtmlx.com/n9ylp6b2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
