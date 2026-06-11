---
sidebar_label: 최신 버전으로 마이그레이션
title: 최신 버전으로 마이그레이션
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 최신 버전으로의 마이그레이션 방법을 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 탐색하고, 코드 예제 및 라이브 데모를 사용해 보세요. DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# 최신 버전으로 마이그레이션

## 2.0 -> 2.1

- `tableShape` 속성의 `sizes` 객체에 있는 `colWidth` 파라미터가 `columnWidth`로 이름이 변경되었습니다.

## 1.5 -> 2.0

이 변경 사항 목록은 이전 버전인 Pivot 1.5에서 완전히 새롭게 개선된 Pivot 2.0으로 마이그레이션하는 데 도움을 드립니다.

:::note
[v.1.5에서의 데이터 마이그레이션을 위한 변환기](https://snippet.dhtmlx.com/s4sfdhq4) 를 확인하세요.
:::

### 변경된 API {#changed-api}

#### 속성 {#properties}

새 속성은 이전 속성을 완전히 대체하지 않지만 더 확장된 기능을 제공합니다.

- [fieldList](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fieldlist_config.html) -> [fields](api/config/fields-property.md)
- [fields](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fields_config.html) ->  [config](api/config/config-property.md)
- [mark](https://docs.dhtmlx.com/pivot/1-5/api__pivot_mark_config.html) -> [tableShape](api/config/tableshape-property.md) 속성의 `marks` 파라미터
- [types](https://docs.dhtmlx.com/pivot/1-5/api__pivot_types_config.html) -> [methods](api/config/methods-property.md)
- [layout](https://docs.dhtmlx.com/pivot/1-5/api__pivot_layout_config.html) -> [columnShape](api/config/columnshape-property.md), [headerShape](api/config/headershape-property.md), [readonly](api/config/readonly-property.md)
- [customFormat](https://docs.dhtmlx.com/pivot/1-5/api__pivot_customformat_config.html) -> [predicates](api/config/predicates-property.md) - 데이터를 위한 사용자 정의 전처리 함수

#### 이벤트 {#events}

- [filterApply](https://docs.dhtmlx.com/pivot/1-5/api__pivot_filterapply_event.html) -> [apply-filter](api/events/apply-filter-event.md)
- [fieldClick](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fieldclick_event.html) -> 동일한 이벤트는 없지만 [update-field](api/events/update-field-event.md) 를 참조할 수 있습니다.

### 제거된 API {#removed-api}

- [버전 1.5의 메서드](https://docs.dhtmlx.com/pivot/1-5/api__refs__pivot_methods.html) 는 더 이상 사용되지 않으며, 새로운 메서드는 여기서 확인할 수 있습니다: [메서드](api/overview/main-overview.md#pivot-methods)
- [Pivot 1.5 이벤트](https://docs.dhtmlx.com/pivot/1-5/api__refs__pivot_events.html) (`change`, `fieldClick`, `applyButtonClick`)는 Pivot 2.0에서 더 이상 사용할 수 없지만, 새 버전에서 더 확장된 기능을 제공합니다([Pivot 이벤트](api/overview/events-overview.md) 참조).

### 중요 기능 {#important-features}

- 데이터 내보내기: [이전 내보내기 옵션](https://docs.dhtmlx.com/pivot/1-5/guides__export.html) -> [새 내보내기 옵션](guides/exporting-data.md)
- 정렬: [필드 정렬](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#configuringfields) -> [데이터 정렬](guides/working-with-data.md#sorting-data)
- 트리 모드: [gridMode](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#gridmode) -> [트리 모드 활성화](guides/configuration.md#enabling-the-tree-mode)
- 날짜 형식: [날짜 필드 구성](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#configuringdatefields) ->
[날짜 형식 설정](guides/localization.md#date-formatting)
- 커스터마이징:
  - [셀 서식 지정](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#conditionalformattingofcells) -> [셀 스타일](guides/stylization.md#cell-style)
  - [헤더 템플릿](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#settingtemplatesforheaders) ->
  [헤더에 템플릿 적용](guides/configuration.md#applying-templates-to-headers)
  - [셀 템플릿](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#settingtemplatesforcells) ->
  [셀에 템플릿 적용](guides/configuration.md#applying-templates-to-cells)
- 필터링: [필터 조작](https://docs.dhtmlx.com/pivot/1-5/guides__using_filters.html) -> [데이터 필터링](guides/working-with-data.md#filtering-data)
