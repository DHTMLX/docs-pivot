---
sidebar_label: What's new
title: What's New
description: You can explore what's new in DHTMLX Pivot and its release history in the documentation of the DHTMLX JavaScript UI library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# What's new

## Version 2.0

Released on Month Day, 2024

[Review of release on the blog](https://dhtmlx.com/blog/)

### Breaking change

:::note
API of version 1.5 is not compatible with API v.2.0. 
:::

For tips about migration to the new version, check the [Migration](/news/migration) page. 

### New functionality

- Pivot 2.0 is quick at rendering and generating large datasets
- Now you can hide the Configuration panel: [`configPanel`](/api/config/configpanel-property)
- Next new features for configuring the look and behavior of columns are available via the [`columnShape`](/api/config/columnshape-property) property:
  - setting **autowidth** with the ability to set maxRows to be processed for the **autoWidth** calculation
  - the **firstOnly** feature when each field of the same data is analyzed only once to calculate the column width (by default)
- Now you can configure the look and behavior of headers using the [`headerShape`](/api/config/headershape-property) property that allows:  
  - applying a template to the text in headers
  - changing text orientation
  - making columns collapsible
- The shape and sizes of the table can be configured via the [`tableShape`](/api/config/tableshape-property) property that makes possible:
  - configuring the sizes: rowHeight, headerHeight, footerHeight, colWidth
  - generating total values not only for columns but also for rows
  - hiding the duplicate values in the table view
  - fixing columns from the left making them static while scrolling
  - making all rows expand or collapse
- More features are added to aggregate data:
  - [limiting loaded data](/guides/working-with-data#limiting-loaded-data)
  - more [operations with data](/guides/working-with-data#applying-maths-methods) are available 
  - the ability to apply custom methods
  - [processing data with predicates](/guides/working-with-data#processing-data-with-predicates) - applying custom pre-processing functions for data
  - [setting date format via locale](/guides/loading-exporting-data#setting-date-format)
- New methods are added: [`getTable()`](/api/methods/gettable-method), [`setConfig()`](/api/methods/setconfig-method), [`setLocale()`](/api/methods/setlocale-method), [`showConfigPanel()`](/api/methods/showconfigpanel-method)  
- New events are added: [`add-field`](/api/events/add-field-event), [`delete-field`](/api/events/delete-field-event), [`open-filter`](/api/events/open-filter-event), [`render-table`](/api/events/render-table-event), [`reorder-fields`](/api/events/reorder-fields-event), [`show-config-panel`](/api/events/show-config-panel-event), [`show-config-panel`](/api/events/show-config-panel-event), [`update-config`](/api/events/update-config-event), [`update-value`](/api/events/update-value-event).