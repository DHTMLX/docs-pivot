---
sidebar_label: move-field
title: move-field Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das move-field-Event. Lesen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# move-field

### Beschreibung {#description}

@short: Wird ausgelöst, wenn Felder neu angeordnet werden

### Verwendung {#usage}

~~~jsx
"move-field": ({
    area: string,
    id: string | number,
    before?: string,
    after?: string
}) => void | boolean;
~~~

### Parameter {#parameters}

Der Callback der Aktion erhält ein Objekt mit den folgenden Parametern:

- `area` - (erforderlich) der Name des Bereichs, in dem die Neuanordnung stattfindet; mögliche Werte sind „rows", „columns" oder „values"
- `id` - (erforderlich) die ID des verschobenen Feldes
- `before` - (optional) die ID des Feldes, vor dem das verschobene Feld platziert wird
- `after` - (optional) die ID des Feldes, nach dem das verschobene Feld platziert wird

:::info
Zur Behandlung der internen Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden
:::

### Beispiel {#example}

~~~jsx {20-23}
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

//die ID des neu angeordneten Feldes in der Konsole ausgeben
table.api.on("move-field", (ev) => {
    console.log("The id of the reordered field:", ev.id);
});
~~~

**Verwandte Artikel**: [api.on()](api/internal/on-method.md)
