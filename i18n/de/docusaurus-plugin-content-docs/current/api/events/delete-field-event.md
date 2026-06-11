---
sidebar_label: delete-field
title: delete-field Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das delete-field-Event. Lesen Sie Entwickleranleitungen und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# delete-field

### Beschreibung {#description}

@short: Wird ausgelöst, wenn ein Feld entfernt wird

### Verwendung {#usage}

~~~jsx
"delete-field": ({
    area: string,
    id: string | number
}) => boolean | void;
~~~

### Parameter {#parameters}

Der Callback der Aktion erhält ein Objekt mit den folgenden Parametern:

- `area` - (erforderlich) der Name des Bereichs, aus dem ein Feld entfernt wird; mögliche Werte: "rows", "columns" oder "values"
- `id` - (erforderlich) die ID des Feldes, das entfernt wird

:::info
Zur Verarbeitung der internen Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden.
:::

### Beispiel {#example}

Im folgenden Beispiel wird die Aktion `delete-field` über die Methode [`api.exec()`](api/internal/exec-method.md) ausgelöst. Das letzte Feld wird aus dem **values**-Bereich entfernt. Die Methode [`api.getState()`](api/internal/getstate-method.md) wird verwendet, um den aktuellen Zustand der Pivot-[`config`](api/config/config-property.md) abzurufen. Die Aktion wird durch einen Button-Klick ausgelöst.

~~~jsx {31-34}
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

//API-Methoden aufrufen: einen bestimmten Wert aus values in config entfernen
function removeLastField() {
    if (table.api) {
        const state = table.api.getState();
        const config = state.config;

        const count = config.values.length;

        if (count) {
            const lastValue = config.values[count - 1];

            table.api.exec("delete-field", {
                area: "values",
                id: lastValue.id, // automatisch generierte ID eines zu config.values hinzugefügten Elements
            });
        }
    }
}

const button = document.createElement("button");

button.addEventListener("click", removeLastField);
button.textContent = "Remove";

document.body.appendChild(button);
~~~
