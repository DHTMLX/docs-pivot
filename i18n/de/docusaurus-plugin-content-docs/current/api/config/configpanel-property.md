---
sidebar_label: configPanel
title: configPanel Konfiguration
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die configPanel-Konfiguration. Durchsuchen Sie Entwicklerhandbücher und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# configPanel

### Beschreibung {#description}

@short: Optional. Steuert die Sichtbarkeit des Konfigurationspanels in der Benutzeroberfläche

In der Benutzeroberfläche wird das Panel durch Klicken auf die Schaltfläche **Einstellungen ausblenden** ein- oder ausgeblendet.

### Verwendung {#usage}

~~~jsx  
configPanel?: boolean;
~~~

### Parameter {#parameters}

Die Eigenschaft kann auf **true** oder **false** gesetzt werden:

- `true` - Standardwert, zeigt das Konfigurationspanel an
- `false` - blendet das Konfigurationspanel aus

## Beispiel {#example}

~~~jsx {5}
// Das Konfigurationspanel wird beim Initialisieren ausgeblendet
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    configPanel: false,
    config: {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

**Verwandtes Beispiel**: [Pivot 2.0: Sichtbarkeit des Konfigurationspanels umschalten](https://snippet.dhtmlx.com/1xq1x5bo)

**Verwandte Artikel**:
- [`show-config-panel`-Event](api/events/show-config-panel-event.md)
- [`showConfigPanel()`-Methode](api/methods/showconfigpanel-method.md)
- [Sichtbarkeit des Konfigurationspanels steuern](guides/configuration.md#controlling-visibility-of-configuration-panel)
