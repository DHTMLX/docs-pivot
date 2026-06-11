---
sidebar_label: open-row
title: open-row
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 open-row 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 免费 30 天评估版本
---

# open-row

### 描述 {#description}

@short: 在展开行时触发

要触发 Table 事件，需要通过 [`getTable`](api/methods/gettable-method.md) 方法访问 Pivot 内部的 Table 实例。树形模式应通过 [`tableShape`](api/config/tableshape-property.md) 属性启用。

### 用法 {#usage}

```jsx {}
"open-row": ({
    id: string | number,
    nested?: boolean
}) => boolean|void;
```

### 参数 {#parameters}

该操作的回调接收一个包含以下参数的对象：

- `id` - （必填）具有嵌套行的行的 id
- `nested` - （可选）若设置为 **true**，所有嵌套项将被展开

:::note
若 `id` 设置为 0 且 `nested` 设置为 **true**，表格中所有行都将被展开
:::

### 示例 {#example}

以下代码片段演示了如何通过按钮点击展开/折叠所有行：

<iframe src="https://snippet.dhtmlx.com/i4mi6ejn?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**相关文章**： 
- [`getTable`](api/methods/gettable-method.md)
- [展开/折叠所有行](guides/configuration.md#expandingcollapsing-all-rows)
