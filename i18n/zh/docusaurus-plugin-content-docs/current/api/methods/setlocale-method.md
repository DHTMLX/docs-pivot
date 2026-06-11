---
sidebar_label: setLocale()
title: setLocale()
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 setLocale() 方法。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天评估版本。
---

# setLocale()

### 描述 {#description}

@short: 为 Pivot 应用新的语言环境

### 用法 {#usage}

~~~jsx
setLocale(null | locale?: object): void;
~~~

### 参数 {#parameters}

- `null` - （可选）重置为默认语言环境（英语）
- `locale` - （可选）要应用的新语言环境的数据对象

### 示例 {#example}

~~~jsx 
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

// 为 Pivot 应用 "de" 语言环境
table.setLocale(pivot.locales.de);

// 为 Pivot 应用默认语言环境
table.setLocale(); // 或 setLocale(null);
~~~

**相关文章**：
- [本地化](guides/localization.md)
- [`locale`](api/config/locale-property.md)
