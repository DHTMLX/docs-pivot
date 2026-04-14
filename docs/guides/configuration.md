---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Configuration

Configure Pivot appearance and functionality with the following API:

- [`config`](/api/config/config-property) — define the Pivot table structure and data aggregation
- [`render-table`](/api/events/render-table-event) — change the table configuration on the fly
- [`tableShape`](/api/config/tableshape-property) — configure the look of the Pivot table
- [`columnShape`](/api/config/columnshape-property) — configure the look and behavior of columns
- [`headerShape`](/api/config/headershape-property) — configure the look and behavior of headers
- [`configPanel`](/api/config/configpanel-property) — control the visibility of the configuration panel
- [`setLocale()`](/api/methods/setlocale-method) — apply a locale (see [Localization](/guides/localization))
- [`data`](/api/config/data-property), [`fields`](/api/config/fields-property) — load data and fields
- [`predicates`](/api/config/predicates-property) — define how data is modified before the table renders
- [`methods`](/api/config/methods-property) — define custom aggregation methods
- [`limits`](/api/config/limits-property) — control the maximum number of rows and columns in the dataset

For data-related configuration, see [Working with data](/guides/working-with-data).

You can configure the following elements of the Pivot table:

- columns and rows
- headers and footers
- cells
- the table sizes

## Resize the table

Use the [`tableShape`](/api/config/tableshape-property) property to change the size of table rows, columns, headers, and footers.

The following sizes apply by default:

~~~jsx
const sizes = {
    rowHeight: 34,
    headerHeight: 30,
    footerHeight: 30,
    columnWidth: 150
};
~~~

The following code snippet applies custom sizes:

~~~jsx {4-11}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    tableShape: {
        sizes: {
            rowHeight: 44,
            headerHeight: 60,
            footerHeight: 30,
            columnWidth: 170
        }
    },
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

:::info
To set the width of specific column(s), apply the `width` parameter of the [columnShape property](/api/config/columnshape-property).
:::

## Autosize columns to content

Use the `autoWidth` parameter of the [`columnShape`](/api/config/columnshape-property) property to configure autosizing settings. The parameter controls the minimum column width and lets you enable autosizing based on data, headers, or both.

All `autoWidth` parameters are optional. For a full parameter description, see [`columnShape`](/api/config/columnshape-property).

- `columns` — define which columns use automatic width calculation
- `auto` — adjust width to header content, cell content, or both
- `maxRows` — specify the number of data rows used to detect column size (default: 20)

If `firstOnly` is set to `true` (default), each field of the same data is analyzed only once to calculate the column width. In case of multiple columns based on the same data (e.g., the *oil* field with the *count* operation and the *oil* field with the *sum* operation), only data in the first one is analyzed and the others inherit this width.

The following code snippet enables autosizing for specific columns:

~~~jsx {18-30}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    columnShape: {
        autoWidth: {
            // calculate column width for these fields
            columns: {
                studio: true,
                genre: true,
                title: true,
                score: true
            },
            // analyze all fields
            firstOnly: false
        }
    }
});
~~~

## Apply templates to cells

### Add templates via tableShape

Use the `templates` parameter of the [`tableShape`](/api/config/tableshape-property) property to set a template for cells. The `templates` parameter is an object where each key is a field id and the value is a function that returns a string. All columns based on the specified field have the related template applied.

The following code snippet applies a template to *state* cells to display the combined state name with abbreviation:

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
// other values,
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // set a template to customize values of "state" cells
            state: v => v+ ` (${states[v]})`,
        }
    },
    fields,
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // other values
        ],
    },
    fields,
});
~~~

### Add a template via the template helper

Insert HTML content to table cells via the [`pivot.template`](/api/helpers/template) helper by defining a template as a `cell` property of the `column` object. Apply the template right before the table renders by intercepting the [`render-table`](/api/events/render-table-event) event with the [`api.intercept()`](/api/internal/intercept-method) method.

The following code snippet adds star and flag icons to body cells based on the field (id, user_score):

~~~js
function cellTemplate(value, method, row, column) {
    const field = column.fields ? column.fields[row.$level] : column.field;

    if (field === "id") {
        return idTemplate(value);
    }

    if (field === "user_score") {
        return scoreTemplate(value);
    }

    return value;
}

function idTemplate(value) {
    const name = value?.toString().split("-")[0];
    return `<span class="cell-id flag-${name}"></span> ${value}`;
}

function scoreTemplate(value) {
    return `<i class="cell-score wxi-star"></i> ${value}`;
}

