---
sidebar_label: api.getReactiveState()
title: getReactiveState 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 getReactiveState 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# api.getReactiveState()

### 描述 {#description}

@short: 获取包含 Pivot 响应式属性的对象

### 用法 {#usage}

~~~jsx
api.getReactiveState(): object;
~~~

### 返回值 {#returns}

该方法返回一个包含以下参数的对象：

~~~jsx
{
    config: {}, // 当前配置（rows、columns、values、filters）
    activeFilter: {}, // 活动过滤器对象（若有过滤器处于打开状态）
    columnShape: {}, // pivot 列配置
    data: [], // 源数据
    fields: [], // 字段数组
    filters: {}, // 过滤规则
    headerShape: {}, // 表头设置
    predicates: {}, // 各字段可用的断言
    limits: {}, // 数据集中行数和列数的最大限制
    methods: {}, // 数据聚合方法
    tableShape: {}, // 表格设置（尺寸、合计行、模板）
    tableConfig: {}, // 表格配置设置（列、数据、尺寸、树形模式、页脚）
    configPanel: boolean, // 配置面板的可见状态
    readonly: boolean, // 是否启用只读模式
}  
~~~

### 示例 {#example}

~~~jsx {21-26}
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

// 订阅响应式 config store，并在每次变更时输出日志
const state = table.api.getReactiveState();

state.config.subscribe((config) => {
    console.log("Pivot config changed. Its current state:", config);
});
~~~
