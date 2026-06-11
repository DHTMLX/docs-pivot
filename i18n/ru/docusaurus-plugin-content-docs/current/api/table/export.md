---
sidebar_label: export
title: export
description: Вы можете узнать о событии export в документации библиотеки DHTMLX JavaScript Pivot. Просматривайте руководства разработчика и справочник АПИ, изучайте примеры кода и живые демо, загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot
---

# export

### Описание {#description}

@short: Срабатывает при экспорте данных

Чтобы вызвать событие Table, необходимо получить доступ к экземпляру Table внутри Pivot через метод [`getTable`](api/methods/gettable-method.md).

### Использование {#usage}

```jsx
"export": ({
    options: {
        format: "csv" | "xlsx",
        fileName?: string,
        header?: boolean,
        footer?: boolean,
        download?: boolean,

        /* XLSX settings*/
        styles?: boolean | {
            header?: {
                fontWeight?: "bold",
                color?: string,
                background?: string,
                align?: "left"|"right"|"center",
                borderBottom?:  string,
                borderRight?:  string,
            }
            lastHeaderCell?:  { /*  same as header */  },
            cell?: { /*  same as header */ };
            firstFooterCell?: { /*  same as header */ },
            footer?: {/*  same as header */},
        }
        cellTemplate?: (value: any, row: any, column: object ) 
            => string | null,
        headerCellTemplate?: (text: string, cell: object, column: object, type: "header"| "footer") 
            => string | null,
        cellStyle?: (value: any, row: any, column: object) 
            => { format: string; align: "left"|"right"|"center" } | null,
        headerCellStyle?: (text: string, cell: object, column: object, type: "header"| "footer") 
            => { format: string; align: "left"|"right"|"center" } | null,
        sheetName?: string,

        /* CSV settings */
        rows: string,
        cols: string,
    },
    result?: any,
}) => boolean|void;
```

Действие `export` виджета Table имеет следующие параметры, которые можно настроить под свои нужды:

- `options` - объект с параметрами экспорта; параметры различаются в зависимости от типа формата
- `result` - результат экспортированных данных Excel или CSV (обычно Blob или файл в зависимости от параметра `download`)

    **Общие параметры для обоих форматов ("csv" и "xlsx")**:

    - `format` (string) - (необязательный) формат экспорта: "csv" или "xlsx"
    - `fileName` (string) - (необязательный) имя файла (по умолчанию "data")
    - `header` (boolean) - (необязательный) определяет, нужно ли экспортировать заголовок (по умолчанию **true**)
    - `footer` (boolean) - (необязательный) определяет, нужно ли экспортировать подвал (по умолчанию **true**)
    - `download` (boolean) - (необязательный) определяет, загружать ли файл. По умолчанию **true**. Если задано **false**, файл не будет загружен, а данные Excel или CSV (Blob) будут доступны как `ev.result`

     **Параметры, специфичные для формата "xlsx"**:

    - `sheetName` (string) - имя листа Excel (по умолчанию "data")
    - `styles` (boolean или объект) - если задано **false**, таблица экспортируется без стилей; можно настроить с помощью набора свойств стиля:
        - `header` - объект со следующими настройками для ячеек заголовка:
            - `fontWeight` (string) - (необязательный) может быть задано "bold"; если не задано, шрифт будет обычным
            - `color` (string) - (необязательный) цвет текста в заголовке
            - `background` (string) - (необязательный) цвет фона заголовка
            - `align` - (необязательный) выравнивание текста: "left"|"right"|"center". Если не задано, применяется выравнивание, установленное в Excel
            - `borderBottom` (string) - (необязательный) стиль нижней границы
            - `borderRight` (string) - (необязательный) стиль правой границы (например, *borderRight: "0.5px solid #dfdfdf"*)
        - `lastHeaderCell` - свойства стиля для последней строки ячеек заголовка. Свойства аналогичны *header*
        - `cell` - свойства стиля для ячеек тела таблицы. Свойства аналогичны *header*
        - `firstFooterCell` - свойства стиля для первой строки ячеек подвала. Свойства аналогичны *header*
        - `footer` - свойства стиля для ячеек подвала. Свойства аналогичны *header*
    - `cellTemplate` - функция для настройки экспортируемого значения каждой ячейки. Принимает значение, объекты строки и столбца в качестве параметров и возвращает пользовательское значение для экспорта
    - `headerCellTemplate` - функция, настраивающая значение ячейки заголовка или подвала при экспорте. Вызывается с текстом, объектом ячейки заголовка, объектом столбца и типом ячейки ("header" или "footer"). Позволяет изменять экспортируемые значения заголовка/подвала
    - `cellStyle` - функция для настройки стиля и формата отдельных ячеек при экспорте. Принимает значение, объекты строки и столбца в качестве параметров и должна возвращать объект со свойствами стиля (например, выравниванием или форматом)
    - `headerCellStyle` - аналогична `cellStyle`, но предназначена для ячеек заголовка и подвала. Принимает текст, объект ячейки заголовка, объект столбца и тип ("header" или "footer") и возвращает свойства стиля
    :::note
    По умолчанию для формата "xlsx" поля дат и чисел экспортируются как необработанные значения с форматом по умолчанию или форматом, заданным через свойство [`fields`](api/config/fields-property.md). Однако если для поля задан шаблон (см. свойство [`tableShape`](api/config/tableshape-property.md)), экспортируется отображаемое значение, определённое этим шаблоном. Если заданы и шаблон, и `format`, настройки шаблона переопределяют настройки формата.
    :::

    **Параметры, специфичные для формата "csv"**:

    - `rows` (string) - (необязательный) разделитель строк, по умолчанию "\n"
    - `cols` (string) - (необязательный) разделитель столбцов, по умолчанию "\t"

## Пример {#example}

В этом примере показано, как экспортировать данные:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Связанные статьи**: 
- [`getTable`](api/methods/gettable-method.md)
- [Экспорт данных](guides/exporting-data.md)
- [Применение форматов к полям](guides/working-with-data.md#applying-formats-to-fields)
