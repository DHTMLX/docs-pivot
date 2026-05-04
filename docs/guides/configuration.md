---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Configuration

Configure Pivot appearance and functionality through the API. The following properties are available:

- [`config`](/api/config/config-property) — define the structure of the Pivot table and how data is aggregated
- [`render-table`](/api/events/render-table-event) — change the table configuration on the fly
- [`tableShape`](/api/config/tableshape-property) — configure the look of the Pivot table
- [`columnShape`](/api/config/columnshape-property) — configure the look and behavior of Pivot columns
- [`headerShape`](/api/config/headershape-property) — configure the look and behavior of headers
- [`configPanel`](/api/config/configpanel-property) — control the visibility of the configuration panel
- [`setLocale()`](/api/methods/setlocale-method) — apply a locale (see [Localization](/guides/localization))
- [`data`](/api/config/data-property) and [`fields`](/api/config/fields-property) — load data and fields
- [`predicates`](/api/config/predicates-property) — define how data is modified before aggregation
- [`methods`](/api/config/methods-property) — define custom mathematical methods for data aggregation
- [`limits`](/api/config/limits-property) — control the maximum number of rows and columns in the dataset
- [`readonly`](/api/config/readonly-property) — enable or disable the read-only mode

For data operations, see [Working with data](/guides/working-with-data).

Configure the following elements of the Pivot table:

- columns and rows
- headers and footers
- cells
- table sizes

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

The example below sets custom row and header sizes:

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

## Show total rows and columns

Use the `totalRow` and `totalColumn` parameters of the [`tableShape`](/api/config/tableshape-property) property to add rows and columns with aggregated totals.

- Set `totalRow` to `true` to add a footer row with total values. Set `totalRow` to `"sumOnly"` to include only sum totals.
- Set `totalColumn` to `true` to add a total column with total values for rows. Set `totalColumn` to `"sumOnly"` to include only sum totals.

The following code snippet enables both the total row and total column:

~~~jsx {4-5}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    tableShape: {
        totalRow: true,
        totalColumn: true,
    },
    config: {
        rows: ["state"],
        columns: ["product_line"],
        values: [
            {
                field: "profit",
                method: "sum"
            }
        ]
    }
});
~~~

## Hide duplicate row values

Set the `cleanRows` parameter of the [`tableShape`](/api/config/tableshape-property) property to `true` to hide duplicate values in scale columns (default: `false`).

The following code snippet enables the `cleanRows` parameter:

~~~jsx {4-6}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    tableShape: {
        cleanRows: true,
    },
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            }
        ]
    }
});
~~~

## Autosize columns to content

Use the `autoWidth` parameter of the [`columnShape`](/api/config/columnshape-property) property to set the minimum column width and configure auto-sizing for table data, headers, or both. All parameters of `autoWidth` are optional. For a detailed description, see the [`columnShape`](/api/config/columnshape-property) property.

- use the `columns` parameter to define which columns calculate width automatically
- use the `auto` parameter to adjust the width to the header, cell content, or both
- use `maxRows` to specify how many data rows are used to detect column size; 20 rows apply by default

If `firstOnly` is `true` (default), each data field is analyzed only once to calculate the column width. For multiple columns based on the same data (for example, the `oil` field with `count` and the `oil` field with `sum`), only the first column's data is analyzed; the others inherit that width.

The example below configures `autoWidth` for specific columns:

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

Use the `templates` parameter of the [`tableShape`](/api/config/tableshape-property) property to set cell templates. Each key is a field ID, and the value is a function that returns a string. All columns based on the specified field apply the template.

The example below applies a template to `state` cells to display the full state name and abbreviation.

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

Insert HTML content into table cells via the [`pivot.template`](/api/helpers/template) helper by defining a template as the `cell` property of the `column` object. Apply the template just before the table renders by intercepting the [`render-table`](/api/events/render-table-event) event with [`api.intercept()`](/api/internal/intercept-method).

The example below adds icons to body cells based on the field (`id`, `user_score`):

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
            // apply a template to column cells from the "rows" area
            c.cell = pivot.template(({ value, method, row, column }) => cellTemplate(value, method, row, column));
        }
        return c;
    });
});
~~~

## Apply templates to headers

### Add templates via headerShape

Use the `template` parameter of the [`headerShape`](/api/config/headershape-property) property to define the format of header text. The parameter is a function that:

- takes the field id, label, and sublabel (the method name, if applied)
- returns the processed value

The default template is: `template: (label, id, subLabel) => label + (subLabel ? "(${subLabel})" : "")`. For fields used as values, the label and method appear by default (for example, *Oil(count)*). If no other template applies, the `label` value displays. A [`predicates`](/api/config/predicates-property) template overrides the `headerShape` template.

The example below displays the label and method name (`subLabel`) for **values** fields, converted to lowercase (for example, *profit (sum)*):

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

