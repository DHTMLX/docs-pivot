---
sidebar_label: update-config
title: update-config Event
description: You can learn about the update-config event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# update-config

### Description

@short: Fires when modifying rows, columns, or aggregation functions via the Pivot UI 

The action is useful for saving a user's aggregation configuration so that it can be applied the next time the widget is used allowing a user to continue where they left off. 

### Usage

~~~jsx {}
"update-config": ({
    rows: string[],
    columns: string[],
    values: [],
    filters: {}
}) => boolean | void;
~~~

### Parameters

The callback of the action takes an object with the processed [`config`](/api/config/config-property) parameters: 

- `rows` - rows of the Pivot table. An object with the field ID and a method for data extraction; the object parameters are the following:
  - `field` - the ID of a field
  - `method` - a method for data extraction (for time-based data fields)
- `columns` - defines columns for the Pivot table. It's an object with the field ID and a method for data extraction; the object parameters are the following:
  - `field` - the ID of a field
  - `method` - defines a method for data extraction (for time-based data fields).
  By default, methods are available for the time-based fields (the **when** field) with the next values: year, month, day, hour, minute.
- `values` - defines the data aggregation for the cells of the Pivot table. It's an object containing the field ID and the method for data aggregation. The object parameters are the following:
  - `field` - the ID of a field
  - `method` - defines a method for data extraction; about methods and possible options refer to [Applying methods](/guides/working-with-data#default-methods)
- `filters` - (optional) defines how data is filtered in the table; it's an object with field IDs and data aggregation method. The description of the `filter` object you can see here: [`config`](/api/config/config-property)

### Returns

The callback may return boolean or void.  
If the event handler function returns *false*, the operation that triggered the event is blocked and the `update-config` operation is halted.

### Example

~~~jsx {19-22}
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
//output the config object to console
widget.api.intercept("update-config", (config) => {
  console.log("Config has changed", config);
});
~~~

**Related articles**: [api.intercept()](/api/internal/intercept-method)