widget.api.intercept("render-table", ({ config: tableConfig }) => {
    tableConfig.columns = tableConfig.columns.map((c) => {
        if (c.area === "rows") {
            // Apply a template to column cells from the "rows" area
            c.cell = pivot.template(({ value, method, row, column }) => cellTemplate(value, method, row, column));
        }
        return c;
    });
});
~~~

## Apply templates to headers

### Add templates via headerShape

Use the `template` parameter of the [`headerShape`](/api/config/headershape-property) property to define the format of text in headers. The parameter is a function that:

- takes the field id, label, and sublabel (the name of a method if any is applied)
- returns the processed value

The default template is: *template: (label, id, subLabel) => label + (subLabel ? `(${subLabel})` : "")*. By default, for fields applied as values, the label and method appear (e.g., *Oil(count)*).
If no other template is applied to columns, the value of the `label` parameter is displayed. If a [`predicates`](/api/config/predicates-property) template is applied, it overrides the template of the `headerShape` property.

The following code snippet sets a custom header template that displays the label, method name, and converts the result to lowercase (e.g., *profit (sum)*):

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // a custom template for header text 
        template: (label, id, subLabel) => (label + (subLabel ? ` (${subLabel})` : "")).toLowerCase(),
        },
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // other values
        ],
    },
    fields,
});
~~~

### Add templates via the template helper

Insert HTML content to header cells via the [`pivot.template`](/api/helpers/template) helper by defining a template as a `cell` property of the header cell object. Apply the template right before the table renders by intercepting the [`render-table`](/api/events/render-table-event) event with the [`api.intercept()`](/api/internal/intercept-method) method.

The following code snippet adds icons to:

- the header labels based on the field name (for example, if the field is "id", it adds the globe icon next to the header value)
- the column headers based on the value (colored arrow indicators are added)

~~~jsx
function rowsHeaderTemplate(value, field) {
    let icon = "";
    if (field === "id") icon = "<i class='icon wxi-earth'></i>";
    if (field === "user_score") icon = "<i class='icon wxi-star'></i>";
    return `${value} ${icon}`;
}

function statusTemplate(value) {
    let icon = "";
    if (value === "Up") icon = "<i style='color:green' class='icon wxi-arrow-up'></i>";
    if (value === "Down") icon = "<i style='color:red' class='icon wxi-arrow-down'></i>";
    return `${value} ${icon}`;
}

widget.api.intercept("render-table", ({ config: tableConfig }) => {
    tableConfig.columns = tableConfig.columns.map((c) => {
        if (c.area === "rows") {
            // Apply a template to the first header row of the columns from the "rows" area
            c.header[0].cell = pivot.template(({ value, field }) => rowsHeaderTemplate(value, field));
        } else {
            // For header cells that display values from the "status" field
            const headerCell = c.header.find((h) => h.field === "status");
            if (headerCell) {
                headerCell.cell = pivot.template(({ value }) => statusTemplate(value));
            }
        }
        return c;
    });
});
~~~

## Make columns collapsible

Collapse and expand columns that share a header. Use the `collapsible` parameter of the [`headerShape`](/api/config/headershape-property) property and set it to `true`.

~~~jsx {4-6}
const table = new pivot.Pivot("#root", {
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
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

## Freeze columns

Use the `split` parameter of the [`tableShape`](/api/config/tableshape-property) property to freeze columns on the left or right side. Frozen columns stay visible while scrolling. Set the `left` or `right` parameter to `true`. For more details and examples, see the sections below.

### Freeze columns on the left

The number of frozen columns equals the number of row fields defined in the [`config`](/api/config/config-property) property. In `tree` mode, only one column is frozen regardless of the number of row fields. In the sample below, 1 column is fixed on the left, which equals the number of fields defined for the "rows" area.

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    tableShape: { 
        split: {left: true } 
    }
});
~~~

Apply a custom split using the [`render-table`](/api/events/render-table-event) event. Splitting columns with colspans is not recommended.

The following code snippet fixes all columns from the "rows" area and the first 4 columns from the "values" area. The number of split columns depends on the number of rows and values fields defined in the [`config`](/api/config/config-property) property.

~~~jsx {19-25}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            {
                field: "oil",
                method: "sum"
            },
            {
                field: "oil",
                method: "count"
            }
        ]
    }
});
table.api.on("render-table", (tableConfig) => {
    const config = api.getState().config;

    tableConfig.split = {
        left: config.rows.length + config.values.length * 2
    };
});
~~~

### Freeze columns on the right

Use the `right` parameter of the [`tableShape`](/api/config/tableshape-property) property to fix total columns on the right.

