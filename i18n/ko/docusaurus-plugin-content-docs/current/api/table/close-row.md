---
sidebar_label: close-row
title: close-row
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 close-row 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판도 다운로드할 수 있습니다
---

# close-row

### 설명 {#description}

@short: 행을 닫을(축소할) 때 발생합니다

Table 이벤트를 트리거하려면 [`getTable`](api/methods/gettable-method.md) 메서드를 통해 Pivot 내부의 기본 Table 위젯 인스턴스에 접근해야 합니다. 트리 모드는 [`tableShape`](api/config/tableshape-property.md) 속성을 통해 활성화해야 합니다.

### 사용법 {#usage}

```jsx {}
"close-row": ({
    id: string | number,
    nested?: boolean
}) => boolean|void;
```

### 매개변수 {#parameters}

액션의 callback은 다음 매개변수를 포함하는 객체를 받습니다:

- `id` - (필수) 중첩 행을 가진 행의 id
- `nested` - (선택) **true**로 설정하면 중첩된 모든 항목이 축소됩니다

:::note
`id`가 0으로 설정되고 `nested`가 **true**로 설정되면 테이블의 모든 행이 축소됩니다
:::

### 예제 {#example}

아래 스니펫은 버튼 클릭으로 모든 행을 열거나 닫는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/i4mi6ejn?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**관련 문서**: 
- [`getTable`](api/methods/gettable-method.md)
- [모든 행 펼치기/접기](guides/configuration.md#expandingcollapsing-all-rows)
