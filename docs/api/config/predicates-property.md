---
sidebar_label: predicates
title: predicates Config
description: You can learn about the predicates config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# predicates

### Description

@short: Optional. Provides custom pre-processing functions for the data dimensions (rows, columns)

It defines how data should be modified before it's applied.

### Usage

~~~jsx
predicates?: {
[key: string]: {
  handler: (value: any) => any,
  type?: 'number' | 'date' | 'text' | [],
  label?: string | (type: 'number' | 'date' | 'text') => string,
  template?: (value: any, locale: any) => string,
  filter?: (value:string) => boolean
  },
};
~~~

### Parameters

The property is an object where a key is the name of a custom function and value is an object with actual function definitions. The predicate object can have multiple key-function pairs, and all of them will be available for use in the Pivot configuration. Each object has the following parameters:

  - `label` - (required) a predicate's label displayed in GUI in the drop-down among data modifiers options for a row/column 
  - `type` - (required) defines for which types of fields this predicate can be applied; it can be "number", "date" or "text" or an array of these values
  - `filter` - (optional) the function that defines how data should be processed for the specified field, it takes the id of a field as a parameter and returns **true** if the predicate should be added to the specified field
	- `handler` - (required for custom predicates) the function that defines how data should be processed; the function should take a single argument as the value to be processed and return the processed value
	- `template` - (optional) the function that defines how data should be displayed; the function returns the processed value and it takes the value returned by `handler` and if necessary you can localize text values using [`locale`](/api/config/locale-property).
 
The following default predicates are applied in case no predicate is specified via the `predicates` property:

~~~jsx
const defaultPredicates = {
  year: { label: "Year", type: "date" },
  quarter: { label: "Quarter", type: "date" },
  month: { label: "Month", type: "date" },
  week: { label: "Week", type: "date" },
  day: { label: "Day", type: "date" },
  hour: { label: "Hour", type: "date" },
  minute: { label: "Minute", type: "date" },
};
~~~

## Example

~~~jsx
// custom predicates
const predicates = {
  monthYear: {
    label: "month-year",
    type: "date",
    handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1).getTime(),
    template: (value, locale) => {
      const date = new Date(value);
      const months = locale.getRaw().calendar.monthFull;
      return months[date.getMonth()] + " " + date.getFullYear();
    },
  },

  balanceSign: {
    label: "balanceSign",
    type: "number",
    filter: (field) => field === "profit",
    handler: (v) => (v < 0 ? -1 : 1),
    template: (v) => (v < 0 ? "Negative balance" : "Positive balance"),
  },
};

const widget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  predicates: { ...pivot.defaultPredicates, ...predicates },
  config: {
    rows: ["state"],
    columns: [
      { field: "date", method: "year" },
      { field: "date", method: "monthYear" },
      { field: "profit", method: "balanceSign" },
    ],
    values: [{ field: "sales", method: "sum" }],
  },
});
~~~


