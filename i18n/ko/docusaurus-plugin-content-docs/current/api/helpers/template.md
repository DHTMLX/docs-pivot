---
sidebar_label: template
title: template
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 Pivot template 헬퍼에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 탐색하고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 무료 30일 평가판도 다운로드할 수 있습니다.
---

### 설명 {#description}

`template` 함수는 테이블 헤더 셀과 본문 셀에 템플릿을 적용할 수 있게 합니다.

### 사용법 {#usage}

본문 셀의 경우:

~~~jsx
pivot.template({value, method, row, column}) => string; 
~~~

헤더 셀의 경우:

~~~jsx
pivot.template({value, field, method, cell, column}) =>  string;
~~~

### 파라미터 {#parameters}

본문 셀의 경우 함수는 다음 파라미터를 받습니다:

- `value` (any) - (필수) 셀의 원시 값
- `method` (string) - (필수) 열에 사용되는 메서드 또는 predicate
- `row` - (필수) 행 데이터를 담은 객체:
    - `id` (number) - (필수) 행 id
    - `values` (array) - (필수) 행 데이터를 담은 배열
    - `open` (boolean)- (선택) 브랜치 상태
    - `$level` (boolean)- (선택) 브랜치 인덱스
- `column` - (필수) 열 데이터를 담은 객체:
    - `id` (number) - (필수) 열의 id
    - `cell` (any) - (선택) 셀 콘텐츠를 가진 템플릿 ([template 헬퍼를 통한 템플릿 추가](guides/configuration.md#adding-a-template-via-the-template-helper) 참조)    
    - `template` - (선택) [`tableShape`](api/config/tableshape-property.md) 프로퍼티를 통해 정의된 템플릿
    - `fields` (array) - (선택) 트리 모드에서 계층형 열의 필드를 정의합니다. 서로 다른 레벨에서 이 열에 표시되는 필드를 반영합니다
     - `field` - (선택) 필드 id인 문자열
    - `method` (string) - (선택) 이 열의 필드에 대해 정의된 경우의 메서드
    - `methods` (array) - (선택) 트리 모드에서 계층형 열의 필드에 적용되는 메서드를 정의합니다
    - `format` (string or object) - (필수) 날짜 형식 또는 숫자 형식 ([필드에 형식 적용](guides/working-with-data.md#applying-formats-to-fields) 참조)
    - `isNumeric` (boolean) - (선택) 열이 숫자 값을 포함하는지 여부를 정의합니다
    - `isTotal` (boolean) - (선택) 합계 열인지 여부를 정의합니다
    - `area` (string) - (선택) 열이 렌더링되는 영역: "rows", "columns", "values"
    - `header`- (선택) 각 셀에 대해 다음 프로퍼티를 가진 헤더 셀 배열:
        - `text` (string) - (선택) 셀 텍스트, 형식화된 값, 또는 predicate 템플릿으로 처리된 값
        - `rowspan` (number) - (선택) 헤더가 걸쳐야 하는 행 수
        - `colspan` (number) - (선택) 헤더가 걸쳐야 하는 열 수
        - `value` (any) - (필수) 셀이 "columns" 영역에 속하는 경우의 원시 값
        - `field` (string) - (필수) 셀이 "columns" 영역에 속하는 경우 표시되는 값의 필드
        - `method` (string) - (필수) 셀이 "columns" 영역에 속하고 predicate가 정의된 경우의 필드 predicate
        - `format` (string or object) - 날짜 형식 또는 숫자 형식 ([필드에 형식 적용](guides/working-with-data.md#applying-formats-to-fields) 참조)

헤더 셀의 경우 함수 파라미터는 다음과 같습니다:

- `value` (any) - (필수) 셀의 원시 값
- `method` (string) - (선택) 열에 사용되는 predicate
- `field` (string) - (선택) 셀에 표시되는 값의 필드
- `cell` - (필수) 셀 데이터를 담은 객체:
    - `text` (string) - (선택) 셀 텍스트, 형식화된 값, 또는 predicate 템플릿으로 처리된 값
    - `rowspan` (number) - (선택) 헤더가 걸쳐야 하는 행 수
    - `colspan` (number) - (선택) 헤더가 걸쳐야 하는 열 수
    - `value` (any) - (필수) 셀이 "columns" 영역에 속하는 경우의 원시 값
    - `field` (string) - (필수) 셀이 "columns" 영역에 속하는 경우 표시되는 값의 필드
    - `method` (string) - (필수) 셀이 "columns" 영역에 속하고 predicate가 정의된 경우의 필드 predicate
    - `format` (string or object) - (필수) 날짜 형식 또는 숫자 형식 ([필드에 형식 적용](guides/working-with-data.md#applying-formats-to-fields) 참조)
- `column` - (필수) 열 데이터를 담은 객체 (본문 셀과 동일)

### 예제 {#example}

아래 스니펫은 `pivot.template` 헬퍼를 통해 템플릿을 정의하는 방법을 보여줍니다. 헬퍼는 테이블이 렌더링되기 직전에 적용되며, 이는 [api.intercept()](api/internal/intercept-method.md) 메서드를 사용하여 [render-table](api/events/render-table-event.md) 이벤트를 인터셉트함으로써 이루어집니다.

스니펫은 다음 항목에 아이콘을 추가하는 방법을 보여줍니다:

- 필드(id, user_score)를 기반으로 한 본문 셀 (템플릿이 깃발 및 별 아이콘을 추가)
- 필드 이름을 기반으로 한 헤더 레이블 (예: 필드가 "id"인 경우 헤더 값 옆에 지구본 아이콘 추가)
- 값을 기반으로 한 열 헤더 (색상이 있는 화살표 표시기 추가)

<iframe src="https://snippet.dhtmlx.com/4viq7cft?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>


**관련 문서:**

- [`render-table`](api/events/render-table-event.md)
- [셀에 템플릿 적용](guides/configuration.md#applying-templates-to-cells)
- [헤더에 템플릿 적용](guides/configuration.md#applying-templates-to-headers)
