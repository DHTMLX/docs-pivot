---
sidebar_label: apply-filter
title: apply-filter Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das apply-filter-Event. Lesen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# apply-filter

### Beschreibung {#description}

@short: Wird ausgelöst, wenn ein Filter angewendet wird

### Verwendung {#usage}

~~~jsx
"apply-filter": ({
    rule: {} 
}) => boolean | void;
~~~

### Parameter {#parameters}

Der Callback der Aktion empfängt ein Objekt mit folgenden Parametern:

- `rule` - ein beliebiges Filter-Konfigurationsobjekt mit den folgenden Parametern:
  - `field` - (erforderlich) die Feld-ID, auf die der Filter angewendet wird
  - `filter` - (erforderlich) Filtertyp: 
    - für Textwerte: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith
    - für numerische Werte: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, contains, notContains
    - für Datumstypen: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween
  - `value` - (optional) der Wert, nach dem gefiltert werden soll
  - `includes` - (optional) ein Array von Werten, die aus den bereits gefilterten Einträgen angezeigt werden sollen; verfügbar für Text- und Datumswerte

:::info
Zur Verarbeitung der internen Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden
:::

### Beispiel {#example}

~~~jsx {20-23}
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
    }
});
//Gibt den Namen des Feldes, auf das der Filter angewendet wurde, in der Konsole aus
table.api.on("apply-filter", (ev) => {
    console.log("The field to which filter was applied:", ev.rule.field);
});
~~~

**Verwandte Artikel**: [api.on()](api/internal/on-method.md)
