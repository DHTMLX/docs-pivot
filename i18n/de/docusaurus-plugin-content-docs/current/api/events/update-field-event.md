---
sidebar_label: update-field
title: update-field Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das update-field-Event. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# update-field

### Beschreibung {#description}

@short: Wird ausgelöst, wenn ein Feld aktualisiert wird

### Verwendung {#usage}

~~~jsx
"update-field": ({
    id: string | number,
    method: string,
    area: string
}) => boolean;
~~~

### Parameter {#parameters}

Der Callback der Aktion erhält ein Objekt mit den folgenden Parametern:

- `id` - (erforderlich) die ID des Feldes, das aktualisiert wird
- `method` - (erforderlich) die Methode kann einen der folgenden Werte annehmen:
  - Für den **values**-Bereich ist es ein String mit einem der Datenoperationstypen: [Standardmethoden](guides/working-with-data.md#default-methods)
  - Für die Bereiche **rows** und **columns** kann es ein Datenprädikatwert mit einem der folgenden Werte sein: "year", "quarter", "month", "week", "day", "hour", "minute". Standardmäßig wird der Rohwert gesetzt.
  Wenn ein benutzerdefiniertes Prädikat oder eine benutzerdefinierte Methode gesetzt ist, muss die ID für die Eigenschaft [predicate](api/config/predicates-property.md) oder [methods](api/config/methods-property.md) angegeben werden.
- `area` - (erforderlich) der Name des Bereichs, in dem ein Feld aktualisiert wird; mögliche Werte sind "rows", "columns" oder "values"

:::info
Zur Behandlung der internen Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden.
:::

### Beispiel {#example}

~~~jsx {19-22}
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
//die ID des aktualisierten Feldes in der Konsole ausgeben
table.api.on("update-field", (ev) => {
    console.log("The id of the field that was updated:", ev.id);
});
~~~

**Verwandte Artikel**:
- [api.on()](api/internal/on-method.md)
- [Methoden](api/config/methods-property.md)
