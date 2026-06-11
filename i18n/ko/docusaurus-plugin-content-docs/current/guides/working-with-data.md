---
sidebar_label: 데이터 작업
title: 데이터 작업
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 데이터 작업 방법을 살펴볼 수 있습니다. 개발자 가이드와 API 참조를 확인하고, 코드 예제와 라이브 데모를 직접 실행해 보세요. 또한 DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# 데이터 작업

이 페이지에서는 Pivot에서 데이터를 집계, 포맷, 정렬, 필터링 및 전처리하는 방법을 설명합니다. 데이터 로드 및 내보내기에 관한 안내는 [데이터 로드](guides/loading-data.md)와 [데이터 내보내기](guides/exporting-data.md)를 참조하십시오.

## 필드 정의 {#define-fields}

[`fields`](api/config/fields-property.md) 속성을 사용하여 Pivot이 행, 열, 값에 배치할 수 있는 필드를 선언합니다. `fields` 배열의 각 항목은 하나의 필드를 설명하며, 해당 필드의 ID, 레이블, 데이터 타입을 포함합니다.

다음 코드 예제는 다섯 개의 필드로 Pivot을 초기화합니다:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields: [
        { id: "year", label: "Year", type: "number" },
        { id: "continent", label: "Continent", type: "text" },
        { id: "form", label: "Form", type: "text" },
        { id: "oil", label: "Oil", type: "number" },
        { id: "balance", label: "Balance", type: "number" }
    ],
    data,
    config: {...}
});
~~~

## 필드에 포맷 적용 {#applying-formats-to-fields}

Pivot은 현재 로케일을 기준으로 숫자 및 날짜 필드에 기본 포맷을 적용합니다. 자세한 내용은 [날짜 포맷](guides/localization.md#date-formatting) 및 [숫자 포맷](guides/localization.md#number-formatting)을 참조하십시오.

특정 필드의 기본값을 재정의하려면 [`fields`](api/config/fields-property.md) 속성의 `format` 파라미터를 설정합니다.

### 숫자 필드 포맷 {#format-numeric-fields}

`prefix`와 `suffix`를 사용하여 숫자 값 앞뒤에 텍스트를 추가하고, `maximumFractionDigits`로 소수점 자릿수를 제어합니다. 예를 들어 `12.345`를 `"12.35 EUR"`로 표시하려면 suffix를 `" EUR"`로, `maximumFractionDigits`를 `2`로 설정합니다:

~~~js
const fields = [
     { id: "sales", type: "number", format: { suffix: " EUR", maximumFractionDigits: 2 } },
];
~~~

기본 포맷은 숫자 필드의 소수점 자릿수를 3자리로 제한하고 정수 부분에 천 단위 구분자를 적용합니다. 포맷을 완전히 비활성화하려면 `format`을 `false`로 설정합니다:

~~~js
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

아래 예제는 `marketing`, `profit`, `sales`를 `$` 접두사와 고정 2자리 소수점이 있는 통화 필드로 지정합니다:

~~~jsx
// 사전 정의된 데이터셋과 필드로 Pivot 초기화
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            { field: "marketing", method: "sum" },
            // 다른 값들

        ],
    },
    fields:[
        // 커스텀 포맷
        { id: "marketing", label: "Marketing", type:"number", format:{
                prefix: "$", minimumFractionDigits: 2, maximumFractionDigits: 2 }
        }
    ]
});
~~~

### 날짜 필드 포맷 {#format-date-fields}

단일 필드에 대해 로케일 전체의 `dateFormat`을 재정의하려면 [`fields`](api/config/fields-property.md)의 `format` 파라미터를 날짜 포맷 문자열로 설정합니다.

다음 코드 예제는 `date` 필드의 포맷을 `"%M %d, %Y"`로 설정합니다:

~~~jsx
const fields = [
     { id: "date",  type: "date",  format: "%M %d, %Y" },
];
~~~

