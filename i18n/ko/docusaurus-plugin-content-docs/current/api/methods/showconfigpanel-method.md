---
sidebar_label: showConfigPanel()
title: showConfigPanel()
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 showConfigPanel() 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 확인하며, DHTMLX Pivot 30일 무료 평가판을 다운로드하세요.
---

# showConfigPanel()

### 설명 {#description}

@short: 구성 패널을 표시하거나 숨깁니다.

이 메서드는 사용자 상호작용 없이 구성 패널의 표시 여부를 제어해야 할 때 유용합니다. 예를 들어, 애플리케이션의 다른 상호작용이나 상태에 따라 패널을 숨기거나 표시할 수 있습니다.

### 사용법 {#usage}

~~~jsx
showConfigPanel({mode: boolean}): void;
~~~

### 매개변수 {#parameters}

- `mode` (boolean) - (필수) 값이 **true**(기본값)로 설정되면 구성 패널이 표시되고, **false**로 설정되면 구성 패널이 숨겨집니다.

### 예제 {#example}

~~~jsx {21-23}
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

table.showConfigPanel ({
    mode: false
})
~~~

**관련 문서**:
- [`show-config-panel` 이벤트](api/events/show-config-panel-event.md)
- [`configPanel` 속성](api/config/configpanel-property.md)
