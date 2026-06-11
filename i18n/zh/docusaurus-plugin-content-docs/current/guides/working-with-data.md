---
sidebar_label: 数据处理
title: 数据处理
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解如何处理数据。浏览开发指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# 数据处理

本页介绍如何在 Pivot 中对数据进行聚合、格式化、排序、筛选和预处理。有关加载和导出数据的说明，请参阅[加载数据](guides/loading-data.md)和[导出数据](guides/exporting-data.md)。

## 定义字段 {#define-fields}

使用 [`fields`](api/config/fields-property.md) 属性声明 Pivot 可放置在行、列和值中的字段。`fields` 数组中的每个条目描述一个字段——其 ID、标签和数据类型。

以下代码片段使用五个字段初始化 Pivot：

~~~jsx
const table = new pivot.Pivot("#root", {
    fields: [
        { id: "year", label: "Year", type: "number" },
        { id: "continent", label: "Continent", type: "text" },
        { id: "form", label: "Form", type: "text" },
        { id: "oil", label: "Oil", type: "number" },
        { id: "balance", label: "Balance", type: "number" }
    ],
    data,
    config: {...}
});
~~~

## 为字段应用格式 {#applying-formats-to-fields}

Pivot 根据当前语言环境对数字和日期字段应用默认格式。详情请参阅[日期格式化](guides/localization.md#date-formatting)和[数字格式化](guides/localization.md#number-formatting)。

要覆盖特定字段的默认格式，请设置 [`fields`](api/config/fields-property.md) 属性的 `format` 参数。

### 格式化数字字段 {#format-numeric-fields}

使用 `prefix` 和 `suffix` 在数值前后添加文本，并使用 `maximumFractionDigits` 控制小数精度。例如，要将 `12.345` 渲染为 `"12.35 EUR"`，请将 suffix 设置为 `" EUR"`，并将 `maximumFractionDigits` 设置为 `2`：

~~~js
const fields = [
     { id: "sales", type: "number", format: { suffix: " EUR", maximumFractionDigits: 2 } },
];
~~~

默认格式将数字字段限制为 3 位小数，并对整数部分应用分组分隔符。要完全禁用格式化，请将 `format` 设置为 `false`：

~~~js
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

以下示例将 `marketing`、`profit` 和 `sales` 标记为带有 `$` 前缀和固定 2 位小数的货币字段：

~~~jsx
// 使用预定义数据集和字段初始化 Pivot
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            { field: "marketing", method: "sum" },
            // other values

        ],
    },
    fields:[
        // 自定义格式
        { id: "marketing", label: "Marketing", type:"number", format:{
                prefix: "$", minimumFractionDigits: 2, maximumFractionDigits: 2 }
        }
    ]
});
~~~

### 格式化日期字段 {#format-date-fields}

要覆盖单个字段的全局 `dateFormat`，请将 [`fields`](api/config/fields-property.md) 的 `format` 参数设置为日期格式字符串。

以下代码片段将 `"%M %d, %Y"` 设置为 `date` 字段的格式：

~~~jsx
const fields = [
     { id: "date",  type: "date",  format: "%M %d, %Y" },
];
~~~

以下示例将字符串日期转换为 `Date` 对象，然后使用格式 `"%d %M %Y %H:%i"` 初始化 `date` 字段的 Pivot。字段值渲染为诸如 `"24 April 2025 14:30"` 的标签。

~~~jsx
// 将日期字符串转换为 Date 对象
const dateFields = fields.filter(f => f.type === "date");
dataset.forEach(item => {
    dateFields.forEach(f => {
        const v = item[f.id];
        if (typeof v === "string") {
            item[f.id] = new Date(v);
        }
    });
});

// 使用字段特定日期格式初始化 Pivot
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state"],
        columns: ["product_type"],
        values: [
            { field: "date", method: "min" },
            { field: "profit", method: "sum" },
            { field: "sales", method: "sum" }
        ]
    },
    fields:[
        // 自定义格式：日 月 年 时:分
        { id: "date", label: "Date", type: "date", format: "%d %M %Y %H:%i" }
    ]
});
~~~

:::note
对于 `xlsx` 导出格式，Pivot 以原始值导出日期和数字字段，并使用其默认格式（或通过 [`fields`](api/config/fields-property.md) 属性定义的格式）。如果为某个字段定义了模板（参见 [`tableShape`](api/config/tableshape-property.md) 属性），Pivot 将导出该模板生成的渲染值。如果同时设置了 `template` 和 `format`，则模板优先于格式。
:::

## 定义 Pivot 结构 {#define-pivot-structure}

使用 [`config`](api/config/config-property.md) 属性声明哪些字段作为行、列和聚合值显示，以及如何筛选数据。`config` 属性没有预定义值——您必须设置它才能渲染任何数据。完整参数列表请参阅 [`config`](api/config/config-property.md) 参考。

以下代码片段将 `continent` 和 `name` 放在行中，`year` 放在列中，三个聚合放在值中，并对 `name` 添加筛选器：