아래 예제는 문자열 날짜를 `Date` 객체로 변환한 다음, `date` 필드에 대해 `"%d %M %Y %H:%i"` 포맷으로 Pivot을 초기화합니다. 필드 값은 `"24 April 2025 14:30"`과 같은 레이블로 표시됩니다.

~~~jsx
// 날짜 문자열을 Date 객체로 변환
const dateFields = fields.filter(f => f.type === "date");
dataset.forEach(item => {
    dateFields.forEach(f => {
        const v = item[f.id];
        if (typeof v === "string") {
            item[f.id] = new Date(v);
        }
    });
});

// 필드별 날짜 포맷으로 Pivot 초기화
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state"],
        columns: ["product_type"],
        values: [
            { field: "date", method: "min" },
            { field: "profit", method: "sum" },
            { field: "sales", method: "sum" }
        ]
    },
    fields:[
        // 커스텀 포맷: 일 월 년 시:분
        { id: "date", label: "Date", type: "date", format: "%d %M %Y %H:%i" }
    ]
});
~~~

:::note
`xlsx` 내보내기 포맷의 경우, Pivot은 날짜 및 숫자 필드를 기본 포맷(또는 [`fields`](api/config/fields-property.md) 속성으로 정의된 포맷)과 함께 원시 값으로 내보냅니다. 필드에 템플릿이 정의된 경우([`tableShape`](api/config/tableshape-property.md) 속성 참조), Pivot은 해당 템플릿이 생성한 렌더링된 값을 내보냅니다. `template`과 `format`이 모두 설정된 경우, 템플릿이 포맷보다 우선합니다.
:::

## Pivot 구조 정의 {#define-pivot-structure}

[`config`](api/config/config-property.md) 속성을 사용하여 행, 열, 집계 값으로 표시할 필드와 데이터 필터링 방식을 선언합니다. `config` 속성에는 사전 정의된 값이 없으므로 데이터를 렌더링하려면 반드시 설정해야 합니다. 전체 파라미터 목록은 [`config`](api/config/config-property.md) 참조를 확인하십시오.

다음 코드 예제는 `continent`와 `name`을 행에, `year`를 열에, 세 개의 집계를 값에, `name`에 대한 필터를 배치합니다:

~~~jsx {4-18}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ]
    },
    fields,
    filters: {
        name: {
            contains: "B"
        }
    }
});
~~~

## 데이터 정렬 {#sorting-data}

Pivot은 집계 중에 세 영역(값, 열, 행) 모두에서 정렬을 지원합니다. UI에서 사용자는 열 헤더를 클릭하여 정렬합니다.

기본 정렬을 설정하려면 [`fields`](api/config/fields-property.md) 속성의 `sort` 파라미터를 사용합니다. 이 파라미터는 `"asc"`, `"desc"`, 또는 커스텀 비교 함수를 받습니다.

아래 예제는 Pivot 위에 클릭 가능한 필드 레이블을 렌더링하고 클릭 시 정렬 방향을 전환합니다:

~~~jsx
const bar = document.getElementById("bar");

let sorted = ["studio", "genre"];
setFields();
bar.addEventListener('click', (e) => switchSort(e.target.id), false);

function setFields(){
    let html = "";
    let sortedFields = fields.filter(f => (sorted.indexOf(f.id) != -1));

    sortedFields.forEach((f) =>{
        const order = f.sort || "asc";
        html += `<div class="field" id="${f.id}">
                    ${f.label}<i class="icon wxi-${order}" ></i>
                </div>`;
    });
    bar.innerHTML = html;
}

function switchSort(id){
    fields.forEach(f => {
        if(f.id == id){
             f.sort =  f.sort != "desc" ? "desc" : "asc";
        }
    });
    // Pivot fields 업데이트
    table.setConfig({ fields }); 
    // 아이콘 새로고침
    setFields(bar, fields);
}

const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: [
            "studio",
            "genre"
        ],
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

