---
sidebar_label: show-config-panel
title: show-config-panel Event
description: You can learn about the show-config-panel event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# show-config-panel

### Description

@short: Fires when the visibility of the Configuration panel changes

### Usage

~~~jsx
"show-config-panel": ({
    mode: boolean 
}) 
~~~

### Parameters

The callback of the action takes an object with the following parameter:

- `mode` - (required) if the value is set to **true** (default), the Configuration panel is shown, and it's set to **false** when the Configuration panel is hidden

### Example

~~~jsx {19-22}
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
    }
});
//hide the configuration panel
table.api.exec("show-config-panel", {
    mode: false
});
~~~

**Related articles**:
- [`showConfigPanel()` method](/api/methods/showconfigpanel-method)
- [`configPanel` property](/api/config/configpanel-property)
