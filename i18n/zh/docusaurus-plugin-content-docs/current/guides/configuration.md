---
sidebar_label: 配置
title: 配置
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解配置相关内容。浏览开发者指南和 API 参考，试用代码示例和在线演示，并下载 DHTMLX Pivot 的免费 30 天试用版本。
---

# 配置 {#configuration}

通过以下 API 配置 Pivot 表格和配置面板：

- [`config`](api/config/config-property.md) — 定义 Pivot 表格的结构及数据聚合方式
- [`render-table`](api/events/render-table-event.md) — 动态更改表格配置
- [`tableShape`](api/config/tableshape-property.md) — 配置 Pivot 表格的外观
- [`columnShape`](api/config/columnshape-property.md) — 配置列的外观和行为
- [`headerShape`](api/config/headershape-property.md) — 配置表头的外观和行为
- [`configPanel`](api/config/configpanel-property.md) — 控制配置面板的显示状态
- [`setLocale`](api/methods/setlocale-method.md) — 应用语言环境（参见[本地化](guides/localization.md)）
- [`data`](api/config/data-property.md)、[`fields`](api/config/fields-property.md) — 加载数据和字段元数据
- [`predicates`](api/config/predicates-property.md) — 在聚合前对数据进行预处理
- [`methods`](api/config/methods-property.md) — 定义自定义聚合方法
- [`limits`](api/config/limits-property.md) — 限制最终数据集中的行数和列数

有关数据操作的说明，请参见[数据操作](guides/working-with-data.md)。

您可以配置以下 Pivot 表格元素：

- 列和行
- 表头和表脚
- 单元格
- 表格尺寸

## 调整表格尺寸 {#resizing-the-table}

使用 [`tableShape`](api/config/tableshape-property.md) 属性更改行、列、表头和表脚的尺寸。

以下代码片段展示了默认尺寸：

~~~jsx
const sizes = {
    rowHeight: 34,
    headerHeight: 30,
    footerHeight: 30,
    columnWidth: 150
};
~~~

以下代码片段覆盖了默认尺寸：

~~~jsx {4-11}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    tableShape: {
        sizes: {
            rowHeight: 44,
            headerHeight: 60,
            footerHeight: 30,
            columnWidth: 170
        }
    },
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
~~~

:::info
要设置特定列的宽度，请使用 [`columnShape`](api/config/columnshape-property.md) 属性的 `width` 参数。
:::

## 自动调整列宽以适应内容 {#autosize-columns-to-content}

使用 [`columnShape`](api/config/columnshape-property.md) 属性的 `autoWidth` 参数自动计算列宽。所有 `autoWidth` 子参数均为可选项——完整说明请参见 [`columnShape`](api/config/columnshape-property.md) 参考文档。

`autoWidth` 对象接受以下参数：

- `columns` — 选择哪些字段启用自动计算宽度的对象
- `auto` — 根据表头、单元格内容或两者来调整宽度
- `maxRows` — 用于检测列尺寸所分析的数据行数（默认值：20）
- `firstOnly` — 若为 `true`（默认值），则每个字段仅分析一次。当多列基于同一字段时（例如，`oil` 对应 `count` 和 `oil` 对应 `sum`），仅分析第一列，其余列继承其宽度

以下代码片段为四个字段启用 `autoWidth` 并禁用 `firstOnly`，使每列独立进行宽度计算：

~~~jsx {18-30}
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
    },
    columnShape: {
        autoWidth: {
            // 为这些字段计算列宽
            columns: {
                studio: true,
                genre: true,
                title: true,
                score: true
            },
            // 分析所有字段
            firstOnly: false
        }
    }
});
~~~

## 为单元格应用模板 {#applying-templates-to-cells}

### 通过 tableShape 添加模板 {#add-templates-via-tableshape}

使用 [`tableShape`](api/config/tableshape-property.md) 属性的 `templates` 参数通过函数渲染单元格值。每个键为字段 ID，每个值为返回字符串的函数。基于指定字段的所有列均会应用该模板。

