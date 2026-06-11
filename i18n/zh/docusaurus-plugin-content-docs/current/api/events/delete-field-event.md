---
sidebar_label: delete-field
title: delete-field 事件
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 delete-field 事件。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# delete-field

### 描述 {#description}

@short: 移除字段时触发

### 用法 {#usage}

~~~jsx
"delete-field": ({
    area: string,
    id: string | number
}) => boolean | void;
~~~

### 参数 {#parameters}

该操作的回调函数接收一个包含以下参数的对象：

- `area` - （必填）移除字段所在区域的名称，可以是 "rows"、"columns" 或 "values" 区域
- `id` - （必填）被移除字段的 id

:::info
处理内部事件可使用 [Event Bus 方法](api/overview/internal-eventbus-overview.md)
:::

### 示例 {#example}

在以下示例中，`delete-field` 操作通过 [`api.exec()`](api/internal/exec-method.md) 方法触发。最后一个字段将从 **values** 区域中移除。[`api.getState()`](api/internal/getstate-method.md) 方法用于获取 Pivot [`config`](api/config/config-property.md) 的当前状态。点击按钮将触发该操作。

~~~jsx {31-34}
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

//调用 API 方法：从 config 的 values 中移除指定值
function removeLastField() {
    if (table.api) {
        const state = table.api.getState();
        const config = state.config;

        const count = config.values.length;

        if (count) {
            const lastValue = config.values[count - 1];

            table.api.exec("delete-field", {
                area: "values",
                id: lastValue.id, // 自动生成的 config.values 中条目的 ID
            });
        }
    }
}

const button = document.createElement("button");

button.addEventListener("click", removeLastField);
button.textContent = "Remove";

document.body.appendChild(button);
~~~
