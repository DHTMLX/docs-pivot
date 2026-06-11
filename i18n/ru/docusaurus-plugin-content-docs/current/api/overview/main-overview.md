---
sidebar_label: Обзор АПИ
title: Обзор АПИ
description: Вы можете ознакомиться с обзором АПИ JavaScript Pivot в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Обзор АПИ {#api-overview}

## Конструктор Pivot {#pivot-constructor}

~~~jsx
new pivot.Pivot("#root", {
    // параметры конфигурации
});
~~~

**Параметры**:

- HTML-контейнер (идентификатор HTML-контейнера)
- объект параметров конфигурации ([смотрите здесь](#pivot-properties))

## Методы Pivot {#pivot-methods}

| Название                                    | Описание                                   |
| ------------------------------------------- | ------------------------------------------ |
| [](api/methods/gettable-method.md)           | @getshort(../methods/gettable-method.md)        |
| [](api/methods/setconfig-method.md)          | @getshort(../methods/setconfig-method.md)       |
| [](api/methods/setlocale-method.md)          | @getshort(../methods/setlocale-method.md)       |
| [](api/methods/showconfigpanel-method.md)    | @getshort(../methods/showconfigpanel-method.md) |

## Внутреннее АПИ Pivot {#pivot-internal-api}

### Методы Event Bus {#event-bus-methods}

| Название                              | Описание                                     |
| :------------------------------------ | :------------------------------------------- |
| [](api/internal/detach-method.md)      | @getshort(../internal/detach-method.md)      |  
| [](api/internal/exec-method.md)        | @getshort(../internal/exec-method.md)        |
| [](api/internal/intercept-method.md)   | @getshort(../internal/intercept-method.md)   |
| [](api/internal/on-method.md)          | @getshort(../internal/on-method.md)          |
| [](api/internal/setnext-method.md)     | @getshort(../internal/setnext-method.md)     |

### Методы состояния {#state-methods}

| Название                                        | Описание                                           |
| :---------------------------------------------- | :------------------------------------------------- |
| [](api/internal/getreactivestate-method.md)      | @getshort(../internal/getreactivestate-method.md)  |
| [](api/internal/getstate-method.md)              | @getshort(../internal/getstate-method.md)          |
| [](api/internal/getstores-method.md)             | @getshort(../internal/getstores-method.md)         |

## События Pivot {#pivot-events}

| Название                                          | Описание                                        |
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

## Свойства Pivot {#pivot-properties}

| Название                                           | Описание                                         |
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