以下示例为 `state` 单元格应用模板，显示州的组合名称（全名加缩写）：

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
  // 其他值
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // 自定义 "state" 单元格的值
            state: v => v + ` (${states[v]})`,
        }
    },
    fields,
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // 其他值
        ],
    },
    fields,
});
~~~

### 通过 template 辅助函数添加模板 {#adding-a-template-via-the-template-helper}

要在正文单元格中插入 HTML 内容，请使用 [`pivot.template`](api/helpers/template.md) 辅助函数，并将结果赋值给列对象的 `cell` 属性。通过 [`api.intercept`](api/internal/intercept-method.md) 方法拦截 [`render-table`](api/events/render-table-event.md) 事件，在表格渲染前应用模板。

以下示例根据字段（`id`、`user_score`）为正文单元格添加图标（星形或旗帜形）：

~~~js
function cellTemplate(value, method, row, column) {
    const field = column.fields ? column.fields[row.$level] : column.field;

    if (field === "id") {
        return idTemplate(value);
    }

    if (field === "user_score") {
        return scoreTemplate(value);
    }

    return value;
}

function idTemplate(value) {
    const name = value?.toString().split("-")[0];
    return `<span class="cell-id flag-${name}"></span> ${value}`;
}

function scoreTemplate(value) {
    return `<i class="cell-score wxi-star"></i> ${value}`;
}

widget.api.intercept("render-table", ({ config: tableConfig }) => {
    tableConfig.columns = tableConfig.columns.map((c) => {
        if (c.area === "rows") {
            // 为 "rows" 区域的列单元格应用模板
            c.cell = pivot.template(({ value, method, row, column }) => cellTemplate(value, method, row, column));
        }
        return c;
    });
});
~~~

## 为表头应用模板 {#applying-templates-to-headers}

### 通过 headerShape 添加模板 {#add-templates-via-headershape}

要控制表头中的文本格式，请使用 [`headerShape`](api/config/headershape-property.md) 属性的 `template` 参数。该参数为一个函数，其：

- 接收字段标签、ID 和子标签（方法名，如有）
- 返回处理后的值

默认模板为：

~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

在没有自定义模板的情况下，`values` 区域的字段显示标签和方法（例如 `Oil(count)`），其他区域的字段显示 `label` 值。[`predicates`](api/config/predicates-property.md) 模板会覆盖 `headerShape` 模板。

以下示例将表头文本转换为小写，生成如 `profit (sum)` 的标签：

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // 表头文本的自定义模板
        template: (label, id, subLabel) => (label + (subLabel ? ` (${subLabel})` : "")).toLowerCase(),
        },
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // 其他值
        ],
    },
    fields,
});
~~~

### 通过 template 辅助函数添加模板 {#add-templates-via-the-template-helper}

要在表头单元格中插入 HTML 内容，请使用 [`pivot.template`](api/helpers/template.md) 辅助函数，并将结果赋值给表头单元格对象的 `cell` 属性。通过 [`api.intercept`](api/internal/intercept-method.md) 方法拦截 [`render-table`](api/events/render-table-event.md) 事件，在表格渲染前应用模板。

以下示例为以下位置添加图标：

- 基于字段名称的表头标签（例如，`id` 字段显示地球图标）
- 基于单元格值的列表头（根据 `status` 值显示带颜色的箭头指示符）

~~~jsx
function rowsHeaderTemplate(value, field) {
    let icon = "";
    if (field === "id") icon = "<i class='icon wxi-earth'></i>";
    if (field === "user_score") icon = "<i class='icon wxi-star'></i>";
    return `${value} ${icon}`;
}

function statusTemplate(value) {
    let icon = "";
    if (value === "Up") icon = "<i style='color:green' class='icon wxi-arrow-up'></i>";
    if (value === "Down") icon = "<i style='color:red' class='icon wxi-arrow-down'></i>";
    return `${value} ${icon}`;
}

widget.api.intercept("render-table", ({ config: tableConfig }) => {
    tableConfig.columns = tableConfig.columns.map((c) => {
        if (c.area === "rows") {
            // 为 "rows" 区域列的第一行表头应用模板
            c.header[0].cell = pivot.template(({ value, field }) => rowsHeaderTemplate(value, field));
        } else {
            // 显示 "status" 字段值的表头单元格
            const headerCell = c.header.find((h) => h.field === "status");
            if (headerCell) {
                headerCell.cell = pivot.template(({ value }) => statusTemplate(value));
            }
        }
        return c;
    });
});
~~~

