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

- fieldList -> [fields](/api/config/fields-property)
- fields ->  [config](/api/config/config-property)
- mark -> the `marks` parameter of the [tableShape](/api/config/tableshape-property) property
- types -> [methods](/api/config/methods-property)
- layout -> [columnShape](/api/config/columnshape-property), [headerShape](/api/config/headershape-property), [readonly](/api/config/readonly-property)
- customFormat -> [predicates](/api/config/predicates-property) - custom pre-processing functions for data

#### Events

- filterApply -> [apply-filter](/api/events/apply-filter-event)
- fieldClick -> there's no an identical event but you can refer to [update-field](/api/events/update-value-event)

### Removed API

- [Methods from version 1.5.6](https://docs.dhtmlx.com/pivot/api__refs__pivot_methods.html) are deprecated, all new methods you can find here: [Methods](/api/overview/main-overview#pivot-methods) 
- Pivot 1.5.6 events (`change`, `fieldClick`, `applyButtonClick`) are no longer available in Pivot 2.0 but you can find more extended functionality in a new version (refer to [Pivot events](/api/overview/events-overview))






