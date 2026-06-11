---
sidebar_label: apply-filter
title: apply-filter 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 apply-filter 事件。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# apply-filter

### 描述 {#description}

@short: 在筛选器被应用时触发

### 用法 {#usage}

~~~jsx
"apply-filter": ({
    rule: {} 
}) => boolean | void;
~~~

### 参数 {#parameters}

该操作的回调函数接收一个包含以下参数的对象：

- `rule` - 任意筛选器配置对象，包含如下参数：
  - `field` - （必填）要应用筛选器的字段 id
  - `filter` - （必填）筛选器类型：
    - 文本值：equal、notEqual、contains、notContains、beginsWith、notBeginsWith、endsWith、notEndsWith
    - 数值：greater、less、greaterOrEqual、lessOrEqual、equal、notEqual、contains、notContains
    - 日期类型：greater、less、greaterOrEqual、lessOrEqual、equal、notEqual、between、notBetween
  - `value` - （可选）用于筛选的值
  - `includes` - （可选）一个值数组，用于从已筛选的结果中指定要显示的值；适用于文本和日期类型的值

:::info
如需处理内部事件，可以使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

### 示例 {#example}

~~~jsx {20-23}
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
    }
});
//将应用筛选器的字段标签输出到控制台
table.api.on("apply-filter", (ev) => {
    console.log("The field to which filter was applied:", ev.rule.field);
});
~~~

**相关文章**：[api.on()](api/internal/on-method.md)
