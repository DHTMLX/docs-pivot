---
sidebar_label: delete-field
title: delete-field Event
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о событии delete-field. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# delete-field

### Описание {#description}

@short: Срабатывает при удалении поля

### Использование {#usage}

~~~jsx
"delete-field": ({
    area: string,
    id: string | number
}) => boolean | void;
~~~

### Параметры {#parameters}

Колбэк действия принимает объект со следующими параметрами:

- `area` - (обязательный) название области, из которой удаляется поле; может быть областью "rows", "columns" или "values"
- `id` - (обязательный) идентификатор удаляемого поля

:::info
Для обработки внутренних событий можно использовать [методы Event Bus](api/overview/internal-eventbus-overview.md)
:::

### Пример {#example}

В примере ниже действие `delete-field` вызывается через метод [`api.exec()`](api/internal/exec-method.md). Последнее поле удаляется из области **values**. Метод [`api.getState()`](api/internal/getstate-method.md) здесь используется для получения текущего состояния [`config`](api/config/config-property.md) Pivot. Действие будет вызвано по нажатию кнопки.

~~~jsx {31-34}
const table = new pivot.Pivot("#root", {
    fields,
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

//вызов методов АПИ: удаление определённого значения из values в config
function removeLastField() {
    if (table.api) {
        const state = table.api.getState();
        const config = state.config;

        const count = config.values.length;

        if (count) {
            const lastValue = config.values[count - 1];

            table.api.exec("delete-field", {
                area: "values",
                id: lastValue.id, // автоматически сгенерированный ID элемента, добавленного в config.values
            });
        }
    }
}

const button = document.createElement("button");

button.addEventListener("click", removeLastField);
button.textContent = "Remove";

document.body.appendChild(button);
~~~
