---
sidebar_label: update-config
title: update-config 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 update-config 事件。浏览开发者指南和 API 参考文档，尝试代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# update-config

### 描述 {#description}

@short: 通过 Pivot UI 修改行、列或聚合函数时触发

该操作可用于保存用户的聚合配置，以便在下次使用 widget 时应用该配置，使用户能够从上次离开的地方继续操作。

### 用法 {#usage}

~~~jsx
"update-config": ({
    rows: string[],
    columns: string[],
    values: [],
    filters: {}
}) => boolean | void;
~~~

### 参数 {#parameters}

该操作的回调函数接收一个包含已处理的 [`config`](api/config/config-property.md) 参数的对象：

- `rows` - Pivot 表格的行。一个包含字段 ID 和数据提取方法的对象；对象参数如下：
  - `field` - 字段的 ID
  - `method` - 数据提取方法（适用于基于时间的数据字段）
- `columns` - 定义 Pivot 表格的列。一个包含字段 ID 和数据提取方法的对象；对象参数如下：
  - `field` - 字段的 ID
  - `method` - 定义数据提取方法（适用于基于时间的数据字段）。
  默认情况下，方法适用于基于时间的字段（**date** 类型），可选值为："year"、"quarter"、"month"、"week"、"day"、"hour"、"minute"
- `values` - 定义 Pivot 表格单元格的数据聚合。一个包含字段 ID 和数据聚合方法的对象，对象参数如下：
  - `field` - 字段的 ID
  - `method` - 定义数据提取方法；关于方法及可选项，请参阅[应用方法](guides/working-with-data.md#default-methods)
- `filters` - （可选）定义表格中数据的过滤方式；一个包含字段 ID 和数据聚合方法的对象。`filter` 对象的说明请参见：[`config`](api/config/config-property.md)

:::info
处理内部事件时，您可以使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

### 返回值 {#returns}

回调函数可返回布尔值或 void。
如果事件处理函数返回 *false*，则触发该事件的操作将被阻止，`update-config` 操作将停止执行。

### 示例 {#example}

~~~jsx {19-22}
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
//将 config 对象输出到控制台
table.api.on("update-config", (config) => {
    console.log("Config has changed", config);
});
~~~

**相关文章**：[api.intercept()](api/internal/intercept-method.md)
