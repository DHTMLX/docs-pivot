---
sidebar_label: 데이터 로드
title: 데이터 로드
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 데이터를 로드하는 방법을 살펴볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 참조하고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수도 있습니다.
---

# 데이터 로드 {#loading-data}

Pivot은 [`data`](api/config/data-property.md) 속성을 통해 JSON 형식의 데이터를 받습니다. CSV 데이터는 JSON으로 변환한 후 사용할 수 있습니다.

## 데이터 로드 준비 {#prepare-data-for-loading}

[`data`](api/config/data-property.md) 속성은 객체 배열을 받으며, 각 객체는 하나의 데이터 행을 나타냅니다. 각 객체의 키는 Pivot 테이블에서 사용되는 차원과 값을 정의합니다.

다음 코드 스니펫은 샘플 `data` 배열을 정의합니다:

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
    // 기타 데이터
];
~~~

:::info
필드 및 Pivot 구조 정의에 대한 자세한 내용은 [데이터 작업](guides/working-with-data.md)을 참조하십시오.
:::

## 파일에서 데이터 로드 {#load-data-from-a-file}

Pivot은 초기화 후 외부 파일에서 JSON 데이터를 로드합니다. 데이터, 필드, 구성이 포함된 소스 파일을 준비하십시오.

다음 코드 스니펫은 별도 파일에서 `data`, `fields`, `getData()` 접근자를 정의합니다:

~~~jsx
function getData() {
    return {
        data,
        config: {
            rows: ["continent", "name"],
            columns: ["year"],
            values: [
                "count(oil)",
                { field: "oil", method: "sum" },
                { field: "gdp", method: "sum" }
            ],
            filters: {
                genre: {
                    contains: "D",
                    includes: ["Drama"],
                }
            }
        },
        fields
    };
}
const fields = [
    { id: "year", label: "Year", type: "number" },
    { id: "continent", label: "Continent", type: "text" },
    { id: "form", label: "Form", type: "text" },
    { id: "oil", label: "Oil", type: "number" },
    { id: "balance", label: "Balance", type: "number" }
];

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
    // 기타 데이터
];
~~~

페이지 마크업에 소스 데이터 파일 경로를 추가하십시오:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">

<script src="./common/data.js"></script>
~~~

다음 코드 스니펫은 Pivot을 생성하고 준비된 파일에서 데이터를 로드합니다:

~~~jsx
const { data, config, fields } = getData();
const table = new pivot.Pivot("#root", { data, config, fields });
~~~

## 서버에서 데이터 로드 {#load-data-from-a-server}

서버 엔드포인트에서 데이터를 로드하려면 네이티브 `fetch` 메서드(또는 동등한 방법)로 요청을 보낸 후, 응답을 [`setConfig`](api/methods/setconfig-method.md)에 전달합니다. `setConfig`는 Pivot 구성을 업데이트하고 이전에 설정된 옵션을 유지합니다.

다음 코드 스니펫은 빈 데이터로 Pivot을 초기화하고, 서버에서 데이터와 필드를 가져온 후 `setConfig`로 적용합니다:

~~~jsx
const table = new pivot.Pivot("#root", { fields: [], data: [] });
const server = "https://some-backend-url";

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({ data, fields });
});
~~~

추가 정보는 다음 항목을 참조하십시오: [서버 작업](/guides/working-with-server)

## CSV 데이터 로드 {#load-csv-data}

Pivot은 외부 JS 파싱 라이브러리로 CSV 데이터를 JSON으로 변환한 후 사용할 수 있습니다. 변환된 데이터는 네이티브 JSON과 동일하게 동작합니다.

아래 예제는 외부 [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js) 라이브러리를 사용하여 버튼 클릭 시 데이터를 로드하고 변환합니다. `convert()` 헬퍼는 다음 파라미터를 받습니다:

- `data` — CSV 데이터 문자열
- `headers` — CSV 필드 이름 배열
- `meta` — 필드 이름을 데이터 타입에 매핑하는 객체

다음 코드 스니펫은 Pivot을 생성하고, `convert()` 헬퍼를 정의하며, 버튼 클릭 시 [`setConfig`](api/methods/setconfig-method.md)를 통해 파싱된 CSV 데이터를 적용합니다:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    config: {
        rows: [
            "studio",
            "genre"
        ],
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

function convert(data, headers, meta) {
    const header = headers.join(",") + "\n";
    const processedData = header + data;

    return Papa.parse(processedData, { 
        header: true,
        dynamicTyping: true,
        transform: (v, f) => {
            return meta && meta[f] === "date" ? new Date(v) : v;
        }
    });
}

function fromCSV() {
    const fields = [
        { id: "name", label: "Name", type: "text" },
        { id: "continent", label: "Continent", type: "text" },
        { id: "form", label: "Form", type: "text" },
        { id: "gdp", label: "GDP", type: "number" },
        { id: "oil", label: "Oil", type: "number" },
        { id: "balance", label: "Balance", type: "number" },
        { id: "year", label: "Year", type: "number" },
        { id: "when", label: "When", type: "date" }
    ];
    
    const config = {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ]
    };

    const headers = [
        "name",
        "year",
        "continent",
        "form",
        "gdp",
        "oil",
        "balance",
        "when"
    ];
  
    // 날짜 필드를 명시적으로 표시하여 올바른 변환 적용
    const meta = { when: "date" };

    const dataURL = "https://some-backend-url";
    fetch(dataURL)
        .then(response => response.text())
        .then(text => convert(text, headers, meta))
        .then(data => {
        table.setConfig({
            data: data.data,
            fields,
            config
        });
    });
}

const importButton = document.createElement("button");
importButton.addEventListener("click", fromCSV);
importButton.textContent = "Import";

document.body.appendChild(importButton);
~~~

## 예제 {#example}

아래 스니펫은 JSON과 CSV 데이터를 로드합니다:

<iframe src="https://snippet.dhtmlx.com/wo6w9hf9?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**관련 샘플:**
- [Pivot 2. 날짜 형식](https://snippet.dhtmlx.com/shn1l794)
- [Pivot 2. 다양한 데이터셋](https://snippet.dhtmlx.com/6xtqge4i)
- [Pivot 2. 대용량 데이터셋](https://snippet.dhtmlx.com/e6qwqrys)

**관련 문서**: [날짜 형식 지정](guides/localization.md#date-formatting)
