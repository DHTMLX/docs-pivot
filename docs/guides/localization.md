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

## Applying locales

You can access built-in locales via the pivot object. Pivot provides three built-in locales: en, de, cn. 

Example:

~~~jsx
new pivot.Pivot({
    // other properties
    locale: pivot.locales.de,
});
~~~

To apply a custom locale, you need to:

- create a custom locale object (or modify the default one) and provide translations for all text labels (it can be any language you need)
- apply the new locale to Pivot via its [`locale`](/api/config/locale-property) property or use the [`setLocale()`](/api/methods/setlocale-method) method

~~~jsx
// create Pivot
const widget = new pivot.Pivot("#root", {
  data,
//other configuration properties
});

const ko = {...} //object with locale
widget.setLocale(ko);
~~~

## Date formatting

Pivot accepts a date as a Date object (make sure to parse a date to a Date object). By default, the `dateFormat` of the current locale is applied. To redefine the format for all date fields in Pivot, change the value of the `dateFormat` parameter in the `formats` object of the [`locale`](/api/config/locale-property). The default format is "%d.%m.%Y".

Example:

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

:::info
In case you need to set format to a specific field, use the template parameter of the [`tableShape`](/api/config/tableshape-property) or [`headerShape`](/api/config/headershape-property)
:::

## Date and time format specification 

Pivot uses the following characters for setting the date format:

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


To present the 20th of June, 2024 with the exact time as *2024-09-20 16:47:08.128*, specify "%Y-%m-%d-%H:%i:%s.%u".

## Number formatting

By default, all fields with the *number* type are localized according to the locale (the value in the `lang` field of the locale). The [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) object enables language-sensitive number formatting. In case you need to disable number formatting of some fields, add the template via the [`tableShape`](/api/config/tableshape-property) property or set the *text* type for this field instead of the *number* type. 

Example:

~~~jsx
    // Define number formatting options
	const numOptions = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
    
    // Create number formatters
	const num = new Intl.NumberFormat("en-US", numOptions);
	const eurNum = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "EUR",
		...numOptions,
	});

    // Templates for specific fields
	const templates = {
		continent: v => (v === "North America" ? "NA" : v),
		oil: (v, op) => (v && op != "count" ? num.format(v) : v),
		gdp: (v, op) => (v && op != "count" ? eurNum.format(v) : v),
		year: v => v,
	};

    // Function to style cells based on field, value, area, and method
	function cellStyle(field, value, area, method) {
		if (method?.indexOf("count") > -1) return "count";
	}

    const table = new pivot.Pivot("#root", {
        data,
        fields,
        config,
        tableShape: {
            templates,
            cellStyle,
        },
    });

    // Apply styles for count class
    const style = document.createElement('style');
    style.innerHTML = `
        .count {
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
~~~

## Example

In this snippet you can see how to switch between several locales:

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
