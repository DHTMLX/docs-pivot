---
sidebar_label: API 概览
title: API 概览
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中查阅 JavaScript Pivot 的 API 概览。浏览开发者指南和 API 参考，体验代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# API 概览 {#api-overview}

## Pivot 构造函数 {#pivot-constructor}

~~~jsx
new pivot.Pivot("#root", {
    // 配置参数
});
~~~

**参数**：

- HTML 容器（HTML 容器的 ID）
- 配置参数对象（[请参阅此处](#pivot-properties)）

## Pivot 方法 {#pivot-methods}

| 名称                                        | 描述                                |
| ------------------------------------------- | ---------------------------------- |
| [](api/methods/gettable-method.md)           | @getshort(../methods/gettable-method.md)        |
| [](api/methods/setconfig-method.md)          | @getshort(../methods/setconfig-method.md)       |
| [](api/methods/setlocale-method.md)          | @getshort(../methods/setlocale-method.md)       |
| [](api/methods/showconfigpanel-method.md)    | @getshort(../methods/showconfigpanel-method.md) |

## Pivot 内部 API {#pivot-internal-api}

### Event Bus 方法 {#event-bus-methods}

| 名称                                  | 描述                                  |
| :------------------------------------ | :------------------------------------------- |
| [](api/internal/detach-method.md)      | @getshort(../internal/detach-method.md)      |  
| [](api/internal/exec-method.md)        | @getshort(../internal/exec-method.md)        |
| [](api/internal/intercept-method.md)   | @getshort(../internal/intercept-method.md)   |
| [](api/internal/on-method.md)          | @getshort(../internal/on-method.md)          |
| [](api/internal/setnext-method.md)     | @getshort(../internal/setnext-method.md)     |

### 状态方法 {#state-methods}

| 名称                                            | 描述                                        |
| :---------------------------------------------- | :------------------------------------------------- |
| [](api/internal/getreactivestate-method.md)      | @getshort(../internal/getreactivestate-method.md)  |
| [](api/internal/getstate-method.md)              | @getshort(../internal/getstate-method.md)          |
| [](api/internal/getstores-method.md)             | @getshort(../internal/getstores-method.md)         |

## Pivot 事件 {#pivot-events}

| 名称                                              | 描述                                     |
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

## Pivot 属性 {#pivot-properties}

| 名称                                               | 描述                                      |
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
