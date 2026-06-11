---
sidebar_label: api.on()
title: on 메서드
description: DHTMLX JavaScript Pivot 라이브러리의 on 메서드에 대한 문서에서 자세한 내용을 확인할 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# api.on()

### 설명 {#description}

@short: 내부 이벤트에 핸들러를 연결할 수 있습니다

### 사용법 {#usage}

~~~jsx
api.on(
    event: string,
    handler: function,
    config?: { intercept?: boolean, tag?: number | string | symbol }
): void;
~~~

### 파라미터 {#parameters}

- `event` - (필수) 발생시킬 이벤트
- `handler` - (필수) 연결할 핸들러 (핸들러 인수는 발생하는 이벤트에 따라 달라집니다)
- `config` - (선택) 다음 파라미터를 저장하는 객체:
    - `intercept` - (선택) 이벤트 리스너 생성 시 `intercept: true`를 설정하면, 해당 이벤트 리스너가 다른 모든 리스너보다 먼저 실행됩니다
    - `tag` - (선택) 액션 태그. 태그 이름을 사용하여 [`detach`](api/internal/detach-method.md) 메서드로 액션 핸들러를 제거할 수 있습니다

### Events {#events}

:::info
Pivot 내부 이벤트의 전체 목록은 [**여기**](api/overview/main-overview.md#pivot-events)에서 확인할 수 있습니다.
액션을 수정하지 않고 리스닝만 하려면 `api.on()` 메서드를 사용하세요. 액션을 변경하려면 [`api.intercept()`](api/internal/intercept-method.md) 메서드를 적용하세요.
:::

### 예제 {#example}

아래 예제는 필터가 활성화된 필드의 레이블을 출력하는 방법을 보여줍니다:

~~~jsx {21-29}
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

table.api.on("open-filter", (ev) => {
    if (ev.id) {
        const { config } = table.api.getState();
        const fieldObj = config[ev.area].find((f) => f.id === ev.id);
        if (fieldObj) {
            console.log("The field for which filter was activated:", fieldObj.label);
        }
    }
}, {tag: "open-filter-tag"});
~~~
