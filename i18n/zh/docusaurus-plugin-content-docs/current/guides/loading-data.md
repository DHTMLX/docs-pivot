---
sidebar_label: 加载数据
title: 加载数据
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解如何加载数据。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# 加载数据 {#loading-data}

Pivot 通过 [`data`](api/config/data-property.md) 属性接受 JSON 格式的数据。Pivot 也支持将 CSV 数据转换为 JSON 后再加载。

## 准备加载数据 {#prepare-data-for-loading}

[`data`](api/config/data-property.md) 属性接受一个对象数组，其中每个对象代表一行数据。每个对象的键定义了 Pivot 表中使用的维度和值。

以下代码片段定义了一个示例 `data` 数组：

~~~jsx
const data = [
    {
        name: "Argentina",
        year: 2015,
        continent: "South America",
        form: "Republic",
        gdp: 181.357,
        oil: 1.545,
        balance: 4.699,
        when: new Date("4/21/2015")
    },
    {
        name: "Argentina",
        year: 2017,
        continent: "South America",
        form: "Republic",
        gdp: 212.507,
        oil: 1.732,
        balance: 7.167,
        when: new Date("1/15/2017")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 260.071,
        oil: 2.845,
        balance: 6.728,
        when: new Date("6/16/2014")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 324.405,
        oil: 4.333,
        balance: 5.99,
        when: new Date("2/20/2014")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 305.763,
        oil: 2.626,
        balance: 7.544,
        when: new Date("8/17/2014")
    },
    // 其他数据
];
~~~

:::info
有关定义字段和 Pivot 结构的信息，请参阅[数据操作](guides/working-with-data.md)。
:::

## 从文件加载数据 {#load-data-from-a-file}

Pivot 在初始化后从外部文件加载 JSON 数据。请准备一个包含数据、字段和配置的源文件。

以下代码片段在单独的文件中定义了 `data`、`fields` 以及 `getData()` 访问器：

~~~jsx
function getData() {
    return {
        data,
        config: {
            rows: ["continent", "name"],
            columns: ["year"],
            values: [
                "count(oil)",
                { field: "oil", method: "sum" },
                { field: "gdp", method: "sum" }
            ],
            filters: {
                genre: {
                    contains: "D",
                    includes: ["Drama"],
                }
            }
        },
        fields
    };
}
const fields = [
    { id: "year", label: "Year", type: "number" },
    { id: "continent", label: "Continent", type: "text" },
    { id: "form", label: "Form", type: "text" },
    { id: "oil", label: "Oil", type: "number" },
    { id: "balance", label: "Balance", type: "number" }
];

const data = [
    {
        name: "Argentina",
        year: 2015,
        continent: "South America",
        form: "Republic",
        gdp: 181.357,
        oil: 1.545,
        balance: 4.699,
        when: new Date("4/21/2015")
    },
    // 其他数据
];
~~~

在页面标记中添加源数据文件的路径：

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">

<script src="./common/data.js"></script>
~~~

以下代码片段创建 Pivot 并从准备好的文件中加载数据：

~~~jsx
const { data, config, fields } = getData();
const table = new pivot.Pivot("#root", { data, config, fields });
~~~

## 从服务器加载数据 {#load-data-from-a-server}

要从服务器端点加载数据，请使用原生 `fetch` 方法（或任何等效方法）发送请求，然后将响应传递给 [`setConfig`](api/methods/setconfig-method.md)，该方法会更新 Pivot 配置并保留之前设置的选项。

以下代码片段以空数据初始化 Pivot，从服务器获取数据和字段，然后通过 `setConfig` 应用它们：

~~~jsx
const table = new pivot.Pivot("#root", { fields: [], data: [] });
const server = "https://some-backend-url";

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({ data, fields });
});
~~~

有关更多信息，请参阅以下主题：[与服务器协作](/guides/working-with-server)

## 加载 CSV 数据 {#load-csv-data}

Pivot 支持通过外部 JS 解析库将 CSV 数据转换为 JSON 后再加载。转换后的数据与原生 JSON 的行为相同。

以下示例使用外部 [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js) 库在点击按钮时加载并转换数据。`convert()` 辅助函数接受以下参数：

- `data` — 包含 CSV 数据的字符串
- `headers` — CSV 字段名称的数组
- `meta` — 将字段名称映射到数据类型的对象

以下代码片段创建 Pivot，定义 `convert()` 辅助函数，并在点击按钮时通过 [`setConfig`](api/methods/setconfig-method.md) 应用解析后的 CSV 数据：

~~~jsx
const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    config: {
        rows: [
            "studio",
            "genre"
        ],
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

function convert(data, headers, meta) {
    const header = headers.join(",") + "\n";
    const processedData = header + data;

    return Papa.parse(processedData, { 
        header: true,
        dynamicTyping: true,
        transform: (v, f) => {
            return meta && meta[f] === "date" ? new Date(v) : v;
        }
    });
}

function fromCSV() {
    const fields = [
        { id: "name", label: "Name", type: "text" },
        { id: "continent", label: "Continent", type: "text" },
        { id: "form", label: "Form", type: "text" },
        { id: "gdp", label: "GDP", type: "number" },
        { id: "oil", label: "Oil", type: "number" },
        { id: "balance", label: "Balance", type: "number" },
        { id: "year", label: "Year", type: "number" },
        { id: "when", label: "When", type: "date" }
    ];
    
    const config = {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ]
    };

    const headers = [
        "name",
        "year",
        "continent",
        "form",
        "gdp",
        "oil",
        "balance",
        "when"
    ];
  
    // 显式标记日期字段以进行正确转换
    const meta = { when: "date" };

    const dataURL = "https://some-backend-url";
    fetch(dataURL)
        .then(response => response.text())
        .then(text => convert(text, headers, meta))
        .then(data => {
        table.setConfig({
            data: data.data,
            fields,
            config
        });
    });
}

const importButton = document.createElement("button");
importButton.addEventListener("click", fromCSV);
importButton.textContent = "Import";

document.body.appendChild(importButton);
~~~

## 示例 {#example}

以下代码片段演示了如何加载 JSON 和 CSV 数据：

<iframe src="https://snippet.dhtmlx.com/wo6w9hf9?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**相关示例**：
- [Pivot 2. 日期格式](https://snippet.dhtmlx.com/shn1l794)
- [Pivot 2. 不同数据集](https://snippet.dhtmlx.com/6xtqge4i)
- [Pivot 2. 大型数据集](https://snippet.dhtmlx.com/e6qwqrys)

**相关文章**：[日期格式化](guides/localization.md#date-formatting)
