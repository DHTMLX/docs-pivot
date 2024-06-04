---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Configuration

You can configure the *Pivot* appearance and functionality via the corresponding API, namely, you can configure the Pivot table elements and the configuration panel. The available parameters will allow you to:

- define the structure of the Pivot table and how data is aggregated via the [`config`](/api/config/config-property) property
- change the table configuration on the fly via the [`render-table`](/api/events/render-table-event) event
- configure the look of the Pivot table via the [`tableShape`](/api/config/tableshape-property) property
- configure the look and behavior of the Pivot columns via the [`columnShape`](/api/config/columnshape-property) property
- configure the look and behavior of headers in the Pivot table via the [`headerShape`](/api/config/headershape-property) property
- control the visibility of the configuration panel via the [`show-config-panel`](/api/methods/showconfigpanel-method) method
- apply the desired locale via the [setLocale()](/api/methods/setlocale-method) method (see the [Localization](/guides/localization) section)
- load data and fields via the corresponding [`data`](/api/config/data-property) and [`fields`](/api/config/fields-property) properties
- define how data should be modified before it's applied via the [`predicates`](/api/config/predicates-property) property
- define custom mathematical methods for data aggregation via the [`methods`](/api/config/methods-property) property
- control the maximum limit for the number of rows and columns in the final dataset via the [`limits`](/api/config/limits-property) property

All instructions about working with data see here: [Working with data](guides/working-with-data)

## Table

You can configure and/or customize the following elements of the Pivot table:

- columns and rows
- headers and footers
- cells
- filters
- the table sizes

### Resizing the Pivot table

You can change the size of the table rows and columns, header and footer using the [`tableShape`](/api/config/tableshape-property) property.

~~~jsx
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

### Autosizing columns to content

The widget allows setting the minimum width value for all columns as well as enable sizing for the header, data only or combined auto sizing. To configure all these autosizing settings, you should apply the `autoWidth` parameter of the [`columnShape`](/api/config/columnshape-property) property. 

All parameters of `autoWidth` are optional and detailed description of each parameter you can see here: [columnShape property](/api/config/columnshape-property).

- use the `columns` parameter to define if the width of columns should be calculated automatically and which columns will be affected
- use the `auto` parameter to adjust the width to the header or cell content (or both)
- use `maxRows` to specify how many data rows will be used to detect size of a column; by default 20 rows are used

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
        id: "title",
        method: "count",
      },
      {
        id: "score",
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

### Making columns collapsible

It's possible to collapse/expand columns that are under one header. To make columns collapsible, use the value of the `collapsible` parameter of the [`headerShape`](/api/config/headershape-property) property by setting it to **true**.

~~~jsx {4-6}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data,
  headerShape: {
    columnCollapsing: true,
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

### Freezing columns

The widget allows freezing columns on the left side, which makes the left-most columns static and visible while scrolling. To freeze columns, apply the **split** parameter of the [`tableShape`](/api/config/tableshape-property) property by setting its value to **true**.

:::note
The number of columns that are split is equal to the number of the rows fields that are defined in the [`config`](/api/config/config-property) property. 2 columns are fixed by default.
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
    boolean: true
    },
  },
});
~~~

You can also apply a custom split using the [`render-table`](/api/events/render-table-event) event. 

:::note
For the custom split, the number of columns that are split depends on the number of the rows and values fields that are defined in the [`config`](/api/config/config-property) property.
It's not recommended to split columns with colspans.
:::

In the example below we split all rows fields (two rows are defined in the config) and the first two columns (the first two values fields).

~~~jsx
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

### Switching to the tree mode

The widget allows presenting data in a hierarchical format with expandable rows. To switch to the tree mode, apply the `tree` parameter of the [`tableShape`](/api/config/tableshape-property) property by setting its value to **true** (default is **false**).
To specify the parent row, put its name first in the `rows` array of the [`config`](/api/config/config-property) property. 

~~~jsx
const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    tree: true,
    templates: {
      rank: (v) => v,
      members: (v) => v,
    },
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

### Expanding/collapsing all rows

To expand/collapse all rows, the tree mode should be enabled via the `tableShape` property and you should use the [`render-table`](/api/events/render-table-event) event that allows changing configuration settings, namely, making data rows expanded or collapsed (via the `row.open` parameter of the tableConfig object).

The example below shows how to expand/collapse all data rows with the button click in the table tree mode.

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

### Changing text orientation in headers

To change text orientation from default horizontal to vertical, use the [`headerShape`](/api/config/headershape-propeprty) property and set its `vertical` parameter to **true**. 

