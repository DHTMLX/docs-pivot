---
sidebar_label: Загрузка данных
title: Загрузка данных
description: Вы можете узнать, как загружать данные, в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства для разработчиков и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Загрузка данных

Pivot принимает данные в формате JSON через свойство [`data`](api/config/data-property.md). Также Pivot принимает данные в формате CSV после их конвертации в JSON.

## Подготовка данных для загрузки {#prepare-data-for-loading}

Свойство [`data`](api/config/data-property.md) принимает массив объектов, где каждый объект представляет одну строку данных. Ключи каждого объекта определяют измерения и значения, используемые в таблице Pivot.

Следующий фрагмент кода определяет пример массива `data`:

~~~jsx
const data = [
    {
        name: "Argentina",
        year: 2015,
        continent: "South America",
        form: "Republic",
        gdp: 181.357,
        oil: 1.545,
        balance: 4.699,
        when: new Date("4/21/2015")
    },
    {
        name: "Argentina",
        year: 2017,
        continent: "South America",
        form: "Republic",
        gdp: 212.507,
        oil: 1.732,
        balance: 7.167,
        when: new Date("1/15/2017")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 260.071,
        oil: 2.845,
        balance: 6.728,
        when: new Date("6/16/2014")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 324.405,
        oil: 4.333,
        balance: 5.99,
        when: new Date("2/20/2014")
    },
    {
        name: "Argentina",
        year: 2014,
        continent: "South America",
        form: "Republic",
        gdp: 305.763,
        oil: 2.626,
        balance: 7.544,
        when: new Date("8/17/2014")
    },
    // другие данные
];
~~~

:::info
Информацию об определении полей и структуры Pivot см. в разделе [Работа с данными](guides/working-with-data.md).
:::

## Загрузка данных из файла {#load-data-from-a-file}

Pivot загружает данные JSON из внешнего файла после инициализации. Подготовьте исходный файл с данными, полями и конфигурацией.

Следующий фрагмент кода определяет `data`, `fields` и метод доступа `getData()` в отдельном файле:

~~~jsx
function getData() {
    return {
        data,
        config: {
            rows: ["continent", "name"],
            columns: ["year"],
            values: [
                "count(oil)",
                { field: "oil", method: "sum" },
                { field: "gdp", method: "sum" }
            ],
            filters: {
                genre: {
                    contains: "D",
                    includes: ["Drama"],
                }
            }
        },
        fields
    };
}
const fields = [
    { id: "year", label: "Year", type: "number" },
    { id: "continent", label: "Continent", type: "text" },
    { id: "form", label: "Form", type: "text" },
    { id: "oil", label: "Oil", type: "number" },
    { id: "balance", label: "Balance", type: "number" }
];

const data = [
    {
        name: "Argentina",
        year: 2015,
        continent: "South America",
        form: "Republic",
        gdp: 181.357,
        oil: 1.545,
        balance: 4.699,
        when: new Date("4/21/2015")
    },
    // другие данные
];
~~~

Добавьте путь к исходному файлу данных в разметку страницы:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">

<script src="./common/data.js"></script>
~~~

Следующий фрагмент кода создаёт Pivot и загружает данные из подготовленного файла:

~~~jsx
const { data, config, fields } = getData();
const table = new pivot.Pivot("#root", { data, config, fields });
~~~

## Загрузка данных с сервера {#load-data-from-a-server}

Чтобы загрузить данные с серверного эндпоинта, отправьте запрос с помощью нативного метода `fetch` (или любого аналога), а затем передайте ответ в [`setConfig`](api/methods/setconfig-method.md), который обновляет конфигурацию Pivot и сохраняет ранее установленные параметры.

Следующий фрагмент кода инициализирует Pivot с пустыми данными, загружает данные и поля с сервера, а затем применяет их с помощью `setConfig`:

~~~jsx
const table = new pivot.Pivot("#root", { fields: [], data: [] });
const server = "https://some-backend-url";

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({ data, fields });
});
~~~

Дополнительную информацию см. в следующем разделе: [Работа с сервером](/guides/working-with-server)

## Загрузка данных CSV {#load-csv-data}

Pivot принимает данные CSV после их конвертации в JSON с помощью внешней библиотеки JS для парсинга. Сконвертированные данные ведут себя так же, как и нативный JSON.

В примере ниже используется внешняя библиотека [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js) для загрузки и конвертации данных по нажатию кнопки. Вспомогательная функция `convert()` принимает следующие параметры:

- `data` — строка с данными CSV
- `headers` — массив названий полей CSV
- `meta` — объект, сопоставляющий названия полей с типами данных

Следующий фрагмент кода создаёт Pivot, определяет вспомогательную функцию `convert()` и применяет спарсенные данные CSV через [`setConfig`](api/methods/setconfig-method.md) по нажатию кнопки:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    config: {
        rows: [
            "studio",
            "genre"
        ],
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

function convert(data, headers, meta) {
    const header = headers.join(",") + "\n";
    const processedData = header + data;

    return Papa.parse(processedData, { 
        header: true,
        dynamicTyping: true,
        transform: (v, f) => {
            return meta && meta[f] === "date" ? new Date(v) : v;
        }
    });
}

function fromCSV() {
    const fields = [
        { id: "name", label: "Name", type: "text" },
        { id: "continent", label: "Continent", type: "text" },
        { id: "form", label: "Form", type: "text" },
        { id: "gdp", label: "GDP", type: "number" },
        { id: "oil", label: "Oil", type: "number" },
        { id: "balance", label: "Balance", type: "number" },
        { id: "year", label: "Year", type: "number" },
        { id: "when", label: "When", type: "date" }
    ];
    
    const config = {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ]
    };

    const headers = [
        "name",
        "year",
        "continent",
        "form",
        "gdp",
        "oil",
        "balance",
        "when"
    ];
  
    // явно помечаем поля с датами для корректной конвертации
    const meta = { when: "date" };

    const dataURL = "https://some-backend-url";
    fetch(dataURL)
        .then(response => response.text())
        .then(text => convert(text, headers, meta))
        .then(data => {
        table.setConfig({
            data: data.data,
            fields,
            config
        });
    });
}

const importButton = document.createElement("button");
importButton.addEventListener("click", fromCSV);
importButton.textContent = "Import";

document.body.appendChild(importButton);
~~~

## Пример {#example}

Фрагмент ниже загружает данные JSON и CSV:

<iframe src="https://snippet.dhtmlx.com/wo6w9hf9?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Связанные примеры**:
- [Pivot 2. Формат даты](https://snippet.dhtmlx.com/shn1l794)
- [Pivot 2. Разные наборы данных](https://snippet.dhtmlx.com/6xtqge4i)
- [Pivot 2. Большой набор данных](https://snippet.dhtmlx.com/e6qwqrys)

**Связанные статьи**: [Форматирование дат](guides/localization.md#date-formatting)
