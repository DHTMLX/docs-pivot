---
sidebar_label: tableShape
title: tableShape Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die tableShape-Konfiguration. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# tableShape

### Beschreibung {#description}

@short: Optional. Konfiguriert das Aussehen der Pivot-Tabelle

### Verwendung {#usage}

~~~jsx
tableShape?: {
    templates?: {
        [field: string]: (
            value: any,
            operation: string
        ) => any;
    },
	totalRow?: boolean | "sumOnly",
	totalColumn?: boolean | "sumOnly",
    marks?: {
        [cssClass: string]: ((v: any, columnData: any, rowData: any) => boolean)
        | "max" 
        | "min"
    },
    sizes?: {
        rowHeight?: number,
        headerHeight?: number,
        columnWidth?: number,
        footerHeight?: number
    },
    tree?:boolean,
    cleanRows?: boolean,
    split?: {
        left?: boolean,
        right?: boolean,
    },
    cellStyle?: (
        field: string, 
        value: any, 
        area: "rows"|"columns"|"values", 
        method?: string,
        isTotal?: "row"|"column"|"both") 
        => string,
};
~~~

### Parameter {#parameters}

- `templates` - (optional) ermöglicht das Festlegen von Templates für eine Zelle; es ist ein Objekt, bei dem:
  - jeder Schlüssel eine Feld-ID ist
  - der Wert eine Funktion ist, die einen String zurückgibt und den Zellwert sowie die Operation empfängt. Alle Spalten, die auf dem angegebenen Feld basieren, erhalten das zugehörige Template angewendet. Beispielsweise können damit Maßeinheiten gesetzt oder die gewünschte Anzahl von Nachkommastellen für numerische Werte zurückgegeben werden usw. Siehe das Beispiel unten.
- `marks` - (optional) ermöglicht das Markieren einer Zelle mit den erforderlichen Werten. Es ist ein Objekt, bei dem Schlüssel CSS-Klassennamen sind und Werte entweder eine Funktion oder einer der vordefinierten Strings ("max", "min") sind. Die Funktion soll einen booleschen Wert für den geprüften Wert zurückgeben. Wenn **true** zurückgegeben wird, wird die CSS-Klasse der Zelle zugewiesen. Weitere Informationen mit Beispielen finden Sie hier: [Zellen markieren](guides/stylization.md#cell-style).
- `sizes` - (optional) definiert die folgenden Größenparameter der Tabelle:
  - `rowHeight` - (optional) die Zeilenhöhe in der Pivot-Tabelle in Pixeln. Der Standardwert ist 34
  - `headerHeight` - (optional) die Kopfzeilenhöhe in Pixeln; der Standardwert ist 30
  - `footerHeight` - (optional) die Fußzeilenhöhe in Pixeln; der Standardwert ist 30
  - `columnWidth` - (optional) die Spaltenbreite in Pixeln; der Standardwert ist 150
- `cellStyle` - (optional) eine Funktion, die einen benutzerdefinierten Stil auf eine Zelle anwendet. Die Funktion hat die folgenden Parameter:
    - `field` - (erforderlich) ein String, der den Feldnamen angibt, für den der Stil angewendet wird
    - `value` - (erforderlich) der Wert der Zelle (die tatsächlichen Daten für diese bestimmte Zeile und Spalte)
    - `area` - (erforderlich) ein String, der den Bereich der Tabelle angibt, in dem sich eine Zelle befindet ("rows", "columns" oder "values"-Bereich)
    - `method` - (optional) ein String, der die für eine Zelle ausgeführte Operation angeben kann (z. B. "sum", "count" usw.)
    - `isTotal` - (optional) gibt an, ob eine Zelle zu einer Gesamtzeile, einer Gesamtspalte oder beiden gehört: "row"|"column"|"both"  
    Die Funktion `cellStyle` gibt einen String zurück, der als CSS-Klassenname verwendet werden kann, um bestimmte Stile auf eine Zelle anzuwenden.
- `tree` - (optional) wenn auf **true** gesetzt, wird der Baumstruktur-Modus aktiviert, in dem Daten mit aufklappbaren Zeilen dargestellt werden können; der Standardwert ist **false**. Weitere Informationen mit Beispielen finden Sie hier: [Zum Baumstruktur-Modus wechseln](guides/configuration.md#enabling-the-tree-mode)
- `totalColumn` - (optional) wenn **true**, wird die Generierung der Gesamtspalte mit Gesamtwerten für Zeilen aktiviert (standardmäßig ist **false** gesetzt). Wenn der Wert auf "sumOnly" gesetzt wird, wird die Spalte mit dem Gesamtsummenwert generiert (nur für Summen-Operationen verfügbar)
- `totalRow` - (optional) wenn **true**, wird die Generierung der Fußzeile mit Gesamtwerten aktiviert (standardmäßig ist **false** gesetzt). Wenn der Wert auf "sumOnly" gesetzt wird, wird die Zeile mit dem Gesamtzeilenwert generiert (nur für Summen-Operationen verfügbar)
- `cleanRows` - (optional) wenn auf **true** gesetzt, werden doppelte Werte in Skalenspalten in der Tabellenansicht ausgeblendet. Der Standardwert ist **false**
- `split` - (optional) ermöglicht das Einfrieren von Spalten rechts oder links, abhängig vom angegebenen Parameter (siehe [Spalten einfrieren](guides/configuration.md#freezing-columns)):
    - `left` (boolean) - wenn auf **true** gesetzt (standardmäßig ist **false** gesetzt), werden die Spalten von links fixiert, sodass die Spalten beim Scrollen statisch und sichtbar bleiben. Die Anzahl der aufgeteilten Spalten entspricht der Anzahl der Zeilenfelder, die in der Eigenschaft [`config`](api/config/config-property.md) definiert sind
    - `right` (boolean) - fixiert Gesamtspalten auf der rechten Seite; Standardwert ist **false**

Standardmäßig ist `tableShape` undefiniert, was bedeutet, dass keine Gesamtzeile, keine Gesamtspalte vorhanden ist, keine Templates und Markierungen angewendet werden, die Daten als Tabelle und nicht als Baumstruktur angezeigt werden und Spalten beim Scrollen nicht fixiert sind.

## Beispiel {#example}

Im folgenden Beispiel wenden wir das Template auf die *state*-Zellen an, um den kombinierten Namen eines Bundesstaates (den vollständigen Namen und die Abkürzung) anzuzeigen.

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
// other values,
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // set a template to customize values of "state" cells
            state: v => v+ ` (${states[v]})`,
        }
    },
    fields,
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // other values
        ],
    },
    fields,
});
~~~

**Verwandte Beispiele**:

- [Pivot 2. Baumstruktur-Modus](https://snippet.dhtmlx.com/6ylkoukn)
- [Pivot 2. Eingefrorene (fixierte) Spalten](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. Zeilen-, Kopfzeilen-, Fußzeilenhöhe und Spaltenbreite festlegen](https://snippet.dhtmlx.com/x46uyfy9)
- [Pivot 2. Zeilen bereinigen](https://snippet.dhtmlx.com/rwwhgv2w?tag=pivot)
- [Pivot 2. Benutzerdefiniertes CSS für Tabellen- und Kopfzeilenzellen hinzufügen](https://snippet.dhtmlx.com/nfdcs4i2)

**Verwandte Artikel**:
- [Konfiguration](guides/configuration.md)
- [Zellenstil](guides/stylization.md#cell-style)
