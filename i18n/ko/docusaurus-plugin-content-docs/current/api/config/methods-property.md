---
sidebar_label: methods
title: methods Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 methods 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Pivot 30일 무료 평가판을 다운로드하세요.
---

# methods

### 설명 {#description}

@short: 선택 사항. 데이터 집계를 위한 사용자 정의 수학 메서드를 정의합니다

### 사용법 {#usage}

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

### 파라미터 {#parameters}

각 메서드는 키-값 쌍으로 표현되며, `method`는 메서드의 이름이고 값은 해당 메서드의 동작을 설명하는 객체입니다. 각 객체에는 다음과 같은 파라미터가 있습니다:

- `handler` - (사용자 정의 메서드에 필수) 숫자 배열에서 집계 값을 계산하는 함수로, 값 배열을 입력으로 받아 단일 값을 반환합니다
- `type` - (선택 사항) 이 메서드가 적용되는 데이터 타입으로, "number", "date", "text" 또는 이들의 배열로 지정할 수 있습니다
- `label` - (선택 사항) GUI에 표시될 메서드 레이블
- `branchMode` - (선택 사항) 트리 테이블에서 합계 값 계산 방식을 정의합니다. `raw`로 설정하면 모든 원시 데이터를 기반으로 계산하고, `result`(기본값)는 트리 모드에서 이미 처리된 데이터를 기반으로 계산합니다
- `branchMath` - (선택 사항) 트리 모드에서 합계 값을 계산할 메서드 이름으로, 기본적으로 메서드 이름과 동일합니다 ("max" 메서드의 경우 branchMath도 "max")

기본적으로 `methods` 속성은 빈 객체 {}이며, 사용자 정의 메서드가 정의되지 않음을 의미합니다. methods 객체에 정의할 수 있는 하위 속성의 수에는 제한이 없습니다.

미리 정의된 메서드:

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

각 메서드의 정의는 여기에서 확인할 수 있습니다: [메서드 적용하기](guides/working-with-data.md#default-methods)

## 예제 {#example}

아래 예제는 날짜 타입에 대해 고유 값 개수와 평균 값을 계산하는 방법을 보여줍니다. **countUnique** 함수는 숫자(값) 배열을 입력으로 받아 **reduce** 메서드를 사용하여 정확한 고유 값의 개수를 계산합니다. **countunique_date** 하위 속성에는 날짜 값 배열에서 고유 값을 가져오는 함수가 포함된 handler가 있습니다. **average_date** 하위 속성에는 날짜 값 배열에서 평균 값을 계산하는 handler가 있습니다.

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

// "count" 및 "unique count" 결과에 정수를 표시합니다
const templates = {};
fields.forEach(f => {
    if (f.type == "number")
        templates[f.id] = (v, method) =>
        v && method.indexOf("count") < 0 ? parseFloat(v).toFixed(3) : v;
});

// 날짜 문자열을 Date로 변환합니다
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

**관련 샘플:** [Pivot 2. 사용자 정의 수학 메서드](https://snippet.dhtmlx.com/lv90d8q2) 

**관련 문서**: [수학 메서드 적용하기](guides/working-with-data.md#applying-maths-methods)
