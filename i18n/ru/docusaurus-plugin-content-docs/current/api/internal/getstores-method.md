---
sidebar_label: api.getStores()
title: Метод getStores
description: Вы можете узнать о методе getStores в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, просматривайте примеры кода и живые демо, а также загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# api.getStores()

### Описание {#description}

@short: Возвращает объект со свойствами DataStore компонента Pivot

### Использование {#usage}

~~~jsx
api.getStores(): object;
~~~

### Возвращает {#returns}

Метод возвращает объект с параметрами **DataStore**:

~~~jsx
{
    data: DataStore // ( объект параметров )
}
~~~

### Пример {#example}

~~~jsx {21-22}
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

const stores = table.api.getStores();
console.log("DataStore:", stores);
~~~
