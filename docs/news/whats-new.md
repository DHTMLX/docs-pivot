---
sidebar_label: What's new
title: What's New
description: You can explore what's new in DHTMLX Pivot and its release history in the documentation of the DHTMLX JavaScript UI library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# What's new

If you are updating Pivot from an older version, check [Migration to newer versions](news/migration.md) for details.

## Version 2.0.3

Released on November 29, 2024

### Fixes

- export to Excel/CSV of tree structure contains only topmost branches
- exported columns with autowidth are too narrow in the resulting Excel file
- incorrect position of a popup with filters
- incorrect behaviour after changing configuration with the setConfig method
- more precise type definitions

## Version 2.0.2

Released on October 22, 2024

### Fixes

- `columnShape` type definition
- correct package contents

## Version 2.0

Released on August 26, 2024

Please, see the review of the release on [the blog page](https://dhtmlx.com/blog/)

### Breaking change

:::note
API of version 1.5 is not compatible with API v.2.0. 
:::

For tips about migration to the new version, check the [Migration](/news/migration) page. 

### New functionality

- Pivot 2.0 is quick at rendering and generating large datasets ([sample](https://snippet.dhtmlx.com/e6qwqrys))
- Next new features for configuring the look and behavior of columns are available via the [`columnShape`](/api/config/columnshape-property) property:
  - setting **autowidth** with the ability to set maxRows to be processed for the **autoWidth** calculation ([sample](https://snippet.dhtmlx.com/tn1yw14m))
  - the **firstOnly** feature when each field of the same data is analyzed only once to calculate the column width (by default) 
- Now you can configure the look and behavior of headers using the [`headerShape`](/api/config/headershape-property) property that allows:  
  - applying a template to the text in headers ([sample](https://snippet.dhtmlx.com/g89r9ryw))
  - changing text orientation ([sample](https://snippet.dhtmlx.com/4qroi8ka))
  - making columns collapsible ([sample](https://snippet.dhtmlx.com/pt2ljmcm))
- The shape and sizes of the table can be configured via the [`tableShape`](/api/config/tableshape-property) property that makes possible:
  - configuring the height of rows, headers, footer: rowHeight, headerHeight, footerHeight ([Resizing the table](/guides/configuration#resizing-the-table))
  - generating total values not only for columns but also for rows, which is made possible via the **totalColumn** parameter of the `tableShape` property ([sample](https://snippet.dhtmlx.com/f0ag0t9t))
  - hiding the duplicate values in the table view (the **cleanRows** parameter of the [`tableShape`](/api/config/tableshape-property) property)
  - fixing columns from the left making them static while scrolling ([sample](https://snippet.dhtmlx.com/lahf729o))
  - making all rows expand or collapse ([sample](https://snippet.dhtmlx.com/i4mi6ejn))
- More features are added to aggregate data:
  - [limiting loaded data](/guides/working-with-data#limiting-loaded-data)
  - more [operations with data](/guides/working-with-data#applying-maths-methods) are available 
  - [processing data with predicates](/guides/working-with-data#processing-data-with-predicates) - applying custom pre-processing functions for data
  - [setting date format via locale](/guides/loading-exporting-data#setting-date-format)
- New methods are added: [`getTable()`](/api/methods/gettable-method), [`setConfig()`](/api/methods/setconfig-method), [`setLocale()`](/api/methods/setlocale-method), [`showConfigPanel()`](/api/methods/showconfigpanel-method)  
- New events are added: [`add-field`](/api/events/add-field-event), [`delete-field`](/api/events/delete-field-event), [`open-filter`](/api/events/open-filter-event), [`render-table`](/api/events/render-table-event), [`move-field`](/api/events/move-field-event), [`show-config-panel`](/api/events/show-config-panel-event), [`show-config-panel`](/api/events/show-config-panel-event), [`update-config`](/api/events/update-config-event), [`update-value`](/api/events/update-value-event).
