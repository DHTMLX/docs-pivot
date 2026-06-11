---
sidebar_label: getTable()
title: getTable 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 getTable 方法。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载免费的 30 天评估版 DHTMLX Pivot。
---

# getTable()

### 描述 {#description}

@short: 获取对 Pivot 表格中底层 Table widget 实例的访问权限

此方法用于访问 Pivot 中底层的 Table widget 实例。它提供对 Table 功能的直接访问，支持数据序列化和以各种格式导出等操作。Table API 拥有自己的 `api.exec()` 方法，可以调用 [`open-row`](api/table/open-row.md)、[`close-row`](api/table/close-row.md)、[`export`](api/table/export.md) 和 [`filter-rows`](api/table/filter-rows.md) 事件。

### 用法 {#usage}

~~~jsx
getTable(wait:boolean): Table | Promise;
~~~

### 参数 {#parameters}

`wait` - 定义是否等待 Table API 在 Pivot 中就绪（当 Table API 在 Pivot 初始化期间使用时为必需）。如果值设置为 **true**，该方法将返回一个包含 Table API 的 promise。

### 示例 {#example}

在下面的示例中，我们通过 [`api.exec()`](api/internal/exec-method.md) 方法获取 Table widget API 的访问权限，并在点击按钮时触发 Table 的 `export` 事件。

~~~jsx
// 创建 Pivot
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});

// 访问 table 实例
let table_instance = table.getTable();

function toCSV() {
    table_instance.exec("export", {
        options: {
            format: "csv",
            cols: ";"
        }
    });
}

const exportButton = document.createElement("button");

exportButton.addEventListener("click", toCSV);
exportButton.textContent = "Export";

document.body.appendChild(exportButton);
~~~

**相关文章：**

- [`close-row`](api/table/close-row.md)
- [`export`](api/table/export.md)
- [`filter-rows`](api/table/filter-rows.md)
- [`open-row`](api/table/open-row.md)
