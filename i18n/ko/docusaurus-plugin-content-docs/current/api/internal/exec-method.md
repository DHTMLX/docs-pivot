---
sidebar_label: api.exec()
title: exec 메서드
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 exec 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# api.exec()

### 설명 {#description}

@short: 내부 이벤트를 트리거할 수 있습니다

## 사용법 {#usage}

~~~jsx
api.exec(
    event: string,
    config: object
): Promise<any>;
~~~

## 매개변수 {#parameters}

- `event` - (필수) 발생시킬 이벤트
- `config` - (필수) 매개변수가 포함된 config 객체 (발생시킬 이벤트 참조)

## 액션 {#actions}

:::info
Pivot 이벤트의 전체 목록은 [**여기**](api/overview/events-overview.md)에서 확인할 수 있습니다
:::

## 예제 {#example}

아래 예제에서는 `api.exec()` 메서드를 통해 [`delete-field`](api/events/delete-field-event.md) 이벤트가 트리거됩니다. **values** 영역에서 마지막 필드가 제거됩니다. [`api.getState()`](api/internal/getstate-method.md) 메서드는 Pivot [`config`](api/config/config-property.md)의 현재 상태를 가져오는 데 사용됩니다. 버튼 클릭 시 이벤트가 트리거됩니다.

~~~jsx {32-35}
// Pivot 생성
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

//API 메서드 호출: config의 values에서 특정 값 제거
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
