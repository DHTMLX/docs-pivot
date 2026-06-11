---
sidebar_label: config
title: config 配置项
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解 config 配置项的相关信息。浏览开发者指南和 API 参考，查看代码示例和在线演示，并下载 DHTMLX Pivot 的 30 天免费评估版本。
---

# config

### 描述 {#description}

@short: 可选。定义 Pivot 表格的结构以及数据的聚合方式

### 用法 {#usage}

~~~jsx
config?: {
    rows?: string | {field: string, method?: string}[],
    columns?: string | {field: string, method?: string}[],
    values?: string | {field: string, method?: string}[],
    filters?: {}  
};
~~~

### 参数 {#parameters}

`config` 参数用于定义哪些字段将作为行和列，以及应对行/列应用哪些额外的数据聚合方法。

- `rows` - （可选）定义 Pivot 表格的行。默认值为空数组。可以是代表单个字段 ID 的字符串，也可以是包含字段 ID 和数据提取方法的对象；对象参数如下：
  - `field` - （必填）字段的 ID
  - `method` - （可选）定义字段数据聚合的方法；时间类数据字段默认提供以下方法："year"、"quarter"、"month"、"week"、"day"、"hour"、"minute"，分别按对应粒度对数据进行分组；此处也可添加自定义方法的名称（[参见 `predicates`](api/config/predicates-property.md)），适用于任意数据类型的字段
- `columns` - （可选）定义 Pivot 表格的列。默认为空数组。可以是单个字段 ID 的字符串，也可以是包含字段 ID 和数据提取方法的对象；对象参数如下：
  - `field` - （必填）字段的 ID
  - `method` - （可选）定义数据处理方法（适用于时间类数据字段）。
  默认情况下，**date** 类型的时间类字段支持以下方法："year"、"quarter"、"month"、"week"、"day"、"hour"、"minute"。此处也可添加自定义方法的名称（[参见 `predicates`](api/config/predicates-property.md)），适用于任意数据类型的字段
- `values` - （可选）定义 Pivot 表格单元格的数据聚合方式。默认为空数组。每个元素可以是表示数据字段 ID 和聚合方法的字符串，也可以是包含字段 ID 和数据聚合方法的对象。对象参数如下：
  - `field` - （必填）字段的 ID
  - `method` - （必填）定义数据提取方法；有关方法类型及其说明，请参阅[应用方法](guides/working-with-data.md#default-methods)

<details>

<summary><b>定义 values 的选项</b></summary>

您可以使用以下两种等效方式定义 `values`：
- 选项一：表示字段 ID 的字符串
- 选项二：包含字段 ID 和数据聚合方法的对象

### 示例 {#example-values}

~~~jsx
values: [
    "sum(sales)", // 选项一
    { field: "sales", method: "sum" }, // 选项二
]
~~~

</details>

- `filters` - （可选）定义表格中数据的筛选方式；它是一个包含字段 ID 和筛选规则的对象，默认值为空对象。对象参数如下：
  - `field` - （可选）筛选键，即字段的 ID 或带有筛选条件的 ID 数组：
    - `equal` - （可选）接受数字、字符串和 Date 值
    - `notEqual` - （可选）接受数字、字符串和 Date 值
    - `greater` - （可选）接受数字和 Date 值
    - `greaterOrEqual` - （可选）接受数字和 Date 值
    - `less` - （可选）接受数字和 Date 值
    - `lessOrEqual` - 接受数字和 Date 值
    - `between` - 包含以下参数的对象：
      - `start` - Date
      - `end` - Date
    - `notBetween` - 包含以下参数的对象：
      - `start` - Date
      - `end` - Date
    - `contains` - 接受字符串值和数字
    - `notContains` - 接受字符串值和数字
    - `beginsWith` - 接受字符串值和数字
    - `notBeginsWith` - 接受字符串值和数字
    - `endsWith` - 接受字符串值和数字
    - `notEndsWith` - 接受字符串值和数字
    - `includes` - （可选）从已筛选的值中指定要显示的值数组；适用于文本和日期值

:::info
当 config 被 Pivot 处理后，其属性会接收额外数据。如果您尝试通过 [`api.getState()`](api/internal/getstate-method.md) 方法返回 config 状态，完整对象的形式如下：

~~~jsx
interface IParsedField {
    id: string,
    field: string,
    method: string | null,
    area: 'rows'|'columns'|'values',
    base?: string,
    label: string,
    type: 'number'|'date'|'text'
}

interface IParsedConfig {
    rows: IParsedField[],
    columns: IParsedField[],
    values: IParsedField[],
    filters: {
        [field: string]: number | string | [] | 
        { [operation: string]: number | string | [] | { start:Date, end: Date} }
    }
}
~~~

参数：

- `id` - 已处理字段的唯一 id
- `field` - 字段名称
- `method` - 用于聚合的操作名称。对于行和列，method 是可选参数；若提供，则作为 predicate，定义字段数据在聚合前的预处理方式。对于 values，method 是必填参数。
- `area` - 字段所属的区域
- `base` - 用于带有 predicate 的列和行字段。定义原始字段名称，而字段名称则按照 "field_by_predicate" 的模式生成
- `label` - 文本标签
- `type` - 数据类型
:::

### 示例 {#example}

~~~jsx {4-26}
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
        ],
        filters: {
            genre: {
                contains: "D",
                includes: ["Drama"]
            },
            title: {
                // 针对另一个字段（"title"）的筛选条件
                contains: "A"
            }
        }
    }
});
~~~
