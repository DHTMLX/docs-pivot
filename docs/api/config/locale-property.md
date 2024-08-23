---
sidebar_label: locale
title: locale Config
description: You can learn about the locale config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# locale

### Description

@short: Optional. An object of a custom locale of Pivot

### Usage

~~~jsx
locale?: object;
~~~

### Default config

By default, Pivot uses the [English](/guides/localization/#default-locale) locale. You can set it to the custom locale as well.

:::tip
To change the current locale dynamically, you can use the [`setLocale()`](/api/methods/setlocale-method) method of Pivot
:::

### Example

~~~jsx {19}
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
    },

    locale: pivot.locales.cn, // the "cn" locale will be set initially
    // other parameters
});
~~~