~~~jsx {4-18}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ]
    },
    fields,
    filters: {
        name: {
            contains: "B"
        }
    }
});
~~~

## 排序数据 {#sorting-data}

Pivot 在聚合期间支持在所有三个区域（值、列、行）中进行排序。在 UI 中，用户单击列标题进行排序。

要设置默认排序，请使用 [`fields`](api/config/fields-property.md) 属性的 `sort` 参数。该参数接受 `"asc"`、`"desc"` 或自定义比较函数。

以下示例在 Pivot 上方渲染可单击的字段标签，并在单击时切换排序方向：

~~~jsx
const bar = document.getElementById("bar");

let sorted = ["studio", "genre"];
setFields();
bar.addEventListener('click', (e) => switchSort(e.target.id), false);

function setFields(){
    let html = "";
    let sortedFields = fields.filter(f => (sorted.indexOf(f.id) != -1));

    sortedFields.forEach((f) =>{
        const order = f.sort || "asc";
        html += `<div class="field" id="${f.id}">
                    ${f.label}<i class="icon wxi-${order}" ></i>
                </div>`;
    });
    bar.innerHTML = html;
}

function switchSort(id){
    fields.forEach(f => {
        if(f.id == id){
             f.sort =  f.sort != "desc" ? "desc" : "asc";
        }
    });
    // 更新 Pivot 字段
    table.setConfig({ fields }); 
    // 刷新图标
    setFields(bar, fields);
}

const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: [
            "studio",
            "genre"
        ],
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
~~~

UI 中的排序默认启用。要禁用它，请将 [`columnShape`](api/config/columnshape-property.md) 属性的 `sort` 参数设置为 `false`。

以下代码片段禁用 UI 排序：

~~~jsx {19}
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
        sort: false 
    }
});
~~~

## 筛选数据 {#filtering-data}

Pivot 支持与字段数据类型绑定的筛选器。可以在初始化后通过 Pivot UI 设置筛选器，也可以通过 [`config`](api/config/config-property.md) 属性的 `filters` 对象以声明方式设置。

在 UI 中，筛选器以每个字段的下拉列表形式显示。

#### 筛选器类型 {#filter-types}

Pivot 支持按数据类型划分的以下筛选条件：

- 文本字段 — `equal`、`notEqual`、`contains`、`notContains`、`beginsWith`、`notBeginsWith`、`endsWith`、`notEndsWith`、`includes`
- 数字字段 — `equal`、`notEqual`、`greater`、`greaterOrEqual`、`less`、`lessOrEqual`、`contains`、`notContains`、`beginsWith`、`notBeginsWith`、`endsWith`、`notEndsWith`
- 日期字段 — `equal`、`notEqual`、`greater`、`greaterOrEqual`、`less`、`lessOrEqual`、`between`、`notBetween`、`includes`

`includes` 规则将筛选器限制为一组特定的允许值。

#### 添加筛选器 {#add-a-filter}

要声明筛选器，请将 `filters` 对象添加到 [`config`](api/config/config-property.md) 属性中，以字段 ID 为键。每个值是一个筛选条件对象。

以下代码片段应用两个筛选器——一个针对 `genre`（包含 `"D"` 的值，限制为 `"Drama"`），一个针对 `title`（包含 `"A"` 的值）：

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ],
        filters: {
            genre: {
                contains: "D",
                includes: ["Drama"]
            },
            title: {
                // 另一个字段（"title"）的筛选器
                contains: "A"
            }
        }
    }
});
~~~

:::info
要通过 Table widget API 筛选数据，请使用 [`getTable`](api/methods/gettable-method.md) 方法访问 Table 实例，并使用 [`filter-rows`](api/table/filter-rows.md) 事件。
:::

## 限制加载的数据 {#limiting-loaded-data}

为防止组件在非常大的数据集上挂起，请使用 [`limits`](api/config/limits-property.md) 属性限制最终数据集中的行数和列数。Pivot 在达到限制后中断渲染。默认上限为行 10000、列 5000。

:::note
限制适用于大型数据集。这些数值是近似值——Pivot 不保证精确的行/列数量。
:::

以下代码片段将数据集限制为 10 行和 3 列：

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio"],
        columns: ["genre"],
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
    limits: { rows: 10, columns: 3 }
});
~~~

## 应用数学方法 {#applying-maths-methods}

### 默认方法 {#default-methods}

Pivot 包含以下内置聚合方法：

