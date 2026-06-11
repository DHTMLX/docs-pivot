---
sidebar_label: Локализация
title: Локализация
description: Вы можете узнать о локализации в документации библиотеки DHTMLX JavaScript Pivot. Изучите руководства разработчика и справочник API, попробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Локализация

Pivot позволяет локализовать каждую метку интерфейса. Создайте новую локаль или измените встроенную, затем примените локаль к Pivot через свойство [`locale`](api/config/locale-property.md) или метод [`setLocale`](api/methods/setlocale-method.md).

## Локаль по умолчанию {#default-locale}

По умолчанию Pivot использует английскую локаль. Следующий фрагмент кода показывает структуру встроенной локали `en`:

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

## Применение локали {#apply-a-locale}

Pivot предоставляет три встроенные локали через объект `pivot.locales`: `en`, `de` и `cn`. Передайте встроенную локаль в свойство [`locale`](api/config/locale-property.md) при инициализации.

Следующий фрагмент кода инициализирует Pivot с немецкой локалью:

~~~jsx
new pivot.Pivot("#root", {
    // other properties
    locale: pivot.locales.de,
});
~~~

Чтобы применить пользовательскую локаль:

- создайте объект локали (или измените встроенный) и задайте переводы для всех текстовых меток (на любом языке)
- примените локаль к Pivot через свойство [`locale`](api/config/locale-property.md) или метод [`setLocale`](api/methods/setlocale-method.md)

Следующий фрагмент кода создаёт Pivot, а затем применяет пользовательскую корейскую локаль во время выполнения с помощью `setLocale`:

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
Вызовите [`setLocale`](api/methods/setlocale-method.md) без аргументов (или с `null`), чтобы сбросить Pivot к локали по умолчанию (английской).
:::

## Форматирование дат {#date-formatting}

Pivot принимает даты в виде объектов `Date`. Перед передачей данных в Pivot преобразуйте строковые значения в `Date`. Значение `dateFormat` по умолчанию — `"%d.%m.%Y"`, оно берётся из текущей локали.

Чтобы изменить формат для всех полей с датами, задайте новое значение для `dateFormat` в объекте `formats` свойства [`locale`](api/config/locale-property.md).

Следующий фрагмент кода преобразует строковые даты в объекты `Date`, затем инициализирует Pivot с пользовательским `dateFormat` и обновляет формат во время выполнения через `setConfig`:

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

Чтобы задать пользовательский формат для конкретного поля, используйте параметр `format` свойства [`fields`](api/config/fields-property.md). См. раздел [Применение форматов к полям](guides/working-with-data.md#applying-formats-to-fields).

## Символы формата даты и времени {#date-and-time-format-characters}

Pivot использует следующие символы для определения формата даты и времени:

| Символ    | Описание                                                      | Пример                  |
| :-------- | :------------------------------------------------------------ |:------------------------|
| %d        | день в виде числа с ведущим нулём                             | от 01 до 31             |
| %j        | день в виде числа                                             | от 1 до 31              |
| %D        | краткое название дня (аббревиатура)                           | Su Mo Tu Sat            |
| %l        | полное название дня                                           | Sunday Monday Tuesday   |
| %W        | неделя в виде числа с ведущим нулём (понедельник — первый день недели) | от 01 до 52/53          |
| %m        | месяц в виде числа с ведущим нулём                            | от 01 до 12             |
| %n        | месяц в виде числа                                            | от 1 до 12              |
| %M        | краткое название месяца                                       | Jan Feb Mar             |
| %F        | полное название месяца                                        | January February March  |
| %y        | год в виде числа, 2 цифры                                     | 24                      |
| %Y        | год в виде числа, 4 цифры                                     | 2024                    |
| %h        | часы в 12-часовом формате с ведущим нулём                     | от 01 до 12             |
| %g        | часы в 12-часовом формате                                     | от 1 до 12              |
| %H        | часы в 24-часовом формате с ведущим нулём                     | от 00 до 23             |
| %G        | часы в 24-часовом формате                                     | от 0 до 23              |
| %i        | минуты с ведущим нулём                                        | от 01 до 59             |
| %s        | секунды с ведущим нулём                                       | от 01 до 59             |
| %S        | миллисекунды                                                  | 128                     |
| %a        | am или pm                                                     | am (время от полуночи до полудня) и pm (время от полудня до полуночи)|
| %A        | AM или PM                                                     | AM (время от полуночи до полудня) и PM (время от полудня до полуночи)|
| %c        | отображает дату и время в формате ISO 8601                    | 2024-10-04T05:04:09     |

Чтобы представить 20 сентября 2024 года в 16:47:08.128 как *2024-09-20 16:47:08.128*, используйте формат `"%Y-%m-%d %H:%i:%s.%S"`.

## Форматирование чисел {#number-formatting}

Pivot локализует все поля типа `number` на основе значения `lang` текущей локали. Виджет использует спецификацию [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat). По умолчанию ограничивается до 3 знаков после запятой и применяется разделение групп для целой части.

Чтобы отключить форматирование для конкретного числового поля или задать пользовательский формат, используйте параметр `format` свойства [`fields`](api/config/fields-property.md). Установите `format` в `false`, чтобы отключить форматирование, или передайте объект с настройками формата (см. раздел [Применение форматов к полям](guides/working-with-data.md#applying-formats-to-fields)).

Следующий фрагмент кода отключает числовое форматирование для поля `year`:

~~~jsx
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

## Пример {#example}

Фрагмент ниже демонстрирует переключение между несколькими локалями:

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
