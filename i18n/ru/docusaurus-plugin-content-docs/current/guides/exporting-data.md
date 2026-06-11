---
sidebar_label: Экспорт данных
title: Экспорт данных
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете изучить, как экспортировать данные. Просматривайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Экспорт данных {#exporting-data}

Pivot экспортирует данные таблицы в форматах XLSX или CSV через встроенный виджет Table. Получите экземпляр Table с помощью метода [`getTable`](api/methods/gettable-method.md), затем вызовите событие [`export`](api/table/export.md) через метод [`api.exec`](api/internal/exec-method.md) таблицы.

Пример ниже получает экземпляр Table и вызывает событие `export` в форматах CSV и XLSX:

~~~jsx
const widget = new pivot.Pivot("#root", { /* settings */ });

widget.getTable().exec("export", {
    options: {
        format: "csv",
        cols: ";"
    }
});

widget.getTable().exec("export", {
    options: {
        format: "xlsx",
        fileName: "My Report",
        sheetName: "Quarter 1"
    }
});
~~~

:::tip
Метод [`getTable`](api/methods/gettable-method.md) принимает необязательный булев параметр `wait`. Передайте `true`, чтобы получить промис, который разрешится после того, как АПИ Table станет доступным. Это полезно, когда АПИ Table должен быть готов в процессе инициализации Pivot.
:::

## Пример {#example}

Фрагмент ниже выполняет экспорт данных:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related articles**: 

- [Форматирование дат](guides/localization.md#date-formatting)
- [`export`](api/table/export.md)