~~~jsx {4-7}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    tableShape:{
        split: {right: true},
        totalColumn: true,
    },
    config:  {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

To fix custom columns on the right, apply the table API via the [`render-table`](/api/events/render-table-event) event. Splitting columns with colspans is not recommended. The following code snippet fixes 2 columns on the right:

~~~jsx {20-25}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    config:  {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});

widget.api.on("render-table", ({ config: tableConfig }) => {
    const { config } = widget.api.getState();
    tableConfig.split = {
        right: config.values.length,
    }
})
~~~

## Sort data in columns

Sorting is enabled by default. Users can click a column header to sort data. Use the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property to disable or enable sorting. The following code snippet disables sorting:

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    columnShape: {
        sort: false
    }
});
~~~

For more information about sorting data, refer to [Sorting data](/guides/working-with-data#sorting-data).

## Enable the tree mode

Use the `tree` parameter of the [`tableShape`](/api/config/tableshape-property) property to present data in a hierarchical format with expandable rows. Set the parameter to `true` to enable tree mode (default: `false`).
To specify the parent row, put its name first in the `rows` array of the [`config`](/api/config/config-property) property.

~~~jsx {3}
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true
    },
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "max"
            }
        ]
    }
});
~~~

## Expand and collapse all rows

Enable `tree` mode via the [`tableShape`](/api/config/tableshape-property) property, then use the [`close-row`](/api/table/close-row) and [`open-row`](/api/table/open-row) events of the Table widget. Access the Table API via the [`getTable`](/api/methods/gettable-method) method.

The following code snippet expands and collapses all data rows on button click in tree mode:

~~~jsx
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true
    },
    fields,
    data: dataset,
    config: {
        rows: ["type", "studio"],
        columns: [],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            },
            {
                field: "episodes",
                method: "count"
            }
        ]
    }
});

const api = table.api;
const table = api.getTable();
// close all table branches on table config update
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

## Change text orientation in headers

Use the [`headerShape`](/api/config/headershape-property) property to change text orientation from horizontal to vertical. Set the `vertical` parameter to `true`.

~~~jsx {4-6}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    headerShape: {
        vertical: true
    },
    config: {
        rows: ["studio"],
        columns: ["type"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

## Control visibility of the configuration panel

The configuration panel appears by default. Use the [`configPanel`](/api/config/configpanel-property) property or the [`show-config-panel`](/api/events/show-config-panel-event) event to control its visibility.

### Hide the configuration panel

Set the [`configPanel`](/api/config/configpanel-property) property to `false` to hide the panel on initialization.

~~~jsx
// hide the configuration panel on init
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    configPanel: false,
    config: {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

Trigger the [`show-config-panel`](/api/events/show-config-panel-event) event with the [`api.exec()`](/api/internal/exec-method) method and set the `mode` parameter to `false` to hide the panel programmatically.

~~~jsx {19-22}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
// hide the configuration panel
table.api.exec("show-config-panel", {
    mode: false
});
~~~

### Disable the default toggling functionality

Block toggling the configuration panel on button click via the [`api.intercept()`](/api/internal/intercept-method) method by listening to the [`show-config-panel`](/api/events/show-config-panel-event) event and returning `false`.

The following code snippet disables the toggle button:

~~~jsx {20-22}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});

table.api.intercept("show-config-panel", () => {
    return false;
});
~~~

Use the [`showConfigPanel()`](/api/methods/showconfigpanel-method) method to control the visibility of the configuration panel programmatically.

### Manage fields in the panel

The configuration panel supports the following field operations:

- [`add-field`](/api/events/add-field-event) — add a field to the panel
- [`delete-field`](/api/events/delete-field-event) — remove a field from the panel
- [`update-value`](/api/events/update-value-event) — update a field value
- [`move-field`](/api/events/move-field-event) — reorder a field in the panel

## Enable read-only mode

Use the [`readonly`](/api/config/readonly-property) property to prevent users from changing the Pivot structure through the UI. Set the property to `true` to enable read-only mode (default: `false`).

~~~jsx {6}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: { ... },
    readonly: true
});
~~~

**Related samples:**

- [Pivot 2. Adding text templates for table and header cells](https://snippet.dhtmlx.com/n9ylp6b2)
- [Pivot 2. Custom frozen (fixed) columns (your number)](https://snippet.dhtmlx.com/53erlmgp)
- [Pivot 2. Expand and collapse all rows](https://snippet.dhtmlx.com/i4mi6ejn)
- [Pivot 2. Frozen(fixed) columns on the left and right](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. Sorting](https://snippet.dhtmlx.com/j7vtief6)
