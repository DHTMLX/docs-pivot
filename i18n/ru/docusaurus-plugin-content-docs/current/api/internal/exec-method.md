---
sidebar_label: api.exec()
title: Метод exec
description: Вы можете узнать о методе exec в документации библиотеки DHTMLX JavaScript Pivot. Просматривайте руководства разработчика и справочник API, изучайте примеры кода и демонстрации, а также загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# api.exec()

### Описание {#description}

@short: Позволяет инициировать внутренние события

## Использование {#usage}

~~~jsx
api.exec(
    event: string,
    config: object
): Promise<any>;
~~~

## Параметры {#parameters}

- `event` - (обязательный) событие, которое необходимо вызвать
- `config` - (обязательный) объект конфигурации с параметрами (см. вызываемое событие)

## Действия {#actions}

:::info
Полный список событий Pivot можно найти [**здесь**](api/overview/events-overview.md)
:::

## Пример {#example}

В приведённом ниже примере событие [`delete-field`](api/events/delete-field-event.md) инициируется через метод `api.exec()`. Последнее поле удаляется из области **values**. Метод [`api.getState()`](api/internal/getstate-method.md) используется здесь для получения текущего состояния [`config`](api/config/config-property.md) компонента Pivot. Событие будет вызвано по нажатию кнопки.

~~~jsx {32-35}
// создание Pivot
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

//вызов методов API: удаление конкретного значения из values в config
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
