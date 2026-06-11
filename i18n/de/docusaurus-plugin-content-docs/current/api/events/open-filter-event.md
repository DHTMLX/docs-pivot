---
sidebar_label: open-filter
title: open-filter Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das open-filter-Event. Lesen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# open-filter

### Beschreibung {#description}

@short: Wird ausgelöst, wenn ein Filter für ein Feld aktiviert wird

### Verwendung {#usage}

~~~jsx
"open-filter": ({
    id: string | null,
    area?: "values" | "rows" | "columns"
}) => boolean | void;
~~~

### Parameter {#parameters}

Der Callback der Aktion nimmt die folgenden Parameter entgegen:

- `area` - der Bereich, in dem ein Feld angewendet wird ("rows", "columns", "values")
- `id` - die ID eines Feldes; wenn es ein einzelnes id-Argument mit dem Wert null gibt, wird der Filter geschlossen.

:::info
Für die Verarbeitung der internen Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden.
:::

### Rückgabewert {#returns}

Die Funktion kann entweder einen booleschen Wert oder void zurückgeben. Wenn sie **false** zurückgibt, wird die betreffende Event-Operation angehalten.

### Beispiel {#example}

Das folgende Beispiel zeigt, wie das Konfigurationsfenster beim Schließen der Filterbox ausgeblendet werden kann:

~~~jsx {20-27}
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
            }
        ]
    }
});

table.api.on("open-filter", (ev) => {
    if(!ev.id) {
        table.api.exec("show-config-panel", {
            mode: false
        });
    }    
});
~~~

Im nächsten Beispiel wird die ID des Feldes, für das der Filter aktiviert ist, in der Konsole ausgegeben:

~~~jsx {20-22}
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

table.api.on("open-filter", (ev) => {
    console.log("Die Feld-ID, für die der Filter aktiviert ist:", ev.id);
});
~~~
