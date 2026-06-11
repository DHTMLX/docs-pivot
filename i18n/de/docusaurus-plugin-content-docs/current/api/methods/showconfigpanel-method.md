---
sidebar_label: showConfigPanel()
title: showConfigPanel()
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die Methode showConfigPanel(). Lesen Sie Entwicklerhandbücher und API-Referenz, testen Sie Code-Beispiele und Live-Demos und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# showConfigPanel()

### Beschreibung {#description}

@short: Zeigt das Konfigurationspanel an oder blendet es aus

Diese Methode ist nützlich, wenn die Sichtbarkeit des Konfigurationspanels ohne Benutzerinteraktion gesteuert werden soll. Beispielsweise können Sie das Panel basierend auf einer anderen Interaktion oder einem anderen Zustand in Ihrer Anwendung ein- oder ausblenden.

### Verwendung {#usage}

~~~jsx
showConfigPanel({mode: boolean}): void;
~~~

### Parameter {#parameters}

- `mode` (boolean) - (erforderlich) Wenn der Wert auf **true** gesetzt ist (Standard), wird das Konfigurationspanel angezeigt; bei **false** wird es ausgeblendet

### Beispiel {#example}

~~~jsx {21-23}
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

table.showConfigPanel ({
    mode: false
})
~~~

**Verwandte Artikel**:
- [Event `show-config-panel`](api/events/show-config-panel-event.md)
- [Eigenschaft `configPanel`](api/config/configpanel-property.md)
