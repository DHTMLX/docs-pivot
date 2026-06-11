---
sidebar_label: Стилизация
title: Стилизация
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о стилизации компонента. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Стилизация {#styling}

Pivot поставляется с темой оформления по умолчанию и предоставляет CSS-переменные и вспомогательные классы для кастомизации. Переопределите переменные на контейнере виджета (или любом родительском элементе), чтобы изменить цвета, рамки и другие визуальные свойства.

## Стиль по умолчанию {#default-style}

Тема по умолчанию для Pivot — **Material**. Следующий CSS-фрагмент показывает переменные, которые тема Material устанавливает на контейнере виджета:

~~~css
.wx-material-theme {
    --wx-theme-name: material;
    --wx-pivot-primary-hover: #194e9e;
    --wx-pivot-border-color: var(--wx-color-font-disabled);
    --wx-pivot-field-hover: linear-gradient(
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.1) 100%
    );
}
~~~

:::tip Примечание
В будущих версиях Pivot CSS-переменные могут быть переименованы. После обновления проверяйте имена переменных и обновляйте их в коде, чтобы избежать проблем с отображением.
:::

## Встроенная тема {#built-in-theme}

Pivot предоставляет одну встроенную тему: **Material**. Применить тему можно двумя способами: добавить класс темы к контейнеру виджета или подключить готовую таблицу стилей скина на странице.

Следующий фрагмент кода применяет тему Material, добавляя класс `wx-material-theme` к контейнеру виджета:

~~~html {}
<!-- контейнер Pivot -->
<div id="root" class="wx-material-theme"></div>
~~~

Следующий фрагмент кода подключает таблицу стилей скина Material напрямую:

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## Настройка встроенной темы {#customize-built-in-theme}

Переопределите переменные темы Material на селекторе `.wx-material-theme`, чтобы изменить цвета, рамки и другие визуальные свойства.

Пример ниже переопределяет переменные темы Material для отображения Pivot в тёмной цветовой схеме:

~~~html
<!-- пользовательские стили -->
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-table-header-background: #2ca0e3;
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-pivot-background: #444;
        --wx-background: #444;
        --wx-background-alt: #666;
        --wx-pivot-content-background: #666;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #818080;
        --wx-input-background: #9e9e9e;
        --wx-color-font-disabled: #878585;
    }
</style>
~~~

## Пользовательский стиль {#custom-style}

Измените внешний вид Pivot, переопределив CSS-переменные на пользовательском классе, применённом к контейнеру виджета.

Пример ниже применяет пользовательский стиль к Pivot через класс `.demo`:

~~~html
<div id="pivot" class="demo"></div>
<style>
    .demo {
        --wx-background: #444;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-pivot-primary-hover: #194e9e;
        --wx-pivot-border-color: 1px solid #818080;
        --wx-table-header-background: #2ca0e3;
    }
</style>
~~~

## Стиль полосы прокрутки {#scroll-style}

