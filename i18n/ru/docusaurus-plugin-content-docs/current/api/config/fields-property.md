---
sidebar_label: fields
title: fields Config
description: Вы можете узнать о конфиге fields в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# fields

### Описание {#description}

@short: Необязательный. Массив объектов с полями для таблицы Pivot

Свойство `fields` в объекте конфигурации управляет тем, как виджет интерпретирует типы полей данных, которые он получает, и позволяет задать порядок сортировки для поля.

### Использование {#usage}

~~~jsx
fields?: [{
    id: string,
    label?: string,
    type: "number" | "date" | "text",
    sort?: "asc" | "desc" | ((a: any, b: any) => number),
    format?: string | boolean | numberFormatOptions{}
}];
~~~

### Параметры {#parameters}

По умолчанию, если свойство не задано, виджет автоматически анализирует входящие данные и заполняет объект `fields` соответствующим образом.

Каждый объект в массиве `fields` должен содержать следующие свойства:

- `id` - (обязательный) идентификатор поля
- `label` - (необязательный) метка поля, отображаемая в интерфейсе
- `type` - (обязательный) тип данных в поле ( "number", "date" или "text")
- `sort` - (необязательный) определяет порядок сортировки по умолчанию для поля. Принимает "asc", "desc" или пользовательскую функцию сортировки
- `format` - (необязательный) позволяет настроить формат чисел и дат в поле; формат также будет применяться при [экспорте](guides/exporting-data.md)
    - `string` - (необязательный) формат для дат (по умолчанию Pivot использует `dateFormat` из локали)
    - `boolean` - (необязательный) если установлено значение **false**, число отображается как есть, без какого-либо форматирования
    - `numberFormatOptions` - (необязательный) объект с параметрами форматирования числовых полей; по умолчанию числа отображаются с максимум 3 знаками после запятой и применяется разделение групп для целой части.
        - `minimumIntegerDigits`(number) - (необязательный) минимальное количество целых цифр (например, если значение равно 2, число 1 будет отображено как "01"); по умолчанию 1;
        - `minimumFractionDigits`(number) - (необязательный) минимальное количество дробных знаков (например, если значение равно 2, число 10.5 будет отображено как "10.50"); по умолчанию 0;
        - `maximumFractionDigits`(number) - (необязательный) максимальное количество дробных знаков (например, если значение равно 2, число 10.3333... будет отображено как "10.33"); по умолчанию 3;  
        Подробнее о параметрах цифр см. в [Параметры цифр](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumintegerdigits)
        - `prefix` (string) - (необязательный) строка (перед числом) для дополнительных символов, например обозначения валюты
        - `suffix` (string) - (необязательный) строка (после числа) для дополнительных символов, например обозначения валюты

:::info
Если шаблон применяется через свойство [`tableShape`](api/config/tableshape-property.md), он переопределит настройки `format`.
:::

### Пример {#example}

~~~jsx {2-34}
const table = new pivot.Pivot("#root", {
    fields: [
        {
            id: "rank",
            label: "Rank",
            type: "number"
        },
        {
            id: "title",
            label: "Title",
            type: "text"
        },
        {
            id: "genre",
            label: "Genre",
            type: "text"
        },
        {
            id: "studio",
            label: "Studio",
            type: "text"
        },
        {
            id: "type",
            label: "Type",
            type: "text"
        },
        {
            id: "score",
            label: "Score",
            type: "number"
        },
        //другие поля
    ],
    data,
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
~~~

**Связанные статьи**: 

- [Форматирование чисел](guides/localization.md#number-formatting)
- [Применение форматов к полям](guides/working-with-data.md#applying-formats-to-fields)

**Связанный пример**:  [Pivot 2. Определение форматов полей](https://snippet.dhtmlx.com/77nc4j8v)
