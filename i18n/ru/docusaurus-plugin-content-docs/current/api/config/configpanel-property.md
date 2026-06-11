---
sidebar_label: configPanel
title: Конфигурация configPanel
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о конфигурации configPanel. Изучайте руководства разработчика и справочник по АПИ, пробуйте примеры кода и живые демо, скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# configPanel

### Описание {#description}

@short: Необязательный. Управляет видимостью панели конфигурации в интерфейсе

В интерфейсе панель скрывается/отображается нажатием кнопки **Hide Settings**.

### Использование {#usage}

~~~jsx  
configPanel?: boolean;
~~~

### Параметры {#parameters}

Свойство может принимать значение **true** или **false**:

- `true` — по умолчанию, показывает панель конфигурации
- `false` — скрывает панель конфигурации

## Пример {#example}

~~~jsx {5}
// Панель конфигурации скрыта при инициализации
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    configPanel: false,
    config: {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

**Связанный пример**: [Pivot 2.0: Переключение видимости панели конфигурации](https://snippet.dhtmlx.com/1xq1x5bo)

**Связанные статьи**:
- [Событие `show-config-panel`](api/events/show-config-panel-event.md)
- [Метод `showConfigPanel()`](api/methods/showconfigpanel-method.md)
- [Управление видимостью панели конфигурации](guides/configuration.md#controlling-visibility-of-configuration-panel)
