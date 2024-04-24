---
sidebar_label: config
title: config Config
description: You can learn about the config config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# config

### Description

@short: Optional. TODO ...

### Usage

~~~jsx
config?: {
    rows: string[],
    columns: string[],
    values: string[],
    filters: object
};
~~~

### Parameters

The `config` parameters are used to define which fields will be applied as rows and columns, and what additional data aggregation methods should be applied to rows/columns.

- `rows` - defines the rows of the Pivot table. The default value is an empty array. It can be a string which represents a single field ID or an object with the field ID and a method for data extraction; the object parameters are the following:
  - `id` - the ID of a field
  - `method` - defines a method for data processing in the field; methods for the time-based data fields are available by default: year, month, day, hour, minute which group data by year/month/day/hour; here you can also add the name of a custom method ([see `predicates`](/api/properties/sv_pivot_predicates)) for the field of any data type
- `columns` - defines columns for the Pivot table. It's an empty array by default. It can be a single field ID or an object with the field ID and a method for data extraction; the object parameters are the following:
  - `id` - a field ID
  - `method` - defines a method for data processing (for time-based data fields).
  By default, methods are available for the time-based fields (the **when** field) with the next values: year, month, day, hour, minute. Here you can also add the name of a custom method ([see `predicates`](/api/properties/sv_pivot_predicates)) for the field of any data type
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

<details>

<summary><b>Options for defining values</b></summary>

You can define `values`in either of the two equally valid ways: 
- option one is a string representing a data field ID
- option two is an object containing the field ID and the method for data aggregation

Example:

~~~
values: [
      "sum(sales)", // option one
      { id: "sales", method: "sum" }, // option two
   ]
~~~

</details>

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
     - `includes` - (optional) an array of values to be displayed from those that are already filtered; available for text and dates values

### Example

TODO!!!
