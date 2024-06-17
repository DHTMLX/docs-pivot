---
sidebar_label: Localization
title: Localization
description: You can learn about the localization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Localization

You can localize all labels in the interface of JavaScript Pivot. For this purpose you need to create a new locale or modify a built-in one and apply it to Pivot.

## Default locale

The **English** locale is used by default:

~~~jsx
const en = {
//pivot
pivot: {
    count: "count",
    max: "max",
    min: "min",
    sum: "sum",
    "(date)": "(date)",
    "(number)": "(number)",
    "(text)": "(text)",
    year: "year",
    month: "month",
    day: "day",
    hour: "hour",
    minute: "minute",
    Total: "Total",
    "SHOW SETTINGS": "SHOW SETTINGS",
    "HIDE SETTINGS": "HIDE SETTINGS",
  },

//calendar
const calendar = {
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
  "December"
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
    "Dec"
   ],
  dayFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
};


//core
core: {
    ok:"OK",
    cancel:"Cancel"
},

//query
query: {
  "Add filter": "Add filter",
  "Add Filter": "Add Filter",
  "Add Group": "Add Group",
  "Edit": "Edit",
  "Delete": "Delete",
  
  "Select all": "Select all",
  "Unselect all": "Unselect all",
  
  "Cancel": "Cancel",
  "Apply": "Apply",
  
  "and": "and",
  "or": "or",
  "in": "in",
  
  "equal": "equal",
  "not equal": "not equal",
  "contains": "contains",
  "not contains": "not contains",
  "begins with": "begins with",
  "not begins with": "not begins with",
  "ends with": "ends with",
  "not ends with": "not ends with",
  
  "greater": "greater",
  "greater or equal": "greater or equal",
  "less": "less",
  "less or equal": "less or equal",
  "between": "between",
  "not between": "not between",
  }
};
~~~

## Custom locale

To apply a custom locale you need to:

- create a custom locale file (or modify the default one) and provide translations for all text labels (it can be any language you need)
- apply the new locale to Pivot via its [`locale`](/api/config/locale-property) property or use the [`setLocale()`](/api/methods/setlocale-method) method

The locale packages are available here:

- the *core* locale package: https://git.webix.io/XBS/wx-core-locales
- the *query* locale package: https://git.webix.io/XBS/wx-query-locales
- the *pivot* locale package: TBD!

You can install the desired locales via npm:

~~~jsx
npm install @wx/core-locales
npm install @wx/query-locales
~~~

And you can apply the locale in the following way:

~~~jsx
import { de as coreDe } from "@xbs/wx-core-locales"

new pivot.Pivot({
    // other properties
    locale: { ...coreDe, ...de },
});
~~~

## Example

In this snippet you can see how to switch between several locales:

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
