---
sidebar_label: export
title: export
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das export-Event. Lesen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter
---

# export

### Beschreibung {#description}

@short: Wird ausgelöst, wenn Daten exportiert werden

Um das Table-Event auszulösen, muss auf die Table-Instanz innerhalb von Pivot über die Methode [`getTable`](api/methods/gettable-method.md) zugegriffen werden.

### Verwendung {#usage}

```jsx
"export": ({
    options: {
        format: "csv" | "xlsx",
        fileName?: string,
        header?: boolean,
        footer?: boolean,
        download?: boolean,

        /* XLSX-Einstellungen*/
        styles?: boolean | {
            header?: {
                fontWeight?: "bold",
                color?: string,
                background?: string,
                align?: "left"|"right"|"center",
                borderBottom?:  string,
                borderRight?:  string,
            }
            lastHeaderCell?:  { /*  wie header */  },
            cell?: { /*  wie header */ };
            firstFooterCell?: { /*  wie header */ },
            footer?: {/*  wie header */},
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

        /* CSV-Einstellungen */
        rows: string,
        cols: string,
    },
    result?: any,
}) => boolean|void;
```

Die `export`-Aktion des Table-Widgets verfügt über folgende Parameter, die Sie nach Bedarf konfigurieren können:

- `options` - ein Objekt mit den Export-Optionen; die Optionen unterscheiden sich je nach Formattyp
- `result` - das Ergebnis der exportierten Excel- oder CSV-Daten (in der Regel ein Blob oder eine Datei, abhängig von der Option `download`)

    **Gemeinsame Optionen für beide Formate ("csv" und "xlsx")**:

    - `format` (string) - (optional) das Exportformat, das "csv" oder "xlsx" sein kann
    - `fileName` (string) - (optional) ein Dateiname (standardmäßig "data")
    - `header` (boolean) - (optional) legt fest, ob eine Kopfzeile exportiert werden soll (standardmäßig **true**)
    - `footer` (boolean) - (optional) legt fest, ob eine Fußzeile exportiert werden soll (standardmäßig **true**)
    - `download` (boolean) - (optional) legt fest, ob eine Datei heruntergeladen werden soll. Standardmäßig ist **true** gesetzt. Wenn auf **false** gesetzt, wird die Datei nicht heruntergeladen; Excel- oder CSV-Daten (Blob) sind dann als `ev.result` verfügbar

     **Optionen spezifisch für das "xlsx"-Format**:

    - `sheetName` (string) - der Name des Excel-Tabellenblatts (standardmäßig "data")
    - `styles` (boolean oder Objekt) - wenn auf **false** gesetzt, wird das Grid ohne jegliche Formatierung exportiert; kann über eine Menge von Style-Eigenschaften konfiguriert werden:
        - `header` - ein Objekt mit den folgenden Einstellungen für Kopfzeilenzellen:
            - `fontWeight` (string) - (optional) kann auf "bold" gesetzt werden; andernfalls wird die Schrift normal dargestellt
            - `color` (string) - (optional) Textfarbe in der Kopfzeile
            - `background` (string) - (optional) Hintergrundfarbe für die Kopfzeile
            - `align` - (optional) Textausrichtung, die "left"|"right"|"center" sein kann. Wenn nicht gesetzt, wird die in Excel festgelegte Ausrichtung verwendet
            - `borderBottom` (string) - (optional) der Stil des unteren Rahmens
            - `borderRight` (string) - (optional) der Stil des rechten Rahmens (z. B. *borderRight:  "0.5px solid #dfdfdf"*)
        - `lastHeaderCell` - Style-Eigenschaften für die letzte Zeile der Kopfzeilenzellen. Die Eigenschaften sind dieselben wie für *header*
        - `cell` - Style-Eigenschaften für Datenzellen. Die Eigenschaften sind dieselben wie für *header*
        - `firstFooterCell` - Style-Eigenschaften für die erste Zeile der Fußzeilenzellen. Die Eigenschaften sind dieselben wie für *header*
        - `footer` - Style-Eigenschaften für Fußzeilenzellen. Die Eigenschaften sind dieselben wie für *header*
    - `cellTemplate` - eine Funktion zur Anpassung des Exportwerts jeder Zelle. Sie erhält den Wert, das Zeilen- und das Spaltenobjekt als Parameter und gibt den benutzerdefinierten Wert für den Export zurück
    - `headerCellTemplate` - eine Funktion, die den Wert einer Kopf- oder Fußzeilenzelle beim Export anpasst. Sie wird mit dem Text, dem Kopfzeilenzell-Objekt, dem Spaltenobjekt und dem Zellentyp ("header" oder "footer") aufgerufen. Dadurch können die exportierten Kopf-/Fußzeilenwerte geändert werden
    - `cellStyle` - eine Funktion, die die Formatierung einzelner Zellen beim Export anpasst. Sie erhält den Wert, das Zeilen- und das Spaltenobjekt als Parameter und sollte ein Objekt mit Style-Eigenschaften zurückgeben (z. B. Ausrichtung oder Format)
    - `headerCellStyle` - ähnlich wie cellStyle, aber speziell für Kopf- und Fußzeilenzellen. Diese Funktion erhält den Text, das Kopfzeilenzell-Objekt, das Spaltenobjekt und den Typ ("header" oder "footer") und gibt Style-Eigenschaften zurück
    :::note
    Standardmäßig werden beim "xlsx"-Format Datums- und Zahlenfelder als Rohwerte mit dem Standardformat oder dem über die Eigenschaft [`fields`](api/config/fields-property.md) definierten Format exportiert. Ist jedoch eine Vorlage für ein Feld definiert (siehe Eigenschaft [`tableShape`](api/config/tableshape-property.md)), wird der durch diese Vorlage gerenderte Wert exportiert. Wenn sowohl eine Vorlage als auch `format` gesetzt sind, überschreiben die Vorlageneinstellungen die Formateinstellungen.
    :::

    **Optionen spezifisch für das "csv"-Format**:

    - `rows` (string) - (optional) Zeilentrennzeichen, standardmäßig "\n"
    - `cols` (string) - (optional) Spaltentrennzeichen, standardmäßig "\t"

## Beispiel {#example}

In diesem Snippet sehen Sie, wie Daten exportiert werden:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Verwandte Artikel**:
- [`getTable`](api/methods/gettable-method.md)
- [Daten exportieren](guides/exporting-data.md)
- [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields)
