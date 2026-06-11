---
sidebar_label: add-field
title: add-field Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das add-field-Event. Lesen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# add-field

### Beschreibung {#description}

@short: Wird ausgelöst, wenn ein neues Feld zum Bereich Zeilen, Spalten oder Werte hinzugefügt wird

### Verwendung {#usage}

~~~jsx
"add-field": ({
    id?: string | number,
    area: string,
    field: string | number,
    method?: string
}) => boolean;
~~~

### Parameter {#parameters}

Der Callback der Aktion erhält ein Objekt mit den folgenden Parametern:

- `id` - (optional) die gewünschte ID eines neuen Feldes; wenn sie nicht festgelegt ist, wird eine automatisch generierte ID vergeben
- `area` - (erforderlich) der Name des Bereichs, dem ein neues Feld hinzugefügt wird; mögliche Werte sind "rows", "columns" oder "values"
- `field` - (erforderlich) der Name eines Feldes
- `method` - (optional) definiert eine Methode zur Datenaggregation (wenn nicht angegeben, wird die erste für diesen Datentyp geeignete Methode verwendet); eine Methode kann einer der folgenden sein:
  - Für den Bereich **values** ist sie erforderlich und gibt als Zeichenkette einen der Datenoperationstypen an: [Standardmethoden](guides/working-with-data.md#default-methods)
  - Für die Bereiche **rows** und **columns** ist sie optional; wenn ein Wert festgelegt ist, handelt es sich um ein Prädikat. Es kann ein benutzerdefiniertes Prädikat oder eines der Standardwerte sein: "year", "quarter", "month", "week", "day", "hour", "minute". Standardmäßig wird der Rohwert verwendet.
  Wenn ein benutzerdefiniertes Prädikat oder eine benutzerdefinierte Methode festgelegt ist, muss die ID für die Eigenschaft [predicates](api/config/predicates-property.md) oder [methods](api/config/methods-property.md) angegeben werden.

:::info
Zur Behandlung interner Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden.
:::

### Beispiel {#example}

Im folgenden Beispiel verwenden wir die Methode [`api.intercept()`](api/internal/intercept-method.md), um dem Wertefeld mit dem Datentyp **number** eine neue Methode hinzuzufügen:

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
//Werte mit einer vordefinierten Methode hinzufügen
table.api.intercept("add-field", (ev) => {
    const { fields } = table.api.getState();
    const type = fields.find((f) => f.id == ev.field).type;

    if (ev.area == "values" && type == "number") {
        ev.method = "min";
    }
});
~~~

**Verwandte Artikel**: [api.intercept()](api/internal/intercept-method.md)
