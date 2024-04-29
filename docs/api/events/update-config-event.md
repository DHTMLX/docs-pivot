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

The callback of the action takes an object with the [`config`](/api/properties/config) parameters:

- `rows` - defines rows of the Pivot table. The default value is an empty array. It can be a string which represents a single field ID or an object with the field ID and a method for data extraction; the object parameters are the following:
  - `id` - a field ID
  - `method` - defines a method for data extraction (for time-based data fields)
- `columns` - defines columns for the Pivot table. It's an empty array by default. It can be a single field ID or an object with the field ID and a method for data extraction; the object parameters are the following:
  - `id` - a field ID
  - `method` - defines a method for data extraction (for time-based data fields)
  By default, methods are available for the time-based fields (the **when** field) with the next values: year, month, day, hour, minute.
- `values` - defines the data aggregation for the cells of the Pivot table. It's an empty array by default. Each element can be a string representing a data field ID and aggregation method or an object containing the field ID and the method for data aggregation. The object parameters are the following:
  - `id` - the ID of a field
  - `method` - defines a method for data extraction; possible types:
      - for numeric values: min, max, sum, count
      - for text values: count
      - for date value: min, max, count  
	    Sum - sums all the values of the selected data property and displays the sum  
		Min - finds and displays the minimum value of the selected data property  
		Max - finds and displays the maximum value of the selected data property  
		Count - looks for all occurrences of the selected data property and displays their number; set by default for each newly added field
- `filters` - (optional) defines how data is filtered in the table; it's an object with field IDs and data aggregation method; the object parameters are the following:
  - `name` - (optional) the filter key which is the ID of a field with the filtering rule or exact filtering criteria:
      - `condition` - (optional) the filtering rule object with the parameters below:
         - `filter` - (optional) the value to filter by
         - `type` - (optional) filtering criteria which depend on the field value type (see the **type** parameter for the [`fields`](TODO) property).  
         Filtering criteria (condition types):
           - for text values: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith
           - for numeric values: greater: less, greaterOrEqual, lessOrEqual, equal,	notEqual, contains, notContains
           - for date types: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween

         Default condition types:  
         number: "greater", text: "contains", date: "between"
     - `includes` - (optional) an array of values to be displayed from those that are already filtered; available for text and date values

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
  console.log("Config was changed", config);
});
~~~
