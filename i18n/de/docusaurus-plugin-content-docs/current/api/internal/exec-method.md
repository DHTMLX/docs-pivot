---
sidebar_label: api.exec()
title: exec-Methode
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die exec-Methode. Lesen Sie Entwickleranleitungen und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# api.exec()

### Beschreibung {#description}

@short: Ermöglicht das Auslösen interner Events

## Verwendung {#usage}

~~~jsx
api.exec(
    event: string,
    config: object
): Promise<any>;
~~~

## Parameter {#parameters}

- `event` - (erforderlich) ein auszulösendes Event
- `config` - (erforderlich) das Konfigurationsobjekt mit Parametern (siehe das auszulösende Event)

## Aktionen {#actions}

:::info
Die vollständige Liste der Pivot-Events finden Sie [**hier**](api/overview/events-overview.md)
:::

## Beispiel {#example}

Im folgenden Beispiel wird das [`delete-field`](api/events/delete-field-event.md)-Event über die Methode `api.exec()` ausgelöst. Das letzte Feld wird aus dem **values**-Bereich entfernt. Die Methode [`api.getState()`](api/internal/getstate-method.md) wird hier verwendet, um den aktuellen Zustand der Pivot-[`config`](api/config/config-property.md) abzurufen. Das Event wird beim Klick auf die Schaltfläche ausgelöst.

~~~jsx {32-35}
// Pivot erstellen
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
