---
sidebar_label: open-filter
title: open-filter Событие
description: Вы можете узнать о событии open-filter в документации библиотеки DHTMLX JavaScript Pivot. Изучите руководства разработчика и справочник АПИ, ознакомьтесь с примерами кода и живыми демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# open-filter

### Описание {#description}

@short: Срабатывает при активации фильтра для поля

### Использование {#usage}

~~~jsx
"open-filter": ({
    id: string | null,
    area?: "values" | "rows" | "columns"
}) => boolean | void;
~~~

### Параметры {#parameters}

Калбэк действия принимает следующие параметры:

- `area` - область, в которой применяется поле ("rows", "columns", "values")
- `id` - идентификатор поля; если передан единственный аргумент `id` со значением null, фильтр будет закрыт.

:::info
Для обработки внутренних событий можно использовать [методы Event Bus](api/overview/internal-eventbus-overview.md)
:::

### Возвращает {#returns}

Функция может возвращать булево значение или void. При возврате **false** соответствующая операция события будет прервана.

### Пример {#example}

Пример ниже показывает, как скрыть панель конфигурации при закрытии блока фильтра:

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

table.api.on("open-filter", (ev) => {
    if(!ev.id) {
        table.api.exec("show-config-panel", {
            mode: false
        });
    }    
});
~~~

В следующем примере идентификатор поля, для которого активирован фильтр, выводится в консоль:

~~~jsx {20-22}
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

table.api.on("open-filter", (ev) => {
    console.log("The field id for which filter is activated:", ev.id);
});
~~~
