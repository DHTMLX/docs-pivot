---
sidebar_label: Configuration
title: Configuration
description: You can learn about the configuration in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Configuration

You can configure the Pivot table elements and the Configuration panel via the corresponding API. The available parameters let you:

- define the structure of the Pivot table and how data is aggregated via the [`config`](/api/config/config-property) property
- change the table configuration on the fly via the [`render-table`](/api/events/render-table-event) event
- configure the look of the Pivot table via the [`tableShape`](/api/config/tableshape-property) property
- configure the look and behavior of the Pivot columns via the [`columnShape`](/api/config/columnshape-property) property
- configure the look and behavior of headers in the Pivot table via the [`headerShape`](/api/config/headershape-property) property
- control the visibility of the Configuration panel via the [`configPanel`](/api/config/configpanel-property) property
- apply the desired locale via the [`setLocale()`](/api/methods/setlocale-method) method (see the [Localization](/guides/localization) section)
- load data and fields via the corresponding [`data`](/api/config/data-property) and [`fields`](/api/config/fields-property) properties
- define how data should be modified before it's applied via the [`predicates`](/api/config/predicates-property) property
- define custom mathematical methods for data aggregation via the [`methods`](/api/config/methods-property) property
- control the maximum limit for the number of rows and columns in the final dataset via the [`limits`](/api/config/limits-property) property

For instructions on working with data, see [Working with data](/guides/working-with-data).

You can configure the following elements of the Pivot table:

- columns and rows
- headers and footers
- cells
- the table sizes

## Resizing the table

To change the size of the table rows and columns, header, and footer, use the [`tableShape`](/api/config/tableshape-property) property.

The default sizes are:

~~~jsx
const sizes = {
    rowHeight: 34,
    headerHeight: 30,
    footerHeight: 30,
    columnWidth: 150
};
~~~

Example:

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

## Autosizing columns to content

The widget can set a minimum width for all columns, size the table data only, the table header only, or combine these modes. To configure autosizing, apply the `autoWidth` parameter of the [`columnShape`](/api/config/columnshape-property) property.

All parameters of `autoWidth` are optional. For a detailed description of each parameter, refer to the [columnShape](/api/config/columnshape-property) property.

- use the `columns` parameter to define if the column width is calculated automatically and which columns are affected
- use the `auto` parameter to adjust the width to the header or cell content (or both)
- use `maxRows` to specify how many data rows the widget analyzes to detect the column size; the default is 20 rows

If `firstOnly` is set to `true` (default), the widget analyzes each field of the same data only once to calculate the column width. If multiple columns rely on the same data (for example, the `oil` field with the `count` operation and the `oil` field with the `sum` operation), the widget analyzes only the first one and applies its width to the others.

Example:

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

## Applying templates to cells

### Adding templates via tableShape

To apply a template to cells, use the `templates` parameter of the [`tableShape`](/api/config/tableshape-property) property. The parameter takes an object where each key is a field id and the value is a function that returns a string. The widget applies the template to all columns based on the specified field.

The example below applies a template to the `state` cells to show the combined name of a state (full name and abbreviation).

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

### Adding a template via the template helper

To insert HTML content into table cells, use the [`pivot.template`](/api/helpers/template) helper. Define a template as a `cell` property of the `column` object, then apply it right before the table renders by intercepting the [`render-table`](/api/events/render-table-event) event with the [`api.intercept()`](/api/internal/intercept-method) method.

The example below adds icons (a star or a flag) to body cells based on the field (`id` or `user_score`):

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

## Applying templates to headers

### Adding templates via headerShape

To define the format of text in headers, apply the `template` parameter of the [`headerShape`](/api/config/headershape-property) property. The parameter takes a function that:

- takes the field id, label, and sublabel (the name of a method if any is applied)
- returns the processed value

The default template is:

~~~js
template: (label, id, subLabel) => label + (subLabel ? `(${subLabel})` : "")
~~~

For fields applied as values, the header shows the label and method (for example, *Oil(count)*).
If no other template is applied to columns, the header displays the value of the `label` parameter. A [`predicates`](/api/config/predicates-property) template, if applied, overrides the template of the `headerShape` property.

In the example below, for the `values` fields the header displays the label and the method name (subLabel) and converts the result to lowercase (for example, *profit (sum)*):

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

### Adding templates via the template helper

