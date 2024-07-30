---
sidebar_label: config
title: config Config
description: You can learn about the config config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# config

### Description

@short: Optional. Defines the structure of the Pivot table and how data is aggregated

### Usage

~~~jsx
config?: {
    rows?: string | {field: string, method?: string}[],
    columns?: string | {field: string, method?: string}[],
    values?: string | {field: string, method?: string}[],
    filters?: {}  
};
~~~

### Parameters

The `config` parameters are used to define which fields will be applied as rows and columns, and what additional data aggregation methods should be applied to rows/columns.

- `rows` - (optional) defines the rows of the Pivot table. The default value is an empty array. It can be a string which represents a single field ID or an object with the field ID and a method for data extraction; the object parameters are the following:
  - `field` - (required) the ID of a field
  - `method` - (optional) defines a method for data aggregation in the field; methods for the time-based data fields are available by default: year, month, day, hour, minute which group data by year/month/day/hour; here you can also add the name of a custom method ([see `predicates`](/api/config/predicates-property)) for the field of any data type
- `columns` - (optional) defines columns for the Pivot table. It's an empty array by default. It can be a single field ID or an object with the field ID and a method for data extraction; the object parameters are the following:
  - `field` - (required) the ID of a field
  - `method` - (optional) defines a method for data processing (for time-based data fields).
  By default, methods are available for the time-based fields (the **date** type) with the next values: "year", "quarter", "month", "week", "day", "hour", "minute". Here you can also add the name of a custom method ([see `predicates`](/api/config/predicates-property)) for the field of any data type
- `values` - (optional) defines the data aggregation for the cells of the Pivot table. It's an empty array by default. Each element can be a string representing a data field ID and aggregation method or an object containing the field ID and the method for data aggregation. The object parameters are the following:
  - `field` - (required) the ID of a field
  - `method` - (required) defines a method for data extraction; for methods types and their description refer to [Applying methods](/guides/working-with-data#default-methods)

<details>

<summary><b>Options for defining values</b></summary>

You can define `values`in either of the two equally valid ways: 
- option one is a string representing the field ID
- option two is an object containing the field ID and the method for data aggregation

Example:

~~~
values: [
      "sum(sales)", // option one
      { id: "sales", method: "sum" }, // option two
   ]
~~~

</details>

- `filters` - (optional) defines how data is filtered in the table; it's an object with field IDs and a filtering rule. The default value is an empty object. The object parameters are the following:
  - `field` - (optional) the filter key which is the ID of a field or an array of IDs with the filtering criteria:
    - `equal` - (optional) accepts numbers, string and Date values
    - `notEqual` - (optional) accepts numbers, string and Date values
    - `greater` - (optional) accepts numbers and Date values
    - `greaterOrEqual` - (optional) accepts numbers and Date values
    - `less` - (optional) accepts numbers and Date values
    - `lessOrEqual` - accepts numbers and Date values
    - `between`- an object with the next parameters:
      - `start` - Date
      - `end` - Date
    - `notBetween` - an object with the next parameters:
      - `start` - Date
      - `end` - Date
    - `contains` - accepts string values and numbers
    - `notContains` - accepts string values and numbers
    - `beginsWith` - accepts string values and numbers
    - `notBeginsWith` - accepts string values and numbers
    - `endsWith` - accepts string values and numbers
    - `notEndsWith` - accepts string values and numbers
    - `includes` - (optional) an array of values to be displayed from those that are already filtered; available for text and dates values

:::info
When config is processed by Pivot, its properties receive extra data and if you try to return the config state via the [`api.getState()`](/api/internal/getstate-method) method, the full object will look like this:

~~~jsx
interface IParsedField{
      id: string;
      field: string;
      method: string | null;
      area: 'rows'|'columns'|'values';
      base?: string;
      label: string;
      type: 'number'|'date'|'text';
}
interface IParsedConfig {
    rows: IParsedField[];
    columns: IParsedField[]>;
    values: IParsedField[];
    filters: {
        [field: string]: number | string | Array<number|string> | 
        { [operation: string]: number | string | Array<number | string> | { start:Date, end: Date} };
    }
}
~~~

Parameters:

- `id` - a unique id of the processed field
- `field` - a field name
- `method` - the operation name used for aggregation. A method is optional in case of rows and columns, and if provided, acts as a predicate and defines the way field data is pre-processed before aggregation. For values, method is a mandatory parameter.
- `area` - the area to which the field is added
- `base` - used in columns and rows for fields with a predicate. Defines original field name , while field name is formed according to the "field_by_predicate" pattern
- `label` - text label
- `type` - data type
:::


### Example

~~~jsx {4-28}
const widget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
    filters: {
      genre: {
        contains: "D",
        includes: ["Drama"],
      },

      title: {
        // filter for another field ("title")
        contains: "A",
      },
    },
  },
});
~~~

