---
sidebar_label: move-field
title: move-field Event
description: Документация по событию move-field в библиотеке DHTMLX JavaScript Pivot. Руководства разработчика и справочник по API, примеры кода и живые демо, а также бесплатная 30-дневная ознакомительная версия DHTMLX Pivot.
---

# move-field

### Описание {#description}

@short: Срабатывает при изменении порядка полей

### Использование {#usage}

~~~jsx
"move-field": ({
    area: string,
    id: string | number,
    before?: string,
    after?: string
}) => void | boolean;
~~~

### Параметры {#parameters}

Колбэк действия принимает объект со следующими параметрами:

- `area` - (обязательный) название области, в которой выполняется изменение порядка: "rows", "columns" или "values"
- `id` - (обязательный) идентификатор перемещаемого поля
- `before` - (необязательный) идентификатор поля, перед которым размещается перемещаемое поле
- `after` - (необязательный) идентификатор поля, после которого размещается перемещаемое поле

:::info
Для обработки внутренних событий можно использовать [методы Event Bus](api/overview/internal-eventbus-overview.md)
:::

### Пример {#example}

~~~jsx {20-23}
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

//вывести в консоль идентификатор поля, порядок которого изменился
table.api.on("move-field", (ev) => {
    console.log("The id of the reordered field:", ev.id);
});
~~~

**Связанные статьи**: [api.on()](api/internal/on-method.md)
