---
sidebar_label: 快速入门
title: 快速入门
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解如何开始使用 DHTMLX Pivot。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载免费 30 天评估版本的 DHTMLX Pivot。
---

# 快速入门 {#how-to-start}

本清晰全面的教程将引导您完成在页面上构建完整功能 Pivot 所需的步骤。

![显示配置面板和数据表格的 DHTMLX Pivot 界面](/img/pivot-main.png)

## 步骤 1：下载并安装软件包 {#step-1-downloading-and-installing-packages}

[下载软件包](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml)并将其解压到您的项目文件夹中。

您可以使用 `yarn` 或 `npm` 包管理器将 JavaScript Pivot 导入到您的项目中。

:::info
如果您想将 Pivot 集成到 React、Angular、Svelte 或 Vue 项目中，请参阅相应的[**集成指南**](/category/integration-with-frameworks/)以获取更多信息。
:::

### 通过 npm 或 yarn 安装试用版 Pivot {#installing-trial-pivot-via-npm-or-yarn}

:::info
如果您想使用试用版 Pivot，请下载[**试用版 Pivot 软件包**](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml)并按照 *README* 文件中的步骤操作。请注意，试用版 Pivot 仅可使用 30 天。
:::

### 通过 npm 或 yarn 安装 PRO 版 Pivot {#installing-pro-pivot-via-npm-or-yarn}

:::info
您可以通过在[客户专区](https://dhtmlx.com/clients/)生成 **npm** 登录名和密码，直接访问 DHTMLX 私有 **npm**。详细的安装指南也可在该页面找到。请注意，访问私有 **npm** 仅在您的专有 Pivot 许可证有效期间可用。
:::

## 步骤 2：引入源文件 {#step-2-including-source-files}

首先创建一个 HTML 文件，将其命名为 *index.html*，然后将 Pivot 源文件引入到该文件中。

需要引入两个必要文件：

- Pivot 的 JS 文件
- Pivot 的 CSS 文件

~~~html {5-6} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Pivot</title>
        <script src="./dist/pivot.js"></script>   
        <link href="./dist/pivot.css" rel="stylesheet">
    </head>
    <body>
        <script>
        // 您的代码将写在这里
        </script>
    </body>
</html>
~~~

## 步骤 3：创建 Pivot {#step-3-creating-pivot}

现在您可以将 Pivot 添加到页面中。首先，为 Pivot 创建一个 DIV 容器。

~~~html {} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Pivot</title>
        <script src="./dist/pivot.js"></script>   
        <link href="./dist/pivot.css" rel="stylesheet">  
    </head>
    <body>
        <div id="root"></div>
        <script>
            const table = new pivot.Pivot("#root", {
                // 配置属性
            });
        </script>
    </body>
</html>
~~~

## 步骤 4：配置 Pivot {#step-4-configuring-pivot}

接下来，您可以指定 Pivot 组件在初始化时所需的配置属性。

要开始使用 Pivot，首先需要提供初始数据。以下示例创建了一个包含以下内容的 Pivot：

- *studio* 和 *genre* 的行
- *title* 列
- 使用 *max* 方法对 *score* 进行值聚合

**fields** 数组用于定义字段 ID、显示标签和数据类型。

**data** 数组应包含在 Pivot widget 中显示的实际数据，数组中的每个对象代表表格中的一行。

**config** 对象定义 Pivot 表格的结构，即哪些字段将作为表格的行和列，以及应对字段应用哪些数据聚合方法。

~~~jsx
const table = new pivot.Pivot("#root", {
    //configuration properties
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: ["title"],
        values: [
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

## 下一步 {#whats-next}

就这些。只需这几个简单步骤，您便拥有了一个便捷的数据分析工具。现在您可以开始处理自己的任务，或继续深入探索 JavaScript Pivot 的世界：

- [指南](/category/guides)页面提供有关安装、加载数据、样式设置及其他有用技巧的说明，帮助您顺畅地完成 Pivot 配置
- [API 参考](api/overview/main-overview.md)提供 Pivot 功能的详细说明
