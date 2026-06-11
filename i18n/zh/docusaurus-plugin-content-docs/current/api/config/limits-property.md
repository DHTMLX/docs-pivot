---
sidebar_label: limits
title: limits 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 limits 配置项。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天试用版本。
---

# limits

### 描述 {#description}

@short: 可选。定义最终数据集中行数和列数的最大限制

另请参阅 [限制数据](guides/working-with-data.md#limiting-loaded-data)。

### 用法 {#usage}

~~~jsx
limits?: {
    rows?: number,
    columns?: number,
    raws?: number
};
~~~

### 参数 {#parameters}

以下参数定义了何时中断数据渲染：

- `rows` - （可选）设置最终数据集中的最大行数；默认值为 10000。
- `columns` - （可选）设置最终数据集中的最大列数；默认值为 5000。
- `raws` - （可选）数据分组前源数据的最大行数（用于聚合的原始数据记录）；默认值为无穷大。

:::note
limits 适用于大型数据集。limits 的值为近似值，并不反映行数和列数的精确值。
:::

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
            },
        ],
    },
    limits:{ rows: 25, columns: 4 }
});
~~~

**相关示例：** [Pivot 2. 数据限制](https://snippet.dhtmlx.com/7ryns8oe)
