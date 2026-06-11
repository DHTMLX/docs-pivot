---
sidebar_label: add-field
title: Событие add-field
description: Вы можете узнать о событии add-field в документации библиотеки DHTMLX JavaScript Pivot. Ознакомьтесь с руководствами разработчика и справочником API, изучите примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# add-field

### Описание {#description}

@short: Срабатывает, когда новое поле добавляется в область строк, столбцов или значений

### Использование {#usage}

~~~jsx
"add-field": ({
    id?: string | number,
    area: string,
    field: string | number,
    method?: string
}) => boolean;
~~~

### Параметры {#parameters}

Колбэк действия принимает объект со следующими параметрами:

- `id` - (необязательный) желаемый идентификатор нового поля; если не задан, добавляется автоматически сгенерированный id
- `area` - (обязательный) название области, в которую добавляется новое поле: "rows", "columns" или "values"
- `field` - (обязательный) название поля
- `method` - (необязательный) определяет метод агрегации данных (если не указан, устанавливается первый метод, подходящий для данного типа данных); метод может быть одним из следующих:
  - для области **values** является обязательным — это строка с одним из типов операций над данными: [Методы по умолчанию](guides/working-with-data.md#default-methods)
  - для областей **rows** и **columns** является необязательным; если значение задано, это предикат — пользовательский или один из встроенных: "year", "quarter", "month", "week", "day", "hour", "minute". По умолчанию используется исходное значение.
  Если задан пользовательский предикат или метод, необходимо указать id для свойства [predicates](api/config/predicates-property.md) или [methods](api/config/methods-property.md).

:::info
Для обработки внутренних событий можно использовать [методы Event Bus](api/overview/internal-eventbus-overview.md)
:::

### Пример {#example}

В приведённом ниже примере используется метод [`api.intercept()`](api/internal/intercept-method.md) для добавления нового метода к полю значений с типом данных **number**:

~~~jsx {20-27}
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
//добавление значений с заранее заданным методом
table.api.intercept("add-field", (ev) => {
    const { fields } = table.api.getState();
    const type = fields.find((f) => f.id == ev.field).type;

    if (ev.area == "values" && type == "number") {
        ev.method = "min";
    }
});
~~~

**Связанные статьи**: [api.intercept()](api/internal/intercept-method.md)
