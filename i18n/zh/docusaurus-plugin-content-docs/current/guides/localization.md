---
sidebar_label: 本地化
title: 本地化
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解本地化相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# 本地化 {#localization}

Pivot 支持对界面中的所有标签进行本地化。您可以创建新的语言区域设置，或修改内置区域设置，然后通过 [`locale`](api/config/locale-property.md) 属性或 [`setLocale`](api/methods/setlocale-method.md) 方法将其应用到 Pivot。

## 默认区域设置 {#default-locale}

Pivot 默认使用英语区域设置。以下代码片段展示了内置 `en` 区域设置的结构：

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

## 应用区域设置 {#apply-a-locale}

Pivot 通过 `pivot.locales` 对象提供三个内置区域设置：`en`、`de` 和 `cn`。在初始化时，将内置区域设置传入 [`locale`](api/config/locale-property.md) 属性即可。

以下代码片段展示了如何使用德语区域设置初始化 Pivot：

~~~jsx
new pivot.Pivot("#root", {
    // other properties
    locale: pivot.locales.de,
});
~~~

要应用自定义区域设置，请执行以下操作：

- 创建一个区域设置对象（或修改内置区域设置），并为所有文本标签提供翻译（支持任何语言）
- 通过 [`locale`](api/config/locale-property.md) 属性或 [`setLocale`](api/methods/setlocale-method.md) 方法将区域设置应用到 Pivot

以下代码片段创建了 Pivot，然后在运行时通过 `setLocale` 应用自定义的韩语区域设置：

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
调用 [`setLocale`](api/methods/setlocale-method.md) 时不传参数（或传入 `null`）可将 Pivot 重置为默认的英语区域设置。
:::

## 格式化日期 {#date-formatting}

Pivot 接受 `Date` 对象形式的日期。在将数据传入 Pivot 之前，请先将字符串值解析为 `Date` 对象。默认的 `dateFormat` 为 `"%d.%m.%Y"`，取自当前区域设置。

若要更改所有日期字段的格式，请在 [`locale`](api/config/locale-property.md) 属性的 `formats` 对象中设置新的 `dateFormat` 值。

以下代码片段将字符串日期解析为 `Date` 对象，然后使用自定义 `dateFormat` 初始化 Pivot，并在运行时通过 `setConfig` 更新格式：

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

要为特定字段设置自定义格式，请使用 [`fields`](api/config/fields-property.md) 属性的 `format` 参数。请参阅[为字段应用格式](guides/working-with-data.md#applying-formats-to-fields)。

## 日期和时间格式字符 {#date-and-time-format-characters}

Pivot 使用以下字符定义日期和时间格式：

| 字符      | 含义                                              | 示例                    |
| :-------- | :------------------------------------------------ |:------------------------|
| %d        | 带前导零的日期数字                                | 从 01 到 31             |
| %j        | 不带前导零的日期数字                              | 从 1 到 31              |
| %D        | 星期的缩写名称                                    | Su Mo Tu Sat            |
| %l        | 星期的完整名称                                    | Sunday Monday Tuesday   |
| %W        | 带前导零的周数（以周一为一周的第一天）            | 从 01 到 52/53          |
| %m        | 带前导零的月份数字                                | 从 01 到 12             |
| %n        | 不带前导零的月份数字                              | 从 1 到 12              |
| %M        | 月份的缩写名称                                    | Jan Feb Mar             |
| %F        | 月份的完整名称                                    | January February March  |
| %y        | 两位数年份                                        | 24                      |
| %Y        | 四位数年份                                        | 2024                    |
| %h        | 带前导零的 12 小时制小时数                        | 从 01 到 12             |
| %g        | 不带前导零的 12 小时制小时数                      | 从 1 到 12              |
| %H        | 带前导零的 24 小时制小时数                        | 从 00 到 23             |
| %G        | 不带前导零的 24 小时制小时数                      | 从 0 到 23              |
| %i        | 带前导零的分钟数                                  | 从 01 到 59             |
| %s        | 带前导零的秒数                                    | 从 01 到 59             |
| %S        | 毫秒数                                            | 128                     |
| %a        | am 或 pm                                          | am（午夜到正午）和 pm（正午到午夜）|
| %A        | AM 或 PM                                          | AM（午夜到正午）和 PM（正午到午夜）|
| %c        | 以 ISO 8601 格式显示日期和时间                    | 2024-10-04T05:04:09     |

要将 2024 年 9 月 20 日 16:47:08.128 表示为 *2024-09-20 16:47:08.128*，请使用格式 `"%Y-%m-%d %H:%i:%s.%S"`。

## 格式化数字 {#number-formatting}

Pivot 根据当前区域设置的 `lang` 值对所有 `number` 类型字段进行本地化处理。该 widget 遵循 [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 规范。默认设置将小数位数限制为 3 位，并对整数部分应用千位分隔符。

若要跳过对特定数字字段的格式化，或设置自定义格式，请使用 [`fields`](api/config/fields-property.md) 属性的 `format` 参数。将 `format` 设置为 `false` 可禁用格式化，也可将其设置为包含格式配置的对象（请参阅[为字段应用格式](guides/working-with-data.md#applying-formats-to-fields)）。

以下代码片段禁用了 `year` 字段的数字格式化：

~~~jsx
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

## 示例 {#example}

以下代码片段演示了在多个区域设置之间切换：

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
