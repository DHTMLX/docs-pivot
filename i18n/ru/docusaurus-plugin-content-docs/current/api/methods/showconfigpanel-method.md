---
sidebar_label: showConfigPanel()
title: showConfigPanel()
description: Вы можете узнать о методе showConfigPanel() в документации библиотеки DHTMLX JavaScript Pivot. Просматривайте руководства разработчика и справочник АПИ, изучайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# showConfigPanel()

### Описание {#description}

@short: Показывает или скрывает панель настройки

Этот метод может быть полезен, когда необходимо управлять видимостью панели настройки без участия пользователя. Например, можно скрывать или отображать панель в зависимости от какого-либо другого взаимодействия или состояния в приложении.

### Использование {#usage}

~~~jsx
showConfigPanel({mode: boolean}): void;
~~~

### Параметры {#parameters}

- `mode` (boolean) - (обязательный) если значение установлено в **true** (по умолчанию), панель настройки отображается; если установлено в **false**, панель настройки скрыта

### Пример {#example}

~~~jsx {21-23}
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

table.showConfigPanel ({
    mode: false
})
~~~

**Связанные статьи**:
- [событие `show-config-panel`](api/events/show-config-panel-event.md)
- [свойство `configPanel`](api/config/configpanel-property.md)
