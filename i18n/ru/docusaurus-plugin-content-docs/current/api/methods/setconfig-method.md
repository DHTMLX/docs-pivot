---
sidebar_label: setConfig()
title: setConfig()
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о методе setConfig(). Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# setConfig()

### Описание {#description}

@short: Обновляет текущую конфигурацию виджета Pivot

Метод используется для обновления текущей конфигурации виджета Pivot. Он полезен, когда необходимо обновить базовый набор данных виджета. Метод сохраняет все ранее заданные параметры, которые явно не указаны в вызове `setConfig`.

### Использование {#usage}

~~~jsx
setConfig(config: { [key:any]: any }): void;
~~~

### Параметры {#parameters}

- `config` - (обязательный) объект конфигурации Pivot. Полный список свойств см. [здесь](api/overview/properties-overview.md)

:::important
Метод изменяет только переданные параметры. Он уничтожает текущий компонент и инициализирует новый.
:::

### Пример {#example}

~~~jsx {21-41}
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

// обновление параметров конфигурации
table.setConfig({
    config: {
        rows: ["studio", "genre", "duration"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            },
            {
                field: "type",
                method: "count"
            }
        ]
    }
});
~~~
