---
sidebar_label: 导出数据
title: 导出数据
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解如何导出数据。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# 导出数据

Pivot 通过底层 Table widget 将表格数据导出为 XLSX 或 CSV 格式。使用 [`getTable`](api/methods/gettable-method.md) 方法获取 Table 实例，然后通过 Table 的 [`api.exec`](api/internal/exec-method.md) 方法触发 [`export`](api/table/export.md) 事件。

以下示例获取 Table 实例并以 CSV 和 XLSX 格式触发 `export` 事件：

~~~jsx
const widget = new pivot.Pivot("#root", { /* settings */ });

widget.getTable().exec("export", {
    options: {
        format: "csv",
        cols: ";"
    }
});

widget.getTable().exec("export", {
    options: {
        format: "xlsx",
        fileName: "My Report",
        sheetName: "Quarter 1"
    }
});
~~~

:::tip
[`getTable`](api/methods/gettable-method.md) 方法接受一个可选的布尔参数 `wait`。传入 `true` 可返回一个 Promise，该 Promise 在 Table API 可用后 resolve。适用于在 Pivot 初始化期间需要 Table API 就绪的场景。
:::

## 示例 {#example}

以下代码片段演示了数据导出：

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**相关文章**：

- [日期格式化](guides/localization.md#date-formatting)
- [`export`](api/table/export.md)
