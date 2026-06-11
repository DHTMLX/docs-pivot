---
sidebar_label: template
title: template
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 Pivot template 辅助函数。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

### 描述 {#description}

`template` 函数用于为表格的表头单元格和主体单元格应用模板。

### 用法 {#usage}

用于主体单元格：

~~~jsx
pivot.template({value, method, row, column}) => string; 
~~~

用于表头单元格：

~~~jsx
pivot.template({value, field, method, cell, column}) =>  string;
~~~

### 参数 {#parameters}

主体单元格的函数接受以下参数：

- `value` (any) - （必填）单元格原始值
- `method` (string) - （必填）用于该列的方法或谓词
- `row` - （必填）包含行数据的对象：
    - `id` (number) - （必填）行 id
    - `values` (array) - （必填）包含行数据的数组
    - `open` (boolean) - （可选）分支展开状态
    - `$level` (boolean) - （可选）分支层级索引
- `column` - （必填）包含列数据的对象：
    - `id` (number) - （必填）列的 id
    - `cell` (any) - （可选）包含单元格内容的模板（请参阅[通过 template 辅助函数添加模板](guides/configuration.md#adding-a-template-via-the-template-helper)）
    - `template` - （可选）通过 [`tableShape`](api/config/tableshape-property.md) 属性定义的模板
    - `fields` (array) - （可选）在树形模式下定义层次列中的字段，反映该列在不同层级上显示的字段
     - `field` - （可选）字段 id 字符串
    - `method` (string) - （可选）为该列中某字段定义的方法
    - `methods` (array) - （可选）定义在树形模式下应用于层次列中各字段的方法
    - `format` (string or object) - （必填）日期格式或数字格式（请参阅[为字段应用格式](guides/working-with-data.md#applying-formats-to-fields)）
    - `isNumeric` (boolean) - （可选）定义该列是否包含数值
    - `isTotal` (boolean) - （可选）定义该列是否为汇总列
    - `area` (string) - （可选）列所在的区域："rows"、"columns"、"values"
    - `header` - （可选）表头单元格数组，每个单元格具有以下属性：
        - `text` (string) - （可选）单元格文本、格式化值或经谓词模板处理后的值
        - `rowspan` (number) - （可选）表头跨越的行数
        - `colspan` (number) - （可选）表头跨越的列数
        - `value` (any) - （必填）原始值，当单元格属于 "columns" 区域时使用
        - `field` (string) - （必填）所显示值对应的字段，当单元格属于 "columns" 区域时使用
        - `method` (string) - （必填）字段谓词，当单元格属于 "columns" 区域且定义了谓词时使用
        - `format` (string or object) - 日期格式或数字格式（请参阅[为字段应用格式](guides/working-with-data.md#applying-formats-to-fields)）

表头单元格的函数参数如下：

- `value` (any) - （必填）单元格原始值
- `method` (string) - （可选）用于该列的谓词
- `field` (string) - （可选）在单元格中显示值的字段
- `cell` - （必填）包含单元格数据的对象：
    - `text` (string) - （可选）单元格文本、格式化值或经谓词模板处理后的值
    - `rowspan` (number) - （可选）表头跨越的行数
    - `colspan` (number) - （可选）表头跨越的列数
    - `value` (any) - （必填）原始值，当单元格属于 "columns" 区域时使用
    - `field` (string) - （必填）所显示值对应的字段，当单元格属于 "columns" 区域时使用
    - `method` (string) - （必填）字段谓词，当单元格属于 "columns" 区域且定义了谓词时使用
    - `format` (string or object) - （必填）日期格式或数字格式（请参阅[为字段应用格式](guides/working-with-data.md#applying-formats-to-fields)）
- `column` - （必填）包含列数据的对象（与主体单元格相同）

### 示例 {#example}

以下代码片段演示了如何通过 `pivot.template` 辅助函数定义模板。该辅助函数在表格渲染前生效，通过使用 [api.intercept()](api/internal/intercept-method.md) 方法拦截 [render-table](api/events/render-table-event.md) 事件来实现。

该代码片段展示了如何为以下内容添加图标：

- 基于字段（id、user_score）的主体单元格（模板添加旗帜和星形图标）
- 基于字段名称的表头标签（例如，若字段为 "id"，则在表头值旁添加地球图标）
- 基于值的列表头（添加彩色箭头指示器）

<iframe src="https://snippet.dhtmlx.com/4viq7cft?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>


**相关文章**：

- [`render-table`](api/events/render-table-event.md)
- [为单元格应用模板](guides/configuration.md#applying-templates-to-cells)
- [为表头应用模板](guides/configuration.md#applying-templates-to-headers)
