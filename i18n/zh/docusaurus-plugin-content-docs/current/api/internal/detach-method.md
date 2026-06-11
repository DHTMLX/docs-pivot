---
sidebar_label: api.detach()
title: detach 方法
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 detach 方法。浏览开发者指南和 API 参考，尝试代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# api.detach()

## 描述 {#description}

@short: 用于移除/解绑动作处理器

## 用法 {#usage}

~~~jsx
api.detach(tag: number | string ): void;
~~~

## 参数 {#parameters}

- `tag` - 动作标签的名称

### 示例 {#example}

在下面的示例中，我们向 [`api.on()`](api/internal/on-method.md) 处理器添加一个包含 **tag** 属性的对象，然后使用 `api.detach()` 方法停止记录 [`open-filter`](api/events/open-filter-event.md) 动作。

~~~jsx {31-34}
// 创建 Pivot
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
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

// 添加处理器
if (table.api) {
    table.api.on(
        "open-filter",
        ({ area }) => {
            console.log("Opened: " + area);
        },
        { tag: "track" }
    );
}

// 解绑处理器
function stop() {
    table.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~
