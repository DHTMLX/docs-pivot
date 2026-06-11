---
sidebar_label: template
title: template
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über den Pivot-Template-Helper. Entwicklerhandbücher und API-Referenz, Code-Beispiele und Live-Demos sowie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot.
---

### Beschreibung {#description}

Die Funktion `template` ermöglicht es, ein Template auf die Kopf- und Datenzellen der Tabelle anzuwenden.

### Verwendung {#usage}

Für Datenzellen:

~~~jsx
pivot.template({value, method, row, column}) => string; 
~~~

Für Kopfzellen:

~~~jsx
pivot.template({value, field, method, cell, column}) =>  string;
~~~

### Parameter {#parameters}

Für Datenzellen akzeptiert die Funktion die folgenden Parameter:

- `value` (any) - (erforderlich) roher Zellenwert
- `method` (string) - (erforderlich) eine Methode oder ein Prädikat, das für eine Spalte verwendet wird
- `row` - (erforderlich) ein Objekt mit Zeilendaten:
    - `id` (number) - (erforderlich) Zeilen-ID
    - `values` (array) - (erforderlich) ein Array mit Zeilendaten
    - `open` (boolean)- (optional) Zweigstatus
    - `$level` (boolean)- (optional) Zweigindex
- `column` - (erforderlich) ein Objekt mit Spaltendaten:
    - `id` (number) - (erforderlich) die ID einer Spalte
    - `cell` (any) - (optional) ein Template mit dem Zellinhalt (siehe [Templates über den Template-Helper hinzufügen](guides/configuration.md#adding-a-template-via-the-template-helper))    
    - `template` - (optional) das Template, das über die Eigenschaft [`tableShape`](api/config/tableshape-property.md) definiert wird
    - `fields` (array) - (optional) definiert Felder in der hierarchischen Spalte im Baumstruktur-Modus. Gibt die Felder an, die in dieser Spalte auf verschiedenen Ebenen angezeigt werden
     - `field` - (optional) eine Zeichenkette, die die ID eines Felds darstellt
    - `method` (string) - (optional) eine Methode, sofern für ein Feld in dieser Spalte definiert
    - `methods` (array) - (optional) definiert Methoden, die auf Felder in der hierarchischen Spalte im Baumstruktur-Modus angewendet werden
    - `format` (string or object) - (erforderlich) Datumsformat oder Zahlenformat (siehe [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields))
    - `isNumeric` (boolean) - (optional) gibt an, ob eine Spalte numerische Werte enthält
    - `isTotal` (boolean) - (optional) gibt an, ob es sich um eine Gesamtspalte handelt
    - `area` (string) - (optional) der Bereich, in dem die Spalte gerendert wird: "rows", "columns", "values"
    - `header`- (optional) ein Array von Kopfzellen mit den folgenden Eigenschaften für jede Zelle:
        - `text` (string) - (optional) Zellentext, formatierter Wert oder mit einem Prädikat-Template verarbeiteter Wert
        - `rowspan` (number) - (optional) die Anzahl der Zeilen, die eine Kopfzeile überspannen soll
        - `colspan` (number) - (optional) die Anzahl der Spalten, die eine Kopfzeile überspannen soll
        - `value` (any) - (erforderlich) roher Wert, wenn eine Zelle zum Bereich "columns" gehört
        - `field` (string) - (erforderlich) ein Feld, dessen Wert angezeigt wird, wenn eine Zelle zum Bereich "columns" gehört
        - `method` (string) - (erforderlich) das Feld-Prädikat, wenn eine Zelle zum Bereich "columns" gehört und ein Prädikat definiert ist
        - `format` (string or object) - Datumsformat oder Zahlenformat (siehe [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields))

Für Kopfzellen sind die Funktionsparameter wie folgt:

- `value` (any) - (erforderlich) roher Zellenwert
- `method` (string) - (optional) ein Prädikat, das für eine Spalte verwendet wird
- `field` (string) - (optional) ein Feld, dessen Wert in einer Zelle angezeigt wird
- `cell` - (erforderlich) ein Objekt mit Zellendaten:
    - `text` (string) - (optional) Zellentext, formatierter Wert oder mit einem Prädikat-Template verarbeiteter Wert
    - `rowspan` (number) - (optional) die Anzahl der Zeilen, die eine Kopfzeile überspannen soll
    - `colspan` (number) - (optional) die Anzahl der Spalten, die eine Kopfzeile überspannen soll
    - `value` (any) - (erforderlich) roher Wert, wenn eine Zelle zum Bereich "columns" gehört
    - `field` (string) - (erforderlich) ein Feld, dessen Wert angezeigt wird, wenn eine Zelle zum Bereich "columns" gehört
    - `method` (string) - (erforderlich) ein Feld-Prädikat, wenn eine Zelle zum Bereich "columns" gehört und ein Prädikat definiert ist
    - `format` (string or object) - (erforderlich) Datumsformat oder Zahlenformat (siehe [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields))
- `column` - (erforderlich) ein Objekt mit Spaltendaten (identisch mit dem für die Datenzelle)

### Beispiel {#example}

Das folgende Snippet zeigt, wie Templates über den `pivot.template`-Helper definiert werden. Der Helper wird unmittelbar vor dem Rendern der Tabelle angewendet, indem das Ereignis [render-table](api/events/render-table-event.md) mithilfe der Methode [api.intercept()](api/internal/intercept-method.md) abgefangen wird.

Das Snippet demonstriert, wie Sie Symbole hinzufügen können zu:

- Datenzellen basierend auf ihrem Feld (id, user_score) (das Template fügt Flaggen- und Stern-Symbole hinzu)
- den Kopfzellen-Labels basierend auf dem Feldnamen (zum Beispiel wird bei dem Feld "id" das Globus-Symbol neben dem Kopfzellenwert hinzugefügt)
- den Spaltenköpfen basierend auf dem Wert (farbige Pfeil-Indikatoren werden hinzugefügt)

<iframe src="https://snippet.dhtmlx.com/4viq7cft?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>


**Verwandte Artikel**:

- [`render-table`](api/events/render-table-event.md)
- [Templates auf Zellen anwenden](guides/configuration.md#applying-templates-to-cells)
- [Templates auf Kopfzeilen anwenden](guides/configuration.md#applying-templates-to-headers)
