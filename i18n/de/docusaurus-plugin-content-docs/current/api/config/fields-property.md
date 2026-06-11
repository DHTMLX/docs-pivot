---
sidebar_label: fields
title: fields Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die fields-Konfiguration. Entdecken Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# fields

### Beschreibung {#description}

@short: Optional. Ein Array von Objekten mit Feldern für die Pivot-Tabelle

Die Eigenschaft `fields` im Konfigurationsobjekt steuert, wie das Widget die Typen der empfangenen Datenfelder interpretiert, und ermöglicht die Definition der Sortierreihenfolge für ein Feld.

### Verwendung {#usage}

~~~jsx
fields?: [{
    id: string,
    label?: string,
    type: "number" | "date" | "text",
    sort?: "asc" | "desc" | ((a: any, b: any) => number),
    format?: string | boolean | numberFormatOptions{}
}];
~~~

### Parameter {#parameters}

Wenn die Eigenschaft nicht gesetzt ist, analysiert das Widget die eingehenden Daten automatisch und befüllt das `fields`-Objekt entsprechend.

Jedes Objekt im `fields`-Array sollte die folgenden Eigenschaften haben:

- `id` - (erforderlich) die ID eines Feldes
- `label` - (optional) die Feldbezeichnung, die in der Benutzeroberfläche angezeigt wird
- `type` - (erforderlich) der Datentyp in einem Feld ("number", "date" oder "text")
- `sort` - (optional) legt die Standard-Sortierreihenfolge für das Feld fest. Akzeptiert "asc", "desc" oder eine benutzerdefinierte Sortierfunktion
- `format` - (optional) ermöglicht die Anpassung des Formats von Zahlen und Datumsangaben in einem Feld; das Format wird auch beim [Export](guides/exporting-data.md) angewendet
    - `string` - (optional) das Format für Datumsangaben (standardmäßig verwendet Pivot `dateFormat` aus dem Locale)
    - `boolean` - (optional) wenn auf **false** gesetzt, wird eine Zahl unverändert und ohne Formatierung angezeigt
    - `numberFormatOptions` - (optional) ein Objekt mit Optionen zur Formatierung numerischer Felder; standardmäßig werden Zahlen mit maximal 3 Dezimalstellen angezeigt, und für den ganzzahligen Teil wird eine Gruppentrennzeichenformatierung angewendet.
        - `minimumIntegerDigits`(number) - (optional) die Mindestanzahl von Vorkommastellen (wenn der Wert beispielsweise auf 2 gesetzt ist, wird die Zahl 1 als "01" angezeigt); der Standardwert ist 1;
        - `minimumFractionDigits`(number) - (optional) die Mindestanzahl der zu verwendenden Nachkommastellen (wenn der Wert beispielsweise auf 2 gesetzt ist, wird die Zahl 10.5 als "10.50" angezeigt); der Standardwert ist 0;
        - `maximumFractionDigits`(number) - (optional) die maximale Anzahl der zu verwendenden Nachkommastellen (wenn der Wert beispielsweise auf 2 gesetzt ist, wird die Zahl 10.3333... als "10.33" angezeigt); der Standardwert ist 3;  
        Weitere Details zu den Stellenoptionen finden Sie unter [Stellenoptionen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumintegerdigits)
        - `prefix` (string) - (optional) eine Zeichenkette (vor einer Zahl) für zusätzliche Symbole wie Währungszeichen
        - `suffix` (string) - (optional) eine Zeichenkette (nach einer Zahl) für zusätzliche Symbole wie Währungszeichen

:::info
Wenn über die Eigenschaft [`tableShape`](api/config/tableshape-property.md) ein Template angewendet wird, überschreibt dieses die `format`-Einstellungen.
:::

### Beispiel {#example}

~~~jsx {2-34}
const table = new pivot.Pivot("#root", {
    fields: [
        {
            id: "rank",
            label: "Rank",
            type: "number"
        },
        {
            id: "title",
            label: "Title",
            type: "text"
        },
        {
            id: "genre",
            label: "Genre",
            type: "text"
        },
        {
            id: "studio",
            label: "Studio",
            type: "text"
        },
        {
            id: "type",
            label: "Type",
            type: "text"
        },
        {
            id: "score",
            label: "Score",
            type: "number"
        },
        //weitere Felder
    ],
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
~~~

**Verwandte Artikel**: 

- [Zahlenformatierung](guides/localization.md#number-formatting)
- [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields)

**Verwandtes Beispiel**:  [Pivot 2. Feldformate definieren](https://snippet.dhtmlx.com/77nc4j8v)
