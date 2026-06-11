---
sidebar_label: api.setNext()
title: setNext Methode
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die setNext-Methode. Lesen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# api.setNext()

### Beschreibung {#description}

@short: Ermöglicht das Hinzufügen einer Aktion in die Event-Bus-Reihenfolge

### Verwendung {#usage}

~~~jsx
api.setNext(next: any): void;
~~~

### Parameter {#parameters}

- `next` - (erforderlich) die Aktion, die in die **Event Bus**-Reihenfolge aufgenommen werden soll  

### Beispiel {#example}

Das folgende Beispiel zeigt, wie die Methode `api.setNext()` verwendet wird, um eine benutzerdefinierte Klasse in die Event-Bus-Reihenfolge zu integrieren:

~~~jsx {13-14}
const table = new pivot.Pivot("#root", { fields: [], data: [] });
const server = "https://some-backend-url";

// Angenommen, Sie haben eine benutzerdefinierte Server-Service-Klasse namens someServerService
const someServerService = new ServerDataService(server);

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({ data, fields });
    
    // Den serverDataService in die Event-Bus-Reihenfolge des Widgets integrieren
    table.api.setNext(someServerService);
});
~~~

**Verwandte Artikel**: [`setConfig`](api/methods/setconfig-method.md)
