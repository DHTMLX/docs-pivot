---
sidebar_label: setConfig()
title: setConfig()
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die Methode setConfig(). Lesen Sie Entwickleranleitungen und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# setConfig()

### Beschreibung {#description}

@short: Aktualisiert die aktuelle Konfiguration des Pivot-Widgets

Die Methode wird verwendet, um die aktuelle Konfiguration des Pivot-Widgets zu aktualisieren. Sie ist nützlich, wenn der zugrunde liegende Datensatz des Widgets aktualisiert werden muss. Die Methode behält alle zuvor gesetzten Optionen bei, die im `setConfig`-Aufruf nicht explizit angegeben werden.

### Verwendung {#usage}

~~~jsx
setConfig(config: { [key:any]: any }): void;
~~~

### Parameter {#parameters}

- `config` - (erforderlich) ein Objekt der Pivot-Konfiguration. Die vollständige Liste der Eigenschaften finden Sie [hier](api/overview/properties-overview.md)

:::important
Die Methode ändert nur die Parameter, die Sie übergeben haben. Sie zerstört die aktuelle Komponente und initialisiert eine neue.
:::

### Beispiel {#example}

~~~jsx {21-41}
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

// Konfigurationsparameter aktualisieren
table.setConfig({
    config: {
        rows: ["studio", "genre", "duration"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            },
            {
                field: "type",
                method: "count"
            }
        ]
    }
});
~~~
