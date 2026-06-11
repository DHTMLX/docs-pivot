---
sidebar_label: Daten laden
title: Daten laden
description: Sie erfahren hier, wie Sie Daten in der DHTMLX JavaScript Pivot-Bibliothek laden. Lesen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# Daten laden {#loading-data}

Pivot akzeptiert Daten im JSON-Format über die [`data`](api/config/data-property.md)-Eigenschaft. Pivot unterstützt außerdem CSV-Daten nach der Konvertierung in JSON.

## Daten für das Laden vorbereiten {#prepare-data-for-loading}

Die [`data`](api/config/data-property.md)-Eigenschaft akzeptiert ein Array von Objekten, wobei jedes Objekt eine Datenzeile repräsentiert. Die Schlüssel jedes Objekts definieren die Dimensionen und Werte, die in der Pivot-Tabelle verwendet werden.

Das folgende Code-Snippet definiert ein Beispiel-`data`-Array:

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
    // weitere Daten
];
~~~

:::info
Informationen zur Definition von Feldern und der Pivot-Struktur finden Sie unter [Mit Daten arbeiten](guides/working-with-data.md).
:::

## Daten aus einer Datei laden {#load-data-from-a-file}

Pivot lädt JSON-Daten nach der Initialisierung aus einer externen Datei. Bereiten Sie eine Quelldatei mit den Daten, Feldern und der Konfiguration vor.

Das folgende Code-Snippet definiert `data`, `fields` und einen `getData()`-Accessor in einer separaten Datei:

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
    // weitere Daten
];
~~~

Fügen Sie den Pfad zur Quelldatendatei im Seiten-Markup hinzu:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">

<script src="./common/data.js"></script>
~~~

Das folgende Code-Snippet erstellt Pivot und lädt Daten aus der vorbereiteten Datei:

~~~jsx
const { data, config, fields } = getData();
const table = new pivot.Pivot("#root", { data, config, fields });
~~~

## Daten von einem Server laden {#load-data-from-a-server}

Um Daten von einem Server-Endpunkt zu laden, senden Sie eine Anfrage mit der nativen `fetch`-Methode (oder einer gleichwertigen Alternative) und übergeben Sie die Antwort dann an [`setConfig`](api/methods/setconfig-method.md), das die Pivot-Konfiguration aktualisiert und zuvor gesetzte Optionen beibehält.

Das folgende Code-Snippet initialisiert Pivot mit leeren Daten, ruft Daten und Felder von einem Server ab und wendet sie dann mit `setConfig` an:

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

Weitere Informationen finden Sie im folgenden Thema: [Mit dem Server arbeiten](/guides/working-with-server)

## CSV-Daten laden {#load-csv-data}

Pivot akzeptiert CSV-Daten, nachdem Sie diese mit einer externen JS-Parsing-Bibliothek in JSON konvertiert haben. Die konvertierten Daten verhalten sich genauso wie natives JSON.

Das folgende Beispiel verwendet die externe [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js)-Bibliothek, um Daten bei einem Button-Klick zu laden und zu konvertieren. Der `convert()`-Helfer nimmt folgende Parameter entgegen:

- `data` — ein String mit CSV-Daten
- `headers` — ein Array mit CSV-Feldnamen
- `meta` — ein Objekt, das Feldnamen auf Datentypen abbildet

Das folgende Code-Snippet erstellt Pivot, definiert den `convert()`-Helfer und wendet die geparsten CSV-Daten über [`setConfig`](api/methods/setconfig-method.md) bei einem Button-Klick an:

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
  
    // Datumsfelder explizit markieren für korrekte Konvertierung
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

## Beispiel {#example}

Das folgende Snippet lädt JSON- und CSV-Daten:

<iframe src="https://snippet.dhtmlx.com/wo6w9hf9?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Verwandte Beispiele**:
- [Pivot 2. Datumsformat](https://snippet.dhtmlx.com/shn1l794)
- [Pivot 2. Verschiedene Datensätze](https://snippet.dhtmlx.com/6xtqge4i)
- [Pivot 2. Großer Datensatz](https://snippet.dhtmlx.com/e6qwqrys)

**Verwandte Artikel**: [Datumsformatierung](guides/localization.md#date-formatting)
