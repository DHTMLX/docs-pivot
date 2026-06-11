---
sidebar_label: configPanel
title: configPanel 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 configPanel 配置项。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# configPanel

### 描述 {#description}

@short: 可选。控制 UI 中配置面板的显示状态

在 UI 中，可通过点击 **Hide Settings** 按钮来隐藏或显示该面板。

### 用法 {#usage}

~~~jsx  
configPanel?: boolean;
~~~

### 参数 {#parameters}

该属性可设置为 **true** 或 **false**：

- `true` - 默认值，显示配置面板
- `false` - 隐藏配置面板

## 示例 {#example}

~~~jsx {5}
// 初始化时隐藏配置面板
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    configPanel: false,
    config: {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

**相关示例**： [Pivot 2.0：切换配置面板的显示状态](https://snippet.dhtmlx.com/1xq1x5bo)

**相关文章**：
- [`show-config-panel` 事件](api/events/show-config-panel-event.md)
- [`showConfigPanel()` 方法](api/methods/showconfigpanel-method.md)
- [控制配置面板的显示状态](guides/configuration.md#controlling-visibility-of-configuration-panel)
