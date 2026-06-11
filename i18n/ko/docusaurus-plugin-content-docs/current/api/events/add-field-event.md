---
sidebar_label: add-field
title: add-field 이벤트
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 add-field 이벤트에 대해 학습할 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# add-field

### 설명 {#description}

@short: 행, 열 또는 값 영역에 새 필드가 추가될 때 발생합니다

### 사용법 {#usage}

~~~jsx
"add-field": ({
    id?: string | number,
    area: string,
    field: string | number,
    method?: string
}) => boolean;
~~~

### 매개변수 {#parameters}

이 액션의 callback은 다음 매개변수를 포함하는 객체를 받습니다:

- `id` - (선택) 새 필드의 원하는 id; 설정하지 않으면 자동 생성된 id가 추가됩니다
- `area` - (필수) 새 필드가 추가되는 영역의 이름으로, "rows", "columns" 또는 "values" 중 하나입니다
- `field` - (필수) 필드의 이름
- `method` - (선택) 데이터 집계 방법을 정의합니다 (지정하지 않으면 해당 데이터 유형에 적합한 첫 번째 방법이 설정됩니다); 다음 중 하나를 사용할 수 있습니다:
  - **values** 영역에서는 필수이며, 데이터 연산 유형 중 하나를 나타내는 문자열입니다: [기본 메서드](guides/working-with-data.md#default-methods)
  - **rows** 및 **columns** 영역에서는 선택 사항이며, 값이 설정된 경우 predicate입니다; 커스텀 predicate이거나 기본값 중 하나인 "year", "quarter", "month", "week", "day", "hour", "minute"를 사용할 수 있습니다. 기본적으로 원시 값이 설정됩니다.
  커스텀 predicate이나 method가 설정된 경우, [predicates](api/config/predicates-property.md) 또는 [methods](api/config/methods-property.md) 속성에 id를 지정해야 합니다.

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다
:::

### 예제 {#example}

아래 예제에서는 [`api.intercept()`](api/internal/intercept-method.md) 메서드를 사용하여 **number** 데이터 유형의 값 필드에 새 메서드를 추가합니다:

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
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
//미리 정의된 method로 values 추가
table.api.intercept("add-field", (ev) => {
    const { fields } = table.api.getState();
    const type = fields.find((f) => f.id == ev.field).type;

    if (ev.area == "values" && type == "number") {
        ev.method = "min";
    }
});
~~~

**관련 문서**: [api.intercept()](api/internal/intercept-method.md)
