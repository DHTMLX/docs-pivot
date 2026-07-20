---
sidebar_label: predicates
title: predicates Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 predicates config에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드할 수 있습니다.
---

# predicates

### 설명 {#description}

@short: 선택 사항. 데이터 차원(행, 열)에 대한 사용자 정의 전처리 함수를 제공합니다

데이터가 적용되기 전에 어떻게 수정되어야 하는지를 정의합니다.

### 사용법 {#usage}

~~~jsx
predicates?: {
    [key: string]: {
        handler: (value: any) => any,
        type: 'number' | 'date' | 'text' | [],
        label?: string | (type: 'number' | 'date' | 'text') => string,
        template?: (value: any, locale?: any) => string,
        field?: (value:string) => boolean,
        filter?: { 
            type: "number"|"text"|"date"|"tuple",
            format?:(any) => string
        }
    }
};
~~~

### 매개변수 {#parameters}

이 속성은 키가 사용자 정의 함수의 이름이고, 값이 실제 함수 정의를 담은 객체인 객체입니다. predicate 객체는 여러 키-함수 쌍을 가질 수 있으며, 그 모두는 Pivot 구성에서 사용 가능합니다. 각 객체는 다음의 매개변수를 가집니다:

- `label` - (선택 사항) 행/열의 데이터 수정 옵션 드롭다운 GUI에 표시되는 predicate의 레이블
- `type` - (필수) 이 predicate가 적용될 수 있는 필드 유형을 정의합니다; "number", "date", "text" 또는 이들 값의 배열을 사용할 수 있습니다
- `field` - (선택 사항) 지정한 필드의 데이터 처리 방법을 정의하는 함수로, 필드의 id를 매개변수로 받아 해당 필드에 predicate를 추가해야 하는 경우 **true**를 반환합니다
- `filter` - (선택 사항) 기본적으로 필터 유형은 `type` 매개변수에서 가져오지만, 다른 유형이 필요한 경우 이 `filter` 객체를 사용할 수 있습니다. 다음 매개변수를 가집니다:
    - `type` - (선택 사항) 적용될 필드 유형을 정의합니다: "number"|"text"|"date"|"tuple". "tuple"은 숫자 값에 적용되는 콤보 필터로, 데이터는 숫자 값으로 필터링되지만 필터에는 텍스트 값이 표시됩니다
    - `format` - (선택 사항) 필터 옵션 표시 형식을 정의하는 함수입니다; 형식이 정의되지 않은 경우 template 매개변수의 형식이 적용됩니다; 여기서(`filter` 객체의) `type`이 지정되지 않으면, predicate의 `type` 매개변수에 설정된 유형에 형식이 적용됩니다
- `handler` - (사용자 정의 predicates에 필수) 데이터 처리 방법을 정의하는 함수입니다; 처리할 값을 단일 인수로 받아 처리된 값을 반환해야 합니다
- `template` - (선택 사항) 데이터 표시 방법을 정의하는 함수입니다; 함수는 처리된 값을 반환하며, `handler`가 반환한 값을 받고, 필요한 경우 [`locale`](api/config/locale-property.md)을 사용하여 텍스트 값을 현지화할 수 있습니다
 
`predicates` 속성으로 predicate가 지정되지 않은 경우 다음의 기본 predicates가 적용됩니다:

~~~jsx
const defaultPredicates = {
    // 원시(처리되지 않은) 값을 나타내는 서비스 predicate
    $empty: { label: (type) => `Raw ${type}`, type: ["number", "date", "text"] },
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

## 예제 {#example}

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

// 날짜 문자열을 Date로 변환
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

**관련 문서**: [predicates로 데이터 처리하기](guides/working-with-data.md#processing-data-with-predicates)

**관련 샘플**: [Pivot 2. 사용자 정의 predicates](https://snippet.dhtmlx.com/mhymus00)
