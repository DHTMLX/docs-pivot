---
sidebar_label: config
title: config Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 config 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드할 수 있습니다.
---

# config

### 설명 {#description}

@short: 선택 사항. Pivot 테이블의 구조와 데이터 집계 방식을 정의합니다

### 사용법 {#usage}

~~~jsx
config?: {
    rows?: string | {field: string, method?: string}[],
    columns?: string | {field: string, method?: string}[],
    values?: string | {field: string, method?: string}[],
    filters?: {}  
};
~~~

### 매개변수 {#parameters}

`config` 매개변수는 행과 열에 적용할 필드 및 행/열에 대한 추가 데이터 집계 방법을 정의하는 데 사용됩니다.

- `rows` - (선택 사항) Pivot 테이블의 행을 정의합니다. 기본값은 빈 배열입니다. 단일 필드 ID를 나타내는 문자열이나 필드 ID와 데이터 추출 방법을 포함하는 객체를 사용할 수 있습니다. 객체의 매개변수는 다음과 같습니다:
  - `field` - (필수) 필드의 ID
  - `method` - (선택 사항) 해당 필드에서 데이터 집계에 사용할 방법을 정의합니다. 시간 기반 데이터 필드에는 기본적으로 "year", "quarter", "month", "week", "day", "hour", "minute" 방법이 제공되며, 이를 통해 데이터를 그룹화할 수 있습니다. 또한 임의의 데이터 유형 필드에 사용자 정의 방법의 이름을 추가할 수 있습니다([`predicates` 참고](api/config/predicates-property.md)).
- `columns` - (선택 사항) Pivot 테이블의 열을 정의합니다. 기본값은 빈 배열입니다. 단일 필드 ID나 필드 ID와 데이터 추출 방법을 포함하는 객체를 사용할 수 있습니다. 객체의 매개변수는 다음과 같습니다:
  - `field` - (필수) 필드의 ID
  - `method` - (선택 사항) 데이터 처리에 사용할 방법을 정의합니다(시간 기반 데이터 필드의 경우).
  기본적으로 시간 기반 필드(**date** 타입)에는 "year", "quarter", "month", "week", "day", "hour", "minute" 값의 방법이 제공됩니다. 또한 임의의 데이터 유형 필드에 사용자 정의 방법의 이름을 추가할 수 있습니다([`predicates` 참고](api/config/predicates-property.md)).
- `values` - (선택 사항) Pivot 테이블 셀의 데이터 집계를 정의합니다. 기본값은 빈 배열입니다. 각 요소는 데이터 필드 ID와 집계 방법을 나타내는 문자열이거나, 필드 ID와 데이터 집계 방법을 포함하는 객체일 수 있습니다. 객체의 매개변수는 다음과 같습니다:
  - `field` - (필수) 필드의 ID
  - `method` - (필수) 데이터 추출에 사용할 방법을 정의합니다. 방법의 유형 및 설명은 [방법 적용하기](guides/working-with-data.md#default-methods)를 참고하세요.

<details>

<summary><b>values 정의 옵션</b></summary>

`values`는 동일하게 유효한 두 가지 방법 중 하나로 정의할 수 있습니다:
- 옵션 1: 필드 ID를 나타내는 문자열
- 옵션 2: 필드 ID와 데이터 집계 방법을 포함하는 객체

### 예제 {#example}

~~~jsx
values: [
    "sum(sales)", // 옵션 1
    { field: "sales", method: "sum" }, // 옵션 2
]
~~~

</details>

- `filters` - (선택 사항) 테이블에서 데이터를 필터링하는 방식을 정의합니다. 필드 ID와 필터링 규칙을 포함하는 객체입니다. 기본값은 빈 객체입니다. 객체의 매개변수는 다음과 같습니다:
  - `field` - (선택 사항) 필드의 ID 또는 필터링 기준이 있는 ID 배열을 키로 사용하는 필터:
    - `equal` - (선택 사항) 숫자, 문자열, Date 값을 허용합니다
    - `notEqual` - (선택 사항) 숫자, 문자열, Date 값을 허용합니다
    - `greater` - (선택 사항) 숫자 및 Date 값을 허용합니다
    - `greaterOrEqual` - (선택 사항) 숫자 및 Date 값을 허용합니다
    - `less` - (선택 사항) 숫자 및 Date 값을 허용합니다
    - `lessOrEqual` - 숫자 및 Date 값을 허용합니다
    - `between` - 다음 매개변수를 포함하는 객체:
      - `start` - Date
      - `end` - Date
    - `notBetween` - 다음 매개변수를 포함하는 객체:
      - `start` - Date
      - `end` - Date
    - `contains` - 문자열 값과 숫자를 허용합니다
    - `notContains` - 문자열 값과 숫자를 허용합니다
    - `beginsWith` - 문자열 값과 숫자를 허용합니다
    - `notBeginsWith` - 문자열 값과 숫자를 허용합니다
    - `endsWith` - 문자열 값과 숫자를 허용합니다
    - `notEndsWith` - 문자열 값과 숫자를 허용합니다
    - `includes` - (선택 사항) 이미 필터링된 값 중에서 표시할 값의 배열. 텍스트 및 날짜 값에 사용 가능합니다

:::info
config가 Pivot에 의해 처리되면 해당 속성에 추가 데이터가 포함됩니다. [`api.getState()`](api/internal/getstate-method.md) 메서드를 통해 config 상태를 반환하려고 하면 전체 객체는 다음과 같이 표시됩니다:

~~~jsx
interface IParsedField {
    id: string,
    field: string,
    method: string | null,
    area: 'rows'|'columns'|'values',
    base?: string,
    label: string,
    type: 'number'|'date'|'text'
}

interface IParsedConfig {
    rows: IParsedField[],
    columns: IParsedField[],
    values: IParsedField[],
    filters: {
        [field: string]: number | string | [] | 
        { [operation: string]: number | string | [] | { start:Date, end: Date} }
    }
}
~~~

매개변수:

- `id` - 처리된 필드의 고유 ID
- `field` - 필드 이름
- `method` - 집계에 사용되는 작업 이름. rows 및 columns의 경우 method는 선택 사항이며, 제공된 경우 predicate로 작동하여 집계 전에 필드 데이터를 사전 처리하는 방식을 정의합니다. values의 경우 method는 필수 매개변수입니다.
- `area` - 필드가 추가되는 영역
- `base` - predicate가 있는 필드의 columns 및 rows에서 사용됩니다. 원본 필드 이름을 정의하며, 필드 이름은 "field_by_predicate" 패턴에 따라 구성됩니다.
- `label` - 텍스트 레이블
- `type` - 데이터 유형
:::

### 예제 {#example}

~~~jsx {4-26}
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
