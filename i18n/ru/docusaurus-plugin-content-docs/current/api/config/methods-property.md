---
sidebar_label: methods
title: methods Config
description: Вы можете узнать о конфигурационном параметре methods в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# methods

### Описание {#description}

@short: Необязательный. Задаёт пользовательские математические методы для агрегации данных

### Использование {#usage}

~~~jsx
methods?: {
    [method: string]: {
        type?: 'number' | 'date' | 'text' | [],
        label?: string,
        handler?: (values: number[]) => number,
        branchMode?: "raw"|"result",
        branchMath?: string
    }
};
~~~

### Параметры {#parameters}

Каждый метод представлен парой «ключ-значение», где `method` — это имя метода, а значение — объект, описывающий поведение метода. Каждый объект имеет следующие параметры:

- `handler` - (обязателен для пользовательских методов) функция, которая вычисляет агрегированное значение из массива чисел; функция принимает массив значений на вход и возвращает одно значение на выходе
- `type` - (необязательный) тип данных, для которого подходит данный метод; может быть "number", "date" или "text" или массивом этих значений
- `label` - (необязательный) метка метода, отображаемая в интерфейсе
- `branchMode` - (необязательный) определяет режим вычисления итоговых значений для древовидной таблицы; `branchMode` может быть задан как `raw` для вычисления на основе всех исходных данных; `result` (по умолчанию) задаётся для вычисления на основе уже обработанных данных в режиме дерева
- `branchMath` - (необязательный) имя метода для вычисления итоговых значений в режиме дерева; по умолчанию совпадает с именем метода (для метода "max" параметр `branchMath` также равен "max")

По умолчанию свойство `methods` является пустым объектом {}, что означает отсутствие пользовательских методов. Количество вложенных свойств, которые можно определить в объекте methods, не ограничено.

Предопределённые методы:

~~~jsx
defaultMethods = {
    sum: { type: "number", label: "sum" },
    min: { type: ["number", "date"], label: "min" },
    max: { type: ["number", "date"], label: "max" },
    count: {
        type: ["number", "date", "text"],
        label: "count",
        branchMath: "sum"
    },
    counta: {
        type: ["number", "date", "text"],
        label: "counta",
        branchMath: "sum"
    },
    countunique: {
        type: ["number", "text"],
        label: "countunique",
        branchMath: "sum"
    },
    average: { type: "number", label: "average", branchMode: "raw" },
    median: { type: "number", label: "median", branchMode: "raw" },
    product: { type: "number", label: "product" },
    stdev: { type: "number", label: "stdev", branchMode: "raw" },
    stdevp: { type: "number", label: "stdevp", branchMode: "raw" },
    var: { type: "number", label: "var", branchMode: "raw" },
    varp: { type: "number", label: "varp", branchMode: "raw" }
};
~~~

Определение каждого метода можно посмотреть здесь: [Применение методов](guides/working-with-data.md#default-methods)

## Пример {#example}

В приведённом ниже примере показано, как вычислить количество уникальных и средних значений для типа date. Функция **countUnique** принимает массив чисел (значений) на вход и вычисляет точное количество уникальных значений с помощью метода **reduce**. Вложенное свойство **countunique_date** содержит обработчик с функцией, которая получает уникальные значения из массива дат. Вложенное свойство **average_date** содержит обработчик, который вычисляет средние значения из массива дат.

~~~jsx
function countUnique(values, converter) {
    const valueMap = {};
    return values.reduce((acc, d) => {
        if (converter) d = converter(d);
        if (!valueMap[d]) {
            acc++;
            valueMap[d] = true;
        }
        return acc;
    }, 0);
}

const methods = {
    countunique_date: {
        handler: values => countUnique(values, v => new Date(v).getTime()),
        type: "date",
        label: "CountUnique"
    },
    average_date: {
        type: "date",
        label: "Average",
        branchMode: "raw",
        handler: values => {
            if (!values.length) return null;
            const sum = values.reduce((acc, d) => acc + d.getTime(), 0);
            const avgTime = sum / values.length;
            return new Date(avgTime);
        }
    }
};

// показывать целые числа для результатов "count" и "unique count"
const templates = {};
fields.forEach(f => {
    if (f.type == "number")
        templates[f.id] = (v, method) =>
        v && method.indexOf("count") < 0 ? parseFloat(v).toFixed(3) : v;
});

// строку даты в Date 
const dateFields = fields.filter(f => f.type == "date");
if (dateFields.length) {
    dataset.forEach(item => {
        dateFields.forEach(f => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    tableShape: { templates },
    methods: { ...pivot.defaultMethods, ...methods },
    config:{
        rows: ["state"],
        columns: [
            "product_line",
            "product_type"
        ],
        values: [
            {
                field: "sales",
                method: "sum"
            },
            {
                field: "sales",
                method: "count"
            },
            {
                field: "date",
                method: "countunique_date"
            },
            {
                field: "date",
                method: "average_date"
            }
        ]
    }
});
~~~

**Связанный пример**: [Pivot 2. Пользовательские математические методы](https://snippet.dhtmlx.com/lv90d8q2) 

**Связанная статья**: [Применение математических методов](guides/working-with-data.md#applying-maths-methods)
