---
sidebar_label: api.intercept()
title: intercept 메서드
description: DHTMLX JavaScript Pivot 라이브러리의 intercept 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판을 다운로드하실 수 있습니다.
---

# api.intercept()

### 설명 {#description}

@short: 내부 이벤트를 가로채고 차단할 수 있습니다

### 사용법 {#usage}

~~~jsx
api.intercept(
    event: string,
    callback: function,
    config?: { tag?: number | string | symbol } 
): void;
~~~

### 매개변수 {#parameters}

- `event` - (필수) 발생시킬 이벤트
- `callback` - (필수) 실행할 callback (callback 인수는 발생하는 이벤트에 따라 달라집니다)
- `config` - (선택) 다음 매개변수를 저장하는 객체:
    - `tag` - (선택) 액션 태그. [`detach`](api/internal/detach-method.md) 메서드를 통해 액션 핸들러를 제거할 때 태그 이름을 사용할 수 있습니다

### 이벤트 {#events}

:::info
Pivot 내부 이벤트의 전체 목록은 [**여기**](api/overview/main-overview.md#pivot-events)에서 확인할 수 있습니다.
액션을 수정하지 않고 수신만 하려면 [`api.on()`](api/internal/on-method.md) 메서드를 사용하세요. 액션을 변경하려면 `api.intercept()` 메서드를 적용하세요.
:::

### 예제 {#example}

아래 예제는 초기화 시 모든 접을 수 있는 행을 닫는 방법을 보여줍니다.

~~~jsx {21-24}
// create Pivot
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

//make all rows close at the initialization
table.api.intercept("render-table", (ev) => {
    ev.config.data.forEach((row) => (row.open = false));
}, {tag: "render-table-tag"});
~~~

**관련 아티클**: [`render-table`](api/events/render-table-event.md)
