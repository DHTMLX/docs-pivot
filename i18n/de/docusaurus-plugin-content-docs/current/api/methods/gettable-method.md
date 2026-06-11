---
sidebar_label: getTable()
title: getTable-Methode
description: Sie können mehr über die getTable-Methode in der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# getTable()

### Beschreibung {#description}

@short: Gewährt Zugriff auf die zugrundeliegende Table-Widget-Instanz in der Pivot-Tabelle

Diese Methode wird verwendet, wenn auf die zugrundeliegende Table-Widget-Instanz in Pivot zugegriffen werden muss. Sie bietet direkten Zugriff auf die Table-Funktionalität und ermöglicht Operationen wie die Datenserialisierung und den Export in verschiedene Formate. Die Table-API verfügt über eine eigene `api.exec()`-Methode, die die Ereignisse [`open-row`](api/table/open-row.md), [`close-row`](api/table/close-row.md), [`export`](api/table/export.md) und [`filter-rows`](api/table/filter-rows.md) aufrufen kann.

### Verwendung {#usage}

~~~jsx
getTable(wait:boolean): Table | Promise;
~~~

### Parameter {#parameters}

`wait` - legt fest, ob gewartet werden soll, bis die Table-API in Pivot verfügbar ist (notwendig, wenn die Table-API während der Pivot-Initialisierung verwendet wird). Wenn der Wert auf **true** gesetzt ist, gibt die Methode ein Promise mit der Table-API zurück.

### Beispiel {#example}

Im folgenden Beispiel erhalten wir Zugriff auf die Table-Widget-API und lösen das Table-`export`-Ereignis per Button-Klick mit der Methode [`api.exec()`](api/internal/exec-method.md) aus.

~~~jsx
// Pivot erstellen
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

// Auf Table-Instanz zugreifen
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

**Verwandte Artikel**:

- [`close-row`](api/table/close-row.md)
- [`export`](api/table/export.md)
- [`filter-rows`](api/table/filter-rows.md)
- [`open-row`](api/table/open-row.md)