## 使列可折叠 {#make-columns-collapsible}

要允许用户折叠和展开共享表头下的列，请将 [`headerShape`](api/config/headershape-property.md) 属性的 `collapsible` 参数设置为 `true`。

以下代码片段启用可折叠表头列：

~~~jsx {4-6}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    headerShape: {
        collapsible: true,
    },
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
~~~

## 冻结列 {#freezing-columns}

将列冻结在左侧或右侧，使其在表格其余部分滚动时保持可见。使用 [`tableShape`](api/config/tableshape-property.md) 属性的 `split` 参数，并将 `left` 或 `right` 设置为 `true`。

### 在左侧冻结列 {#freeze-columns-on-the-left}

当 `split.left` 为 `true` 时，冻结列数等于 [`config`](api/config/config-property.md) 属性中 `rows` 字段的数量。在树形模式下，无论 `rows` 字段数量多少，仅冻结一列。

以下代码片段在左侧冻结一列（定义了一个 `rows` 字段）：

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["genre"],
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
    tableShape: { 
        split: {left: true } 
    }
});
~~~

要设置自定义分割数量，请监听 [`render-table`](api/events/render-table-event.md) 事件并覆盖 `tableConfig.split`。请避免分割包含合并列的列。

以下代码片段在左侧冻结所有 `rows` 列以及两倍 `values` 字段数量的列：

~~~jsx {19-26}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            {
                field: "oil",
                method: "sum"
            },
            {
                field: "oil",
                method: "count"
            }
        ]
    }
});
table.api.on("render-table", ({ config: tableConfig }) => {
    const { config } = table.api.getState();

    tableConfig.split = {
        left: config.rows.length + config.values.length * 2
    };
});
~~~

### 在右侧冻结列 {#freezing-columns-on-the-right}

将 `split.right` 设置为 `true` 以在右侧冻结合计列。

以下代码片段在右侧冻结合计列：

~~~jsx {4-7}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    tableShape:{
        split: {right: true},
        totalColumn: true,
    },
    config:  {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

要在右侧冻结自定义数量的列，请监听 [`render-table`](api/events/render-table-event.md) 事件并覆盖 `tableConfig.split`。请避免分割包含合并列的列。

以下代码片段在右侧冻结与 `values` 字段数量相同的列：

~~~jsx {20-25}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    config:  {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});

widget.api.on("render-table", ({ config: tableConfig }) => {
    const { config } = widget.api.getState();
    tableConfig.split = {
        right: config.values.length,
    }
})
~~~

## 列排序 {#sort-in-columns}

UI 中的排序功能默认启用——用户单击列表头即可排序。要禁用排序，请将 [`columnShape`](api/config/columnshape-property.md) 属性的 `sort` 参数设置为 `false`。

以下代码片段禁用 UI 排序：

~~~jsx {19}
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
    },
    columnShape: {
        sort: false
    }
});
~~~

有关默认排序、自定义比较器和运行时更新的更多信息，请参见[数据排序](guides/working-with-data.md#sorting-data)。

## 启用树形模式 {#enabling-the-tree-mode}

树形模式以层级结构展示数据，行可展开折叠。将 [`tableShape`](api/config/tableshape-property.md) 属性的 `tree` 参数设置为 `true`（默认值为 `false`）。[`config`](api/config/config-property.md) 中 `rows` 数组的第一个字段成为父行。

以下代码片段以 `studio` 为父级、`genre` 为嵌套行启用树形模式：

~~~jsx {3}
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true
    },
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
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "max"
            }
        ]
    }
});
~~~

## 展开或折叠所有行 {#expandingcollapsing-all-rows}

要以编程方式展开或折叠所有行，请通过 [`tableShape`](api/config/tableshape-property.md) 属性启用树形模式。然后使用 [`getTable`](api/methods/gettable-method.md) 方法获取 Table 组件实例，并通过 Table 的 `api.exec` 方法触发 [`open-row`](api/table/open-row.md) 或 [`close-row`](api/table/close-row.md) 事件。

