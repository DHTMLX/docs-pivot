---
sidebar_label: api.on()
title: on-Methode
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die on-Methode. Lesen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# api.on()

### Beschreibung {#description}

@short: Ermöglicht das Anhängen eines Handlers an interne Events

### Verwendung {#usage}

~~~jsx
api.on(
    event: string,
    handler: function,
    config?: { intercept?: boolean, tag?: number | string | symbol }
): void;
~~~

### Parameter {#parameters}

- `event` - (erforderlich) ein Event, das ausgelöst werden soll
- `handler` - (erforderlich) ein anzuhängender Handler (die Handler-Argumente hängen vom ausgelösten Event ab)
- `config` - (optional) ein Objekt mit den folgenden Parametern:
    - `intercept` - (optional) wenn Sie beim Erstellen des Event-Listeners `intercept: true` setzen, wird dieser Event-Listener vor allen anderen ausgeführt
    - `tag` - (optional) ein Aktions-Tag. Sie können den Tag-Namen verwenden, um einen Aktions-Handler über die [`detach`](api/internal/detach-method.md)-Methode zu entfernen

### Events {#events}

:::info
Die vollständige Liste der internen Pivot-Events finden Sie [**hier**](api/overview/main-overview.md#pivot-events).
Verwenden Sie die Methode `api.on()`, wenn Sie auf Aktionen lauschen möchten, ohne diese zu ändern. Um Änderungen an Aktionen vorzunehmen, wenden Sie die Methode [`api.intercept()`](api/internal/intercept-method.md) an.
:::

### Beispiel {#example}

Das folgende Beispiel zeigt, wie die Bezeichnung eines Feldes ausgegeben wird, für das der Filter aktiviert wurde:

~~~jsx {21-29}
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

table.api.on("open-filter", (ev) => {
    if (ev.id) {
        const { config } = table.api.getState();
        const fieldObj = config[ev.area].find((f) => f.id === ev.id);
        if (fieldObj) {
            console.log("Das Feld, für das der Filter aktiviert wurde:", fieldObj.label);
        }
    }
}, {tag: "open-filter-tag"});
~~~
