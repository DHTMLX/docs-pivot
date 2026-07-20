---
sidebar_label: open-filter
title: open-filter 이벤트
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 open-filter 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 탐색하고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수도 있습니다.
---

# open-filter

### 설명 {#description}

@short: 필드에 대한 필터가 활성화될 때 발생합니다

### 사용법 {#usage}

~~~jsx
"open-filter": ({
    id: string | null,
    area?: "values" | "rows" | "columns"
}) => boolean | void;
~~~

### 매개변수 {#parameters}

해당 action의 callback은 다음 매개변수를 받습니다:

- `area` - 필드가 적용되는 영역("rows", "columns", "values")
- `id` - 필드의 id. null 값을 가진 단일 id 인수가 전달되면 필터가 닫힙니다.

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다.
:::

### 반환값 {#returns}

함수는 boolean 값 또는 void를 반환할 수 있습니다. **false**를 반환하면 해당 이벤트 동작이 중단됩니다.

### 예제 {#example}

아래 예제는 필터 박스를 닫을 때 Configuration 패널을 숨기는 방법을 보여줍니다:

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

table.api.on("open-filter", (ev) => {
    if(!ev.id) {
        table.api.exec("show-config-panel", {
            mode: false
        });
    }    
});
~~~

다음 예제에서는 필터가 활성화된 필드의 id를 콘솔에 출력합니다:

~~~jsx {20-22}
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

table.api.on("open-filter", (ev) => {
    console.log("The field id for which filter is activated:", ev.id);
});
~~~
