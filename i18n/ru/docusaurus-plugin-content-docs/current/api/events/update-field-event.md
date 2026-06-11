---
sidebar_label: update-field
title: update-field Event
description: Вы можете узнать о событии update-field в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, просматривайте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# update-field

### Описание {#description}

@short: Срабатывает при обновлении поля

### Использование {#usage}

~~~jsx
"update-field": ({
    id: string | number,
    method: string,
    area: string
}) => boolean;
~~~

### Параметры {#parameters}

Колбэк действия принимает объект со следующими параметрами:

- `id` - (обязательный) идентификатор обновляемого поля
- `method` - (обязательный) метод может принимать одно из следующих значений:
  - для области **values** — строка с одним из типов операций над данными: [Методы по умолчанию](guides/working-with-data.md#default-methods)
  - для областей **rows** и **columns** — значение предиката данных, которое может быть одним из следующих: "year", "quarter", "month", "week", "day", "hour", "minute". По умолчанию устанавливается исходное значение.
  Если задан пользовательский предикат или метод, идентификатор должен быть указан для свойства [predicate](api/config/predicates-property.md) или [methods](api/config/methods-property.md).
- `area` - (обязательный) название области, в которой обновляется поле: "rows", "columns" или "values"

:::info
Для обработки внутренних событий можно использовать [методы Event Bus](api/overview/internal-eventbus-overview.md)
:::

### Пример {#example}

~~~jsx {19-22}
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
//вывести id обновлённого поля в консоль
table.api.on("update-field", (ev) => {
    console.log("The id of the field that was updated:", ev.id);
});
~~~

**Связанные статьи**:
- [api.on()](api/internal/on-method.md)
- [methods](api/config/methods-property.md)
