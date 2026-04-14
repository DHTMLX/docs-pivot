---
sidebar_label: Localization
title: Localization
description: You can learn about the localization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Localization

Localize all labels in the Pivot interface. Create a custom locale or modify a built-in one and apply it to Pivot.

## Default locale

**English** is the default locale:

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
        "Hide settings": "Hide settings"
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
        "not between": "not between"
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
        clockFormat: 24,
    },

    //core
    core: {
        ok:"OK",
        cancel:"Cancel",
        select: "Select",
        "No data": "No data"
    },

    //formats
    formats: {
        dateFormat: "%d.%m.%Y",
        timeFormat: "%H:%i"
    }

    lang: "en-US",
};
~~~

## Apply locales

Access built-in locales through the `pivot` object. Pivot provides three built-in locales: `en`, `de`, `cn`.

The following code snippet applies the German locale:

~~~jsx
new pivot.Pivot({
    // other properties
    locale: pivot.locales.de,
});
~~~

To apply a custom locale:

- create a custom locale object (or modify the default one) and provide translations for all text labels
- apply the new locale to Pivot via the [`locale`](/api/config/locale-property) property or the [`setLocale()`](/api/methods/setlocale-method) method

~~~jsx
// create Pivot
const widget = new pivot.Pivot("#root", {
  data,
//other configuration properties
});

const ko = {...} //object with locale
widget.setLocale(ko);
~~~

## Format dates

Pivot accepts dates as Date objects. Parse date strings to Date objects before passing data. By default, Pivot applies the `dateFormat` of the current locale. To change the format for all date fields, update the `dateFormat` parameter in the `formats` object of the [`locale`](/api/config/locale-property) property. The default format is `"%d.%m.%Y"`.

The following code snippet sets a custom date format and applies it dynamically:

~~~jsx {17}
function setFormat(value) {
    table.setConfig({ locale: { formats: { dateFormat: value } } });
}

// date string to Date
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

To set a custom format for a specific field, use the `format` parameter of the [`fields`](/api/config/fields-property) property. Refer to [Apply formats to fields](/guides/working-with-data/#applying-formats-to-fields).

## Date and time format reference

Pivot uses the following characters for setting the date and time format:

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

To present the 20th of June, 2024 with the exact time as *2024-09-20 16:47:08.128*, specify `"%Y-%m-%d-%H:%i:%s.%u"`.

## Format numbers

By default, all fields with the `number` type are localized according to the locale (the value in the `lang` field of the locale). Pivot uses the [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) specification. Fraction digits are limited to 3 by default and group separation applies to the integer part.

If you do not need to format specific numeric fields, or need a custom format, use the `format` parameter of the [`fields`](/api/config/fields-property) property. Set `format` to `false` to cancel formatting, or pass an object with format settings (refer to [Apply formats to fields](/guides/working-with-data/#applying-formats-to-fields)).

~~~jsx
const fields = [
     { id: "year", label: "Year", type: "number", format: false},
];
~~~

## Example

The following code snippet switches between several locales:

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
