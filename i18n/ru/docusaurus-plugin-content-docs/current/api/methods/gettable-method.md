---
sidebar_label: getTable()
title: Метод getTable
description: В документации по библиотеке DHTMLX JavaScript Pivot вы можете узнать о методе getTable. Изучайте руководства разработчика и справочник API, просматривайте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# getTable()

### Описание {#description}

@short: Предоставляет доступ к базовому экземпляру виджета Table в таблице Pivot

Этот метод используется, когда необходимо получить доступ к базовому экземпляру виджета Table в Pivot. Он обеспечивает прямой доступ к функциональности Table, позволяя выполнять такие операции, как сериализация данных и экспорт в различных форматах. API Table имеет собственный метод `api.exec()`, который может вызывать события [`open-row`](api/table/open-row.md), [`close-row`](api/table/close-row.md), [`export`](api/table/export.md) и [`filter-rows`](api/table/filter-rows.md).

### Использование {#usage}

~~~jsx
getTable(wait:boolean): Table | Promise;
~~~

### Параметры {#parameters}

`wait` — определяет, нужно ли ожидать, пока API Table станет доступным в Pivot (необходимо, когда API Table используется в процессе инициализации Pivot). Если значение установлено в **true**, метод возвращает промис с API Table.

### Пример {#example}

В приведённом ниже примере мы получаем доступ к API виджета Table и вызываем событие `export` Table по нажатию кнопки с помощью метода [`api.exec()`](api/internal/exec-method.md).

~~~jsx
// создание Pivot
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

// доступ к экземпляру таблицы
let table_instance = table.getTable();

function toCSV() {
    table_instance.exec("export", {
        options: {
            format: "csv",
            cols: ";"
        }
    });
}

const exportButton = document.createElement("button");

exportButton.addEventListener("click", toCSV);
exportButton.textContent = "Export";

document.body.appendChild(exportButton);
~~~

**Связанные статьи**:

- [`close-row`](api/table/close-row.md)
- [`export`](api/table/export.md)
- [`filter-rows`](api/table/filter-rows.md)
- [`open-row`](api/table/open-row.md)