- `sum`（仅限数值）— 对所有选定值求和；忽略空单元格、`TRUE` 等逻辑值和文本
- `min`（数值和日期值）— 返回最小值；忽略空单元格、逻辑值和文本。如果输入不包含数字，则返回 `0`
- `max`（数值和日期值）— 返回最大值；忽略空单元格、逻辑值和文本。如果输入不包含数字，则返回 `0`
- `count`（数值、文本和日期值）— 计算非空白单元格数量；这是分配给每个新添加字段的默认方法
- `countunique`（数值和文本值）— 计算输入中唯一值的数量
- `average`（仅限数值）— 计算输入的算术平均值；忽略空单元格、逻辑值和文本。包含值为零的单元格
- `counta`（数值、文本和日期值）— 计算所有非空白值，包括数字、日期和文本
- `median`（仅限数值）— 返回输入的中位数
- `product`（仅限数值）— 返回输入中所有数字的乘积
- `stdev`（仅限数值）— 标准差，将输入视为较大集合的样本
- `stdevp`（仅限数值）— 标准差，将输入视为整体总体
- `var`（仅限数值）— 方差，将输入视为较大集合的样本
- `varp`（仅限数值）— 方差，将输入视为整体总体

以下代码片段显示内置方法定义：

~~~jsx
const defaultMethods = {
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

通过 [`config`](api/config/config-property.md) 属性的 `values` 参数应用默认方法。请参阅[定义值](#options-for-defining-values)。

以下代码片段将 `count` 分配给 `title` 字段，将 `max` 分配给 `score` 字段：

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                // 字段 id
                field: "title",
                // 方法
                method: "count"
            },
            {
                id: "score",
                method: "max"
            }
        ]
    }
});
~~~

### 定义值 {#options-for-defining-values}

`values` 中的每个条目可以用以下两种等效形式之一定义：

- 形如 `"operation(fieldID)"` 的字符串
- 对象 `{ field: string, method: string }`（两个字段均为必填）

以下代码片段在同一个 `values` 数组中使用了两种形式：

~~~jsx
values: [
    "sum(sales)", // 选项一
    { field: "sales", method: "sum" } // 选项二
]
~~~

### 覆盖默认方法 {#override-the-default-method}

对于每个新添加的字段，Pivot 会分配该数据类型的第一个可用方法。要更改此行为，请使用 [`api.intercept`](api/internal/intercept-method.md) 方法拦截 `add-field` 事件。

以下示例拦截 `add-field` 事件，并在添加数字字段时强制使用 `max` 方法：

~~~jsx {20-27}
const table = new pivot.Pivot("#root", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },
});
// 覆盖新添加的数字字段的默认方法
table.api.intercept("add-field", (ev) => {
  const { fields } = table.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "max";
  }
});
~~~

### 添加自定义数学方法 {#add-custom-math-methods}

要添加自定义聚合方法，请使用 [`methods`](api/config/methods-property.md) 属性。每个条目将方法名（键）与包含 `handler` 函数和元数据的配置对象配对。`handler` 接受一个值数组并返回单个聚合值。

以下示例添加了两个特定于日期的方法。`countunique_date` 通过数字时间戳计算不同日期数量。`average_date` 通过平均时间戳返回平均日期：

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
        label: "CountUnique",
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

## 使用谓词处理数据 {#processing-data-with-predicates}

谓词是预处理函数，在 Pivot 将原始字段数据用于行或列之前对其进行转换。例如，谓词可以在聚合之前按月对日期进行分组。

以下代码片段显示 Pivot 默认应用的内置日期谓词：

~~~jsx
const defaultPredicates = {
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

要添加自定义谓词，请配置 [`predicates`](api/config/predicates-property.md) 属性。每个条目将谓词 ID（键）与配置对象配对：

- `type` — 此谓词接受的字段类型（`"number"`、`"date"`、`"text"` 或数组）
- `label` — 在行/列的 GUI 下拉列表中显示的谓词标签
- `handler` — 转换值并返回处理结果的函数
- `template` — 可选函数，控制处理后值的显示方式
- `field` — 可选函数，将谓词限制为特定字段
- `filter` — 可选筛选器配置，当筛选器类型应与 `type` 不同，或数据格式应与 `template` 不同时使用

要使用自定义谓词，请将其 ID 设置为应应用谓词的行或列的 `method`。

以下代码片段注册两个自定义谓词（`monthYear` 和 `profitSign`），并在 `columns` 配置中应用它们：

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

## 添加包含汇总值的列和行 {#add-columns-and-rows-with-total-values}

使用 [`tableShape`](api/config/tableshape-property.md) 属性在右侧渲染汇总列（`totalColumn: true`）或汇总页脚行（`totalRow: true`）。

以下代码片段同时启用汇总列和汇总行：

~~~jsx {2-5}
const table = new pivot.Pivot("#root", {
    tableShape: {
        totalRow: true,
        totalColumn: true
    },
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["type"],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            }
        ]
    }
});
~~~

## 示例 {#example}

以下代码片段应用了自定义数学运算：

<iframe src="https://snippet.dhtmlx.com/lv90d8q2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**相关示例**：

- [Pivot 2. 带别名的数据集](https://snippet.dhtmlx.com/7vc68rqd)
- [Pivot 2. 定义字段格式](https://snippet.dhtmlx.com/77nc4j8v)
- [Pivot 2. 外部筛选器](https://snippet.dhtmlx.com/s7tc9g4z)
- [Pivot 2. 列和行的总计](https://snippet.dhtmlx.com/f0ag0t9t)
