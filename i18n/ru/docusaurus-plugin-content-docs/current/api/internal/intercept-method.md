---
sidebar_label: api.intercept()
title: Метод intercept
description: Вы можете узнать о методе intercept в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, и скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# api.intercept()

### Описание {#description}

@short: Позволяет перехватывать и предотвращать внутренние события

### Использование {#usage}

~~~jsx
api.intercept(
    event: string,
    callback: function,
    config?: { tag?: number | string | symbol } 
): void;
~~~

### Параметры {#parameters}

- `event` - (обязательный) событие, которое будет вызвано
- `callback` - (обязательный) калбэк для выполнения (аргументы калбэка зависят от вызываемого события)
- `config` - (необязательный) объект, содержащий следующий параметр:
    - `tag` - (необязательный) тег действия. Вы можете использовать имя тега для удаления обработчика действия с помощью метода [`detach`](api/internal/detach-method.md)

### События {#events}

:::info
Полный список внутренних событий Pivot можно найти [**здесь**](api/overview/main-overview.md#pivot-events).
Используйте метод [`api.on()`](api/internal/on-method.md), если хотите отслеживать действия без их изменения. Чтобы вносить изменения в действия, применяйте метод `api.intercept()`.
:::

### Пример {#example}

В примере показано, как сделать так, чтобы все сворачиваемые строки закрывались при инициализации.

~~~jsx {21-24}
// создаём Pivot
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

//закрываем все строки при инициализации
table.api.intercept("render-table", (ev) => {
    ev.config.data.forEach((row) => (row.open = false));
}, {tag: "render-table-tag"});
~~~

**Связанные статьи**: [`render-table`](api/events/render-table-event.md)
