---
sidebar_label: readonly
title: readonly Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 readonly 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드하실 수 있습니다.
---

# readonly

### 설명 {#description}

@short: 선택 사항입니다. 읽기 전용 모드를 활성화하거나 비활성화합니다.

읽기 전용 모드에서는 UI를 통해 Pivot 구조를 구성할 수 없습니다.

### 사용법 {#usage}

~~~jsx  
 readonly?: boolean;
~~~

### 파라미터 {#parameters}

이 속성은 **true** 또는 **false**로 설정할 수 있습니다:

- `true` - 읽기 전용 모드를 활성화합니다
- `false` - 기본값으로, 읽기 전용 모드를 비활성화합니다

## 예제 {#example}

~~~jsx {18}
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
    },
    readonly: true
});
~~~

**관련 샘플**: [Pivot 2. 읽기 전용 모드](https://snippet.dhtmlx.com/0k0mvycv)
