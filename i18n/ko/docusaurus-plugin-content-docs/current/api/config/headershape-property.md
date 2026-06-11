---
sidebar_label: headerShape
title: headerShape Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 headerShape config에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판을 다운로드하실 수 있습니다.
---

# headerShape

### 설명 {#description}

@short: 선택 사항입니다. Pivot 테이블 헤더의 외관과 동작을 구성합니다

### 사용법 {#usage}

~~~jsx  
headerShape?: {
    collapsible?: boolean,
    vertical?: boolean,
    template?: (label: string, field: string, subLabel?: string) => string,
    cellStyle?: (
        field: string, 
        value: any, 
        area: "rows"|"columns"|"values", 
        method?: string,
        isTotal?: boolean) 
        => string,
};
~~~

### 매개변수 {#parameters}

- `collapsible` - (선택 사항) **true**로 설정하면 테이블의 차원 그룹을 접을 수 있습니다. 기본값은 **false**입니다
- `vertical` - (선택 사항) **true**로 설정하면 모든 헤더의 텍스트 방향이 가로에서 세로로 변경됩니다. 기본값은 **false**입니다
- `cellStyle` - (선택 사항) 헤더 셀에 사용자 정의 스타일을 적용하는 함수입니다. 이 함수는 css 클래스 이름을 반환하며 다음 매개변수를 받습니다:
    - `field` (string) - (필수) 셀이 해당하는 필드 이름을 나타내는 문자열입니다. 트리 열의 헤더인 경우 field는 ""입니다
    - `value` (string | number | date) - (필수) 셀의 값입니다
    - `area` - (필수) 셀이 위치한 테이블 영역을 나타내는 문자열입니다("rows", "columns" 또는 "values" 영역)
    - `method` (string) - (선택 사항) "values" 영역의 필드에 대해 수행되는 연산(예: "sum", "count" 등)이나 "columns" 영역의 필드에 설정된 predicate 이름을 나타낼 수 있는 문자열입니다
    - `isTotal` - (선택 사항) 셀이 합계 열에 속하는지 여부를 정의합니다
- `template` - (선택 사항) 헤더의 텍스트 형식을 정의합니다. 기본적으로 행으로 적용된 필드에는 `label` 매개변수 값이 표시되고, 값으로 적용된 필드에는 label과 method가 함께 표시됩니다(예: *Oil(count)*). 이 함수는 필드 id, label, 그리고 method 또는 predicate id(있는 경우)를 받아 처리된 값을 반환합니다. 기본 template은 다음과 같습니다:
~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

## 예제 {#example}

아래 예제에서 **values** 필드의 헤더는 label과 method 이름(subLabel)을 표시하고 결과를 소문자로 변환합니다(예: *profit (sum)*):

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // 헤더 텍스트의 사용자 정의 template
        template: (label, id, subLabel) => (label + (subLabel ? ` (${subLabel})` : "")).toLowerCase(),
        },
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // other values
        ],
    },
    fields,
});
~~~

**관련 샘플**:
- [Pivot 2. 그리드 헤더의 세로 텍스트 방향](https://snippet.dhtmlx.com/4qroi8ka)
- [Pivot 2. 접을 수 있는 열](https://snippet.dhtmlx.com/pt2ljmcm)
- [Pivot 2. 테이블 및 헤더 셀에 사용자 정의 CSS 추가](https://snippet.dhtmlx.com/nfdcs4i2)

**관련 문서**: 
- [구성](guides/configuration.md)
- [셀 스타일](guides/stylization.md#cell-style)
