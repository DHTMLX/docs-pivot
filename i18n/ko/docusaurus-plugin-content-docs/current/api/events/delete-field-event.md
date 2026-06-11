---
sidebar_label: delete-field
title: delete-field 이벤트
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 delete-field 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# delete-field

### 설명 {#description}

@short: 필드를 제거할 때 발생합니다

### 사용법 {#usage}

~~~jsx
"delete-field": ({
    area: string,
    id: string | number
}) => boolean | void;
~~~

### 파라미터 {#parameters}

액션의 콜백은 다음 파라미터를 포함하는 객체를 받습니다:

- `area` - (필수) 필드가 제거되는 영역의 이름으로, "rows", "columns" 또는 "values" 영역이 될 수 있습니다
- `id` - (필수) 제거되는 필드의 id

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다
:::

### 예제 {#example}

아래 예제에서는 [`api.exec()`](api/internal/exec-method.md) 메서드를 통해 `delete-field` 액션이 실행됩니다. **values** 영역에서 마지막 필드가 제거됩니다. [`api.getState()`](api/internal/getstate-method.md) 메서드는 Pivot [`config`](api/config/config-property.md)의 현재 상태를 가져오는 데 사용됩니다. 버튼을 클릭하면 액션이 실행됩니다.

~~~jsx {31-34}
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

// API 메서드 호출: config의 values에서 특정 값 제거
function removeLastField() {
    if (table.api) {
        const state = table.api.getState();
        const config = state.config;

        const count = config.values.length;

        if (count) {
            const lastValue = config.values[count - 1];

            table.api.exec("delete-field", {
                area: "values",
                id: lastValue.id, // config.values에 추가된 항목의 자동 생성 ID
            });
        }
    }
}

const button = document.createElement("button");

button.addEventListener("click", removeLastField);
button.textContent = "Remove";

document.body.appendChild(button);
~~~
