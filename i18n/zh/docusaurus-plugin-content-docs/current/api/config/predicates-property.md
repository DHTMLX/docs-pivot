---
sidebar_label: predicates
title: predicates 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 predicates 配置项。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# predicates

### 描述 {#description}

@short: 可选。为数据维度（行、列）提供自定义预处理函数

它定义了数据在应用之前应如何被修改。

### 用法 {#usage}

~~~jsx
predicates?: {
    [key: string]: {
        handler: (value: any) => any,
        type: 'number' | 'date' | 'text' | [],
        label?: string | (type: 'number' | 'date' | 'text') => string,
        template?: (value: any, locale?: any) => string,
        field?: (value:string) => boolean,
        filter?: { 
            type: "number"|"text"|"date"|"tuple",
            format?:(any) => string
        }
    }
};
~~~

### 参数 {#parameters}

该属性是一个对象，其中键为自定义函数的名称，值为包含实际函数定义的对象。predicate 对象可包含多个键值对，所有键值对均可在 Pivot 配置中使用。每个对象具有以下参数：

- `label` - （可选）predicate 的标签，在 GUI 的下拉菜单中显示于行/列的数据修改选项里
- `type` - （必填）定义该 predicate 可应用于哪些字段类型；可为 "number"、"date"、"text" 或这些值的数组
- `field` - （可选）定义指定字段数据处理方式的函数，接收字段 id 作为参数，若该 predicate 应添加到指定字段则返回 **true**
- `filter` - （可选）默认情况下，过滤器类型取自 `type` 参数，但如需使用其他类型，可使用此 `filter` 对象。它包含以下参数：
    - `type` - （可选）定义所应用的字段类型："number"|"text"|"date"|"tuple"。"tuple" 是一种用于数值的组合过滤器（数据按数值过滤，但过滤器中显示文本值）
    - `format` - （可选）定义过滤选项显示格式的函数；若未定义 format，则使用 template 参数中的格式；若此处（`filter` 对象）未指定 type，则 format 将应用于 predicate 的 `type` 参数所设置的类型
- `handler` - （自定义 predicate 必填）定义数据处理方式的函数；该函数应接收单个参数作为待处理的值，并返回处理后的值
- `template` - （可选）定义数据显示方式的函数；该函数返回处理后的值，接收 `handler` 返回的值，必要时可使用 [`locale`](api/config/locale-property.md) 对文本值进行本地化。

若未通过 `predicates` 属性指定 predicate，则应用以下默认 predicate：

~~~jsx
const defaultPredicates = {
    // 表示原始（未处理）值的服务 predicate
    $empty: { label: (type) => `Raw ${type}`, type: ["number", "date", "text"] },
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

## 示例 {#example}

~~~jsx 
const predicates = {
    monthYear: {
        label: "Month-year",
        type: "date",
        handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1),
        template: (date, locale) => {
            const months = locale.getRaw().calendar.monthFull;
            return months[date.getMonth()] + " " + date.getFullYear();
        },
    },
    profitSign: {
        label: "Profit Sign",
        type: "number",
        filter: {
            type: "tuple",
            format: (v) => (v < 0 ? "Negative" : "Positive"),
        },
        field: (f) => f === "profit",
        handler: (v) => (v < 0 ? -1 : 1),
        template: (v) => (v < 0 ? "Negative profit" : "Positive profit"),
    },
};

// 将日期字符串转换为 Date 对象
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    predicates: { ...pivot.defaultPredicates, ...predicates },
    tableShape: { tree: true },
    config: {
        rows: ["product_type", "product"],
        columns: [
            { field: "profit", method: "profitSign" },
            { field: "date", method: "monthYear" },
        ],
        values: ["sales", "expenses"],
    },
});
~~~

**相关文章**：[使用 predicate 处理数据](guides/working-with-data.md#processing-data-with-predicates)

**相关示例**：[Pivot 2. 自定义 predicate](https://snippet.dhtmlx.com/mhymus00)