Insert HTML content into header cells via the [`pivot.template`](/api/helpers/template) helper by defining a template as the `cell` property of the header cell object. Apply the template just before the table renders by intercepting the [`render-table`](/api/events/render-table-event) event with [`api.intercept()`](/api/internal/intercept-method).

The example below shows how to add icons to:

- the header labels based on the field name (for example, if the field is `"id"`, the template adds the globe icon next to the header value)
- the column headers based on the value (colored arrow indicators apply)

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
            // apply a template to the first header row of columns from the "rows" area
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

Set the `collapsible` parameter of the [`headerShape`](/api/config/headershape-property) property to `true` to collapse and expand columns under the same header.

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

Use the `split` parameter of the [`tableShape`](/api/config/tableshape-property) property to freeze columns on the left or right side. Frozen columns remain static and visible while scrolling. Set the `left` or `right` parameter to `true` to enable freezing.

### Freeze columns on the left

The number of frozen columns equals the number of row fields defined in the [`config`](/api/config/config-property) property. In **tree** mode, only one column freezes regardless of the number of row fields. The example below fixes 1 column on the left, equal to the number of fields in the rows area.

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

Apply a custom split with the [`render-table`](/api/events/render-table-event) event. Avoid splitting columns with colspans.

The example below fixes all columns from the rows area and the first 4 columns from the values area. The number of frozen columns depends on the number of rows and values fields defined in [`config`](/api/config/config-property).

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

Use the `right` parameter of [`tableShape`](/api/config/tableshape-property) to fix total columns on the right.

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

To fix custom columns on the right, use the table API via the [`render-table`](/api/events/render-table-event) event. Avoid splitting columns with colspans. The example below fixes 2 columns on the right.

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

## Sort columns

Sorting is enabled by default. Click a column header to sort data. Use the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property to enable or disable sorting. The example below disables sorting.

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

Present data in a hierarchical format with expandable rows. Set the `tree` parameter of the [`tableShape`](/api/config/tableshape-property) property to `true` (default: `false`) to enable tree mode. In the `rows` array of [`config`](/api/config/config-property), put the parent row field first.

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

Enable **tree** mode via [`tableShape`](/api/config/tableshape-property), then use the [`close-row`](/api/table/close-row) and [`open-row`](/api/table/open-row) events of the Table widget. Access the Table API with the [`getTable`](/api/methods/gettable-method) method.

The example below expands and collapses all data rows on button click in tree mode.

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
// set all table branches closed on config update
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // return "false" to prevent the table from rendering
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

## Control the configuration panel

The configuration panel appears by default. Control panel visibility with the [`configPanel`](/api/config/configpanel-property) property or the [`show-config-panel`](/api/events/show-config-panel-event) event.

### Hide the configuration panel

Set the [`configPanel`](/api/config/configpanel-property) property to `false` to hide the panel.

~~~jsx
// the configuration panel is hidden on init
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

Trigger the [`show-config-panel`](/api/events/show-config-panel-event) event with [`api.exec()`](/api/internal/exec-method) and set `mode` to `false`.

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
//hide the configuration panel
table.api.exec("show-config-panel", {
    mode: false
});
~~~

### Disable the default toggling

Block panel toggling on button click by listening to the [`show-config-panel`](/api/events/show-config-panel-event) event with [`api.intercept()`](/api/internal/intercept-method) and returning `false`.

The example below intercepts the `show-config-panel` event to disable panel toggling:

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

Use the [`showConfigPanel()`](/api/methods/showconfigpanel-method) method to control panel visibility.

### Manage fields in the configuration panel

Perform the following operations with fields in the configuration panel:

- [add-field](/api/events/add-field-event)
- [delete-field](/api/events/delete-field-event)
- [update-field](/api/events/update-value-event)
- [move-field](/api/events/move-field-event)

## Enable the read-only mode

Set the [`readonly`](/api/config/readonly-property) property to `true` to disable configuring the Pivot structure through the UI. In the read-only mode, users cannot change the configuration via the configuration panel.

The following code snippet enables the read-only mode:

~~~jsx {18}
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
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
    readonly: true
});
~~~

**Related sample:** [Pivot 2. Readonly mode](https://snippet.dhtmlx.com/0k0mvycv)

**Related samples:**
- [Pivot 2. Adding text templates for table and header cells](https://snippet.dhtmlx.com/n9ylp6b2)
- [Pivot 2. Custom frozen (fixed) columns (your number)](https://snippet.dhtmlx.com/53erlmgp)
- [Pivot 2. Expand and collapse all rows](https://snippet.dhtmlx.com/i4mi6ejn)
- [Pivot 2. Frozen(fixed) columns on the left and right](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. Sorting](https://snippet.dhtmlx.com/j7vtief6)


