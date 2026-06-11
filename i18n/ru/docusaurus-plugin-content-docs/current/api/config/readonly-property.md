---
sidebar_label: readonly
title: readonly Config
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о конфигурационном параметре readonly. Изучайте руководства разработчика и справочник API, запускайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# readonly

### Описание {#description}

@short: Необязательный. Включает/отключает режим только для чтения

В режиме только для чтения настройка структуры Pivot через интерфейс недоступна.

### Использование {#usage}

~~~jsx  
 readonly?: boolean;
~~~

### Параметры {#parameters}

Свойство может принимать значения **true** или **false**:

- `true` — включает режим только для чтения
- `false` — значение по умолчанию, отключает режим только для чтения

## Пример {#example}

~~~jsx {18}
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
    },
    readonly: true
});
~~~

**Связанный пример**: [Pivot 2. Режим только для чтения](https://snippet.dhtmlx.com/0k0mvycv)
