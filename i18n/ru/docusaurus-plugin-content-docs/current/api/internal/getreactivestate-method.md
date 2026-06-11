---
sidebar_label: api.getReactiveState()
title: Метод getReactiveState
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о методе getReactiveState. Изучайте руководства разработчика и справочник API, просматривайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# api.getReactiveState()

### Описание {#description}

@short: Возвращает объект с реактивными свойствами Pivot

### Использование {#usage}

~~~jsx
api.getReactiveState(): object;
~~~

### Возвращает {#returns}

Метод возвращает объект со следующими параметрами:

~~~jsx
{
    config: {}, // текущая конфигурация (строки, столбцы, значения, фильтры)
    activeFilter: {}, // объект активного фильтра (если открыт какой-либо фильтр) 
    columnShape: {}, // конфигурация столбцов сводной таблицы
    data: [], // исходные данные
    fields: [], // массив полей
    filters: {}, // правила фильтрации
    headerShape: {}, // настройки заголовка таблицы
    predicates: {}, // доступные предикаты по полям
    limits: {}, // максимальный лимит на количество строк и столбцов в наборе данных
    methods: {}, // методы агрегации данных
    tableShape: {}, // настройки таблицы (размеры, итоговая строка, шаблоны)
    tableConfig: {}, // параметры конфигурации таблицы (столбцы, данные, размеры, режим дерева, подвал)
    configPanel: boolean, // состояние видимости панели конфигурации
    readonly: boolean, // включён ли режим только для чтения
}  
~~~

### Пример {#example}

~~~jsx {21-26}
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

// подписка на реактивное хранилище конфигурации и вывод его в лог при каждом изменении
const state = table.api.getReactiveState();

state.config.subscribe((config) => {
    console.log("Pivot config changed. Its current state:", config);
});
~~~
