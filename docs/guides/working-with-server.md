---
sidebar_label: Working with server
title: Working with server
description: You can explore how to integrate Pivot with a backend in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

Pivot runs entirely in the browser. The widget takes an array of raw rows plus a [`config`](/api/config/config-property) (rows / columns / values) and aggregates the rows on the client. There is no built-in transport layer, but the public API exposes hooks for a round-trip with any backend.

A typical integration includes three parts:

1. **Load** raw, non-aggregated data from the server on init
2. **Save the config** when the user changes the layout, so the session resumes later
3. **Save the aggregated table** when the server needs a snapshot of the rolled-up result

## Load raw data from the server

The [`data`](/api/config/data-property) property expects an array of raw row objects. Pivot aggregates the rows itself, so the server returns un-rolled data.

Pull data and fields with `fetch` (or any HTTP client), then construct the widget once the response arrives:

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
        fetch(server + "/config").then(res => res.json()), // optional
    ]).then(([data, fields, config]) => {
        new pivot.Pivot("#root", {
            data,
            fields,
            config,
        });
    });
</script>
~~~

If the server returns date fields as ISO strings, convert them to `Date` instances before passing the array to Pivot. Aggregation methods for date-typed fields rely on real `Date` values:

~~~jsx
data.forEach(row => {
    if (typeof row.when === "string") row.when = new Date(row.when);
});
~~~

:::info
**See also**:
- [Loading data](/guides/loading-data)
- [Date formatting](/guides/localization#date-formatting)
:::

## Save the user's layout to resume the session

To let users return to the layout they left, persist the [`config`](/api/config/config-property) object on every change. The [`update-config`](/api/events/update-config-event) event fires when the user edits the layout via the UI. The payload is the processed config with the shape `{ rows, columns, values, filters }`.

Use [`api.on()`](/api/internal/on-method) to observe the event without modifying it. Switch to [`api.intercept()`](/api/internal/intercept-method) when the handler needs to alter the event payload.

The example below subscribes to the `update-config` event and posts the new layout to the server:

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
    ]).then(([data, fields]) => {
        const table = new pivot.Pivot("#root", { data, fields });

        table.api.on("update-config", newConfig => {
            fetch(server + "/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newConfig),
            });
        });
    });
</script>
~~~

On the next visit, return the saved config from `/config` and pass the config as the `config` property at init. The widget starts in the previous layout. If the layout arrives after the widget already exists, apply the saved config with the [`setConfig()`](/api/methods/setconfig-method) method.

Frequent updates can flood the server when the user drags fields around the configuration panel. Wrap the POST in a timer to debounce the calls:

~~~jsx
let saveTimer;
table.api.on("update-config", newConfig => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newConfig),
        });
    }, 300);
});
~~~

:::note
The `update-config` payload is the *processed* configuration: Pivot may normalize field references to the `{ field, method }` form. Send the processed shape back as the `config` property at init. No extra conversion is required.
:::

:::tip
Return `false` from the handler to block the layout change. Use this to gate persistence on server-side validation.
:::

## Save the aggregated table

Sometimes the *result* itself is the value: a server-side cache of the rendered table, a periodic report, or an export pipeline. The [`render-table`](/api/events/render-table-event) event fires after Pivot finishes aggregation and carries the full rolled-up table: `columns`, `data` rows, `footer`, `split`, and so on.

The example below subscribes to `render-table` and posts the snapshot to the server, skipping the initial render:

~~~jsx
const table = new pivot.Pivot("#root", { data, fields, config });

let firstRender = true;
let saveTimer;

table.api.on("render-table", ({ config: tableConfig }) => {
    // skip the initial render triggered by the first aggregation
    if (firstRender) {
        firstRender = false;
        return;
    }

    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/snapshot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                columns: tableConfig.columns,
                data: tableConfig.data,
                footer: tableConfig.footer,
                split: tableConfig.split,
            }),
        });
    }, 300);
});
~~~

:::note
The `render-table` event fires more often than `update-config`. The event runs on every recompute, including sort and expand/collapse. Debounce the handler and skip the first render to keep one POST per real change.
:::

:::tip
Return `false` from the handler to prevent rendering. Use this when the server rejects the snapshot or for read-only modes.
:::

### Reload an aggregated snapshot

Pivot produces aggregated tables and does not display pre-aggregated ones. The [`data`](/api/config/data-property) property always takes raw rows. A snapshot saved from `render-table` therefore fits these cases:

- a downstream export pipeline (CSV, XLSX) on the server
- a read-only view rendered by a plain data table from the saved `columns` and `data`
- a cached report served to other users without re-running the aggregation

**Related articles**:

- [Loading data](/guides/loading-data)
- [Exporting data](/guides/exporting-data)

**Related API**:

- [`api.on()`](/api/internal/on-method)
- [`update-config`](/api/events/update-config-event)
- [`render-table`](/api/events/render-table-event)