Примените пользовательский стиль к полосе прокрутки Pivot с помощью CSS-класса `.wx-styled-scroll`. Перед использованием проверьте совместимость с браузерами: [caniuse: CSS Scrollbar](https://caniuse.com/css-scrollbar).

Следующий фрагмент кода включает стилизованную полосу прокрутки на контейнере виджета:

~~~html {} title="index.html"
<!-- контейнер для Pivot -->
<div id="root" class="wx-styled-scroll"></div> 
~~~

## Стиль ячеек {#cell-style}

Для стилизации ячеек тела или подвала таблицы используйте параметр `cellStyle` свойства [`tableShape`](api/config/tableshape-property.md). Для стилизации ячеек заголовка используйте параметр `cellStyle` свойства [`headerShape`](api/config/headershape-property.md). В обоих случаях функция `cellStyle` возвращает имя CSS-класса, который Pivot применяет к ячейке.

Пример ниже применяет стили к ячейкам тела и заголовка:

- ячейки тела получают класс на основе значений ячейки (например, `"Down"`, `"Up"`, `"Idle"` в поле `status`) и итоговых значений (больше 40 или меньше 5)
- ячейки заголовка получают класс на основе значения поля `streaming` — `status-down` для `"no"` и `status-up` для любого другого значения

~~~jsx
const widget = new pivot.Pivot("#pivot", {
    tableShape: {
        totalColumn: true,
        totalRow:true,
        cellStyle: (field, value, area, method, isTotal) => {
            if (field === "status" && area === "rows" && value) {
                if (value === "Down") {
                    return "status-down";
                } else if (value === "Up") {
                    return "status-up";
                } else if (value === "Idle") {
                    return "status-idle";
                }
            }
            if(isTotal ==="column" && area == "values"){
                if(value > 40)
                    return "status-up";
                else if (value < 5)
                    return "status-down";
            }
        }
    },
    headerShape:{
        cellStyle:(field, value, area, method, isTotal) => {
            if(field == "streaming")
                return value ==="no"?"status-down":"status-up";
        }
    },
    fields,
    data: dataset,
    config: {
        rows: [
            "protocol",
            "status",
        ],
        columns: [
            "streaming"
        ],
        values: [
            {
                field: "id",
                method: "count"
            }
        ]
    }
});
~~~

## Отметка значений в ячейках {#mark-values-in-cells}

Используйте параметр `marks` свойства [`tableShape`](api/config/tableshape-property.md), чтобы применить CSS-класс к ячейкам, удовлетворяющим условию. Каждая запись в `marks` связывает имя CSS-класса (ключ) с правилом (значение).

Правило — это либо предопределённая строка (`"max"` или `"min"`), либо пользовательская функция `(value, columnData, rowData) => boolean`. Когда функция возвращает `true`, Pivot добавляет CSS-класс к ячейке.

Создайте CSS-классы в вашей таблице стилей перед применением `marks`.

Пример ниже выделяет ячейки с минимальными и максимальными значениями, а также использует пользовательскую функцию для отметки нецелых значений больше 2:

~~~jsx {18-26}
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
    tableShape: {
        marks: {
            // встроенные метки (выделение min/max)
            min_cell: "min",
            max_cell: "max",
            // пользовательская метка
            g_avg: v => (v % 1 !== 0) && v > 2
        }
    }
});
~~~

Следующий фрагмент кода определяет CSS-классы, на которые ссылается объект `marks`:

~~~html title="index.html"
<style>
    .min_cell {
        background: #4caf50 !important;
        color: #fff;
    }

    #root .max_cell {
        background: #ff5722 !important;
        color: #fff;
    }

    .g_avg {
        background: #57a5c9 !important;
        color: #fff;
    }
</style>
~~~

## Специфические CSS-классы {#specific-css-classes}

Pivot включает несколько вспомогательных CSS-классов, которые можно переопределить для точного управления элементами таблицы.

Pivot выравнивает числа в ячейках тела по правому краю с помощью встроенного CSS-класса `.wx-number`. Исключение составляет иерархическая колонка в режиме дерева (когда в [`tableShape`](api/config/tableshape-property.md) установлено `tree: true`). Чтобы сбросить выравнивание чисел по умолчанию, переопределите этот класс.

Следующий фрагмент кода выравнивает числа в ячейках тела по левому краю:

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

Для стилизации итоговых колонок переопределите CSS-класс `.wx-total`.

Следующий фрагмент кода стилизует итоговые ячейки со светлым фоном и более жирным шрифтом:

~~~html
<style>
    .wx-cell.wx-total {
        background: #fafafb;
        font-weight: var(--wx-header-font-weight);
    }
</style>
~~~

## Пример {#example}

Фрагмент ниже применяет пользовательский стиль к Pivot:

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Связанные примеры**: 

- [Pivot 2. Стилизация (пользовательский CSS) для итоговой колонки](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. Метки min/max и пользовательские метки для ячеек (условное форматирование)](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. Чередование цвета строк (полосатые строки, зебра-стайп)](https://snippet.dhtmlx.com/0cm0uko2)
