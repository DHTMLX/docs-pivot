---
sidebar_label: methods
title: methods Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die methods-Konfiguration. Lesen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# methods

### Beschreibung {#description}

@short: Optional. Definiert benutzerdefinierte mathematische Methoden für die Datenaggregation

### Verwendung {#usage}

~~~jsx
methods?: {
    [method: string]: {
        type?: 'number' | 'date' | 'text' | [],
        label?: string,
        handler?: (values: number[]) => number,
        branchMode?: "raw"|"result",
        branchMath?: string
    }
};
~~~

### Parameter {#parameters}

Jede Methode wird durch ein Schlüssel-Wert-Paar dargestellt, wobei `method` der Name der Methode ist und der Wert ein Objekt ist, das das Verhalten der Methode beschreibt. Jedes Objekt verfügt über folgende Parameter:

- `handler` - (für benutzerdefinierte Methoden erforderlich) eine Funktion, die einen aggregierten Wert aus einem Array von Zahlen berechnet; die Funktion nimmt ein Array von Werten als Eingabe entgegen und gibt einen einzelnen Wert als Ausgabe zurück
- `type` - (optional) der Datentyp, für den diese Methode geeignet ist; mögliche Werte sind "number", "date" oder "text" oder ein Array dieser Werte
- `label` - (optional) die Methodenbezeichnung, die in der Benutzeroberfläche angezeigt wird
- `branchMode` - (optional) definiert den Modus für die Berechnung von Gesamtwerten in der Baumtabelle; `branchMode` kann auf `raw` gesetzt werden, um die Berechnung auf Basis aller Rohdaten durchzuführen; `result` (Standard) wird für die Berechnung auf Basis bereits verarbeiteter Daten im Baumstruktur-Modus verwendet
- `branchMath` - (optional) der Name einer Methode zur Berechnung von Gesamtwerten im Baumstruktur-Modus; standardmäßig identisch mit dem Methodennamen (für die Methode "max" ist `branchMath` ebenfalls "max")

Standardmäßig ist die Eigenschaft `methods` ein leeres Objekt {}, was bedeutet, dass keine benutzerdefinierten Methoden definiert sind. Die Anzahl der Untereigenschaften, die im methods-Objekt definiert werden können, ist nicht begrenzt.

Vordefinierte Methoden:

~~~jsx
defaultMethods = {
    sum: { type: "number", label: "sum" },
    min: { type: ["number", "date"], label: "min" },
    max: { type: ["number", "date"], label: "max" },
    count: {
        type: ["number", "date", "text"],
        label: "count",
        branchMath: "sum"
    },
    counta: {
        type: ["number", "date", "text"],
        label: "counta",
        branchMath: "sum"
    },
    countunique: {
        type: ["number", "text"],
        label: "countunique",
        branchMath: "sum"
    },
    average: { type: "number", label: "average", branchMode: "raw" },
    median: { type: "number", label: "median", branchMode: "raw" },
    product: { type: "number", label: "product" },
    stdev: { type: "number", label: "stdev", branchMode: "raw" },
    stdevp: { type: "number", label: "stdevp", branchMode: "raw" },
    var: { type: "number", label: "var", branchMode: "raw" },
    varp: { type: "number", label: "varp", branchMode: "raw" }
};
~~~

Die Definition jeder Methode finden Sie hier: [Methoden anwenden](guides/working-with-data.md#default-methods)

## Beispiel {#example}

Das folgende Beispiel zeigt, wie die Anzahl eindeutiger und durchschnittlicher Werte für den Datumstyp berechnet wird. Die Funktion **countUnique** nimmt ein Array von Zahlen (Werten) als Eingabe entgegen und berechnet mithilfe der **reduce**-Methode die genaue Anzahl eindeutiger Werte. Die Untereigenschaft **countunique_date** verfügt über einen Handler mit einer Funktion, die eindeutige Werte aus einem Array von Datumswerten ermittelt. Die Untereigenschaft **average_date** enthält einen Handler, der Durchschnittswerte aus einem Array von Datumswerten berechnet.

~~~jsx
function countUnique(values, converter) {
    const valueMap = {};
    return values.reduce((acc, d) => {
        if (converter) d = converter(d);
        if (!valueMap[d]) {
            acc++;
            valueMap[d] = true;
        }
        return acc;
    }, 0);
}

const methods = {
    countunique_date: {
        handler: values => countUnique(values, v => new Date(v).getTime()),
        type: "date",
        label: "CountUnique"
    },
    average_date: {
        type: "date",
        label: "Average",
        branchMode: "raw",
        handler: values => {
            if (!values.length) return null;
            const sum = values.reduce((acc, d) => acc + d.getTime(), 0);
            const avgTime = sum / values.length;
            return new Date(avgTime);
        }
    }
};

// Ganzzahlen für "count"- und "unique count"-Ergebnisse anzeigen
const templates = {};
fields.forEach(f => {
    if (f.type == "number")
        templates[f.id] = (v, method) =>
        v && method.indexOf("count") < 0 ? parseFloat(v).toFixed(3) : v;
});

// Datumsstring in Date-Objekt umwandeln
const dateFields = fields.filter(f => f.type == "date");
if (dateFields.length) {
    dataset.forEach(item => {
        dateFields.forEach(f => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    tableShape: { templates },
    methods: { ...pivot.defaultMethods, ...methods },
    config:{
        rows: ["state"],
        columns: [
            "product_line",
            "product_type"
        ],
        values: [
            {
                field: "sales",
                method: "sum"
            },
            {
                field: "sales",
                method: "count"
            },
            {
                field: "date",
                method: "countunique_date"
            },
            {
                field: "date",
                method: "average_date"
            }
        ]
    }
});
~~~

**Verwandtes Beispiel**: [Pivot 2. Benutzerdefinierte mathematische Methoden](https://snippet.dhtmlx.com/lv90d8q2)

**Verwandter Artikel**: [Mathematische Methoden anwenden](guides/working-with-data.md#applying-maths-methods)
