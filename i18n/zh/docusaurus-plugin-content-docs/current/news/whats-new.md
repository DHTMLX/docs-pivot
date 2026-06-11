---
sidebar_label: 最新动态
title: 最新动态
description: 您可以在 DHTMLX JavaScript UI 库的文档中查阅 DHTMLX Pivot 的最新功能和版本发布历史。浏览开发者指南和 API 参考，体验代码示例与在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# 最新动态 {#whats-new}

如果您正从旧版本升级 Pivot，请查阅[迁移到新版本](news/migration.md)了解详情。

## 版本 2.1.1 {#version-211}

发布于 2026 年 6 月 10 日

### 修复 {#fixes}

- 当对包含缺失或空值的数据集应用行过滤器时，出现 "getMonth" 错误

## 版本 2.1 {#version-21}

发布于 2025 年 5 月 6 日

### 新功能 {#new-functionality}

- [支持从右侧冻结列](guides/configuration.md#freezing-columns-on-the-right)
- 数值的[默认对齐方式](guides/stylization.md#specific-css-classes)和[基于语言环境的格式化](guides/localization.md#number-formatting)
- 通过添加到 [`fields`](api/config/fields-property.md) 属性的 `format` 参数，[支持自定义数字格式](guides/working-with-data.md#applying-formats-to-fields)（适用于日期和数值字段）
- 通过 [`tableShape`](api/config/tableshape-property.md) 和 [`headerShape`](api/config/headershape-property.md) 属性的 `cellStyle` 参数，[支持设置表头和表格单元格的样式](guides/stylization.md#cell-style)
- 支持通过 [`pivot.template`](api/helpers/template.md) 辅助函数向表头和表格单元格插入 HTML 内容，方法是将模板定义为表头和列对象的 `cell` 属性（通过拦截 [render-table](api/events/render-table-event.md) 事件自定义表格）
- [Excel 和 CSV 导出设置增强](guides/exporting-data.md)：
  - 对于 "xlsx" 格式，日期和数字字段将以原始值导出，使用默认格式或通过 [`fields`](api/config/fields-property.md) 属性定义的格式
  - 支持定义文件名和工作表名称，并可从导出文件中排除表头/表尾
  - 支持为导出的单元格添加样式和模板
- [支持通过外部输入过滤数据](api/table/filter-rows.md)
- 单元格导航的视觉边框
- [与框架集成](/category/integration-with-frameworks)

### 新增 API {#new-api}

- [`tableShape`](api/config/tableshape-property.md) 中 `split` 对象的 `right` 设置
- [`tableShape`](api/config/tableshape-property.md) 和 [`headerShape`](api/config/headershape-property.md) 属性中的 `cellStyle` 设置
- [`fields`](api/config/fields-property.md) 数组中的 `format` 设置
- 内部 Table 的 [`filter-rows`](api/table/filter-rows.md) 事件
- 用于定义表格单元格 HTML 内容的 [`pivot.template`](api/helpers/template.md)

### 修复 {#fixes-21}

- 汇总列未按正确顺序排序
- 导出时，以 0 开头的字符串值被转换为数字
- 谓词模板未应用于行/列
- 特定情况下出现 Resize observer 错误

### 破坏性变更 {#breaking-changes}

- `tableShape` 属性中 `sizes` 对象的 `colWidth` 参数已重命名为 `columnWidth`

## 版本 2.0.3 {#version-203}

发布于 2024 年 11 月 29 日

### 修复 {#fixes-203}

- 树形结构导出到 Excel/CSV 时仅包含最顶层分支
- 自动宽度列导出后在 Excel 文件中显示过窄
- 过滤器弹出窗口位置不正确
- 使用 setConfig 方法更改配置后出现行为异常
- 更精确的类型定义

## 版本 2.0.2 {#version-202}

发布于 2024 年 10 月 22 日

### 修复 {#fixes-202}

- `columnShape` 类型定义
- 正确的包内容

## 版本 2.0 {#version-20}

发布于 2024 年 8 月 26 日

请查阅[博客页面](https://dhtmlx.com/blog/)了解本次版本发布的详细介绍。

### 破坏性变更 {#breaking-change}

:::note
版本 1.5 的 API 与 API v.2.0 不兼容。
:::

有关迁移到新版本的建议，请查阅[迁移](news/migration.md)页面。

### 新功能 {#new-functionality-20}

- Pivot 2.0 在渲染和生成大型数据集方面速度更快（[示例](https://snippet.dhtmlx.com/e6qwqrys)）
- 通过 [`columnShape`](api/config/columnshape-property.md) 属性可使用以下新的列外观和行为配置功能：
  - 设置 **autowidth**，并可指定用于计算 **autoWidth** 的最大处理行数（[示例](https://snippet.dhtmlx.com/tn1yw14m)）
  - **firstOnly** 功能：在计算列宽时，每个相同数据字段仅分析一次（默认行为）
- 现在可以通过 [`headerShape`](api/config/headershape-property.md) 属性配置表头的外观和行为，包括：
  - 为表头文本应用模板（[示例](https://snippet.dhtmlx.com/g89r9ryw)）
  - 更改文本方向（[示例](https://snippet.dhtmlx.com/4qroi8ka)）
  - 使列可折叠（[示例](https://snippet.dhtmlx.com/pt2ljmcm)）
- 可通过 [`tableShape`](api/config/tableshape-property.md) 属性配置表格的外观和尺寸，支持：
  - 配置行、表头、表尾的高度：rowHeight、headerHeight、footerHeight（[调整表格尺寸](guides/configuration.md#resizing-the-table)）
  - 不仅为列生成汇总值，也可为行生成汇总值，这通过 `tableShape` 属性的 **totalColumn** 参数实现（[示例](https://snippet.dhtmlx.com/f0ag0t9t)）
  - 在表格视图中隐藏重复值（[`tableShape`](api/config/tableshape-property.md) 属性的 **cleanRows** 参数）
  - 从左侧固定列，使其在滚动时保持静止（[示例](https://snippet.dhtmlx.com/lahf729o)）
  - 展开或折叠所有行（[示例](https://snippet.dhtmlx.com/i4mi6ejn)）
- 数据聚合新增更多功能：
  - [限制加载的数据量](guides/working-with-data.md#limiting-loaded-data)
  - 支持更多[数据操作](guides/working-with-data.md#applying-maths-methods)
  - [使用谓词处理数据](guides/working-with-data.md#processing-data-with-predicates) — 为数据应用自定义预处理函数
  - [通过语言环境设置日期格式](guides/localization.md#date-formatting)
- 新增方法：[`getTable()`](api/methods/gettable-method.md)、[`setConfig()`](api/methods/setconfig-method.md)、[`setLocale()`](api/methods/setlocale-method.md)、[`showConfigPanel()`](api/methods/showconfigpanel-method.md)
- 新增事件：[`add-field`](api/events/add-field-event.md)、[`delete-field`](api/events/delete-field-event.md)、[`open-filter`](api/events/open-filter-event.md)、[`render-table`](api/events/render-table-event.md)、[`move-field`](api/events/move-field-event.md)、[`show-config-panel`](api/events/show-config-panel-event.md)、[`show-config-panel`](api/events/show-config-panel-event.md)、[`update-config`](api/events/update-config-event.md)、[`update-field`](api/events/update-field-event.md)。
