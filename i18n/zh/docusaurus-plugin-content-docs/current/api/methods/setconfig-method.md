---
sidebar_label: setConfig()
title: setConfig()
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 setConfig() 方法。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# setConfig()

### 描述 {#description}

@short: 更新 Pivot widget 的当前配置

该方法用于更新 Pivot widget 的当前配置。当需要更新 widget 的底层数据集时，此方法非常有用。该方法会保留所有之前设置的、未在 `setConfig` 调用中显式传入的选项。

### 用法 {#usage}

~~~jsx
setConfig(config: { [key:any]: any }): void;
~~~

### 参数 {#parameters}

- `config` - （必填）Pivot 配置对象。完整属性列表请参见[此处](api/overview/properties-overview.md)

:::important
该方法仅更改您传入的参数。它会销毁当前组件并初始化一个新组件。
:::

### 示例 {#example}

~~~jsx {21-41}
// 创建 Pivot
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

// 更新配置参数
table.setConfig({
    config: {
        rows: ["studio", "genre", "duration"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            },
            {
                field: "type",
                method: "count"
            }
        ]
    }
});
~~~