以下示例渲染"展开全部"和"折叠全部"按钮，在树形模式下展开或折叠所有分支：

~~~jsx
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true
    },
    fields,
    data: dataset,
    config: {
        rows: ["type", "studio"],
        columns: [],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            },
            {
                field: "episodes",
                method: "count"
            }
        ]
    }
});

const api = table.api;
const tableInstance = api.getTable();
// 渲染时保持所有表格分支关闭
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // 在此返回 false 以阻止表格渲染
    // return false;
});

function openAll() {
    tableInstance.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
    tableInstance.exec("close-row", { id: 0, nested: true });
}

const openAllButton = document.createElement("button");
openAllButton.addEventListener("click", openAll);
openAllButton.textContent = "Open all";

const closeAllButton = document.createElement("button");
closeAllButton.addEventListener("click", closeAll);
closeAllButton.textContent = "Close all";

document.body.appendChild(openAllButton);
document.body.appendChild(closeAllButton);
~~~

## 更改表头文本方向 {#change-header-text-orientation}

要将表头文本从水平方向旋转为垂直方向，请将 [`headerShape`](api/config/headershape-property.md) 属性的 `vertical` 参数设置为 `true`。

以下代码片段渲染垂直表头文本：

~~~jsx {4-6}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    headerShape: {
        vertical: true
    },
    config: {
        rows: ["studio"],
        columns: ["type"],
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
~~~

## 控制配置面板的显示状态 {#controlling-visibility-of-configuration-panel}

配置面板默认显示。用户可通过**隐藏设置** / **显示设置**按钮切换显示状态。通过 [`configPanel`](api/config/configpanel-property.md) 属性、[`show-config-panel`](api/events/show-config-panel-event.md) 事件或 [`showConfigPanel`](api/methods/showconfigpanel-method.md) 方法以编程方式控制面板。

### 隐藏配置面板 {#hide-the-configuration-panel}

要在初始化时隐藏面板，请将 [`configPanel`](api/config/configpanel-property.md) 属性设置为 `false`。

以下代码片段初始化时隐藏面板的 Pivot：

~~~jsx
// 初始化时隐藏配置面板
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    configPanel: false,
    config: {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

要在运行时切换面板，请使用 [`api.exec`](api/internal/exec-method.md) 方法触发 [`show-config-panel`](api/events/show-config-panel-event.md) 事件，并将 `mode` 参数设置为 `false`。

以下代码片段在初始化后隐藏面板：

~~~jsx {19-22}
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
// 隐藏配置面板
table.api.exec("show-config-panel", {
    mode: false
});
~~~

### 禁用默认切换功能 {#disable-the-default-toggling}

要完全阻止默认切换按钮，请使用 [`api.intercept`](api/internal/intercept-method.md) 方法拦截 [`show-config-panel`](api/events/show-config-panel-event.md) 事件并返回 `false`。

以下代码片段禁用切换按钮：

~~~jsx {20-22}
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

table.api.intercept("show-config-panel", () => {
    return false;
});
~~~

如需使用其他 API，请使用 [`showConfigPanel`](api/methods/showconfigpanel-method.md) 方法。

### 面板中的字段操作 {#actions-with-fields-in-the-panel}

配置面板支持以下字段操作：

- [`add-field`](api/events/add-field-event.md) — 将字段添加到区域
- [`delete-field`](api/events/delete-field-event.md) — 从区域移除字段
- [`update-field`](api/events/update-field-event.md) — 更新字段的方法或设置
- [`move-field`](api/events/move-field-event.md) — 在区域内对字段重新排序

**相关示例：**
- [Pivot 2. 为表格和表头单元格添加文本模板](https://snippet.dhtmlx.com/n9ylp6b2)
- [Pivot 2. 自定义冻结（固定）列（自定义数量）](https://snippet.dhtmlx.com/53erlmgp)
- [Pivot 2. 展开和折叠所有行](https://snippet.dhtmlx.com/i4mi6ejn)
- [Pivot 2. 左侧和右侧的冻结（固定）列](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. 排序](https://snippet.dhtmlx.com/j7vtief6)
