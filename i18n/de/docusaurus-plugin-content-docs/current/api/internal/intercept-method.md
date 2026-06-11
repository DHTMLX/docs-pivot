---
sidebar_label: api.intercept()
title: intercept-Methode
description: Sie können mehr über die intercept-Methode in der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren. Lesen Sie Entwickleranleitungen und API-Referenzen, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# api.intercept()

### Beschreibung {#description}

@short: Ermöglicht das Abfangen und Verhindern interner Events

### Verwendung {#usage}

~~~jsx
api.intercept(
    event: string,
    callback: function,
    config?: { tag?: number | string | symbol } 
): void;
~~~

### Parameter {#parameters}

- `event` - (erforderlich) ein auszulösendes Event
- `callback` - (erforderlich) ein auszuführender Callback (die Callback-Argumente hängen vom ausgelösten Event ab)
- `config` - (optional) ein Objekt, das den folgenden Parameter enthält:
    - `tag` - (optional) ein Aktions-Tag. Sie können den Tag-Namen verwenden, um einen Aktions-Handler über die [`detach`](api/internal/detach-method.md)-Methode zu entfernen

### Events {#events}

:::info
Die vollständige Liste der internen Pivot-Events finden Sie [**hier**](api/overview/main-overview.md#pivot-events).
Verwenden Sie die Methode [`api.on()`](api/internal/on-method.md), wenn Sie auf die Aktionen lauschen möchten, ohne sie zu verändern. Um Änderungen an den Aktionen vorzunehmen, verwenden Sie die Methode `api.intercept()`.
:::

### Beispiel {#example}

Das Beispiel zeigt, wie alle einklappbaren Zeilen beim Initialisieren geschlossen werden.

~~~jsx {21-24}
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

//alle Zeilen beim Initialisieren schließen
table.api.intercept("render-table", (ev) => {
    ev.config.data.forEach((row) => (row.open = false));
}, {tag: "render-table-tag"});
~~~

**Verwandte Artikel**: [`render-table`](api/events/render-table-event.md)
