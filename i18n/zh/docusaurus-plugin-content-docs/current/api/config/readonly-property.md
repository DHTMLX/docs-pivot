---
sidebar_label: readonly
title: readonly 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 readonly 配置项。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# readonly

### 描述 {#description}

@short: 可选。启用/禁用只读模式

在只读模式下，无法通过 UI 配置 Pivot 的结构。

### 用法 {#usage}

~~~jsx  
 readonly?: boolean;
~~~

### 参数 {#parameters}

该属性可设置为 **true** 或 **false**：

- `true` - 启用只读模式
- `false` - 默认值，禁用只读模式

## 示例 {#example}

~~~jsx {18}
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
    },
    readonly: true
});
~~~

**相关示例**： [Pivot 2. 只读模式](https://snippet.dhtmlx.com/0k0mvycv)
