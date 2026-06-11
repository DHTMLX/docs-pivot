---
sidebar_label: 迁移至新版本
title: 迁移至新版本
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解迁移至新版本的相关信息。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# 迁移至新版本 {#migration-to-newer-versions}

## 2.0 -> 2.1 {#20---21}

- `tableShape` 属性中 `sizes` 对象的 `colWidth` 参数已重命名为 `columnWidth`

## 1.5 -> 2.0 {#15---20}

以下变更列表将帮助您从 Pivot 1.5 的旧版本迁移至全面焕新的 Pivot 2.0 版本。

:::note
请查看我们的[数据迁移转换工具（从 v.1.5 迁移）](https://snippet.dhtmlx.com/s4sfdhq4)
:::

### 变更的 API {#changed-api}

#### 属性 {#properties}

新属性并非完全复刻旧属性，而是提供了更为丰富的功能。

- [fieldList](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fieldlist_config.html) -> [fields](api/config/fields-property.md)
- [fields](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fields_config.html) ->  [config](api/config/config-property.md)
- [mark](https://docs.dhtmlx.com/pivot/1-5/api__pivot_mark_config.html) -> [tableShape](api/config/tableshape-property.md) 属性的 `marks` 参数
- [types](https://docs.dhtmlx.com/pivot/1-5/api__pivot_types_config.html) -> [methods](api/config/methods-property.md)
- [layout](https://docs.dhtmlx.com/pivot/1-5/api__pivot_layout_config.html) -> [columnShape](api/config/columnshape-property.md)、[headerShape](api/config/headershape-property.md)、[readonly](api/config/readonly-property.md)
- [customFormat](https://docs.dhtmlx.com/pivot/1-5/api__pivot_customformat_config.html) -> [predicates](api/config/predicates-property.md) - 用于数据的自定义预处理函数

#### Events {#events}

- [filterApply](https://docs.dhtmlx.com/pivot/1-5/api__pivot_filterapply_event.html) -> [apply-filter](api/events/apply-filter-event.md)
- [fieldClick](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fieldclick_event.html) -> 没有完全对应的 event，但您可以参考 [update-field](api/events/update-field-event.md)

### 已移除的 API {#removed-api}

- [1.5 版本的方法](https://docs.dhtmlx.com/pivot/1-5/api__refs__pivot_methods.html) 已被废弃，所有新方法请参见：[方法](api/overview/main-overview.md#pivot-methods)
- [Pivot 1.5 事件](https://docs.dhtmlx.com/pivot/1-5/api__refs__pivot_events.html)（`change`、`fieldClick`、`applyButtonClick`）在 Pivot 2.0 中不再可用，但新版本提供了更丰富的功能（请参考 [Pivot 事件](api/overview/events-overview.md)）

### 重要功能 {#important-features}

- 数据导出：[旧版导出选项](https://docs.dhtmlx.com/pivot/1-5/guides__export.html) -> [新版导出选项](guides/exporting-data.md)
- 排序：[字段排序](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#configuringfields) -> [数据排序](guides/working-with-data.md#sorting-data)
- 树形模式：[gridMode](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#gridmode) -> [启用树形模式](guides/configuration.md#enabling-the-tree-mode)
- 日期格式：[配置日期字段](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#configuringdatefields) ->
[设置日期格式](guides/localization.md#date-formatting)
- 自定义：
  - [单元格格式化](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#conditionalformattingofcells) -> [单元格样式](guides/stylization.md#cell-style)
  - [表头模板](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#settingtemplatesforheaders) ->
  [为表头应用模板](guides/configuration.md#applying-templates-to-headers)
  - [单元格模板](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#settingtemplatesforcells) ->
  [为单元格应用模板](guides/configuration.md#applying-templates-to-cells)
- 过滤：[操作过滤器](https://docs.dhtmlx.com/pivot/1-5/guides__using_filters.html) -> [数据过滤](guides/working-with-data.md#filtering-data)
