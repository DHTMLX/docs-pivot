---
sidebar_label: 与 Svelte 集成
title: 与 Svelte 集成
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解与 Svelte 的集成方式。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 30 天免费评估版 DHTMLX Pivot。
---

# 与 Svelte 集成 {#integration-with-svelte}

:::tip
本文假设您已熟悉 **Svelte** 的基本概念和模式。如需回顾，请参阅 [**Svelte 文档**](https://svelte.dev/)。
:::

DHTMLX Pivot 可作为普通组件与 **Svelte** 集成。完整的可运行示例请参见 [**GitHub 上的 Svelte Pivot 演示**](https://github.com/DHTMLX/svelte-pivot-demo)。

## 创建项目 {#create-a-project}

:::info
开始前请先安装 [**Node.js**](https://nodejs.org/en/)。[**Vite**](https://vite.dev/) 为可选项。
:::

以下命令将运行 Vite 项目脚手架工具，并允许您选择 Svelte 模板：

~~~bash
npm create vite@latest
~~~

将项目命名为 *my-svelte-pivot-app*。

### 安装依赖 {#install-dependencies}

切换至新建的项目目录：

~~~bash
cd my-svelte-pivot-app
~~~

使用包管理器安装依赖并启动开发服务器：

- 使用 [**yarn**](https://yarnpkg.com/)：

~~~bash
yarn 
yarn start # 或：yarn dev
~~~

- 使用 [**npm**](https://www.npmjs.com/)：

~~~bash
npm install
npm run dev
~~~

应用将在本地端口运行（例如 `http://localhost:3000`）。

## 创建 Pivot {#create-pivot}

将 Pivot 包添加到项目中，然后将 Pivot 封装为 Svelte 组件。

### 第一步：安装包 {#step-1-install-the-package}

下载 [**Pivot 试用包**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) 并按照 README 中的步骤操作。试用版 Pivot 包有效期为 30 天。

### 第二步：创建组件 {#step-2-create-the-component}

创建一个挂载 Pivot 的 Svelte 组件。新建文件 *src/Pivot.svelte*。

#### 导入源文件 {#import-source-files}

打开 *src/Pivot.svelte* 并导入 Pivot 源文件。导入路径取决于包的版本：

- **PRO 版本**（从本地文件夹安装）：

~~~html title="Pivot.svelte"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

如果包附带压缩资源，请将 *pivot.css* 替换为 *pivot.min.css*。

- **试用版本**：

~~~html title="Pivot.svelte"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

本教程使用 Pivot 的试用版本。

#### 设置容器并挂载 Pivot {#set-up-the-container-and-mount-pivot}

要在页面上显示 Pivot，请添加一个容器 `div`，然后在 `onMount` 生命周期钩子中使用构造函数初始化 Pivot，并在 `onDestroy` 钩子中销毁 Pivot。

以下代码片段定义了一个最简 Pivot Svelte 组件：

~~~html {3,6,10-11,19} title="Pivot.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Pivot } from "@dhx/trial-pivot";
    import "@dhx/trial-pivot/dist/pivot.css";

    let container; // Pivot 的容器引用
    let table;

    onMount(() => {
        // 初始化 Pivot 组件
        table = new Pivot(container, {});
    });

    onDestroy(() => {
        table.destructor(); // 卸载时销毁 Pivot
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### 添加样式 {#add-styles}

要使 Pivot 正确渲染，请将以下样式添加到项目的主 CSS 文件中：

~~~css title="main.css"
/* 初始页面的样式 */
html,
body,
#app { /* 使用 #app 根容器 */
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Pivot 容器的样式 */
.widget {
    height: 100%;
    width: 100%;
}
~~~

#### 加载数据 {#load-data}

要向 Pivot 传入数据，请准备一个数据集。创建 *src/data.js* 并导出数据和字段元数据：

~~~jsx title="data.js"
export function getData() {
    const dataset = [
        {
            "cogs": 51,
            "date": "10/1/2018",
            "inventory_margin": 503,
            "margin": 71,
            "market_size": "Major Market",
            "market": "Central",
            "marketing": 46,
            "product_line": "Leaves",
            "product_type": "Herbal Tea",
            "product": "Lemon",
            "profit": -5,
            "sales": 122,
            "state": "Colorado",
            "expenses": 76,
            "type": "Decaf"
        },
        {
            "cogs": 52,
            "date": "10/1/2018",
            "inventory_margin": 405,
            "margin": 71,
            "market_size": "Major Market",
            "market": "Central",
            "marketing": 17,
            "product_line": "Leaves",
            "product_type": "Herbal Tea",
            "product": "Mint",
            "profit": 26,
            "sales": 123,
            "state": "Colorado",
            "expenses": 45,
            "type": "Decaf"
        }, // 其他数据项
    ];

    const fields = [
        {
            "id": "cogs",
            "label": "Cogs",
            "type": "number"
        },
        {
            "id": "date",
            "label": "Date",
            "type": "date"
        }, // 其他字段
    ];

    return { dataset, fields };
};
~~~

打开 *src/App.svelte*，导入数据并将其作为 props 传递给新的 `<Pivot/>` 组件：

~~~html {3,5,8} title="App.svelte"
<script>
    import Pivot from "./Pivot.svelte";
    import { getData } from "./data.js";

    const { fields, dataset } = getData();
</script>

<Pivot fields={fields} dataset={dataset} />
~~~

打开 *src/Pivot.svelte*，使用 `export let` 声明传入的 props，并将其应用到 Pivot 配置对象中：

~~~html {6-7,14-15} title="Pivot.svelte"
<script>
import { onMount, onDestroy } from "svelte";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export let fields;
export let dataset;

let container;
let table;

onMount(() => {
    table = new Pivot(container, {
        fields,
        data: dataset,
        config: {
            rows: ["state", "product_type"],
            columns: ["product_line", "type"],
            values: [
                {
                    field: "profit",
                    method: "sum"
                }, // 其他值
            ]
        },
        // 其他配置属性
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

组件现已准备好使用。挂载时，Pivot 将使用所提供的数据进行渲染。完整的配置属性列表请参见 [Pivot API 文档](api/overview/properties-overview.md)。

#### 处理事件 {#handle-events}

用户在 Pivot 中的操作会触发可订阅的事件。完整的事件列表请参见 [事件概览](api/overview/events-overview.md)。

以下代码片段在 `onMount` 中扩展了一个 `open-filter` 事件监听器，当用户打开筛选器时记录字段 ID：

~~~html {22-24} title="Pivot.svelte"
<script>
// ...
let table;

onMount(() => {
    table = new Pivot(container, {
        fields,
        data: dataset,
        config: {
            rows: ["state", "product_type"],
            columns: ["product_line", "type"],
            values: [
                {
                    field: "profit",
                    method: "sum"
                }, // 其他值
            ]
        },
        // 其他配置属性
    });

    table.api.on("open-filter", (ev) => {
        console.log("激活筛选器的字段 id：", ev.id);
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

// ...
~~~

启动应用，即可看到 Pivot 在页面上渲染数据。

![在 Svelte 应用程序中渲染的 DHTMLX Pivot（含示例数据）](../assets/trial_pivot.png)

Pivot 现已与 Svelte 集成完成。您可以根据项目需求自定义配置。完整示例请参见 [**GitHub 上的 svelte-pivot-demo**](https://github.com/DHTMLX/svelte-pivot-demo)。
