---
sidebar_label: Localization
title: Localization
description: You can learn about the localization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Localization

You can localize all labels in the interface of JavaScript Pivot. For this purpose you need to create a new locale or modify a built-in one and apply it to Pivot.

## Default locale

The **English** locale is applied by default:

~~~jsx
const en = {
//pivot
pivot: {
  sum: "Sum",
  min: "Min",
  max: "Max",
  count: "Count",
  counta: "CountA",
  countunique: "CountUnique",
  average: "Average",
  median: "Median",
  product: "Product",
  stdev: "StDev",
  stdevp: "StDevP",
  var: "Var",
  varp: "VarP",
  "Raw date": "Raw date",
  "Raw number": "Raw number",
  "Raw text": "Raw text",
  Year: "Year",
  Month: "Month",
  Day: "Day",
  Hour: "Hour",
  Minute: "Minute",
  Total: "Total",
  Values: "Values",
  Rows: "Rows",
  Columns: "Columns",
  "Click on the plus icon(s) to add data":
  "Click on the plus icon(s) to add data",
  'Click on "Show settings" to see the available configuration options':
  'Click on "Show settings" to see the available configuration options',
  "Show settings": "Show settings",
  "Hide settings": "Hide settings",
},

//query
query: {
  "Add filter": "Add filter",
  "Add Filter": "Add Filter",
  "Add Group": "Add Group",
  Edit: "Edit",
  Delete: "Delete",
  
  "Select all": "Select all",
  "Unselect all": "Unselect all",
  
  Cancel: "Cancel",
  Apply: "Apply",
  
  and: "and",
  or: "or",
  in: "in",
  
  equal: "equal",
  "not equal": "not equal",
  contains: "contains",
  "not contains": "not contains",
  "begins with": "begins with",
  "not begins with": "not begins with",
  "ends with": "ends with",
  "not ends with": "not ends with",
  
  greater: "greater",
  "greater or equal": "greater or equal",
  less: "less",
  "less or equal": "less or equal",
  between: "between",
  "not between": "not between",
},

//calendar
calendar: {
  monthFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
 ],
  
  dayFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],

  dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hours: "Hours",
  minutes: "Minutes",
  done: "Done",
  clear: "Clear",
  today: "Today",
  am: ["am", "AM"],
  pm: ["pm", "PM"],
  
  weekStart: 7,
  timeFormat: 24,

},

//core
core: {
  ok:"OK",
  cancel:"Cancel"
},

//formats
formats: {
  dateFormat: "%d.%m.%Y"
 }

};
~~~

## Installing and applying locales

You can install the desired locales via npm: 

~~~jsx
npm install @dhx/pivot-locales
npm install @dhx/core-locales
npm install @dhx/query-locales
~~~

To apply a custom locale you need to:

- create a custom locale file (or modify the default one) and provide translations for all text labels (it can be any language you need)
- apply the new locale to Pivot via its [`locale`](/api/config/locale-property) property or use the [`setLocale()`](/api/methods/setlocale-method) method

And you can apply a locale in the following way:

~~~jsx
import { de as coreDe } from "@dhx/core-locales "

new pivot.Pivot({
    // other properties
    locale: { ...coreDe, ...de },
});
~~~

## Example

In this snippet you can see how to switch between several locales:

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
