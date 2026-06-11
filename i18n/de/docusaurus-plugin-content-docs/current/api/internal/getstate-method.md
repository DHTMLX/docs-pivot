---
sidebar_label: api.getState()
title: getState-Methode
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die getState-Methode. Erkunden Sie Entwicklerleitfäden und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# api.getState()

### Beschreibung {#description}

@short: Gibt ein Objekt mit den StateStore-Eigenschaften von Pivot zurück

### Verwendung {#usage}

~~~jsx
api.getState(): object;
~~~

### Rückgabewert {#returns}

Die Methode gibt ein Objekt mit folgenden Parametern zurück:

~~~jsx
{
    config: {}, // aktuelle Konfiguration (rows, columns, values, filters)
    activeFilter: {}, // aktives Filter-Objekt (sofern ein Filter geöffnet ist) 
    columnShape: {}, // Konfiguration der Pivot-Spalten
    data: [], // Quelldaten
    fields: [], // Felder-Array
    filters: {}, // Filterregeln
    headerShape: {}, // Einstellungen des Tabellen-Headers
    predicates: {}, // verfügbare Prädikate je Feld
    limits: {}, // maximales Limit für die Anzahl der Zeilen und Spalten im Datensatz
    methods: {}, // Methoden zur Datenaggregation
    tableShape: {}, // Tabellen-Einstellungen (Größen, Gesamtzeile, Templates)
    tableConfig: {}, // Tabellen-Konfigurationseinstellungen (Spalten, Daten, Größen, Baumansicht, Fußzeile)
    configPanel: boolean, // Status der Sichtbarkeit des Konfigurationspanels
    readonly: boolean, // ob der schreibgeschützte Modus aktiviert ist
}  
~~~

### Beispiel {#example}

~~~jsx {21-22}
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

const { config } = table.api.getState();
console.log(config); //den Konfigurations-State in der Konsole ausgeben
~~~
