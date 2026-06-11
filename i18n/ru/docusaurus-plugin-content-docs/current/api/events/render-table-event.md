---
sidebar_label: render-table
title: render-table Event
description: Вы можете узнать о событии render-table в документации библиотеки DHTMLX JavaScript Pivot. Просматривайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# render-table

### Описание {#description}

@short: Срабатывает после обработки конфигурации виджета и непосредственно перед рендерингом таблицы

Позволяет изменить итоговую конфигурацию таблицы на лету или полностью предотвратить её рендеринг.

### Использование {#usage}

~~~jsx
"render-table": ({
    config: {
        columns?: any[],
        data?: any[],
        footer?: boolean,
        sizes?: {
            rowHeight?: number,
            headerHeight?: number,
            columnWidth?: number,
            footerHeight?: number
        },
        split?: {
            left?: number;
            right?: number;
        },
        tree?: boolean,
        cellStyle?: (row: any, col: any) => string,
    }
}) => boolean | void;
~~~

### Параметры {#parameters}

Калбэк события принимает объект `config` со следующими параметрами:

- `columns` - (опционально) массив столбцов, где каждый объект содержит следующие параметры:
    - `id` (number) - (обязательно) идентификатор столбца
    - `cell` (any) - (опционально) шаблон с содержимым ячейки (см. [Добавление шаблонов через хелпер template](guides/configuration.md#adding-a-template-via-the-template-helper))    
    - `template` - (опционально) шаблон, определённый через свойство [`tableShape`](api/config/tableshape-property.md)
    - `fields` (array) - (опционально) определяет поля в иерархическом столбце в режиме дерева. Отражает поля, отображаемые в данном столбце на разных уровнях
     - `field` - (опционально) строка, являющаяся идентификатором поля
    - `method` (string) - (опционально) метод, если он задан для поля в данном столбце
    - `methods` (array) - (опционально) определяет методы, применяемые к полям в иерархическом столбце в режиме дерева
    - `format` (string or object) - (обязательно) формат даты или числа (см. [Применение форматов к полям](guides/working-with-data.md#applying-formats-to-fields))
    - `isNumeric` (boolean) - (опционально) определяет, содержит ли столбец числовые значения
    - `isTotal` (boolean) - (опционально) определяет, является ли столбец итоговым
    - `area` (string) - (опционально) область, в которой отображается столбец: "rows", "columns", "values"
    - `header` - (опционально) массив ячеек заголовка со следующими свойствами для каждой ячейки:
        - `text` (string) - (опционально) текст ячейки, форматированное значение или значение, обработанное шаблоном предиката
        - `rowspan` (number) - (опционально) количество строк, которые должен охватывать заголовок
        - `colspan` (number) - (опционально) количество столбцов, которые должен охватывать заголовок
        - `value` (any) - (обязательно) исходное значение, если ячейка принадлежит области "columns"
        - `field` (string) - (обязательно) поле, значение которого отображается, если ячейка принадлежит области "columns"
        - `method` (string) - (обязательно) предикат поля, если ячейка принадлежит области "columns" и предикат задан
        - `format` (string or object) - формат даты или числа (см. [Применение форматов к полям](guides/working-with-data.md#applying-formats-to-fields))
  - `footer` - (опционально) метка заголовка или объект с настройками футера, аналогичными настройкам заголовка
 - `data` - (опционально) массив объектов с данными для таблицы; каждый объект представляет строку:
    - `id` (number) - (обязательно) идентификатор строки
    - `values` (array) - (обязательно) массив с данными строки
    - `open` (boolean) - (опционально) состояние ветки
    - `$level` (boolean) - (опционально) индекс ветки
- `footer` - (опционально) если установлено значение **true**, футер таблицы отображается внизу таблицы; по умолчанию установлено значение **false** и футер не виден
- `sizes` - (опционально) объект с настройками размеров таблицы: columnWidth, footerHeight, headerHeight, rowHeight
- `split` (object) - (опционально) объект со следующими свойствами:
    - `left` (number) - количество фиксированных столбцов слева
    - `right` (number) - количество фиксированных столбцов справа
- `tree` - (опционально) определяет, включён ли режим дерева (**true**, если включён)
- `cellStyle` - (опционально) функция, применяющая пользовательский стиль к ячейке. Принимает объекты строки и столбца и возвращает строку с именем CSS-класса: `(row, col) => string`

:::info
Для обработки внутренних событий можно использовать [методы Event Bus](api/overview/internal-eventbus-overview.md)
:::

### Возвращаемое значение {#returns}

Калбэк может возвращать boolean или void.  
Если обработчик события возвращает **false**, операция будет заблокирована. В данном случае это предотвратит рендеринг таблицы.

### Пример {#example}

Следующий пример показывает, как вывести объект [`config`](api/config/config-property.md) в консоль и добавить футер.

~~~jsx {20-28}
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

table.api.intercept("render-table", (ev) => {
    console.log(ev.config); //вывести объект config
    console.log(ev.config.columns); //вывести массив columns

    ev.config.footer = true;
    ev.config.columns[0].footer = ["Custom footer"];

    // возврат "false" здесь предотвратит рендеринг таблицы
});
~~~

Следующий пример показывает, как раскрывать/сворачивать все строки по нажатию кнопки. Режим дерева должен быть включён через свойство [`tableShape`](api/config/tableshape-property.md).

~~~jsx
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true,
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
const tableApi = api.getTable();

//  закрываем все ветки таблицы при обновлении конфигурации таблицы
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // возврат "false" здесь предотвратит рендеринг таблицы
    // return false;
});

function openAll() {
    tableApi.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
    tableApi.exec("close-row", { id: 0, nested: true });
}
~~~

Смотрите также, как настроить функцию разделения с помощью события `render-table`: [Фиксация столбцов](guides/configuration.md#freezing-columns).

**Связанная статья**: [Хелпер pivot.template](api/helpers/template.md)

**Связанный пример**: [Pivot 2. Пользовательские фиксированные столбцы (ваше число)](https://snippet.dhtmlx.com/53erlmgp)
