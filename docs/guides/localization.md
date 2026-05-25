---
sidebar_label: Localization
title: Localization
description: You can learn about the localization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Localization

Pivot lets you localize every label in the interface. Create a new locale or modify a built-in one, then apply the locale to Pivot via the [`locale`](/api/config/locale-property) property or the [`setLocale`](/api/methods/setlocale-method) method.

## Default locale

Pivot applies the English locale by default. The following code snippet shows the structure of the built-in `en` locale:

~~~jsx
const en = {
    // pivot
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
        "Hide settings": "Hide settings"
    },

    // query
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
        "not between": "not between"
    },

    // calendar
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
        clockFormat: 24,
    },

    // core
    core: {
        ok: "OK",
        cancel: "Cancel",
        select: "Select",
        "No data": "No data"
    },

    // formats
    formats: {
        dateFormat: "%d.%m.%Y",
        timeFormat: "%H:%i"
    },

    lang: "en-US",
};
~~~

## Apply a locale

Pivot exposes three built-in locales through the `pivot.locales` object: `en`, `de`, and `cn`. Pass a built-in locale to the [`locale`](/api/config/locale-property) property during initialization.

The following code snippet initializes Pivot with the German locale:

~~~jsx
new pivot.Pivot("#root", {
    // other properties
    locale: pivot.locales.de,
});
~~~

To apply a custom locale:

- create a custom locale object (or modify a built-in one) and provide translations for all text labels (in any language)
- apply the locale to Pivot via the [`locale`](/api/config/locale-property) property or the [`setLocale`](/api/methods/setlocale-method) method

The following code snippet creates Pivot and then applies a custom Korean locale at runtime with `setLocale`:

~~~jsx
// create Pivot
const widget = new pivot.Pivot("#root", {
    data,
    // other configuration properties
});

const ko = { /* object with locale */ };
widget.setLocale(ko);
~~~

:::tip
Call [`setLocale`](/api/methods/setlocale-method) without arguments (or with `null`) to reset Pivot to the default English locale.
:::

## Format dates

Pivot accepts dates as `Date` objects. Parse string values to `Date` before passing data to Pivot. By default, Pivot applies the `dateFormat` from the current locale, which is `"%d.%m.%Y"`.

To change the format for all date fields, set a new value for `dateFormat` in the `formats` object of the [`locale`](/api/config/locale-property) property.

The following code snippet parses string dates into `Date` objects, then initializes Pivot with a custom `dateFormat` and updates the format at runtime via `setConfig`:

~~~jsx {17}
function setFormat(value) {
    table.setConfig({ locale: { formats: { dateFormat: value } } });
}

// convert date strings to Date objects
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    locale: { formats: { dateFormat: "%d %M %Y %H:%i" } },
    fields,
    data: dataset,
    config: {
        rows: ["state"],
        columns: ["product_line", "product_type"],
        values: [
            {
                field: "date",
                method: "min"
            },
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            }
        ]
    }
});
~~~

To set a custom format for a specific field, use the `format` parameter of the [`fields`](/api/config/fields-property) property. See [Applying formats to fields](/guides/working-with-data/#applying-formats-to-fields).

## Date and time format characters

Pivot uses the following characters to define the date and time format:

| Character | Definition                                        |Example                  |
| :-------- | :------------------------------------------------ |:------------------------|
| %d        | day as a number with leading zero                 | from 01 to 31           |
| %j        | day as a number                                   | from 1 to 31            |
| %D        | short name of the day (abbreviation)              | Su Mo Tu Sat            |
| %l        | full name of the day                              | Sunday Monday Tuesday   |
| %W        | week as a number with leading zero (with Monday as the first day of the week) | from 01 to 52/53        |
| %m        | month as a number with leading zero               | from 01 to 12           |
| %n        | month as a number                                 | from 1 to 12            |
| %M        | short name of the month                           | Jan Feb Mar             |
| %F        | full name of the month                            | January February March  |
| %y        | year as a number, 2 digits                        | 24                      |
| %Y        | year as a number, 4 digits                        | 2024                    |
| %h        | hours 12-format with leading zero                 | from 01 to 12           |
| %g        | hours 12-format                                   | from 1 to 12            |
| %H        | hours 24-format with leading zero                 | from 00 to 23           |
| %G        | hours 24-format                                   | from 0 to 23            |
| %i        | minutes with leading zero                         | from 01 to 59           |
| %s        | seconds with leading zero                         | from 01 to 59           |
| %S        | milliseconds                                      | 128                     |
| %a        | am or pm                                          | am (for time from midnight until noon) and pm (for time from noon until midnight)|
| %A        | AM or PM                                          | AM (for time from midnight until noon) and PM (for time from noon until midnight)|
| %c        | displays date and time in the ISO 8601 date format| 2024-10-04T05:04:09     |

To present September 20, 2024 at 16:47:08.128 as *2024-09-20 16:47:08.128*, use the format `"%Y-%m-%d %H:%i:%s.%S"`.

## Format numbers

Pivot localizes all `number` fields according to the locale (the value in the `lang` field of the locale). The widget uses the [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) specification. By default, Pivot limits fraction digits to 3 and applies group separation to the integer part.

To skip formatting for a specific numeric field or to set a custom format, use the `format` parameter of the [`fields`](/api/config/fields-property) property. Set `format` to `false` to disable formatting, or to an object with format settings (see [Applying formats to fields](/guides/working-with-data/#applying-formats-to-fields)).

The following code snippet disables number formatting for the `year` field:

~~~jsx
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

## Example

The snippet below demonstrates switching between several locales:

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
