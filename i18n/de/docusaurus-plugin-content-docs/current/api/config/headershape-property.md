---
sidebar_label: headerShape
title: headerShape Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die headerShape-Konfiguration. Lesen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# headerShape

### Beschreibung {#description}

@short: Optional. Konfiguriert das Aussehen und das Verhalten der Kopfzeilen in der Pivot-Tabelle

### Verwendung {#usage}

~~~jsx  
headerShape?: {
    collapsible?: boolean,
    vertical?: boolean,
    template?: (label: string, field: string, subLabel?: string) => string,
    cellStyle?: (
        field: string, 
        value: any, 
        area: "rows"|"columns"|"values", 
        method?: string,
        isTotal?: boolean) 
        => string,
};
~~~

### Parameter {#parameters}

- `collapsible` - (optional) wenn auf **true** gesetzt, sind Dimensionsgruppen in der Tabelle einklappbar. Standardmäßig ist der Wert **false**
- `vertical` - (optional) wenn auf **true** gesetzt, wird die Textausrichtung in allen Kopfzeilen von horizontal auf vertikal geändert. Der Standardwert ist **false**
- `cellStyle` - (optional) eine Funktion, die einen benutzerdefinierten Stil auf eine Kopfzeilenzelle anwendet. Die Funktion gibt den Namen einer CSS-Klasse zurück und akzeptiert folgende Parameter:
    - `field` (string) - (erforderlich) ein String, der den Feldnamen angibt, dem die Zelle entspricht. Für die Kopfzeile der Baumspalte ist das Feld ""
    - `value` (string | number | date) - (erforderlich) der Wert einer Zelle
    - `area` - (erforderlich) ein String, der den Bereich der Tabelle angibt, in dem sich eine Zelle befindet ("rows", "columns" oder "values"-Bereich)
    - `method` (string) - (optional) ein String, der die für ein Feld aus dem "values"-Bereich ausgeführte Operation (z. B. "sum", "count" usw.) oder den Namen eines für ein Feld aus dem "columns"-Bereich festgelegten Prädikats darstellen kann
    - `isTotal` - (optional) gibt an, ob eine Zelle zu einer Gesamtspalte gehört
- `template` - (optional) definiert das Format des Texts in Kopfzeilen. Standardmäßig wird für Felder, die als Zeilen verwendet werden, der Wert des Parameters `label` angezeigt, und für Felder, die als Werte verwendet werden, werden Label und Methode angezeigt (z. B. *Oil(count)*). Die Funktion nimmt die Feld-ID, das Label und die Methode oder Prädikat-ID (falls vorhanden) entgegen und gibt den verarbeiteten Wert zurück. Das Standard-Template lautet wie folgt:
~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

## Beispiel {#example}

Im folgenden Beispiel wird für die **values**-Felder in der Kopfzeile das Label, der Methodenname (subLabel) angezeigt und das Ergebnis in Kleinbuchstaben umgewandelt (z. B. *profit (sum)*):

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // ein benutzerdefiniertes Template für den Kopfzeilentext
        template: (label, id, subLabel) => (label + (subLabel ? ` (${subLabel})` : "")).toLowerCase(),
        },
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
            // weitere Werte
        ],
    },
    fields,
});
~~~

**Verwandte Beispiele**:
- [Pivot 2. Vertikale Textausrichtung in Tabellenkopfzeilen](https://snippet.dhtmlx.com/4qroi8ka)
- [Pivot 2. Einklappbare Spalten](https://snippet.dhtmlx.com/pt2ljmcm)
- [Pivot 2. Benutzerdefiniertes CSS für Tabellen- und Kopfzeilenzellen hinzufügen](https://snippet.dhtmlx.com/nfdcs4i2)

**Verwandte Artikel**:
- [Konfiguration](guides/configuration.md)
- [Zellstil](guides/stylization.md#cell-style)
