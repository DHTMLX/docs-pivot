---
sidebar_label: apply-filter
title: apply-filter 이벤트
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 apply-filter 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드할 수 있습니다.
---

# apply-filter

### 설명 {#description}

@short: 필터가 적용될 때 발생합니다

### 사용법 {#usage}

~~~jsx
"apply-filter": ({
    rule: {} 
}) => boolean | void;
~~~

### 매개변수 {#parameters}

액션의 callback은 다음 매개변수를 포함하는 객체를 받습니다:

- `rule` - 아래와 같은 매개변수를 포함하는 필터 구성 객체:
  - `field` - (필수) 필터가 적용될 필드 id
  - `filter` - (필수) 필터 유형:
    - 텍스트 값의 경우: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith
    - 숫자 값의 경우: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, contains, notContains
    - 날짜 유형의 경우: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween
  - `value` - (선택) 필터링 기준으로 사용할 값
  - `includes` - (선택) 이미 필터링된 값 중에서 표시할 값의 배열; 텍스트 및 날짜 값에 사용 가능

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다
:::

### 예제 {#example}

~~~jsx {20-23}
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
    }
});
//필터가 적용된 필드의 레이블을 콘솔에 출력합니다
table.api.on("apply-filter", (ev) => {
    console.log("The field to which filter was applied:", ev.rule.field);
});
~~~

**관련 문서**: [api.on()](api/internal/on-method.md)
