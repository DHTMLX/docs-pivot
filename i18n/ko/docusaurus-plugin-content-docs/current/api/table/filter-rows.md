---
sidebar_label: filter-rows
title: filter-rows
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 filter-rows 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Pivot 무료 30일 평가판을 다운로드할 수 있습니다.
---

# filter-rows

### 설명 {#description}

@short: 데이터 필터링 시 발생합니다

Table 이벤트를 발생시키려면 [`getTable`](api/methods/gettable-method.md) 메서드를 통해 Pivot 내부의 Table 인스턴스에 접근해야 합니다.

### 사용법 {#usage}

```jsx {}
"filter-rows": ({
    filter?: any
}) => boolean|void;
```

### 매개변수 {#parameters}

액션의 callback은 다음 매개변수를 가진 객체를 받습니다:

- `filter` - (선택 사항) 데이터 배열의 각 항목을 받아 각 항목에 대해 **true** 또는 **false**를 반환하는 필터링 함수

### 예제 {#example}

아래 코드 조각은 입력값으로 테이블 본문의 집계된(표시되는) 데이터를 필터링하는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/s7tc9g4z?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**관련 글**: [`getTable`](api/methods/gettable-method.md)
