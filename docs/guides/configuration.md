---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Configuration

Configure the Pivot table and the Configuration panel through the following API:

- [`config`](/api/config/config-property) — define the structure of the Pivot table and how data is aggregated
- [`render-table`](/api/events/render-table-event) — change the table configuration on the fly
- [`tableShape`](/api/config/tableshape-property) — configure the look of the Pivot table
- [`columnShape`](/api/config/columnshape-property) — configure the look and behavior of columns
- [`headerShape`](/api/config/headershape-property) — configure the look and behavior of headers
- [`configPanel`](/api/config/configpanel-property) — control the visibility of the Configuration panel
- [`setLocale`](/api/methods/setlocale-method) — apply a locale (see [Localization](/guides/localization))
- [`data`](/api/config/data-property), [`fields`](/api/config/fields-property) — load data and field metadata
- [`predicates`](/api/config/predicates-property) — pre-process data before aggregation
- [`methods`](/api/config/methods-property) — define custom aggregation methods
- [`limits`](/api/config/limits-property) — cap the number of rows and columns in the final dataset

For instructions on working with data, see [Working with data](/guides/working-with-data).

The following Pivot table elements can be configured or customized:

- columns and rows
- headers and footers
- cells
- table sizes

## Resize the table {#resizing-the-table}

Use the [`tableShape`](/api/config/tableshape-property) property to change the size of rows, columns, header, and footer.

The following code snippet shows the default sizes:

~~~jsx
const sizes = {
    rowHeight: 34,
    headerHeight: 30,
    footerHeight: 30,
    columnWidth: 150
};
~~~

The following code snippet overrides the default sizes:

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
To set the width of specific columns, use the `width` parameter of the [`columnShape`](/api/config/columnshape-property) property.
:::

## Autosize columns to content

Use the `autoWidth` parameter of the [`columnShape`](/api/config/columnshape-property) property to calculate column widths automatically. All `autoWidth` sub-parameters are optional — for full descriptions see the [`columnShape`](/api/config/columnshape-property) reference.

The `autoWidth` object accepts the following parameters:

- `columns` — object that selects which fields receive auto-calculated width
- `auto` — adjusts the width to the header, the cell content, or both
- `maxRows` — number of data rows analyzed to detect column size (default: 20)
- `firstOnly` — if `true` (default), analyzes each field only once. When multiple columns are based on the same field (e.g., `oil` with `count` and `oil` with `sum`), only the first column is analyzed and the others inherit its width

The following code snippet enables `autoWidth` for four fields and disables `firstOnly` so every column gets its own measurement:

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

## Apply templates to cells {#applying-templates-to-cells}

### Add templates via tableShape

Use the `templates` parameter of the [`tableShape`](/api/config/tableshape-property) property to render cell values through a function. Each key is a field ID and each value is a function that returns a string. All columns based on the specified field receive the template.

The example below applies a template to `state` cells that shows the combined name of a state (full name plus abbreviation):

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
  // other values
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // customize values of "state" cells
            state: v => v + ` (${states[v]})`,
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

### Add a template via the template helper {#adding-a-template-via-the-template-helper}

To insert HTML content into body cells, use the [`pivot.template`](/api/helpers/template) helper and assign the result to the `cell` property of the column object. Apply the template right before the table renders by intercepting the [`render-table`](/api/events/render-table-event) event with the [`api.intercept`](/api/internal/intercept-method) method.

The example below adds icons (star or flag) to body cells based on the field (`id`, `user_score`):

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

## Apply templates to headers {#applying-templates-to-headers}

### Add templates via headerShape

To control the text format in headers, use the `template` parameter of the [`headerShape`](/api/config/headershape-property) property. The parameter is a function that:

- takes the field label, ID, and sublabel (the method name, if any)
- returns the processed value

The default template is:

~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

By default, fields in the `values` area display the label and method (e.g., `Oil(count)`). If no template is set for a column, the field's `label` value is displayed. A [`predicates`](/api/config/predicates-property) template overrides the `headerShape` template.

The example below converts header text to lowercase, producing labels such as `profit (sum)`:

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

To insert HTML content into header cells, use the [`pivot.template`](/api/helpers/template) helper and assign the result to the `cell` property of the header cell object. Apply the template right before the table renders by intercepting the [`render-table`](/api/events/render-table-event) event with the [`api.intercept`](/api/internal/intercept-method) method.

The example below adds icons to:

- header labels based on the field name (for example, `id` gets a globe icon)
- column headers based on cell value (colored arrow indicators based on the `status` value)

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
            // header cells that display values from the "status" field
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

To allow users to collapse and expand columns under a shared header, set the `collapsible` parameter of the [`headerShape`](/api/config/headershape-property) property to `true`.

The following code snippet enables collapsible header columns:

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

## Freeze columns {#freezing-columns}

