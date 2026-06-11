---
sidebar_label: open-filter
title: open-filter 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 open-filter 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# open-filter

### 描述 {#description}

@short: 当字段的过滤器被激活时触发

### 用法 {#usage}

~~~jsx
"open-filter": ({
    id: string | null,
    area?: "values" | "rows" | "columns"
}) => boolean | void;
~~~

### 参数 {#parameters}

该操作的回调函数接受以下参数：

- `area` - 字段所在的区域（"rows"、"columns"、"values"）
- `id` - 字段的 id；如果只传入一个值为 null 的 `id` 参数，则过滤器将被关闭。

:::info
如需处理内部事件，可以使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

### 返回值 {#returns}

该函数可以返回布尔值或 void。当返回 **false** 时，相应的事件操作将被中止。

### 示例 {#example}

以下示例展示了如何在关闭过滤框时隐藏配置面板：

~~~jsx {20-27}
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
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

table.api.on("open-filter", (ev) => {
    if(!ev.id) {
        table.api.exec("show-config-panel", {
            mode: false
        });
    }    
});
~~~

以下示例将激活过滤器的字段 id 输出到控制台：

~~~jsx {20-22}
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

table.api.on("open-filter", (ev) => {
    console.log("The field id for which filter is activated:", ev.id);
});
~~~
