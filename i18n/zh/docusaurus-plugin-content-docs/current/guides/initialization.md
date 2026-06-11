---
sidebar_label: 初始化
title: 初始化
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解初始化相关内容。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# 初始化 {#initialization}

本指南介绍如何在页面上创建 Pivot 并为您的应用程序添加 Pivot 表格功能。请按照以下步骤完成组件的初始化：

1. [在页面中引入 Pivot 源文件](#include-source-files)。
2. [为 Pivot 创建容器](#create-a-container)。
3. [使用构造函数初始化 Pivot](#initialize-pivot)。

## 引入源文件 {#include-source-files}

Pivot 应用需要在页面中引入两个源文件。有关下载软件包的说明，请参阅[下载软件包](how-to-start.md#step-1-downloading-and-installing-packages)。

请引入以下文件：

- *pivot.js*
- *pivot.css*

设置源文件的正确相对路径：

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">
~~~

## 创建容器 {#create-a-container}

Pivot 渲染到 HTML 容器元素中。添加一个容器并为其指定 ID，例如 *"root"*：

~~~html title="index.html"
<div id="root"></div>
~~~

## 初始化 Pivot {#initialize-pivot}

`pivot.Pivot` 构造函数接受两个参数：

- HTML 容器的 ID
- 包含配置属性的对象

以下代码片段在 *"root"* 容器中创建一个 Pivot 实例，并设置初始字段、数据和结构：

~~~jsx
// 创建 Pivot
const table = new pivot.Pivot("#root", {
    // 配置属性
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

构造函数返回一个 Pivot 实例。可在返回的实例上调用以下 API 方法：

- [`getTable`](api/methods/gettable-method.md) — 获取底层 Table 组件实例
- [`setConfig`](api/methods/setconfig-method.md) — 更新当前 Pivot 配置
- [`setLocale`](api/methods/setlocale-method.md) — 为 Pivot 应用新的语言环境
- [`showConfigPanel`](api/methods/showconfigpanel-method.md) — 显示或隐藏配置面板

## 配置属性 {#configuration-properties}

Pivot 构造函数接受一个包含配置属性的对象，用于控制数据、布局和行为。

:::info
有关配置 Pivot 的完整属性列表，请参阅[属性概览](api/overview/properties-overview.md)。
:::

## 示例 {#example}

以下代码片段使用初始数据初始化 Pivot：

<iframe src="https://snippet.dhtmlx.com/y2buoahe?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
