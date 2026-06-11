---
sidebar_label: show-config-panel
title: Событие show-config-panel
description: Вы можете узнать о событии show-config-panel в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# show-config-panel

### Описание {#description}

@short: Срабатывает при изменении видимости панели конфигурации

### Использование {#usage}

~~~jsx
"show-config-panel": ({
    mode: boolean 
}) 
~~~

### Параметры {#parameters}

Колбэк действия принимает объект со следующим параметром:

- `mode` - (обязательный) если значение установлено в **true** (по умолчанию), панель конфигурации отображается; если в **false** — панель конфигурации скрыта

:::info
Для обработки внутренних событий вы можете использовать [методы Event Bus](api/overview/internal-eventbus-overview.md)
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
//скрыть панель конфигурации
table.api.exec("show-config-panel", {
    mode: false
});
~~~

**Связанные статьи**:
- [метод `showConfigPanel()`](api/methods/showconfigpanel-method.md)
- [свойство `configPanel`](api/config/configpanel-property.md)
