---
sidebar_label: 与 React 集成
title: 与 React 集成
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解与 React 的集成方式。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费试用版。
---

# 与 React 集成 {#integration-with-react}

:::tip
本文假定您已熟悉 [**React**](https://react.dev) 的基本概念和模式。如需回顾，请参阅 [**React 文档**](https://react.dev/learn)。
:::

DHTMLX Pivot 可作为普通组件与 **React** 集成。完整的示例项目请参见 [**GitHub 上的 React Pivot 演示**](https://github.com/DHTMLX/react-pivot-demo)。

## 创建项目 {#create-a-project}

:::info
开始前请先安装 [**Node.js**](https://nodejs.org/en/)。[**Vite**](https://vite.dev/) 为可选项。
:::

创建一个名为 *my-react-pivot-app* 的基础 **React** 项目（或基于 Vite 的项目）。

以下命令可引导创建一个 Create React App 项目：

~~~bash
npx create-react-app my-react-pivot-app
~~~

### 安装依赖 {#install-dependencies}

切换到新建的项目目录：

~~~bash
cd my-react-pivot-app
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

应用将运行在本地端口（例如 `http://localhost:3000`）。

## 创建 Pivot {#create-pivot}

将 Pivot 包添加到项目中，然后将 Pivot 封装在 React 组件内。

### 第一步：安装包 {#step-1-install-the-package}

下载 [**Pivot 试用包**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) 并按照 README 中的步骤操作。试用包有效期为 30 天。

### 第二步：创建组件 {#step-2-create-the-component}

创建一个用于挂载 Pivot 的 React 组件。新建文件 *src/Pivot.jsx*。

#### 导入源文件 {#import-source-files}

打开 *src/Pivot.jsx* 并导入 Pivot 源文件。导入路径取决于所使用的包版本：

- **PRO 版本**（从本地文件夹安装）：

~~~jsx title="Pivot.jsx"
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
~~~

如果包中包含压缩资源，请导入 *pivot.min.css* 而非 *pivot.css*。

- **试用版本**：

~~~jsx title="Pivot.jsx"
import { Pivot } from '@dhx/trial-pivot';
import "@dhx/trial-pivot/dist/pivot.css";
~~~

本教程使用 Pivot 的试用版本。

#### 设置容器并挂载 Pivot {#set-up-the-container-and-mount-pivot}

要在页面上显示 Pivot，需创建一个容器 `div`，然后在 `useEffect` hook 中使用构造函数初始化 Pivot。

以下代码片段定义了一个最简的 Pivot React 组件：

~~~jsx {2,6,9-10} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css"; // 引入 Pivot 样式

export default function PivotComponent(props) {
    let container = useRef(); // Pivot 的容器 ref

    useEffect(() => {
        // 初始化 Pivot 组件
        const table = new Pivot(container.current, {});

        return () => {
            table.destructor(); // 卸载时销毁 Pivot
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### 添加样式 {#add-styles}

为使 Pivot 正确渲染，请将以下样式添加到项目的主 CSS 文件中：

~~~css title="index.css"
/* 初始页面的样式 */
html,
body,
#root {
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

要向 Pivot 传入数据，需准备一个数据集。创建 *src/data.js* 并导出数据和字段元数据：

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

打开 *src/App.js*，导入数据并将其作为 props 传递给 `<Pivot/>` 组件：

~~~jsx {2,5-6} title="App.js"
import Pivot from "./Pivot";
import { getData } from "./data";

function App() {
    const { fields, dataset } = getData();
    return <Pivot fields={fields} dataset={dataset} />;
}

export default App;
~~~

打开 *src/Pivot.jsx*，对 props 进行解构，并将其应用到 Pivot 的配置对象中：

~~~jsx {5,10-11} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default function PivotComponent({ fields, dataset }) {
    let container = useRef(); 

    useEffect(() => {
        const table = new Pivot(container.current, {
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

        return () => {
            table.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

组件现已可以使用。挂载时，Pivot 将使用传入的数据进行渲染。完整的配置属性列表，请参见 [Pivot API 文档](api/overview/properties-overview.md)。

#### 处理事件 {#handle-events}

用户在 Pivot 中的操作会触发相应事件，您可以订阅这些事件。完整的事件列表，请参见[事件概览](api/overview/events-overview.md)。

以下代码片段在 `useEffect` 中扩展了一个 `open-filter` 事件监听器，当用户打开过滤器时记录字段 ID：

~~~jsx {19-21} title="Pivot.jsx"
// ...
useEffect(() => {
    const table = new Pivot(container.current, {
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
        console.log("激活过滤器的字段 id：", ev.id);
    });
    
    return () => {
        table.destructor();
    }
}, []);
// ...
~~~

启动应用，即可看到 Pivot 在页面上渲染数据。

![Pivot 初始化](../assets/trial_pivot.png)

Pivot 现已成功与 React 集成。可根据项目需求自定义配置。完整示例请参见 [**GitHub 上的 react-pivot-demo**](https://github.com/DHTMLX/react-pivot-demo)。
