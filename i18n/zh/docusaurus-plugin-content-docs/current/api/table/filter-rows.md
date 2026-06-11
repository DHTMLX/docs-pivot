---
sidebar_label: filter-rows
title: filter-rows
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 filter-rows 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本
---

# filter-rows

### 描述 {#description}

@short: 在过滤数据时触发

要触发 Table 事件，需要通过 [`getTable`](api/methods/gettable-method.md) 方法获取 Pivot 内部 Table 实例的访问权限。

### 用法 {#usage}

```jsx {}
"filter-rows": ({
    filter?: any
}) => boolean|void;
```

### 参数 {#parameters}

该动作的回调函数接收一个包含以下参数的对象：

- `filter` - （可选）任意过滤函数，对数据数组中的每个条目进行处理，并为每个条目返回 **true** 或 **false**

### 示例 {#example}

以下代码片段演示了如何根据输入值过滤表格正文中已聚合（可见）的数据：

<iframe src="https://snippet.dhtmlx.com/s7tc9g4z?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**相关文章**：[`getTable`](api/methods/gettable-method.md)
