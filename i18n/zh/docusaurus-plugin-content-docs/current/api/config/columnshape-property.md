---
sidebar_label: columnShape
title: columnShape 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 columnShape 配置项。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# columnShape

### 描述 {#description}

@short: 可选。配置 Pivot 列的外观和行为

### 用法 {#usage}

~~~jsx  
columnShape?: {
    sort?: boolean,
    width?: {
        [field: string]: number
    },
    autoWidth?: {
        columns: {
            [field: string]: boolean
        },
        auto?: boolean | "header" | "data",
        maxRows?: number,
        firstOnly?: boolean
    }
};
~~~

### 参数 {#parameters}

- `sort` - （可选）若为 **true**（默认值），则在 UI 中单击列标题时启用排序；若为 **false**，则禁用排序
- `width` - （可选）定义列的宽度；该对象的每个键为字段 id，值为该列的宽度（单位：像素）
- `autoWidth` - （可选）定义如何自动计算列宽的对象。默认配置使用 20 行，宽度基于标题和数据计算，每个字段只分析一次。该对象的参数如下：
    - `columns` - （必填）一个对象，每个键为字段 id，布尔值定义是否自动计算该列的宽度
    - `auto` - （可选）若设为 **header**，则根据标题文本调整宽度；若设为 **data**，则根据内容最宽的单元格调整宽度；若设为 **true**，则同时根据标题和单元格的内容调整宽度。
    若 autowidth 设为 **false**，则使用 `width` 值，或应用 [`tableShape`](api/config/tableshape-property.md) 属性中 `columnWidth` 的值。
    - `maxRows` - （可选）用于计算 autoWidth 的处理行数
    - `firstOnly` - （可选）若设为 **true**（默认值），则对同一数据的每个字段只分析一次以计算列宽；若同一数据对应多个列（例如 *oil* 字段使用 *count* 操作，以及 *oil* 字段使用 *sum* 操作），则只分析第一列中的数据，其他列继承该宽度

## 示例 {#example}

~~~jsx {18-31}
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
    },
    columnShape: {
        autoWidth: {
            // 为这些字段计算列宽
            columns: {
                studio: true,
                genre: true,
                title: true,
                score: true
            },
            auto: true,
            // 分析所有字段
            firstOnly: false
        }
    }
});
~~~

**相关示例**：
- [Pivot 2. 自动宽度：根据内容调整列宽](https://snippet.dhtmlx.com/tn1yw14m)
- [Pivot 2. 设置列宽](https://snippet.dhtmlx.com/ceu34kkn)
