---
sidebar_label: show-config-panel
title: show-config-panel 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 show-config-panel 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 免费 30 天评估版本。
---

# show-config-panel

### 描述 {#description}

@short: 当配置面板的可见性发生变化时触发

### 用法 {#usage}

~~~jsx
"show-config-panel": ({
    mode: boolean 
}) 
~~~

### 参数 {#parameters}

该操作的回调函数接收一个包含以下参数的对象：

- `mode` - （必填）如果值设为 **true**（默认值），则显示配置面板；设为 **false** 时隐藏配置面板

:::info
处理内部事件可使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

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
//隐藏配置面板
table.api.exec("show-config-panel", {
    mode: false
});
~~~

**相关文章**：
- [`showConfigPanel()` 方法](api/methods/showconfigpanel-method.md)
- [`configPanel` 属性](api/config/configpanel-property.md)
