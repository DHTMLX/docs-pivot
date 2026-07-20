---
sidebar_label: data
title: data Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 data config에 대해 알아볼 수 있습니다. 개발자 가이드 및 API 참조를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. 또한 DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# data

### 설명 {#description}

@short: 선택 사항. Pivot 테이블의 데이터를 포함하는 객체 배열

### 사용법 {#usage}

~~~jsx
data?: [];
~~~

### 매개변수 {#parameters}

`data` 배열의 각 객체는 하나의 행을 나타냅니다. 기본값은 빈 배열입니다.
`data` 속성의 직접적인 하위 속성은 없습니다. 그러나 배열의 각 객체는 Pivot 테이블의 차원과 값을 나타내는 임의 개수의 속성을 가질 수 있습니다.

`data` 배열 예시:

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
    //다른 데이터
];
~~~

### 예제 {#example}

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
        //다른 데이터 객체
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
