---
sidebar_label: API overview
title: API Overview
description: You can have an API overview of JavaScript Pivot in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# API overview

## Pivot constructor

~~~jsx
new pivot.Pivot("#root", {
    // configuration parameters
});
~~~

**Parameters**:

- an HTML container (the ID of the HTML container)
- an object of the configuration parameters ([check here](#pivot-properties))

## Pivot methods

| Name                                        | Description                                |
| ------------------------------------------- | ------------------------------------------ |
| [getTable()](/api/methods/gettable-method/)           | @getshort(../methods/gettable-method.md)        |
| [setConfig()](/api/methods/setconfig-method/)          | @getshort(../methods/setconfig-method.md)       |
| [setLocale()](/api/methods/setlocale-method/)          | @getshort(../methods/setlocale-method.md)       |
| [showConfigPanel()](/api/methods/showconfigpanel-method/)    | @getshort(../methods/showconfigpanel-method.md) |

## Pivot internal API

### Event Bus methods

| Name                                  | Description                                  |
| :------------------------------------ | :------------------------------------------- |
| [api.detach()](/api/internal/detach-method/)      | @getshort(../internal/detach-method.md)      |  
| [api.exec()](/api/internal/exec-method/)        | @getshort(../internal/exec-method.md)        |
| [api.intercept()](/api/internal/intercept-method/)   | @getshort(../internal/intercept-method.md)   |
| [api.on()](/api/internal/on-method/)          | @getshort(../internal/on-method.md)          |
| [api.setNext()](/api/internal/setnext-method/)     | @getshort(../internal/setnext-method.md)     |

### State methods

| Name                                            | Description                                        |
| :---------------------------------------------- | :------------------------------------------------- |
| [api.getReactiveState()](/api/internal/getreactivestate-method/)      | @getshort(../internal/getreactivestate-method.md)  |
| [api.getState()](/api/internal/getstate-method/)              | @getshort(../internal/getstate-method.md)          |
| [api.getStores()](/api/internal/getstores-method/)             | @getshort(../internal/getstores-method.md)         |

## Pivot events

| Name                                              | Description                                     |
| :------------------------------------------------ | :---------------------------------------------- |
| [add-field](/api/events/add-field-event/)                  | @getshort(../events/add-field-event.md)         |
| [apply-filter](/api/events/apply-filter-event/)               | @getshort(../events/apply-filter-event.md)      |
| [delete-field](/api/events/delete-field-event/)               | @getshort(../events/delete-field-event.md)      |
| [move-field](/api/events/move-field-event/)                 | @getshort(../events/move-field-event.md)        |
| [open-filter](/api/events/open-filter-event/)                | @getshort(../events/open-filter-event.md)       |
| [render-table](/api/events/render-table-event/)               | @getshort(../events/render-table-event.md)      |
| [show-config-panel](/api/events/show-config-panel-event/)          | @getshort(../events/show-config-panel-event.md) |
| [update-config](/api/events/update-config-event/)              | @getshort(../events/update-config-event.md)     |
| [update-field](/api/events/update-value-event/)               | @getshort(../events/update-value-event.md)      |

## Pivot properties

| Name                                               | Description                                      |
| :------------------------------------------------- | :----------------------------------------------- |
| [columnShape](/api/config/columnshape-property/)              | @getshort(../config/columnshape-property.md)     |
| [config](/api/config/config-property/)                   | @getshort(../config/config-property.md)          |
| [configPanel](/api/config/configpanel-property/)              | @getshort(../config/configpanel-property.md)     |
| [data](/api/config/data-property/)                     | @getshort(../config/data-property.md)            |
| [fields](/api/config/fields-property/)                   | @getshort(../config/fields-property.md)          |
| [headerShape](/api/config/headershape-property/)              | @getshort(../config/headershape-property.md)     |
| [limits](/api/config/limits-property/)                   | @getshort(../config/limits-property.md)          |
| [locale](/api/config/locale-property/)                   | @getshort(../config/locale-property.md)          |
| [methods](/api/config/methods-property/)                  | @getshort(../config/methods-property.md)         |
| [predicates](/api/config/predicates-property/)               | @getshort(../config/predicates-property.md)      |
| [readonly](/api/config/readonly-property/)                 | @getshort(../config/readonly-property.md)        |
| [tableShape](/api/config/tableshape-property/)               | @getshort(../config/tableshape-property.md)      |