~~~jsx {4-6}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data,
  headerShape: {
    vertical: true,
  },
  tableShape: {
    sizes: {
      colWidth: 70,
    },
  },
  columnShape: {
    width: {
      studio: 200,
    },
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

### Adding columns and rows with total values

To enable generating the rightmost column with total values, apply the [`tableShape`](/api/config/tableshape-property) property and set the value of the `totalColumn` parameter to **true**.

To enable generating the footer with total, apply the [`tableShape`](/api/config/tableshape-property)property and set the value of the `totalRow` parameter to **true**.

Example:

~~~jsx {2-5}
const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    totalRow: true,
    totalColumn: true,
  },
  fields,
  data,
  config: {
    rows: ["studio"],
    columns: ["type"],
    values: [
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
        method: "sum",
      },
    ],
  },
});
~~~

### Setting date format

tbd

Pivot uses the following characters for setting the date format:

| Character | Definition                                        |Example                  |
| :-------- | :------------------------------------------------ |:------------------------|
| %d        | day as a number with leading zero                 | from 01 to 31           |
| %j        | day as a number                                   | from 1 to 31            |
| %D        | short name of the day (abbreviation)              | Su Mo Tu Sat            |
| %l        | full name of the day                              | Sunday Monday Tuesday   |
| %m        | month as a number with leading zero               | from 01 to 12           |
| %n        | month as a number                                 | from 1 to 12            |
| %M        | short name of the month                           | Jan Feb Mar             |
| %F        | full name of the month                            | January February March  |
| %y        | year as a number, 2 digits                        | 24                      |
| %Y        | year as a number, 4 digits                        | 2024                    |
| %h        | hours 12-format with leading zero                 | from 01 to 12           |
| %g        | hours 12-format                                   | from 1 to 12            |
| %H        | hours 24-format with leading zero                 | from 00 to 23           |
| %G        | hours 24-format                                   | from 0 to 23            |
| %i        | minutes with leading zero                         | from 01 to 59           |
| %s        | seconds with leading zero                         | from 01 to 59           |
| %a        | am or pm                                          | am (for time from midnight until noon) and pm (for time from noon until midnight)|
| %A        | AM or PM                                          | AM (for time from midnight until noon) and PM (for time from noon until midnight)|
| %u        | milliseconds                                      | 128                     |

To present the 20th of June, 2024 with the exact time as *2024-09-20 16:47:08.128*, specify "%Y-%m-%d-%H:%i:%s.%u".

### Working with filters

The widget allows you to set various filters for fields depending on the type of data. It's possible to specify filters both via the Pivot interface after initialization or through the corresponding API using the [`config`](/api/config/config-property) property.

In GUI, filters appear as drop-down lists for each field.

#### Types of filters

The Pivot widget provides the next condition types for filtering:

- for text values: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith  
- for numeric values: greater: less, greaterOrEqual, lessOrEqual, equal,	notEqual, contains, notContains  
- for date types: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween

The widget also allows you to apply the **include** filtering rule to the data already filtered by one of the conditions. 

Fields with the additional filter are marked with a special sign in GUI: 

img to be changed

![filtering](/assets/filtering.png)

#### Default filters

Filters set by default are the following:
- for numeric values: greater
- for text values: contains (the **name** field **contains=A**)
- for date values: between

#### Adding a filter

To set a filter, add the **filters** array with the field ID and filter type to the [`config`](/api/config/config-property) property.

~~~jsx {5-40}
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data,

  config: {
    rows: [
    "studio",
    "genre"],
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
    filters: {
      genre: {
        // filter for the "genre" field
        condition: {
          filter: "D",
          type: "contains",
        },
        includes: [
          // precise values to be displayed from those that match the filer condition above
          "Drama",
        ],
      },
      title: {
        // filter for another field ("title")
        condition: {
          filter: "A",
          type: "contains",
        },
      },
    },
  },
});
~~~

## Configuration panel

### Default settings

The configuration panel is displayed by default. The widget provides the default functionality that allows toggling the visibility of the configuration panel with the button click. It's made possible via the [`show-config-panel`](/api/event/show-config-panel-event) event.

### Hiding configuration panel

To hide the panel hide, you can trigger the [`show-config-panel`](/api/methods/show-config-panel-method) method with the [`api.exec()`](/api/methods/exec-method) method, and set the `mode` parameter to **false**.

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

You can block toggling the visibility of the configuration panel on the button click via the [`api.intercept()`](/api/methods/intercept-method) method (by listening to the [`show-config-panel`](/api/methods/show-config-panel-method) method and returning *false*).


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

## Example

In this snippet you can see how to configure the key elements of Pivot:

<iframe src="https://snippet.dhtmlx.com/" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> TODO!!!
