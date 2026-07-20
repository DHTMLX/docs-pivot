---
sidebar_label: api.detach()
title: detach 메서드
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 detach 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# api.detach()

## 설명 {#description}

@short: 액션 핸들러를 제거하거나 분리할 수 있습니다

## 사용법 {#usage}

~~~jsx
api.detach(tag: number | string ): void;
~~~

## 매개변수 {#parameters}

- `tag` - 액션 태그의 이름

### 예제 {#example}

아래 예제에서는 [`api.on()`](api/internal/on-method.md) 핸들러에 **tag** 속성을 포함한 객체를 추가한 후, `api.detach()` 메서드를 사용하여 [`open-filter`](api/events/open-filter-event.md) 액션의 로깅을 중지합니다.

~~~jsx {31-34}
// Pivot 생성
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
        ]
    }
});

// 핸들러 추가
if (table.api) {
    table.api.on(
        "open-filter",
        ({ area }) => {
            console.log("Opened: " + area);
        },
        { tag: "track" }
    );
}

// 핸들러 분리
function stop() {
    table.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~
