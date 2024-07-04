---
sidebar_label: Migration to newer versions
title: Migration to Newer Versions
description: You can learn about the Migration to Newer Versions in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Migration to newer versions

## 1.5.6 -> 2.0

This list of changes will help you migrate from the previous version Pivot 1.5.6 to the totally renewed version Pivot 2.0

### Changed API

#### Properties

New properties do not fully duplicate the previous ones but provide more extended functionality

- [fieldList](https://docs.dhtmlx.com/pivot/api__pivot_fieldlist_config.html) -> [fields](/api/config/fields-property)
- [fields](https://docs.dhtmlx.com/pivot/api__pivot_fields_config.html) ->  [config](/api/config/config-property)
- [mark](https://docs.dhtmlx.com/pivot/api__pivot_mark_config.html) -> the `marks` parameter of the [tableShape](/api/config/tableshape-property) property
- [types](https://docs.dhtmlx.com/pivot/api__pivot_types_config.html) -> [methods](/api/config/methods-property)
- [layout](https://docs.dhtmlx.com/pivot/api__pivot_layout_config.html) -> [columnShape](/api/config/columnshape-property), [headerShape](/api/config/headershape-property), [readonly](/api/config/readonly-property)
- [customFormat](https://docs.dhtmlx.com/pivot/api__pivot_customformat_config.html) -> [predicates](/api/config/predicates-property) - custom pre-processing functions for data

#### Events

- [filterApply](https://docs.dhtmlx.com/pivot/api__pivot_filterapply_event.html) -> [apply-filter](/api/events/apply-filter-event)
- [fieldClick](https://docs.dhtmlx.com/pivot/api__pivot_fieldclick_event.html) -> there's no an identical event but you can refer to [update-field](/api/events/update-value-event)

### Removed API

- [Methods from version 1.5.6](https://docs.dhtmlx.com/pivot/api__refs__pivot_methods.html) are deprecated, all new methods you can find here: [Methods](/api/overview/main-overview#pivot-methods) 
- [Pivot 1.5.6 events](https://docs.dhtmlx.com/pivot/api__refs__pivot_events.html) (`change`, `fieldClick`, `applyButtonClick`) are no longer available in Pivot 2.0 but you can find more extended functionality in a new version (refer to [Pivot events](/api/overview/events-overview))






