---
sidebar_label: setLocale()
title: setLocale()
description: You can learn about the setLocale() method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# setLocale()

### Description

@short: Applies a new locale to Pivot

### Usage

~~~jsx
setLocale(null | locale?: object): void;
~~~

### Parameters

- `null` - (optional) resets to the default locale (English)
- `locale` - (optional) the object of data of the new locale to be applied

### Example

~~~jsx {21-23,25-26}
// create Pivot
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});

// apply the "de" locale to Pivot
const de = {...} //object with locale
table.setLocale(de);

// apply the default locale to Pivot
table.setLocale(); // or setLocale(null);
~~~

**Related articles**:
- [Localization](/guides/localization)
- [`locale`](/api/config/locale-property)
