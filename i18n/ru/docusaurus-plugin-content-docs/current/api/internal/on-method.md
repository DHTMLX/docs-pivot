---
sidebar_label: api.on()
title: Метод on
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о методе on. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# api.on()

### Описание {#description}

@short: Позволяет прикрепить обработчик к внутренним событиям

### Использование {#usage}

~~~jsx
api.on(
    event: string,
    handler: function,
    config?: { intercept?: boolean, tag?: number | string | symbol }
): void;
~~~

### Параметры {#parameters}

- `event` - (обязательный) событие, которое необходимо отслеживать
- `handler` - (обязательный) прикрепляемый обработчик (аргументы обработчика зависят от вызываемого события)
- `config` - (необязательный) объект со следующими параметрами:
    - `intercept` - (необязательный) если при создании слушателя событий задать `intercept: true`, этот слушатель будет выполняться раньше всех остальных
    - `tag` - (необязательный) тег действия. Имя тега можно использовать для удаления обработчика действия через метод [`detach`](api/internal/detach-method.md)

### События {#events}

:::info
Полный список внутренних событий Pivot можно найти [**здесь**](api/overview/main-overview.md#pivot-events).
Используйте метод `api.on()`, если хотите прослушивать действия без их изменения. Чтобы вносить изменения в действия, применяйте метод [`api.intercept()`](api/internal/intercept-method.md).
:::

### Пример {#example}

В примере ниже показано, как вывести метку поля, для которого был активирован фильтр: 

~~~jsx {21-29}
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

table.api.on("open-filter", (ev) => {
    if (ev.id) {
        const { config } = table.api.getState();
        const fieldObj = config[ev.area].find((f) => f.id === ev.id);
        if (fieldObj) {
            console.log("The field for which filter was activated:", fieldObj.label);
        }
    }
}, {tag: "open-filter-tag"});
~~~
