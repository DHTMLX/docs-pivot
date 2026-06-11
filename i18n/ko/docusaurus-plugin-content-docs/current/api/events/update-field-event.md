---
sidebar_label: update-field
title: update-field 이벤트
description: DHTMLX JavaScript Pivot 라이브러리의 update-field 이벤트에 대한 문서를 확인할 수 있습니다. 개발자 가이드 및 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 체험해 보세요. DHTMLX Pivot 무료 30일 평가판도 다운로드할 수 있습니다.
---

# update-field

### 설명 {#description}

@short: 필드가 업데이트될 때 발생합니다

### 사용법 {#usage}

~~~jsx
"update-field": ({
    id: string | number,
    method: string,
    area: string
}) => boolean;
~~~

### 매개변수 {#parameters}

액션의 callback은 다음 매개변수를 포함하는 객체를 받습니다:

- `id` - (필수) 업데이트되는 필드의 id
- `method` - (필수) 다음 중 하나의 method를 사용할 수 있습니다:
  - **values** 영역의 경우, 데이터 연산 유형 중 하나를 나타내는 문자열입니다: [기본 메서드](guides/working-with-data.md#default-methods)
  - **rows** 및 **columns** 영역의 경우, 데이터 predicate 값으로 "year", "quarter", "month", "week", "day", "hour", "minute" 중 하나를 사용할 수 있습니다. 기본적으로 원시 값이 설정됩니다.
  커스텀 predicate 또는 method가 설정된 경우, [predicate](api/config/predicates-property.md) 또는 [methods](api/config/methods-property.md) 속성에 id를 지정해야 합니다.
- `area` - (필수) 필드가 업데이트되는 영역의 이름으로, "rows", "columns" 또는 "values" 영역을 지정합니다

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다
:::

### 예제 {#example}

~~~jsx {19-22}
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
//업데이트된 필드의 id를 콘솔에 출력합니다
table.api.on("update-field", (ev) => {
    console.log("The id of the field that was updated:", ev.id);
});
~~~

**관련 문서**:
- [api.on()](api/internal/on-method.md)
- [methods](api/config/methods-property.md)
