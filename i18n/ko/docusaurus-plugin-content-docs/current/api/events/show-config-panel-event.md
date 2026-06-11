---
sidebar_label: show-config-panel
title: show-config-panel 이벤트
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 show-config-panel 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Pivot 무료 30일 평가판을 다운로드할 수 있습니다.
---

# show-config-panel

### 설명 {#description}

@short: 구성 패널의 표시 여부가 변경될 때 발생합니다

### 사용법 {#usage}

~~~jsx
"show-config-panel": ({
    mode: boolean 
}) 
~~~

### 매개변수 {#parameters}

이 액션의 콜백은 다음 매개변수를 포함하는 객체를 받습니다:

- `mode` - (필수) 값이 **true**(기본값)로 설정되면 구성 패널이 표시되고, **false**로 설정되면 구성 패널이 숨겨집니다

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다
:::

### 예제 {#example}

~~~jsx {19-22}
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
//구성 패널 숨기기
table.api.exec("show-config-panel", {
    mode: false
});
~~~

**관련 문서**:
- [`showConfigPanel()` 메서드](api/methods/showconfigpanel-method.md)
- [`configPanel` 속성](api/config/configpanel-property.md)
