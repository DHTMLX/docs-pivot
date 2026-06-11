---
sidebar_label: methods
title: methods 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 methods 配置项。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# methods

### 描述 {#description}

@short: 可选。为数据聚合定义自定义数学方法

### 用法 {#usage}

~~~jsx
methods?: {
    [method: string]: {
        type?: 'number' | 'date' | 'text' | [],
        label?: string,
        handler?: (values: number[]) => number,
        branchMode?: "raw"|"result",
        branchMath?: string
    }
};
~~~

### 参数 {#parameters}

每个方法由一个键值对表示，其中 `method` 是方法的名称，值是描述该方法行为的对象。每个对象具有以下参数：

- `handler` - （自定义方法必填）一个从数字数组中计算聚合值的函数；该函数接收一个值数组作为输入，并返回单个值作为输出
- `type` - （可选）该方法适用的数据类型；可以是 "number"、"date" 或 "text"，或这些值的数组
- `label` - （可选）在 GUI 中显示的方法标签
- `branchMode` - （可选）定义树形表格中总计值的计算模式；`branchMode` 可设置为 `raw`，基于所有原始数据进行计算；`result`（默认值）在树形模式下基于已处理的数据进行计算
- `branchMath` - （可选）在树形模式下用于计算总计值的方法名称；默认与方法名称相同（对于 "max" 方法，`branchMath` 也是 "max"）

默认情况下，`methods` 属性是一个空对象 {}，表示未定义任何自定义方法。methods 对象中可定义的子属性数量没有限制。

预定义方法：

~~~jsx
defaultMethods = {
    sum: { type: "number", label: "sum" },
    min: { type: ["number", "date"], label: "min" },
    max: { type: ["number", "date"], label: "max" },
    count: {
        type: ["number", "date", "text"],
        label: "count",
        branchMath: "sum"
    },
    counta: {
        type: ["number", "date", "text"],
        label: "counta",
        branchMath: "sum"
    },
    countunique: {
        type: ["number", "text"],
        label: "countunique",
        branchMath: "sum"
    },
    average: { type: "number", label: "average", branchMode: "raw" },
    median: { type: "number", label: "median", branchMode: "raw" },
    product: { type: "number", label: "product" },
    stdev: { type: "number", label: "stdev", branchMode: "raw" },
    stdevp: { type: "number", label: "stdevp", branchMode: "raw" },
    var: { type: "number", label: "var", branchMode: "raw" },
    varp: { type: "number", label: "varp", branchMode: "raw" }
};
~~~

每个方法的定义请参见：[应用方法](guides/working-with-data.md#default-methods)

## 示例 {#example}

以下示例展示了如何为 date 类型计算唯一值计数和平均值。**countUnique** 函数接收一个数字数组（values）作为输入，并使用 **reduce** 方法计算唯一值的精确数量。**countunique_date** 子属性包含一个 handler 函数，用于从日期值数组中获取唯一值。**average_date** 子属性包含一个 handler，用于计算日期值数组的平均值。

~~~jsx
function countUnique(values, converter) {
    const valueMap = {};
    return values.reduce((acc, d) => {
        if (converter) d = converter(d);
        if (!valueMap[d]) {
            acc++;
            valueMap[d] = true;
        }
        return acc;
    }, 0);
}

const methods = {
    countunique_date: {
        handler: values => countUnique(values, v => new Date(v).getTime()),
        type: "date",
        label: "CountUnique"
    },
    average_date: {
        type: "date",
        label: "Average",
        branchMode: "raw",
        handler: values => {
            if (!values.length) return null;
            const sum = values.reduce((acc, d) => acc + d.getTime(), 0);
            const avgTime = sum / values.length;
            return new Date(avgTime);
        }
    }
};

// 对 "count" 和 "unique count" 结果显示整数
const templates = {};
fields.forEach(f => {
    if (f.type == "number")
        templates[f.id] = (v, method) =>
        v && method.indexOf("count") < 0 ? parseFloat(v).toFixed(3) : v;
});

// 将日期字符串转换为 Date 对象
const dateFields = fields.filter(f => f.type == "date");
if (dateFields.length) {
    dataset.forEach(item => {
        dateFields.forEach(f => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    tableShape: { templates },
    methods: { ...pivot.defaultMethods, ...methods },
    config:{
        rows: ["state"],
        columns: [
            "product_line",
            "product_type"
        ],
        values: [
            {
                field: "sales",
                method: "sum"
            },
            {
                field: "sales",
                method: "count"
            },
            {
                field: "date",
                method: "countunique_date"
            },
            {
                field: "date",
                method: "average_date"
            }
        ]
    }
});
~~~

**相关示例：** [Pivot 2. 自定义数学方法](https://snippet.dhtmlx.com/lv90d8q2)

**相关文章**：[应用数学方法](guides/working-with-data.md#applying-maths-methods)
