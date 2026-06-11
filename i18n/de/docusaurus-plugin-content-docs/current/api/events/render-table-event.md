---
sidebar_label: render-table
title: render-table Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das render-table-Event. Entwicklerhandbücher und API-Referenz, Code-Beispiele und Live-Demos sowie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot.
---

# render-table

### Beschreibung {#description}

@short: Wird ausgelöst, nachdem die Widget-Konfiguration verarbeitet wurde und unmittelbar bevor die Tabelle gerendert wird

Es ermöglicht Ihnen, die endgültige Tabellenkonfiguration spontan zu ändern oder das Rendering der Tabelle vollständig zu verhindern.

### Verwendung {#usage}

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

### Parameter {#parameters}

Der Callback der Aktion erhält das `config`-Objekt mit den folgenden Parametern:

- `columns` - (optional) Spalten-Array mit den folgenden Parametern für jedes Objekt:
    - `id` (number) - (erforderlich) die ID einer Spalte
    - `cell` (any) - (optional) ein Template mit dem Zellinhalt (siehe [Hinzufügen von Templates über den template-Helper](guides/configuration.md#adding-a-template-via-the-template-helper))
    - `template` - (optional) das Template, das über die [`tableShape`](api/config/tableshape-property.md)-Eigenschaft definiert wird
    - `fields` (array) - (optional) definiert Felder in der hierarchischen Spalte im Baumstruktur-Modus. Gibt die auf verschiedenen Ebenen in dieser Spalte angezeigten Felder an
     - `field` - (optional) ein String, der die ID eines Feldes darstellt
    - `method` (string) - (optional) eine Methode, sofern für ein Feld in dieser Spalte definiert
    - `methods` (array) - (optional) definiert Methoden, die auf Felder in der hierarchischen Spalte im Baumstruktur-Modus angewendet werden
    - `format` (string or object) - (erforderlich) Datumsformat oder Zahlenformat (siehe [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields))
    - `isNumeric` (boolean) - (optional) legt fest, ob eine Spalte numerische Werte enthält
    - `isTotal` (boolean) - (optional) legt fest, ob es sich um eine Gesamtsummen-Spalte handelt
    - `area` (string) - (optional) der Bereich, in dem die Spalte gerendert wird: "rows", "columns", "values"
    - `header` - (optional) ein Array von Header-Zellen mit den folgenden Eigenschaften für jede Zelle:
        - `text` (string) - (optional) Zellentext, formatierter Wert oder mit einem Prädikat-Template verarbeiteter Wert
        - `rowspan` (number) - (optional) die Anzahl der Zeilen, über die sich ein Header erstreckt
        - `colspan` (number) - (optional) die Anzahl der Spalten, über die sich ein Header erstreckt
        - `value` (any) - (erforderlich) Rohwert, wenn eine Zelle zum Bereich "columns" gehört
        - `field` (string) - (erforderlich) ein Feld, dessen Wert angezeigt wird, wenn eine Zelle zum Bereich "columns" gehört
        - `method` (string) - (erforderlich) das Feld-Prädikat, wenn eine Zelle zum Bereich "columns" gehört und ein Prädikat definiert ist
        - `format` (string or object) - Datumsformat oder Zahlenformat (siehe [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields))
  - `footer` - (optional) ein Header-Label oder ein Objekt mit Footer-Einstellungen, die den Header-Einstellungen entsprechen
 - `data` - (optional) ein Array von Objekten mit Daten für die Tabelle; jedes Objekt repräsentiert eine Zeile:
    - `id` (number) - (erforderlich) Zeilen-ID
    - `values` (array) - (erforderlich) ein Array mit Zeilendaten
    - `open` (boolean) - (optional) Zustand eines Zweigs
    - `$level` (boolean) - (optional) Index eines Zweigs
- `footer` - (optional) wenn auf **true** gesetzt, wird der Tabellen-Footer am unteren Rand der Tabelle angezeigt; standardmäßig auf **false** gesetzt und nicht sichtbar
- `sizes` - (optional) ein Objekt mit Einstellungen für Tabellengrößen, nämlich columnWidth, footerHeight, headerHeight, rowHeight
- `split` (object) - (optional) ein Objekt mit den folgenden Eigenschaften:
    - `left` (number) - die Anzahl der fixierten Spalten von links
    - `right` (number) - die Anzahl der fixierten Spalten von rechts
- `tree` - (optional) legt fest, ob der Baumstruktur-Modus aktiviert ist (**true**, wenn aktiviert)
- `cellStyle` - (optional) eine Funktion, die einen benutzerdefinierten Stil auf eine Zelle anwendet. Sie empfängt die Zeilen- und Spaltenobjekte und gibt einen String mit einem CSS-Klassenname zurück: `(row, col) => string`

:::info
Zur Verarbeitung der internen Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden
:::

### Rückgabewert {#returns}

Der Callback kann einen booleschen Wert oder void zurückgeben.  
Wenn der Event-Handler **false** zurückgibt, wird die betreffende Operation blockiert. In diesem Fall wird das Rendering der Tabelle verhindert.

### Beispiel {#example}

Das folgende Beispiel zeigt, wie das [`config`](api/config/config-property.md)-Objekt in der Konsole ausgegeben und ein Footer hinzugefügt wird.

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
    console.log(ev.config); //gibt das config-Objekt aus
    console.log(ev.config.columns); //gibt das columns-Array aus

    ev.config.footer = true;
    ev.config.columns[0].footer = ["Custom footer"];

    // die Rückgabe von "false" verhindert das Rendering der Tabelle
});
~~~

Das folgende Beispiel zeigt, wie alle Zeilen per Klick auf einen Button ein- und ausgeklappt werden können. Der Baumstruktur-Modus muss über die [`tableShape`](api/config/tableshape-property.md)-Eigenschaft aktiviert werden.

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

//  alle Tabellenzweige beim Aktualisieren der Tabellenkonfiguration schließen
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // die Rückgabe von "false" verhindert das Rendering der Tabelle
    // return false;
});

function openAll() {
    tableApi.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
    tableApi.exec("close-row", { id: 0, nested: true });
}
~~~

Lesen Sie auch, wie Sie das Split-Feature mithilfe des `render-table`-Events konfigurieren: [Spalten fixieren](guides/configuration.md#freezing-columns).

**Verwandter Artikel**: [pivot.template-Helper](api/helpers/template.md)

**Verwandtes Beispiel**: [Pivot 2. Benutzerdefinierte fixierte Spalten (eigene Anzahl)](https://snippet.dhtmlx.com/53erlmgp)
