---
sidebar_label: data
title: data 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 data 配置项。浏览开发指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# data

### 描述 {#description}

@short: 可选。一个对象数组，包含 Pivot 表格的数据

### 用法 {#usage}

~~~jsx
data?: [];
~~~

### 参数 {#parameters}

`data` 数组中的每个对象代表一行数据，默认值为空数组。`data` 属性没有直接的子属性，但数组中的每个对象可以包含任意数量的属性，这些属性将作为 Pivot 表格的维度和值。

`data` 数组示例：

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
    //其他数据
];
~~~

### 示例 {#example}

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
        //其他数据对象
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
