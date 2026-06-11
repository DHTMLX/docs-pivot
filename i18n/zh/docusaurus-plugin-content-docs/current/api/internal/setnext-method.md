---
sidebar_label: api.setNext()
title: setNext 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 setNext 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# api.setNext()

### 描述 {#description}

@short: 用于将某个操作添加到 Event Bus 的执行顺序中

### 用法 {#usage}

~~~jsx
api.setNext(next: any): void;
~~~

### 参数 {#parameters}

- `next` - （必填）要加入 **Event Bus** 执行顺序的操作

### 示例 {#example}

以下示例展示了如何使用 `api.setNext()` 方法将自定义类集成到 Event Bus 的执行顺序中：

~~~jsx {13-14}
const table = new pivot.Pivot("#root", { fields: [], data: [] });
const server = "https://some-backend-url";

// 假设您有一个名为 someServerService 的自定义服务器服务类
const someServerService = new ServerDataService(server);

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({ data, fields });
    
    // 将 serverDataService 集成到 widget 的 Event Bus 执行顺序中
    table.api.setNext(someServerService);
});
~~~

**相关文章**：[`setConfig`](api/methods/setconfig-method.md)