Freeze columns on the left or the right so they stay visible while the rest of the table scrolls. Use the `split` parameter of the [`tableShape`](/api/config/tableshape-property) property and set `left` or `right` to `true`.

### Freeze columns on the left

When `split.left` is `true`, the number of frozen columns equals the number of `rows` fields in the [`config`](/api/config/config-property) property. In tree mode, only one column is frozen regardless of the `rows` field count.

The following code snippet freezes one column on the left (one `rows` field is defined):

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

To set a custom split count, listen to the [`render-table`](/api/events/render-table-event) event and override `tableConfig.split`. Avoid splitting columns with colspans.

The following code snippet freezes all `rows` columns plus twice the number of `values` fields on the left:

~~~jsx {19-26}
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
table.api.on("render-table", ({ config: tableConfig }) => {
    const { config } = table.api.getState();

    tableConfig.split = {
        left: config.rows.length + config.values.length * 2
    };
});
~~~

### Freeze columns on the right

Set `split.right` to `true` to freeze total columns on the right.

The following code snippet freezes the total column on the right:

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

To freeze a custom number of columns on the right, listen to the [`render-table`](/api/events/render-table-event) event and override `tableConfig.split`. Avoid splitting columns with colspans.

The following code snippet freezes as many columns on the right as there are `values` fields:

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

## Sort in columns

Sorting in the UI is enabled by default — users click a column header to sort. To disable it, set the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property to `false`.

The following code snippet disables UI sorting:

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

For more on default sort, custom comparators, and runtime updates, see [Sort data](/guides/working-with-data#sorting-data).

## Enable tree mode {#enabling-the-tree-mode}

Tree mode presents data hierarchically with expandable rows. Set the `tree` parameter of the [`tableShape`](/api/config/tableshape-property) property to `true` (default `false`). The first field of the `rows` array in [`config`](/api/config/config-property) becomes the parent row.

The following code snippet enables tree mode with `studio` as the parent and `genre` as nested rows:

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

## Expand or collapse all rows

To expand or collapse all rows programmatically, enable tree mode via the [`tableShape`](/api/config/tableshape-property) property, then access the Table widget instance with the [`getTable`](/api/methods/gettable-method) method and trigger the [`open-row`](/api/table/open-row) or [`close-row`](/api/table/close-row) event through the Table's `api.exec` method.

The example below renders Open all and Close all buttons that expand or collapse every branch in tree mode:

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
const tableInstance = api.getTable();
// keep all table branches closed on render
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // return false here to prevent the table from rendering
    // return false;
});

function openAll() {
    tableInstance.api.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
    tableInstance.api.exec("close-row", { id: 0, nested: true });
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

## Change header text orientation

To rotate header text from horizontal to vertical, set the `vertical` parameter of the [`headerShape`](/api/config/headershape-property) property to `true`.

The following code snippet renders vertical header text:

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

## Control Configuration panel visibility {#controlling-visibility-of-configuration-panel}

The Configuration panel is shown by default. Users can toggle it through the **Hide Settings** / **Show Settings** button. Control the panel programmatically through the [`configPanel`](/api/config/configpanel-property) property, the [`show-config-panel`](/api/events/show-config-panel-event) event, or the [`showConfigPanel`](/api/methods/showconfigpanel-method) method.

### Hide the Configuration panel

To hide the panel on initialization, set the [`configPanel`](/api/config/configpanel-property) property to `false`.

The following code snippet initializes Pivot with the panel hidden:

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

To toggle the panel at runtime, trigger the [`show-config-panel`](/api/events/show-config-panel-event) event with the [`api.exec`](/api/internal/exec-method) method and set the `mode` parameter to `false`.

The following code snippet hides the panel after initialization:

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

### Disable the default toggling

To block the default toggle button entirely, intercept the [`show-config-panel`](/api/events/show-config-panel-event) event with the [`api.intercept`](/api/internal/intercept-method) method and return `false`.

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

For an alternative API, use the [`showConfigPanel`](/api/methods/showconfigpanel-method) method.

### Actions with fields in the panel

The Configuration panel supports the following field operations:

- [`add-field`](/api/events/add-field-event) — add a field to an area
- [`delete-field`](/api/events/delete-field-event) — remove a field from an area
- [`update-field`](/api/events/update-value-event) — update a field's method or settings
- [`move-field`](/api/events/move-field-event) — reorder fields within an area

**Related samples:**
- [Pivot 2. Adding text templates for table and header cells](https://snippet.dhtmlx.com/n9ylp6b2)
- [Pivot 2. Custom frozen (fixed) columns (your number)](https://snippet.dhtmlx.com/53erlmgp)
- [Pivot 2. Expand and collapse all rows](https://snippet.dhtmlx.com/i4mi6ejn)
- [Pivot 2. Frozen(fixed) columns on the left and right](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. Sorting](https://snippet.dhtmlx.com/j7vtief6)
