---
sidebar_label: columnShape
title: columnShape Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die columnShape-Konfiguration. Durchsuchen Sie Entwickleranleitungen und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# columnShape

### Beschreibung {#description}

@short: Optional. Konfiguriert das Aussehen und Verhalten der Pivot-Spalten

### Verwendung {#usage}

~~~jsx  
columnShape?: {
    sort?: boolean,
    width?: {
        [field: string]: number
    },
    autoWidth?: {
        columns: {
            [field: string]: boolean
        },
        auto?: boolean | "header" | "data",
        maxRows?: number,
        firstOnly?: boolean
    }
};
~~~

### Parameter {#parameters}

- `sort` - (optional) wenn **true** (Standard), ist die Sortierung in der Benutzeroberfläche durch Klicken auf den Spaltenheader aktiviert; wenn **false**, ist die Sortierung deaktiviert
- `width` - (optional) definiert die Breite einer Spalte; es handelt sich um ein Objekt, bei dem jeder Schlüssel eine Feld-ID ist und der Wert die Breite der Spalte in Pixeln angibt
- `autoWidth` - (optional) ein Objekt, das festlegt, wie die Spaltenbreite automatisch berechnet werden soll. Die Standardkonfiguration verwendet 20 Zeilen, und die Breite wird anhand von Header und Daten berechnet, wobei jedes Feld nur einmal analysiert wird. Die Objektparameter sind folgende:
    - `columns` - (erforderlich) ein Objekt, bei dem jeder Schlüssel eine Feld-ID ist und der boolesche Wert angibt, ob die Spaltenbreite automatisch berechnet werden soll
    - `auto` - (optional) wenn auf **header** gesetzt, wird die Breite an den Header-Text angepasst; wenn auf **data** gesetzt, wird die Breite an die Zelle mit dem breitesten Inhalt angepasst; wenn auf **true** gesetzt, wird die Breite an den Inhalt von Headern und Zellen angepasst.
    Wenn autowidth auf **false** gesetzt ist, wird der `width`-Wert verwendet oder der Wert von `columnWidth` aus der [`tableShape`](api/config/tableshape-property.md)-Eigenschaft angewendet.
    - `maxRows` - (optional) die Anzahl der Zeilen, die für die autoWidth-Berechnung verarbeitet werden sollen
    - `firstOnly` - (optional) wenn auf **true** gesetzt (Standard), wird jedes Feld derselben Daten nur einmal analysiert, um die Spaltenbreite zu berechnen; bei mehreren Spalten, die auf denselben Daten basieren (z. B. das Feld *oil* mit der Operation *count* und das Feld *oil* mit der Operation *sum*), werden nur die Daten in der ersten Spalte analysiert, und die übrigen erben diese Breite

## Beispiel {#example}

~~~jsx {18-31}
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
    },
    columnShape: {
        autoWidth: {
            // Spaltenbreite für diese Felder berechnen
            columns: {
                studio: true,
                genre: true,
                title: true,
                score: true
            },
            auto: true,
            // alle Felder analysieren
            firstOnly: false
        }
    }
});
~~~

**Verwandte Beispiele**:
- [Pivot 2. Automatische Breite. Spalten an den Inhalt anpassen](https://snippet.dhtmlx.com/tn1yw14m)
- [Pivot 2. Spaltenbreite festlegen](https://snippet.dhtmlx.com/ceu34kkn)
