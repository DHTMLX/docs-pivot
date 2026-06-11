---
sidebar_label: apply-filter
title: apply-filter Event
description: Вы можете узнать о событии apply-filter в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную пробную версию DHTMLX Pivot.
---

# apply-filter

### Описание {#description}

@short: Срабатывает при применении фильтра

### Использование {#usage}

~~~jsx
"apply-filter": ({
    rule: {} 
}) => boolean | void;
~~~

### Параметры {#parameters}

Калбэк действия принимает объект со следующими параметрами:

- `rule` - любой объект конфигурации фильтра со следующими параметрами:
  - `field` - (обязательный) идентификатор поля, к которому будет применён фильтр
  - `filter` - (обязательный) тип фильтра: 
    - для текстовых значений: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith
    - для числовых значений: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, contains, notContains
    - для типов дат: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween
  - `value` - (необязательный) значение для фильтрации
  - `includes` - (необязательный) массив значений для отображения из тех, что уже отфильтрованы; доступно для текстовых и датовых значений

:::info
Для обработки внутренних событий можно использовать [методы Event Bus](api/overview/internal-eventbus-overview.md)
:::

### Пример {#example}

~~~jsx {20-23}
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
//вывод в консоль метки поля, к которому был применён фильтр
table.api.on("apply-filter", (ev) => {
    console.log("The field to which filter was applied:", ev.rule.field);
});
~~~

**Связанные статьи**: [api.on()](api/internal/on-method.md)
