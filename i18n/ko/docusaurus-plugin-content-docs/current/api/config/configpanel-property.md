---
sidebar_label: configPanel
title: configPanel 설정
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 configPanel 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보고, DHTMLX Pivot 30일 무료 평가판을 다운로드하세요.
---

# configPanel

### 설명 {#description}

@short: 선택 사항. UI에서 구성 패널의 표시 여부를 제어합니다

UI에서 **Hide Settings** 버튼을 클릭하면 패널이 숨겨지거나 표시됩니다.

### 사용법 {#usage}

~~~jsx  
configPanel?: boolean;
~~~

### 매개변수 {#parameters}

이 속성은 **true** 또는 **false**로 설정할 수 있습니다:

- `true` - 기본값, 구성 패널을 표시합니다
- `false` - 구성 패널을 숨깁니다

## 예제 {#example}

~~~jsx {5}
// 초기화 시 구성 패널이 숨겨집니다
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    configPanel: false,
    config: {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

**관련 샘플:** [Pivot 2.0: 구성 패널 표시 여부 전환](https://snippet.dhtmlx.com/1xq1x5bo)

**관련 문서:**
- [`show-config-panel` 이벤트](api/events/show-config-panel-event.md)
- [`showConfigPanel()` 메서드](api/methods/showconfigpanel-method.md)
- [구성 패널 표시 여부 제어](guides/configuration.md#controlling-visibility-of-configuration-panel)
