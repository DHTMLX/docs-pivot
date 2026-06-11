---
sidebar_label: api.exec()
title: exec 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 exec 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# api.exec()

### 描述 {#description}

@short: 允许触发内部事件

## 用法 {#usage}

~~~jsx
api.exec(
    event: string,
    config: object
): Promise<any>;
~~~

## 参数 {#parameters}

- `event` - （必填）要触发的事件
- `config` - （必填）包含参数的配置对象（参见要触发的事件）

## 操作 {#actions}

:::info
Pivot 事件的完整列表可在[**此处**](api/overview/events-overview.md)查看
:::

## 示例 {#example}

在下面的示例中，[`delete-field`](api/events/delete-field-event.md) 事件通过 `api.exec()` 方法触发。最后一个字段将从 **values** 区域中移除。[`api.getState()`](api/internal/getstate-method.md) 方法用于获取 Pivot [`config`](api/config/config-property.md) 的当前状态。点击按钮后将触发该事件。

~~~jsx {32-35}
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

// 调用 API 方法：从 config 的 values 中移除指定值
function removeLastField() {
    if (table.api) {
        const state = table.api.getState();
        const config = state.config;

        const count = config.values.length;

        if (count) {
            const lastValue = config.values[count - 1];

            table.api.exec("delete-field", {
                area: "values",
                id: lastValue.id, // 自动生成的 config.values 中已添加项目的 ID
            });
        }
    }
}

const button = document.createElement("button");

button.addEventListener("click", removeLastField);
button.textContent = "Remove";

document.body.appendChild(button);
~~~