To insert HTML content into header cells, use the [`pivot.template`](/api/helpers/template) helper. Define a template as a `cell` property of the header cell object, then apply it right before the table renders by intercepting the [`render-table`](/api/events/render-table-event) event with the [`api.intercept()`](/api/internal/intercept-method) method.

The example below shows how to add icons to:

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

## Making columns collapsible

You can collapse and expand columns that share one header. To make columns collapsible, set the `collapsible` parameter of the [`headerShape`](/api/config/headershape-property) property to `true`.

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

## Freezing columns

The widget can freeze columns on the left or right side, which keeps them static and visible during scrolling. To freeze columns, set the `left` or `right` parameter of the `split` parameter ([`tableShape`](/api/config/tableshape-property) property) to `true`. See the details and examples below.

### Freezing columns on the left

The number of split columns equals the number of `rows` fields defined in the [`config`](/api/config/config-property) property. In the `tree` mode, only one column freezes regardless of how many `rows` fields are defined. In the sample below, 1 column is fixed initially on the left, which equals the number of fields defined for the `rows` area.

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

You can also apply a custom split via the [`render-table`](/api/events/render-table-event) event. Avoid splitting columns with colspans.

In the sample below, the widget fixes all columns from the `rows` area and the first 4 columns from the `values` area initially. The number of split columns depends on the number of `rows` and `values` fields defined via the [`config`](/api/config/config-property) property.

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

### Freezing columns on the right

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

To fix custom columns on the right, apply the table API via the [`render-table`](/api/events/render-table-event) event. Avoid splitting columns with colspans. In the sample below, 2 columns on the right are fixed initially.

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

## Sorting in columns

Sorting is enabled by default. A user can click the column header to sort data. To disable or enable sorting, apply the `sort` parameter of the [`columnShape`](/api/config/columnshape-property) property. The example below disables sorting.

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

## Enabling the tree mode

The widget can present data in a hierarchical format with expandable rows. To switch to the tree mode, set the `tree` parameter of the [`tableShape`](/api/config/tableshape-property) property to `true` (the default is `false`).
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

## Expanding/collapsing all rows

To expand or collapse all rows, enable the `tree` mode via the [`tableShape`](/api/config/tableshape-property) property. Then access the Table widget API via the [`getTable`](/api/methods/gettable-method) method and use its [`close-row`](/api/table/close-row) and [`open-row`](/api/table/open-row) events.

The example below shows how to expand or collapse all data rows on a button click in the table tree mode.

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
// setting all table branches closed on the table config update
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

To change text orientation from default horizontal to vertical, use the [`headerShape`](/api/config/headershape-property) property and set its `vertical` parameter to `true`.

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

## Controlling visibility of the Configuration panel

The Configuration panel is visible by default. The widget toggles its visibility on a button click out of the box, and you can control this behavior via the [`configPanel`](/api/config/configpanel-property) property or the [`show-config-panel`](/api/events/show-config-panel-event) event.

### Hiding the Configuration panel

To hide the panel, set the value of the [`configPanel`](/api/config/configpanel-property) property to `false`.

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

You can also trigger the [`show-config-panel`](/api/events/show-config-panel-event) event with the [`api.exec()`](/api/internal/exec-method) method, and set the `mode` parameter to `false`.

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

### Disabling the default toggling functionality

To block visibility toggling on a button click, use the [`api.intercept()`](/api/internal/intercept-method) method to listen to the [`show-config-panel`](/api/events/show-config-panel-event) event and return *false*.

Example:

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

You can also control the visibility of the Configuration panel using the [`showConfigPanel()`](/api/methods/showconfigpanel-method) method.

### Actions with fields in the panel

The Configuration panel supports the following operations on fields:

- [add-field](/api/events/add-field-event)
- [delete-field](/api/events/delete-field-event)
- [update-field](/api/events/update-value-event)
- [move-field](/api/events/move-field-event)

**Related samples:**
- [Pivot 2. Adding text templates for table and header cells](https://snippet.dhtmlx.com/n9ylp6b2)
- [Pivot 2. Custom frozen (fixed) columns (your number)](https://snippet.dhtmlx.com/53erlmgp)
- [Pivot 2. Expand and collapse all rows](https://snippet.dhtmlx.com/i4mi6ejn)
- [Pivot 2. Frozen(fixed) columns on the left and right](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. Sorting](https://snippet.dhtmlx.com/j7vtief6)


