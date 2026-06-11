---
sidebar_label: api.getStores()
title: getStores 메서드
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 getStores 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# api.getStores()

### 설명 {#description}

@short: Pivot의 DataStore 속성을 담은 객체를 반환합니다

### 사용법 {#usage}

~~~jsx
api.getStores(): object;
~~~

### 반환값 {#returns}

이 메서드는 **DataStore** 매개변수를 담은 객체를 반환합니다:

~~~jsx
{
    data: DataStore // ( 매개변수 객체 )
}
~~~

### 예제 {#example}

~~~jsx {21-22}
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

const stores = table.api.getStores();
console.log("DataStore:", stores);
~~~
