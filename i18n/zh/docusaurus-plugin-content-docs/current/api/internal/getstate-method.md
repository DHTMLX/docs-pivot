---
sidebar_label: api.getState()
title: getState 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 getState 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# api.getState()

### 描述 {#description}

@short: 获取包含 Pivot 的 StateStore 属性的对象

### 用法 {#usage}

~~~jsx
api.getState(): object;
~~~

### 返回值 {#returns}

该方法返回一个包含以下参数的对象：

~~~jsx
{
    config: {}, // 当前配置（rows、columns、values、filters）
    activeFilter: {}, // 活动过滤器对象（如果有过滤器处于打开状态）
    columnShape: {}, // 透视列配置
    data: [], // 源数据
    fields: [], // 字段数组
    filters: {}, // 过滤规则
    headerShape: {}, // 表头设置
    predicates: {}, // 各字段可用的断言
    limits: {}, // 数据集中行和列数量的最大限制
    methods: {}, // 数据聚合方法
    tableShape: {}, // 表格设置（尺寸、合计行、模板）
    tableConfig: {}, // 表格配置设置（列、数据、尺寸、树形模式、页脚）
    configPanel: boolean, // 配置面板的可见状态
    readonly: boolean, // 是否启用只读模式
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

const { config } = table.api.getState();
console.log(config); //将 config 状态输出到控制台
~~~