UI에서의 정렬은 기본적으로 활성화되어 있습니다. 비활성화하려면 [`columnShape`](api/config/columnshape-property.md) 속성의 `sort` 파라미터를 `false`로 설정합니다.

다음 코드 예제는 UI 정렬을 비활성화합니다:

~~~jsx {19}
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
    },
    columnShape: {
        sort: false 
    }
});
~~~

## 데이터 필터링 {#filtering-data}

Pivot은 필드 데이터 타입에 연결된 필터를 지원합니다. 초기화 후 Pivot UI를 통해 필터를 설정하거나, [`config`](api/config/config-property.md) 속성의 `filters` 객체를 통해 선언적으로 설정할 수 있습니다.

UI에서 필터는 각 필드의 드롭다운 목록으로 표시됩니다.

#### 필터 타입 {#filter-types}

Pivot은 데이터 타입별로 다음과 같은 필터 조건을 지원합니다:

- 텍스트 필드 — `equal`, `notEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`, `includes`
- 숫자 필드 — `equal`, `notEqual`, `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`
- 날짜 필드 — `equal`, `notEqual`, `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `between`, `notBetween`, `includes`

`includes` 규칙은 필터를 특정 허용 값 집합으로 제한합니다.

#### 필터 추가 {#add-a-filter}

필터를 선언하려면 [`config`](api/config/config-property.md) 속성에 `filters` 객체를 추가하고 필드 ID를 키로 사용합니다. 각 값은 필터 조건 객체입니다.

다음 코드 예제는 두 개의 필터를 적용합니다 — `genre`에 하나(`"D"`를 포함하는 값, `"Drama"`로 제한)와 `title`에 하나(`"A"`를 포함하는 값):

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ],
        filters: {
            genre: {
                contains: "D",
                includes: ["Drama"]
            },
            title: {
                // 다른 필드("title")에 대한 필터
                contains: "A"
            }
        }
    }
});
~~~

:::info
Table widget API를 통해 데이터를 필터링하려면, [`getTable`](api/methods/gettable-method.md) 메서드로 Table 인스턴스에 접근하고 [`filter-rows`](api/table/filter-rows.md) 이벤트를 사용합니다.
:::

## 로드되는 데이터 제한 {#limiting-loaded-data}

매우 큰 데이터셋에서 컴포넌트가 멈추는 것을 방지하기 위해, [`limits`](api/config/limits-property.md) 속성으로 최종 데이터셋의 행과 열 수를 제한합니다. Pivot은 제한에 도달하면 렌더링을 중단합니다. 기본 제한은 행 10000개, 열 5000개입니다.

:::note
제한은 대규모 데이터셋에 적용됩니다. 이 숫자는 근사값이며, Pivot은 정확한 행/열 수를 보장하지 않습니다.
:::

다음 코드 예제는 데이터셋을 행 10개, 열 3개로 제한합니다:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio"],
        columns: ["genre"],
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
    },
    limits: { rows: 10, columns: 3 }
});
~~~

## 수학 메서드 적용 {#applying-maths-methods}

### 기본 메서드 {#default-methods}

Pivot에는 다음과 같은 기본 집계 메서드가 포함되어 있습니다:

- `sum` (숫자 값만) — 선택된 모든 값을 합산하며, 빈 셀, `TRUE`와 같은 논리 값, 텍스트는 무시합니다
- `min` (숫자 및 날짜 값) — 최솟값을 반환하며, 빈 셀, 논리 값, 텍스트는 무시합니다. 입력에 숫자가 없으면 `0`을 반환합니다
- `max` (숫자 및 날짜 값) — 최댓값을 반환하며, 빈 셀, 논리 값, 텍스트는 무시합니다. 입력에 숫자가 없으면 `0`을 반환합니다
- `count` (숫자, 텍스트, 날짜 값) — 비어 있지 않은 셀을 계산하며, 새로 추가된 모든 필드에 기본으로 할당되는 메서드입니다
- `countunique` (숫자 및 텍스트 값) — 입력에서 고유한 값의 수를 계산합니다
- `average` (숫자 값만) — 입력의 산술 평균을 계산하며, 빈 셀, 논리 값, 텍스트는 무시합니다. 값이 0인 셀은 포함합니다
- `counta` (숫자, 텍스트, 날짜 값) — 숫자, 날짜, 텍스트를 포함한 모든 비어 있지 않은 값을 계산합니다
- `median` (숫자 값만) — 입력의 중앙값을 반환합니다
- `product` (숫자 값만) — 입력의 모든 숫자의 곱을 반환합니다
- `stdev` (숫자 값만) — 표준 편차이며, 입력을 더 큰 집합의 표본으로 처리합니다
- `stdevp` (숫자 값만) — 표준 편차이며, 입력을 전체 모집단으로 처리합니다
- `var` (숫자 값만) — 분산이며, 입력을 더 큰 집합의 표본으로 처리합니다
- `varp` (숫자 값만) — 분산이며, 입력을 전체 모집단으로 처리합니다

다음 코드 예제는 내장 메서드 정의를 보여줍니다:

~~~jsx
const defaultMethods = {
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

[`config`](api/config/config-property.md) 속성의 `values` 파라미터를 통해 기본 메서드를 적용합니다. [값 정의](#options-for-defining-values)를 참조하십시오.

다음 코드 예제는 `title` 필드에 `count`를, `score` 필드에 `max`를 할당합니다:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                // 필드 id
                field: "title",
                // 메서드
                method: "count"
            },
            {
                id: "score",
                method: "max"
            }
        ]
    }
});
~~~

### 값 정의 {#options-for-defining-values}

`values`의 각 항목을 다음 두 가지 동등한 형식 중 하나로 정의합니다:

- `"operation(fieldID)"` 형식의 문자열
- `{ field: string, method: string }` 객체 (두 필드 모두 필수)

다음 코드 예제는 같은 `values` 배열에서 두 형식을 모두 사용합니다:

~~~jsx
values: [
    "sum(sales)", // 방법 1
    { field: "sales", method: "sum" } // 방법 2
]
~~~

### 기본 메서드 재정의 {#override-the-default-method}

새로 추가된 각 필드에 대해 Pivot은 해당 데이터 타입에 사용 가능한 첫 번째 메서드를 할당합니다. 이 동작을 변경하려면 [`api.intercept`](api/internal/intercept-method.md) 메서드로 `add-field` 이벤트를 인터셉트합니다.

아래 예제는 `add-field`를 인터셉트하여 숫자 필드가 추가될 때마다 `max` 메서드를 강제로 적용합니다:

~~~jsx {20-27}
const table = new pivot.Pivot("#root", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },
});
// 새로 추가된 숫자 필드에 대한 기본 메서드 재정의
table.api.intercept("add-field", (ev) => {
  const { fields } = table.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "max";
  }
});
~~~

### 커스텀 수학 메서드 추가 {#add-custom-math-methods}

커스텀 집계 메서드를 추가하려면 [`methods`](api/config/methods-property.md) 속성을 사용합니다. 각 항목은 메서드 이름(키)과 `handler` 함수 및 메타데이터를 포함하는 구성 객체를 쌍으로 구성합니다. `handler`는 값 배열을 받아 단일 집계 값을 반환합니다.

아래 예제는 두 개의 날짜별 메서드를 추가합니다. `countunique_date`는 숫자 타임스탬프를 기준으로 고유한 날짜를 계산합니다. `average_date`는 타임스탬프의 평균을 구해 평균 날짜를 반환합니다:

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
        label: "CountUnique",
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

// "count" 및 "unique count" 결과에 대해 정수 표시
const templates = {};
fields.forEach(f => {
    if (f.type == "number")
        templates[f.id] = (v, method) =>
        v && method.indexOf("count") < 0 ? parseFloat(v).toFixed(3) : v;
});

// 날짜 문자열을 Date 객체로 변환
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

## 프레디케이트로 데이터 처리 {#processing-data-with-predicates}

프레디케이트(predicate)는 Pivot이 행이나 열에서 데이터를 사용하기 전에 원시 필드 데이터를 변환하는 전처리 함수입니다. 예를 들어, 프레디케이트는 집계 전에 날짜를 월별로 그룹화할 수 있습니다.

다음 코드 예제는 Pivot이 기본적으로 적용하는 내장 날짜 프레디케이트를 보여줍니다:

~~~jsx
const defaultPredicates = {
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

커스텀 프레디케이트를 추가하려면 [`predicates`](api/config/predicates-property.md) 속성을 구성합니다. 각 항목은 프레디케이트 ID(키)와 구성 객체를 쌍으로 구성합니다:

- `type` — 이 프레디케이트가 받는 필드 타입 (`"number"`, `"date"`, `"text"` 또는 배열)
- `label` — 행/열의 GUI 드롭다운에 표시되는 프레디케이트 레이블
- `handler` — 값을 변환하고 처리된 값을 반환하는 함수
- `template` — 처리된 값의 표시 방식을 제어하는 선택적 함수
- `field` — 프레디케이트를 특정 필드로 제한하는 선택적 함수
- `filter` — 필터 타입이 `type`과 달라야 하거나, 데이터 포맷이 `template`과 달라야 할 때 사용하는 선택적 필터 구성

커스텀 프레디케이트를 사용하려면 해당 ID를 프레디케이트가 적용될 행 또는 열의 `method`로 설정합니다.

다음 코드 예제는 두 개의 커스텀 프레디케이트(`monthYear`와 `profitSign`)를 등록하고 `columns` 구성에 적용합니다:

~~~jsx
const predicates = {
    monthYear: {
        label: "Month-year",
        type: "date",
        handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1),
        template: (date, locale) => {
            const months = locale.getRaw().calendar.monthFull;
            return months[date.getMonth()] + " " + date.getFullYear();
        },
    },
    profitSign: {
        label: "Profit Sign",
        type: "number",
        filter: {
            type: "tuple",
            format: (v) => (v < 0 ? "Negative" : "Positive"),
        },
        field: (f) => f === "profit",
        handler: (v) => (v < 0 ? -1 : 1),
        template: (v) => (v < 0 ? "Negative profit" : "Positive profit"),
    },
};

// 날짜 문자열을 Date 객체로 변환
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    predicates: { ...pivot.defaultPredicates, ...predicates },
    tableShape: { tree: true },
    config: {
        rows: ["product_type", "product"],
        columns: [
            { field: "profit", method: "profitSign" },
            { field: "date", method: "monthYear" },
        ],
        values: ["sales", "expenses"],
    },
});
~~~

## 합계 값이 있는 열과 행 추가 {#add-columns-and-rows-with-total-values}

[`tableShape`](api/config/tableshape-property.md) 속성을 사용하여 오른쪽에 합계 열(`totalColumn: true`)이나 합계 푸터 행(`totalRow: true`)을 렌더링합니다.

다음 코드 예제는 합계 열과 합계 행을 모두 활성화합니다:

~~~jsx {2-5}
const table = new pivot.Pivot("#root", {
    tableShape: {
        totalRow: true,
        totalColumn: true
    },
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["type"],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            }
        ]
    }
});
~~~

## 예제 {#example}

아래 코드 예제는 커스텀 수학 연산을 적용합니다:

<iframe src="https://snippet.dhtmlx.com/lv90d8q2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**관련 샘플**:

- [Pivot 2. 별칭이 있는 데이터셋](https://snippet.dhtmlx.com/7vc68rqd)
- [Pivot 2. 필드 포맷 정의](https://snippet.dhtmlx.com/77nc4j8v)
- [Pivot 2. 외부 필터](https://snippet.dhtmlx.com/s7tc9g4z)
- [Pivot 2. 열과 행의 총합계](https://snippet.dhtmlx.com/f0ag0t9t)
