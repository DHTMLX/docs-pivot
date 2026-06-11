---
sidebar_label: showConfigPanel()
title: showConfigPanel()
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 showConfigPanel() 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 30 天免费评估版本。
---

# showConfigPanel()

### 描述 {#description}

@short: 显示或隐藏配置面板

当需要在不依赖用户交互的情况下控制配置面板的可见性时，此方法非常有用。例如，您可以根据应用程序中的其他交互或状态来隐藏或显示该面板。

### 用法 {#usage}

~~~jsx
showConfigPanel({mode: boolean}): void;
~~~

### 参数 {#parameters}

- `mode`（boolean）—（必填）若值设置为 **true**（默认值），则显示配置面板；若值设置为 **false**，则隐藏配置面板

### 示例 {#example}

~~~jsx {21-23}
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

table.showConfigPanel ({
    mode: false
})
~~~

**相关文章**：
- [`show-config-panel` 事件](api/events/show-config-panel-event.md)
- [`configPanel` 属性](api/config/configpanel-property.md)
