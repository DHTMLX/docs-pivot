---
sidebar_label: Конфигурация
title: Конфигурация
description: Вы можете узнать о конфигурации в документации библиотеки DHTMLX JavaScript Pivot. Просматривайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Конфигурация

Настройте таблицу Pivot и панель конфигурации с помощью следующего АПИ:

- [`config`](api/config/config-property.md) — определяет структуру таблицы Pivot и способ агрегации данных
- [`render-table`](api/events/render-table-event.md) — изменяет конфигурацию таблицы на лету
- [`tableShape`](api/config/tableshape-property.md) — настраивает внешний вид таблицы Pivot
- [`columnShape`](api/config/columnshape-property.md) — настраивает внешний вид и поведение столбцов
- [`headerShape`](api/config/headershape-property.md) — настраивает внешний вид и поведение заголовков
- [`configPanel`](api/config/configpanel-property.md) — управляет видимостью панели конфигурации
- [`setLocale`](api/methods/setlocale-method.md) — применяет локаль (см. [Локализация](guides/localization.md))
- [`data`](api/config/data-property.md), [`fields`](api/config/fields-property.md) — загружают данные и метаданные полей
- [`predicates`](api/config/predicates-property.md) — предварительно обрабатывают данные перед агрегацией
- [`methods`](api/config/methods-property.md) — определяют пользовательские методы агрегации
- [`limits`](api/config/limits-property.md) — ограничивают количество строк и столбцов в итоговом наборе данных

Инструкции по работе с данными см. в разделе [Работа с данными](guides/working-with-data.md).

Вы можете настроить следующие элементы таблицы Pivot:

- столбцы и строки
- заголовки и подвалы
- ячейки
- размеры таблицы

## Изменение размеров таблицы {#resizing-the-table}

Используйте свойство [`tableShape`](api/config/tableshape-property.md), чтобы изменить размер строк, столбцов, заголовка и подвала.

Следующий фрагмент кода показывает размеры по умолчанию:

~~~jsx
const sizes = {
    rowHeight: 34,
    headerHeight: 30,
    footerHeight: 30,
    columnWidth: 150
};
~~~

Следующий фрагмент кода переопределяет размеры по умолчанию:

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
Чтобы задать ширину конкретных столбцов, используйте параметр `width` свойства [`columnShape`](api/config/columnshape-property.md).
:::

## Автоматическое изменение ширины столбцов по содержимому

Используйте параметр `autoWidth` свойства [`columnShape`](api/config/columnshape-property.md), чтобы вычислять ширину столбцов автоматически. Все подпараметры `autoWidth` являются необязательными — полные описания см. в справочнике [`columnShape`](api/config/columnshape-property.md).

Объект `autoWidth` принимает следующие параметры:

- `columns` — объект, определяющий, для каких полей вычисляется ширина автоматически
- `auto` — подстраивает ширину под заголовок, содержимое ячейки или под оба варианта
- `maxRows` — количество строк данных, анализируемых для определения размера столбца (по умолчанию: 20)
- `firstOnly` — если `true` (по умолчанию), каждое поле анализируется только один раз. Когда несколько столбцов основаны на одном поле (например, `oil` с `count` и `oil` с `sum`), анализируется только первый столбец, а остальные наследуют его ширину

Следующий фрагмент кода включает `autoWidth` для четырёх полей и отключает `firstOnly`, чтобы каждый столбец получил собственное измерение:

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
            // вычислять ширину столбца для этих полей
            columns: {
                studio: true,
                genre: true,
                title: true,
                score: true
            },
            // анализировать все поля
            firstOnly: false
        }
    }
});
~~~

## Применение шаблонов к ячейкам {#applying-templates-to-cells}

### Добавление шаблонов через tableShape

Используйте параметр `templates` свойства [`tableShape`](api/config/tableshape-property.md), чтобы отображать значения ячеек через функцию. Каждый ключ — это идентификатор поля, а каждое значение — функция, возвращающая строку. Все столбцы, основанные на указанном поле, получают этот шаблон.

В примере ниже к ячейкам `state` применяется шаблон, который отображает объединённое название штата (полное название и аббревиатура):

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
  // другие значения
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // настроить значения ячеек "state"
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
            // другие значения
        ],
    },
    fields,
});
~~~

### Добавление шаблона через хелпер template {#adding-a-template-via-the-template-helper}

