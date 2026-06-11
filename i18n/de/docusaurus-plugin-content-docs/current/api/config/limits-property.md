---
sidebar_label: limits
title: limits Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die limits-Konfiguration. Entdecken Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# limits

### Beschreibung {#description}

@short: Optional. Legt die maximale Anzahl von Zeilen und Spalten im endgültigen Datensatz fest

Weitere Informationen finden Sie unter [Datenmenge begrenzen](guides/working-with-data.md#limiting-loaded-data).

### Verwendung {#usage}

~~~jsx
limits?: {
    rows?: number,
    columns?: number,
    raws?: number
};
~~~

### Parameter {#parameters}

Die Parameter legen fest, wann das Rendering der Daten unterbrochen wird:

- `rows` - (optional) legt die maximale Anzahl von Zeilen im endgültigen Datensatz fest; der Standardwert ist 10000.
- `columns` - (optional) legt die maximale Anzahl von Spalten im endgültigen Datensatz fest; der Standardwert ist 5000.
- `raws` - (optional) die maximale Anzahl von Quelldatenzeilen vor der Gruppierung der Daten (Rohdatensätze für die Aggregation); der Standardwert ist unendlich.

:::note
Limits werden für große Datensätze verwendet. Die Limit-Werte sind Näherungswerte und geben nicht die genauen Anzahlen von Zeilen und Spalten an.
:::

## Beispiel {#example}

~~~jsx {18}
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
            },
        ],
    },
    limits:{ rows: 25, columns: 4 }
});
~~~

**Verwandtes Beispiel**: [Pivot 2. Datenlimits](https://snippet.dhtmlx.com/7ryns8oe)
