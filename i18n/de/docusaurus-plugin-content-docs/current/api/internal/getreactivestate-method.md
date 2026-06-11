---
sidebar_label: api.getReactiveState()
title: getReactiveState-Methode
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die getReactiveState-Methode. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# api.getReactiveState()

### Beschreibung {#description}

@short: Gibt ein Objekt mit den reaktiven Eigenschaften von Pivot zurück

### Verwendung {#usage}

~~~jsx
api.getReactiveState(): object;
~~~

### Rückgabewert {#returns}

Die Methode gibt ein Objekt mit den folgenden Parametern zurück:

~~~jsx
{
    config: {}, // aktuelle Konfiguration (Zeilen, Spalten, Werte, Filter)
    activeFilter: {}, // aktives Filter-Objekt (sofern ein Filter geöffnet ist) 
    columnShape: {}, // Konfiguration der Pivot-Spalten
    data: [], // Quelldaten
    fields: [], // Felder-Array
    filters: {}, // Filterregeln
    headerShape: {}, // Einstellungen des Tabellenkopfes
    predicates: {}, // verfügbare Prädikate nach Feldern
    limits: {}, // das maximale Limit für die Anzahl von Zeilen und Spalten im Datensatz
    methods: {}, // Methoden zur Datenaggregation
    tableShape: {}, // Tabelleneinstellungen (Größen, Gesamtzeile, Vorlagen)
    tableConfig: {}, // Tabellenkonfigurationseinstellungen (Spalten, Daten, Größen, Baumansicht, Fußzeile)
    configPanel: boolean, // der Sichtbarkeitsstatus des Konfigurationspanels
    readonly: boolean, // ob der Nur-Lese-Modus aktiviert ist
}  
~~~

### Beispiel {#example}

~~~jsx {21-26}
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

// den reaktiven Konfigurations-Store abonnieren und bei jeder Änderung protokollieren
const state = table.api.getReactiveState();

state.config.subscribe((config) => {
    console.log("Pivot config changed. Its current state:", config);
});
~~~
