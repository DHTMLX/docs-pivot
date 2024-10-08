---
sidebar_label: showConfigPanel()
title: showConfigPanel()
description: You can learn about the showConfigPanel() method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# showConfigPanel()

### Description

@short: Shows or hides the Configuration panel

This method can be useful when there's a need to control the visibility of the Configuration panel without user interaction. For instance, you might want to hide or display the panel based on some other interaction or state in your application.

### Usage

~~~jsx
showConfigPanel({mode: boolean}): void;
~~~

### Parameters

- `mode` (boolean) - (required) if the value is set to **true** (default), the Configuration panel is shown, and it's set to **false** when the Configuration panel is hidden

### Example

~~~jsx {21-23}
// create Pivot
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

table.showConfigPanel ({
    mode: false
})
~~~

**Related articles**:
- [`show-config-panel` event](/api/events/show-config-panel-event)
- [`configPanel` property](/api/config/configpanel-property)
