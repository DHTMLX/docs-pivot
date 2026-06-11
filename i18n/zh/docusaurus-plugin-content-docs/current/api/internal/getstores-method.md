---
sidebar_label: api.getStores()
title: getStores 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 getStores 方法。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# api.getStores()

### 描述 {#description}

@short: 获取包含 Pivot 的 DataStore 属性的对象

### 用法 {#usage}

~~~jsx
api.getStores(): object;
~~~

### 返回值 {#returns}

该方法返回一个包含 **DataStore** 参数的对象：

~~~jsx
{
    data: DataStore // （参数对象）
}
~~~

### 示例 {#example}

~~~jsx {21-22}
// 创建 Pivot
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
            }
        ]
    }
});

const stores = table.api.getStores();
console.log("DataStore:", stores);
~~~
