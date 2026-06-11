---
sidebar_label: predicates
title: predicates Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die predicates-Konfiguration. Lesen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# predicates

### Beschreibung {#description}

@short: Optional. Stellt benutzerdefinierte Vorverarbeitungsfunktionen für die Datendimensionen (Zeilen, Spalten) bereit

Es definiert, wie Daten geändert werden sollen, bevor sie angewendet werden.

### Verwendung {#usage}

~~~jsx
predicates?: {
    [key: string]: {
        handler: (value: any) => any,
        type: 'number' | 'date' | 'text' | [],
        label?: string | (type: 'number' | 'date' | 'text') => string,
        template?: (value: any, locale?: any) => string,
        field?: (value:string) => boolean,
        filter?: { 
            type: "number"|"text"|"date"|"tuple",
            format?:(any) => string
        }
    }
};
~~~

### Parameter {#parameters}

Die Eigenschaft ist ein Objekt, dessen Schlüssel der Name einer benutzerdefinierten Funktion und dessen Wert ein Objekt mit den eigentlichen Funktionsdefinitionen ist. Das Predicate-Objekt kann mehrere Schlüssel-Funktions-Paare enthalten, die alle in der Pivot-Konfiguration verwendet werden können. Jedes Objekt hat die folgenden Parameter:

- `label` - (optional) die Beschriftung eines Predicates, die in der GUI im Dropdown unter den Datenmodifikationsoptionen für eine Zeile/Spalte angezeigt wird
- `type` - (erforderlich) definiert, für welche Feldtypen dieses Predicate angewendet werden kann; mögliche Werte sind "number", "date", "text" oder ein Array dieser Werte
- `field` - (optional) die Funktion, die definiert, wie Daten für das angegebene Feld verarbeitet werden sollen; sie nimmt die ID eines Feldes als Parameter entgegen und gibt **true** zurück, wenn das Predicate dem angegebenen Feld hinzugefügt werden soll
- `filter` - (optional) standardmäßig wird der Filter-Typ aus dem Parameter `type` übernommen; wenn Sie einen anderen benötigen, können Sie dieses `filter`-Objekt verwenden. Es hat die folgenden Parameter:
    - `type` - (optional) definiert, welcher Feldtyp angewendet wird: "number"|"text"|"date"|"tuple". "tuple" ist ein Combo-Filter für numerische Werte (die Daten werden nach dem numerischen Wert gefiltert, aber im Filter wird der Textwert angezeigt)
    - `format` - (optional) die Funktion, die das Format für die Anzeige von Filteroptionen definiert; wenn kein Format angegeben ist, wird das Format aus dem Parameter `template` verwendet; wenn der Typ hier (für das `filter`-Objekt) nicht angegeben ist, wird das Format für den im Parameter `type` des Predicates festgelegten Typ angewendet
- `handler` - (für benutzerdefinierte Predicates erforderlich) die Funktion, die definiert, wie Daten verarbeitet werden sollen; die Funktion nimmt einen einzelnen Argumentwert entgegen und gibt den verarbeiteten Wert zurück
- `template` - (optional) die Funktion, die definiert, wie Daten angezeigt werden sollen; die Funktion gibt den verarbeiteten Wert zurück und nimmt den von `handler` zurückgegebenen Wert entgegen; bei Bedarf können Textwerte mithilfe von [`locale`](api/config/locale-property.md) lokalisiert werden.
 
Die folgenden Standard-Predicates werden angewendet, wenn über die Eigenschaft `predicates` kein Predicate angegeben wird:

~~~jsx
const defaultPredicates = {
    // ein Service-Predicate, das den rohen (unverarbeiteten) Wert darstellt
    $empty: { label: (type) => `Raw ${type}`, type: ["number", "date", "text"] },
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

## Beispiel {#example}

~~~jsx 
const predicates = {
    monthYear: {
        label: "Month-year",
        type: "date",
        handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1),
        template: (date, locale) => {
            const months = locale.getRaw().calendar.monthFull;
            return months[date.getMonth()] + " " + date.getFullYear();
        },
    },
    profitSign: {
        label: "Profit Sign",
        type: "number",
        filter: {
            type: "tuple",
            format: (v) => (v < 0 ? "Negative" : "Positive"),
        },
        field: (f) => f === "profit",
        handler: (v) => (v < 0 ? -1 : 1),
        template: (v) => (v < 0 ? "Negative profit" : "Positive profit"),
    },
};

// Datumszeichenkette in Date umwandeln
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    predicates: { ...pivot.defaultPredicates, ...predicates },
    tableShape: { tree: true },
    config: {
        rows: ["product_type", "product"],
        columns: [
            { field: "profit", method: "profitSign" },
            { field: "date", method: "monthYear" },
        ],
        values: ["sales", "expenses"],
    },
});
~~~

**Verwandter Artikel**: [Daten mit Predicates verarbeiten](guides/working-with-data.md#processing-data-with-predicates)

**Verwandtes Beispiel**: [Pivot 2. Benutzerdefinierte Predicates](https://snippet.dhtmlx.com/mhymus00)
