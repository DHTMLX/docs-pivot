---
sidebar_label: API 개요
title: API 개요
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 JavaScript Pivot의 API 개요를 확인할 수 있습니다. 개발자 가이드와 API 참조를 살펴보고, 코드 예제와 라이브 데모를 직접 실행해 보세요. DHTMLX Pivot의 30일 무료 평가판도 다운로드할 수 있습니다.
---

# API 개요 {#api-overview}

## Pivot 생성자 {#pivot-constructor}

~~~jsx
new pivot.Pivot("#root", {
    // 구성 파라미터
});
~~~

**파라미터**:

- HTML 컨테이너 (HTML 컨테이너의 ID)
- 구성 파라미터 객체 ([여기서 확인](#pivot-properties))

## Pivot 메서드 {#pivot-methods}

| 이름                                        | 설명                                |
| ------------------------------------------- | ------------------------------------------ |
| [](api/methods/gettable-method.md)           | @getshort(../methods/gettable-method.md)        |
| [](api/methods/setconfig-method.md)          | @getshort(../methods/setconfig-method.md)       |
| [](api/methods/setlocale-method.md)          | @getshort(../methods/setlocale-method.md)       |
| [](api/methods/showconfigpanel-method.md)    | @getshort(../methods/showconfigpanel-method.md) |

## Pivot 내부 API {#pivot-internal-api}

### Event Bus 메서드 {#event-bus-methods}

| 이름                                  | 설명                                  |
| :------------------------------------ | :------------------------------------------- |
| [](api/internal/detach-method.md)      | @getshort(../internal/detach-method.md)      |  
| [](api/internal/exec-method.md)        | @getshort(../internal/exec-method.md)        |
| [](api/internal/intercept-method.md)   | @getshort(../internal/intercept-method.md)   |
| [](api/internal/on-method.md)          | @getshort(../internal/on-method.md)          |
| [](api/internal/setnext-method.md)     | @getshort(../internal/setnext-method.md)     |

### State 메서드 {#state-methods}

| 이름                                            | 설명                                        |
| :---------------------------------------------- | :------------------------------------------------- |
| [](api/internal/getreactivestate-method.md)      | @getshort(../internal/getreactivestate-method.md)  |
| [](api/internal/getstate-method.md)              | @getshort(../internal/getstate-method.md)          |
| [](api/internal/getstores-method.md)             | @getshort(../internal/getstores-method.md)         |

## Pivot 이벤트 {#pivot-events}

| 이름                                              | 설명                                     |
| :------------------------------------------------ | :---------------------------------------------- |
| [](api/events/add-field-event.md)                  | @getshort(../events/add-field-event.md)         |
| [](api/events/apply-filter-event.md)               | @getshort(../events/apply-filter-event.md)      |
| [](api/events/delete-field-event.md)               | @getshort(../events/delete-field-event.md)      |
| [](api/events/move-field-event.md)                 | @getshort(../events/move-field-event.md)        |
| [](api/events/open-filter-event.md)                | @getshort(../events/open-filter-event.md)       |
| [](api/events/render-table-event.md)               | @getshort(../events/render-table-event.md)      |
| [](api/events/show-config-panel-event.md)          | @getshort(../events/show-config-panel-event.md) |
| [](api/events/update-config-event.md)              | @getshort(../events/update-config-event.md)     |
| [](api/events/update-field-event.md)               | @getshort(../events/update-field-event.md)      |

## Pivot 속성 {#pivot-properties}

| 이름                                               | 설명                                      |
| :------------------------------------------------- | :----------------------------------------------- |
| [](api/config/columnshape-property.md)              | @getshort(../config/columnshape-property.md)     |
| [](api/config/config-property.md)                   | @getshort(../config/config-property.md)          |
| [](api/config/configpanel-property.md)              | @getshort(../config/configpanel-property.md)     |
| [](api/config/data-property.md)                     | @getshort(../config/data-property.md)            |
| [](api/config/fields-property.md)                   | @getshort(../config/fields-property.md)          |
| [](api/config/headershape-property.md)              | @getshort(../config/headershape-property.md)     |
| [](api/config/limits-property.md)                   | @getshort(../config/limits-property.md)          |
| [](api/config/locale-property.md)                   | @getshort(../config/locale-property.md)          |
| [](api/config/methods-property.md)                  | @getshort(../config/methods-property.md)         |
| [](api/config/predicates-property.md)               | @getshort(../config/predicates-property.md)      |
| [](api/config/readonly-property.md)                 | @getshort(../config/readonly-property.md)        |
| [](api/config/tableshape-property.md)               | @getshort(../config/tableshape-property.md)      |
