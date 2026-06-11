---
sidebar_label: move-field
title: move-field 이벤트
description: DHTMLX JavaScript Pivot 라이브러리의 move-field 이벤트에 대한 내용을 문서에서 확인할 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드할 수 있습니다.
---

# move-field

### 설명 {#description}

@short: 필드 순서를 변경할 때 발생합니다

### 사용법 {#usage}

~~~jsx
"move-field": ({
    area: string,
    id: string | number,
    before?: string,
    after?: string
}) => void | boolean;
~~~

### 매개변수 {#parameters}

action의 callback은 다음 매개변수를 포함하는 객체를 받습니다:

- `area` - (필수) 순서 변경이 이루어지는 영역의 이름으로, "rows", "columns" 또는 "values" 영역이 될 수 있습니다
- `id` - (필수) 이동되는 필드의 id
- `before` - (선택) 이동된 필드가 앞에 배치될 필드의 id
- `after` - (선택) 이동된 필드가 뒤에 배치될 필드의 id

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다
:::

### 예제 {#example}

~~~jsx {20-23}
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

//순서가 변경된 필드의 id를 콘솔에 출력합니다
table.api.on("move-field", (ev) => {
    console.log("The id of the reordered field:", ev.id);
});
~~~

**관련 문서**: [api.on()](api/internal/on-method.md)
