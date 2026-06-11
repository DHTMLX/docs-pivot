---
sidebar_label: api.getState()
title: Метод getState
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о методе getState. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# api.getState()

### Описание {#description}

@short: Возвращает объект со свойствами StateStore компонента Pivot

### Использование {#usage}

~~~jsx
api.getState(): object;
~~~

### Возвращает {#returns}

Метод возвращает объект со следующими параметрами:

~~~jsx
{
    config: {}, // текущая конфигурация (строки, столбцы, значения, фильтры)
    activeFilter: {}, // объект активного фильтра (если фильтр открыт) 
    columnShape: {}, // конфигурация столбцов сводной таблицы
    data: [], // исходные данные
    fields: [], // массив полей
    filters: {}, // правила фильтрации
    headerShape: {}, // настройки заголовка таблицы
    predicates: {}, // доступные предикаты по полям
    limits: {}, // максимальное ограничение на количество строк и столбцов в наборе данных
    methods: {}, // методы агрегации данных
    tableShape: {}, // настройки таблицы (размеры, итоговая строка, шаблоны)
    tableConfig: {}, // параметры конфигурации таблицы (столбцы, данные, размеры, режим дерева, подвал)
    configPanel: boolean, // состояние видимости панели конфигурации
    readonly: boolean, // включён ли режим только для чтения
}  
~~~

### Пример {#example}

~~~jsx {21-22}
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

const { config } = table.api.getState();
console.log(config); //вывод состояния конфигурации в консоль
~~~