Чтобы вставить HTML-содержимое в ячейки тела таблицы, используйте хелпер [`pivot.template`](api/helpers/template.md) и присвойте результат свойству `cell` объекта столбца. Применяйте шаблон непосредственно перед отрисовкой таблицы, перехватывая событие [`render-table`](api/events/render-table-event.md) с помощью метода [`api.intercept`](api/internal/intercept-method.md).

В примере ниже в ячейки тела добавляются иконки (звезда или флаг) в зависимости от поля (`id`, `user_score`):

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
            // применить шаблон к ячейкам столбца из области "rows"
            c.cell = pivot.template(({ value, method, row, column }) => cellTemplate(value, method, row, column));
        }
        return c;
    });
});
~~~

## Применение шаблонов к заголовкам {#applying-templates-to-headers}

### Добавление шаблонов через headerShape

Чтобы управлять форматом текста в заголовках, используйте параметр `template` свойства [`headerShape`](api/config/headershape-property.md). Параметр представляет собой функцию, которая:

- принимает метку поля, его ID и подпись (название метода, если есть)
- возвращает обработанное значение

Шаблон по умолчанию:

~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

Без пользовательского шаблона поля области `values` отображают метку и метод (например, `Oil(count)`), а поля других областей отображают значение `label`. Шаблон [`predicates`](api/config/predicates-property.md) переопределяет шаблон `headerShape`.

В примере ниже текст заголовка преобразуется в нижний регистр, давая такие метки, как `profit (sum)`:

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // пользовательский шаблон для текста заголовка
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
            // другие значения
        ],
    },
    fields,
});
~~~

### Добавление шаблонов через хелпер template

Чтобы вставить HTML-содержимое в ячейки заголовков, используйте хелпер [`pivot.template`](api/helpers/template.md) и присвойте результат свойству `cell` объекта ячейки заголовка. Применяйте шаблон непосредственно перед отрисовкой таблицы, перехватывая событие [`render-table`](api/events/render-table-event.md) с помощью метода [`api.intercept`](api/internal/intercept-method.md).

В примере ниже иконки добавляются к:

- меткам заголовков на основе имени поля (например, `id` получает иконку глобуса)
- заголовкам столбцов на основе значения ячейки (цветные стрелки-индикаторы в зависимости от значения `status`)

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
            // применить шаблон к первой строке заголовка столбцов из области "rows"
            c.header[0].cell = pivot.template(({ value, field }) => rowsHeaderTemplate(value, field));
        } else {
            // ячейки заголовка, отображающие значения из поля "status"
            const headerCell = c.header.find((h) => h.field === "status");
            if (headerCell) {
                headerCell.cell = pivot.template(({ value }) => statusTemplate(value));
            }
        }
        return c;
    });
});
~~~

## Сворачиваемые столбцы

Чтобы пользователи могли сворачивать и разворачивать столбцы под общим заголовком, установите параметр `collapsible` свойства [`headerShape`](api/config/headershape-property.md) в `true`.

Следующий фрагмент кода включает сворачиваемые заголовки столбцов:

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

## Фиксация столбцов {#freezing-columns}

Зафиксируйте столбцы слева или справа, чтобы они оставались видимыми при прокрутке остальной части таблицы. Используйте параметр `split` свойства [`tableShape`](api/config/tableshape-property.md) и установите `left` или `right` в `true`.

### Фиксация столбцов слева

Когда `split.left` равно `true`, количество зафиксированных столбцов соответствует количеству полей `rows` в свойстве [`config`](api/config/config-property.md). В древовидном режиме фиксируется только один столбец независимо от количества полей `rows`.

Следующий фрагмент кода фиксирует один столбец слева (определено одно поле `rows`):

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

Чтобы задать пользовательское количество фиксированных столбцов, подпишитесь на событие [`render-table`](api/events/render-table-event.md) и переопределите `tableConfig.split`. Избегайте разделения столбцов с объединёнными ячейками (colspan).

Следующий фрагмент кода фиксирует слева все столбцы `rows` плюс удвоенное количество полей `values`:

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

### Фиксация столбцов справа {#freezing-columns-on-the-right}

Установите `split.right` в `true`, чтобы зафиксировать итоговые столбцы справа.

Следующий фрагмент кода фиксирует итоговый столбец справа:

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

Чтобы зафиксировать произвольное количество столбцов справа, подпишитесь на событие [`render-table`](api/events/render-table-event.md) и переопределите `tableConfig.split`. Избегайте разделения столбцов с объединёнными ячейками (colspan).

Следующий фрагмент кода фиксирует справа столько столбцов, сколько полей в `values`:

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

## Сортировка в столбцах

