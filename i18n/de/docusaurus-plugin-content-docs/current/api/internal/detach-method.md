---
sidebar_label: api.detach()
title: detach-Methode
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die detach-Methode. Lesen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# api.detach()

## Beschreibung {#description}

@short: Ermöglicht das Entfernen/Abtrennen von Action-Handlern

## Verwendung {#usage}

~~~jsx
api.detach(tag: number | string ): void;
~~~

## Parameter {#parameters}

- `tag` - der Name des Action-Tags

### Beispiel {#example}

Im folgenden Beispiel fügen wir dem [`api.on()`](api/internal/on-method.md)-Handler ein Objekt mit der **tag**-Eigenschaft hinzu und verwenden anschließend die Methode `api.detach()`, um das Protokollieren der [`open-filter`](api/events/open-filter-event.md)-Action zu beenden.

~~~jsx {31-34}
// Pivot erstellen
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
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

// Handler hinzufügen
if (table.api) {
    table.api.on(
        "open-filter",
        ({ area }) => {
            console.log("Opened: " + area);
        },
        { tag: "track" }
    );
}

// Handler abtrennen
function stop() {
    table.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Protokollierung beenden";

document.body.appendChild(button);
~~~
