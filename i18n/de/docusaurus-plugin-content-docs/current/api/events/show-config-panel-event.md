---
sidebar_label: show-config-panel
title: show-config-panel Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das show-config-panel Event. Durchsuchen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# show-config-panel

### Beschreibung {#description}

@short: Wird ausgelöst, wenn sich die Sichtbarkeit des Konfigurationspanels ändert

### Verwendung {#usage}

~~~jsx
"show-config-panel": ({
    mode: boolean 
}) 
~~~

### Parameter {#parameters}

Der Callback der Aktion nimmt ein Objekt mit dem folgenden Parameter entgegen:

- `mode` - (erforderlich) wenn der Wert auf **true** gesetzt ist (Standard), wird das Konfigurationspanel angezeigt; wenn er auf **false** gesetzt ist, wird das Konfigurationspanel ausgeblendet

:::info
Zur Verarbeitung der internen Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden
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
//Konfigurationspanel ausblenden
table.api.exec("show-config-panel", {
    mode: false
});
~~~

**Verwandte Artikel**:
- [Methode `showConfigPanel()`](api/methods/showconfigpanel-method.md)
- [Eigenschaft `configPanel`](api/config/configpanel-property.md)