Сортировка в интерфейсе включена по умолчанию — пользователи нажимают на заголовок столбца для сортировки. Чтобы отключить её, установите параметр `sort` свойства [`columnShape`](api/config/columnshape-property.md) в `false`.

Следующий фрагмент кода отключает сортировку в интерфейсе:

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

Подробнее о сортировке по умолчанию, пользовательских компараторах и обновлениях во время выполнения см. в разделе [Сортировка данных](guides/working-with-data.md#sorting-data).

## Включение древовидного режима {#enabling-the-tree-mode}

Древовидный режим отображает данные иерархически с раскрываемыми строками. Установите параметр `tree` свойства [`tableShape`](api/config/tableshape-property.md) в `true` (по умолчанию `false`). Первое поле массива `rows` в [`config`](api/config/config-property.md) становится родительской строкой.

Следующий фрагмент кода включает древовидный режим с `studio` в качестве родителя и `genre` в качестве вложенных строк:

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

## Развёртывание и свёртывание всех строк {#expandingcollapsing-all-rows}

Чтобы программно развернуть или свернуть все строки, включите древовидный режим через свойство [`tableShape`](api/config/tableshape-property.md). Затем получите экземпляр виджета Table с помощью метода [`getTable`](api/methods/gettable-method.md) и вызовите событие [`open-row`](api/table/open-row.md) или [`close-row`](api/table/close-row.md) через метод `api.exec` таблицы.

В примере ниже отрисовываются кнопки «Открыть все» и «Закрыть все», которые разворачивают или сворачивают все ветки в древовидном режиме:

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
// держать все ветки таблицы закрытыми при отрисовке
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // вернуть false здесь, чтобы предотвратить отрисовку таблицы
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

## Изменение ориентации текста заголовков

Чтобы повернуть текст заголовков из горизонтального в вертикальное положение, установите параметр `vertical` свойства [`headerShape`](api/config/headershape-property.md) в `true`.

Следующий фрагмент кода отрисовывает вертикальный текст заголовков:

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

## Управление видимостью панели конфигурации {#controlling-visibility-of-configuration-panel}

Панель конфигурации отображается по умолчанию. Пользователи могут переключать её с помощью кнопки **Скрыть настройки** / **Показать настройки**. Управляйте панелью программно через свойство [`configPanel`](api/config/configpanel-property.md), событие [`show-config-panel`](api/events/show-config-panel-event.md) или метод [`showConfigPanel`](api/methods/showconfigpanel-method.md).

### Скрыть панель конфигурации

Чтобы скрыть панель при инициализации, установите свойство [`configPanel`](api/config/configpanel-property.md) в `false`.

Следующий фрагмент кода инициализирует Pivot со скрытой панелью:

~~~jsx
// панель конфигурации скрыта при инициализации
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

Чтобы переключить панель во время выполнения, вызовите событие [`show-config-panel`](api/events/show-config-panel-event.md) с помощью метода [`api.exec`](api/internal/exec-method.md) и установите параметр `mode` в `false`.

Следующий фрагмент кода скрывает панель после инициализации:

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
// скрыть панель конфигурации
table.api.exec("show-config-panel", {
    mode: false
});
~~~

### Отключение переключения по умолчанию

Чтобы полностью заблокировать стандартную кнопку переключения, перехватите событие [`show-config-panel`](api/events/show-config-panel-event.md) с помощью метода [`api.intercept`](api/internal/intercept-method.md) и верните `false`.

Следующий фрагмент кода отключает кнопку переключения:

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

В качестве альтернативного АПИ используйте метод [`showConfigPanel`](api/methods/showconfigpanel-method.md).

### Действия с полями на панели

Панель конфигурации поддерживает следующие операции с полями:

- [`add-field`](api/events/add-field-event.md) — добавить поле в область
- [`delete-field`](api/events/delete-field-event.md) — удалить поле из области
- [`update-field`](api/events/update-field-event.md) — обновить метод или настройки поля
- [`move-field`](api/events/move-field-event.md) — изменить порядок полей внутри области

**Связанные примеры**:
- [Pivot 2. Добавление текстовых шаблонов для ячеек таблицы и заголовков](https://snippet.dhtmlx.com/n9ylp6b2)
- [Pivot 2. Пользовательские фиксированные столбцы (произвольное количество)](https://snippet.dhtmlx.com/53erlmgp)
- [Pivot 2. Развёртывание и свёртывание всех строк](https://snippet.dhtmlx.com/i4mi6ejn)
- [Pivot 2. Фиксированные столбцы слева и справа](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. Сортировка](https://snippet.dhtmlx.com/j7vtief6)
