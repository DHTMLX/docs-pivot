---
sidebar_label: setConfig()
title: setConfig()
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 setConfig() 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Pivot 30일 무료 평가판을 다운로드하세요.
---

# setConfig()

### 설명 {#description}

@short: Pivot 위젯의 현재 구성을 업데이트합니다

이 메서드는 Pivot 위젯의 현재 구성을 업데이트하는 데 사용됩니다. 위젯의 기본 데이터 세트를 업데이트해야 할 때 유용합니다. 이 메서드는 `setConfig` 호출에서 명시적으로 제공되지 않은 이전에 설정된 모든 옵션을 보존합니다.

### 사용법 {#usage}

~~~jsx
setConfig(config: { [key:any]: any }): void;
~~~

### 매개변수 {#parameters}

- `config` - (필수) Pivot 구성 객체입니다. 전체 속성 목록은 [여기](api/overview/properties-overview.md)를 참조하세요

:::important
이 메서드는 전달한 매개변수만 변경합니다. 현재 컴포넌트를 삭제하고 새 컴포넌트를 초기화합니다.
:::

### 예제 {#example}

~~~jsx {21-41}
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

// 구성 매개변수 업데이트
table.setConfig({
    config: {
        rows: ["studio", "genre", "duration"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            },
            {
                field: "type",
                method: "count"
            }
        ]
    }
});
~~~
