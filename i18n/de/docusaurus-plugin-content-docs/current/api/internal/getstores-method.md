---
sidebar_label: api.getStores()
title: getStores-Methode
description: Sie können mehr über die getStores-Methode in der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren. Durchsuchen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# api.getStores()

### Beschreibung {#description}

@short: Gibt ein Objekt mit den DataStore-Eigenschaften von Pivot zurück

### Verwendung {#usage}

~~~jsx
api.getStores(): object;
~~~

### Rückgabewert {#returns}

Die Methode gibt ein Objekt mit den **DataStore**-Parametern zurück:

~~~jsx
{
    data: DataStore // ( Objekt mit Parametern )
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

const stores = table.api.getStores();
console.log("DataStore:", stores);
~~~
