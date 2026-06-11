---
sidebar_label: predicates
title: predicates Config
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о конфиге predicates. Изучайте руководства разработчика и справочник API, просматривайте примеры кода и живые демо, скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# predicates

### Описание {#description}

@short: Необязательный. Предоставляет пользовательские функции предварительной обработки для измерений данных (строки, столбцы)

Определяет, как данные должны быть изменены перед применением.

### Использование {#usage}

~~~jsx
predicates?: {
    [key: string]: {
        handler: (value: any) => any,
        type: 'number' | 'date' | 'text' | [],
        label?: string | (type: 'number' | 'date' | 'text') => string,
        template?: (value: any, locale?: any) => string,
        field?: (value:string) => boolean,
        filter?: { 
            type: "number"|"text"|"date"|"tuple",
            format?:(any) => string
        }
    }
};
~~~

### Параметры {#parameters}

Свойство является объектом, где ключ — это имя пользовательской функции, а значение — объект с определениями самих функций. Объект предиката может содержать несколько пар ключ-функция, и все они будут доступны для использования в конфигурации Pivot. Каждый объект имеет следующие параметры:

- `label` - (необязательный) метка предиката, отображаемая в GUI в выпадающем списке среди опций модификаторов данных для строки/столбца
- `type` - (обязательный) определяет, для каких типов полей можно применять данный предикат; допустимые значения: "number", "date", "text" или массив этих значений
- `field` - (необязательный) функция, определяющая порядок обработки данных для указанного поля; принимает идентификатор поля в качестве параметра и возвращает **true**, если предикат должен быть добавлен к указанному полю
- `filter` - (необязательный) по умолчанию тип фильтра берётся из параметра `type`, но если требуется другой, можно использовать этот объект `filter`. Он имеет следующие параметры:
    - `type` - (необязательный) определяет, какой тип поля будет применён: "number"|"text"|"date"|"tuple". "tuple" — это комбинированный фильтр для числовых значений (данные фильтруются по числовому значению, но в фильтре отображается текстовое значение)
    - `format` - (необязательный) функция, определяющая формат отображения вариантов фильтрации; если формат не задан, применяется формат из параметра `template`; если `type` (для объекта `filter`) не указан, формат будет применён для типа, заданного в параметре `type` предиката
- `handler` - (обязательный для пользовательских предикатов) функция, определяющая порядок обработки данных; функция принимает единственный аргумент — обрабатываемое значение — и возвращает обработанное значение
- `template` - (необязательный) функция, определяющая способ отображения данных; функция возвращает обработанное значение, принимает значение, возвращённое `handler`, и при необходимости позволяет локализовать текстовые значения с помощью [`locale`](api/config/locale-property.md)

Следующие предикаты применяются по умолчанию, если через свойство `predicates` не задан ни один предикат:

~~~jsx
const defaultPredicates = {
    // служебный предикат, представляющий исходное (необработанное) значение
    $empty: { label: (type) => `Raw ${type}`, type: ["number", "date", "text"] },
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

## Пример {#example}

~~~jsx 
const predicates = {
    monthYear: {
        label: "Month-year",
        type: "date",
        handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1),
        template: (date, locale) => {
            const months = locale.getRaw().calendar.monthFull;
            return months[date.getMonth()] + " " + date.getFullYear();
        },
    },
    profitSign: {
        label: "Profit Sign",
        type: "number",
        filter: {
            type: "tuple",
            format: (v) => (v < 0 ? "Negative" : "Positive"),
        },
        field: (f) => f === "profit",
        handler: (v) => (v < 0 ? -1 : 1),
        template: (v) => (v < 0 ? "Negative profit" : "Positive profit"),
    },
};

// строку с датой в объект Date
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    predicates: { ...pivot.defaultPredicates, ...predicates },
    tableShape: { tree: true },
    config: {
        rows: ["product_type", "product"],
        columns: [
            { field: "profit", method: "profitSign" },
            { field: "date", method: "monthYear" },
        ],
        values: ["sales", "expenses"],
    },
});
~~~

**Связанная статья**: [Обработка данных с помощью предикатов](guides/working-with-data.md#processing-data-with-predicates)

**Связанный пример**: [Pivot 2. Пользовательские предикаты](https://snippet.dhtmlx.com/mhymus00)
