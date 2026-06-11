---
sidebar_label: locale
title: locale 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 locale 配置项的相关信息。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 免费 30 天评估版本。
---

# locale

### 描述 {#description}

@short: 可选。Pivot 自定义语言包对象

### 用法 {#usage}

~~~jsx
locale?: object;
~~~

### 默认配置 {#default-config}

默认情况下，Pivot 使用[英语](guides/localization.md#default-locale)语言包。您也可以将其设置为自定义语言包。

:::tip
如需动态切换当前语言包，可以使用 Pivot 的 [`setLocale()`](api/methods/setlocale-method.md) 方法
:::

### 示例 {#example}

~~~jsx {19}
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
    },

    locale: pivot.locales.cn, // 初始将设置 "cn" 语言包
    // 其他参数
});
~~~
