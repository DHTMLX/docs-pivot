---
sidebar_label: 새로운 기능
title: 새로운 기능
description: DHTMLX JavaScript UI 라이브러리 문서에서 DHTMLX Pivot의 새로운 기능과 릴리스 이력을 확인하세요. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 무료 30일 평가판도 다운로드할 수 있습니다.
---

# 새로운 기능 {#whats-new}

이전 버전에서 Pivot을 업그레이드하는 경우 자세한 내용은 [최신 버전으로의 마이그레이션](news/migration.md) 을 확인하세요.

## 버전 2.1.1 {#version-211}

2026년 6월 10일 릴리스

### 수정 사항 {#fixes}

- 행 필터를 값이 누락되거나 비어 있는 데이터셋에 적용할 때 "getMonth" 오류가 발생하는 문제

## 버전 2.1 {#version-21}

2025년 5월 6일 릴리스

### 새로운 기능 {#new-functionality}

- [오른쪽 열 고정 기능](guides/configuration.md#freezing-columns-on-the-right)
- 숫자 값에 대한 [기본 정렬](guides/stylization.md#specific-css-classes) 및 [로케일 기반 서식](guides/localization.md#number-formatting)
- [`fields`](api/config/fields-property.md) 속성에 추가된 `format`을 통해 날짜 및 숫자 필드에 대한 [사용자 정의 숫자 형식 정의 기능](guides/working-with-data.md#applying-formats-to-fields)
- [`tableShape`](api/config/tableshape-property.md) 및 [`headerShape`](api/config/headershape-property.md) 속성의 `cellStyle` 매개변수를 통해 [헤더 및 테이블 셀 스타일 지정 기능](guides/stylization.md#cell-style)
- 헤더 및 열 객체의 `cell` 속성으로 템플릿을 정의하여 [`pivot.template`](api/helpers/template.md) 헬퍼를 통해 헤더 및 테이블 셀에 HTML 콘텐츠를 삽입하는 기능([render-table](api/events/render-table-event.md) 이벤트를 가로채어 테이블 사용자 정의)
- [Excel 및 CSV 내보내기 설정 개선](guides/exporting-data.md):
  - "xlsx" 형식의 경우, 날짜 및 숫자 필드는 기본 형식 또는 [`fields`](api/config/fields-property.md) 속성으로 정의된 형식의 원시 값으로 내보내집니다
  - 파일 및 시트 이름 정의와 내보낸 파일에서 헤더/푸터 제외 기능
  - 내보낸 셀에 스타일 및 템플릿 추가 기능
- [외부 입력을 통한 데이터 필터링 기능](api/table/filter-rows.md)
- 셀 탐색을 위한 시각적 프레임
- [프레임워크와의 통합](/category/integration-with-frameworks)

### 새로운 API {#new-api}

- [`tableShape`](api/config/tableshape-property.md)의 `split` 객체 내 `right` 설정
- [`tableShape`](api/config/tableshape-property.md) 및 [`headerShape`](api/config/headershape-property.md) 속성 내 `cellStyle` 설정
- [`fields`](api/config/fields-property.md) 배열 내 `format` 설정
- 내부 Table의 [`filter-rows`](api/table/filter-rows.md) 이벤트
- 테이블 셀에 HTML 콘텐츠를 정의하는 [`pivot.template`](api/helpers/template.md)

### 수정 사항 {#fixes-21}

- 합계 열이 정렬되지 않는 문제
- 앞에 0이 있는 문자열 값이 내보내기 중 숫자로 변환되는 문제
- Predicate 템플릿이 행/열에 적용되지 않는 문제
- 특수한 경우 resize observer 오류

### 주요 변경 사항 {#breaking-changes}

- `tableShape` 속성의 `sizes` 객체 내 `colWidth` 매개변수가 `columnWidth`로 이름 변경됨

## 버전 2.0.3 {#version-203}

2024년 11월 29일 릴리스

### 수정 사항 {#fixes-203}

- 트리 구조를 Excel/CSV로 내보낼 때 최상위 브랜치만 포함되는 문제
- autowidth가 적용된 내보낸 열이 결과 Excel 파일에서 너무 좁게 표시되는 문제
- 필터 팝업의 위치가 잘못 표시되는 문제
- `setConfig` 메서드로 구성을 변경한 후 동작이 올바르지 않은 문제
- 더 정확한 타입 정의

## 버전 2.0.2 {#version-202}

2024년 10월 22일 릴리스

### 수정 사항 {#fixes-202}

- `columnShape` 타입 정의
- 올바른 패키지 내용

## 버전 2.0 {#version-20}

2024년 8월 26일 릴리스

[블로그 페이지](https://dhtmlx.com/blog/) 에서 이번 릴리스 리뷰를 확인하세요.

### 주요 변경 사항 {#breaking-change}

:::note
버전 1.5의 API는 API v.2.0과 호환되지 않습니다.
:::

새 버전으로의 마이그레이션 팁은 [마이그레이션](news/migration.md) 페이지를 확인하세요.

### 새로운 기능 {#new-functionality-20}

- Pivot 2.0은 대용량 데이터셋 렌더링 및 생성 속도가 빠릅니다 ([샘플](https://snippet.dhtmlx.com/e6qwqrys))
- [`columnShape`](api/config/columnshape-property.md) 속성을 통해 열의 모양과 동작을 구성하는 다음 새 기능을 사용할 수 있습니다:
  - **autoWidth** 계산에 처리할 maxRows를 설정하는 기능이 포함된 **autowidth** 설정 ([샘플](https://snippet.dhtmlx.com/tn1yw14m))
  - 열 너비 계산 시 동일한 데이터의 각 필드를 한 번만 분석하는 **firstOnly** 기능 (기본값)
- 이제 [`headerShape`](api/config/headershape-property.md) 속성을 사용하여 헤더의 모양과 동작을 구성할 수 있습니다:
  - 헤더 텍스트에 템플릿 적용 ([샘플](https://snippet.dhtmlx.com/g89r9ryw))
  - 텍스트 방향 변경 ([샘플](https://snippet.dhtmlx.com/4qroi8ka))
  - 열 접기 가능하게 만들기 ([샘플](https://snippet.dhtmlx.com/pt2ljmcm))
- [`tableShape`](api/config/tableshape-property.md) 속성을 통해 테이블의 모양과 크기를 구성할 수 있습니다:
  - 행, 헤더, 푸터 높이 구성: rowHeight, headerHeight, footerHeight ([테이블 크기 조정](guides/configuration.md#resizing-the-table))
  - `tableShape` 속성의 **totalColumn** 매개변수를 통해 열뿐만 아니라 행에 대해서도 합계 값 생성 ([샘플](https://snippet.dhtmlx.com/f0ag0t9t))
  - 테이블 뷰에서 중복 값 숨기기([`tableShape`](api/config/tableshape-property.md) 속성의 **cleanRows** 매개변수)
  - 스크롤 시 왼쪽 열을 고정하여 정적으로 유지 ([샘플](https://snippet.dhtmlx.com/lahf729o))
  - 모든 행 펼치기 또는 접기 ([샘플](https://snippet.dhtmlx.com/i4mi6ejn))
- 데이터 집계에 더 많은 기능이 추가되었습니다:
  - [불러온 데이터 제한](guides/working-with-data.md#limiting-loaded-data)
  - 더 많은 [데이터 연산](guides/working-with-data.md#applying-maths-methods) 사용 가능
  - [Predicate를 사용한 데이터 처리](guides/working-with-data.md#processing-data-with-predicates) - 데이터에 사용자 정의 전처리 함수 적용
  - [로케일을 통한 날짜 형식 설정](guides/localization.md#date-formatting)
- 새로운 메서드 추가: [`getTable()`](api/methods/gettable-method.md), [`setConfig()`](api/methods/setconfig-method.md), [`setLocale()`](api/methods/setlocale-method.md), [`showConfigPanel()`](api/methods/showconfigpanel-method.md)
- 새로운 이벤트 추가: [`add-field`](api/events/add-field-event.md), [`delete-field`](api/events/delete-field-event.md), [`open-filter`](api/events/open-filter-event.md), [`render-table`](api/events/render-table-event.md), [`move-field`](api/events/move-field-event.md), [`show-config-panel`](api/events/show-config-panel-event.md), [`show-config-panel`](api/events/show-config-panel-event.md), [`update-config`](api/events/update-config-event.md), [`update-field`](api/events/update-field-event.md).
