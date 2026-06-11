---
sidebar_label: data
title: data Config
description: Вы можете узнать о конфигурации data в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# data

### Описание {#description}

@short: Необязательный. Массив объектов с данными для таблицы Pivot

### Использование {#usage}

~~~jsx
data?: [];
~~~

### Параметры {#parameters}

Каждый объект массива `data` представляет собой строку. Значение по умолчанию — пустой массив.
У свойства `data` нет прямых вложенных свойств. Однако каждый объект в массиве может содержать любое количество свойств, которые будут представлять измерения и значения для таблицы Pivot.

Пример массива `data`:

~~~jsx
const data = [
    {
        name: "Argentina",
        year: 2015,
        continent: "South America",
        form: "Republic",
        gdp: 181.357,
        oil: 1.545,
        balance: 4.699,
        when: new Date("4/21/2015")
    },
    {
        name: "Argentina",
        year: 2017,
        continent: "South America",
        form: "Republic",
        gdp: 212.507,
        oil: 1.732,
        balance: 7.167,
        when: new Date("1/15/2017")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 260.071,
        oil: 2.845,
        balance: 6.728,
        when: new Date("6/16/2014")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 324.405,
        oil: 4.333,
        balance: 5.99,
        when: new Date("2/20/2014")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 305.763,
        oil: 2.626,
        balance: 7.544,
        when: new Date("8/17/2014")
    },
    //другие данные
];
~~~

### Пример {#example}

~~~jsx {3-29}
const table = new pivot.Pivot("#root", {
    fields,
    data: [
        {
            rank: 1,
            title: "Shingeki no Kyojin: The Final Season - Kanketsu-hen",
            popularity: 609,
            genre: "Action",
            studio: "MAPPA",
            type: "Special",
            episodes: 2,
            duration: 61,
            members: 347875,
            score: 9.17,
        },
        {
            rank: 2,
            title: "Fullmetal Alchemist: Brotherhood",
            popularity: 3,
            genre: "Action",
            studio: "Bones",
            type: "TV",
            episodes: 64,
            duration: 24,
            members: 3109951,
            score: 9.11
        },
        //другие объекты данных
    ],
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
~~~
