---
sidebar_label: update-config
title: update-config Event
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie alles über das update-config-Event. Erkunden Sie Entwicklerhandbücher und API-Referenzen, testen Sie Code-Beispiele und Live-Demos und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# update-config

### Beschreibung {#description}

@short: Wird ausgelöst, wenn Zeilen, Spalten oder Aggregationsfunktionen über die Pivot-Benutzeroberfläche geändert werden

Die Aktion ist nützlich, um die Aggregationskonfiguration eines Benutzers zu speichern, damit sie beim nächsten Verwenden des Widgets angewendet werden kann und der Benutzer dort fortfahren kann, wo er aufgehört hat.

### Verwendung {#usage}

~~~jsx
"update-config": ({
    rows: string[],
    columns: string[],
    values: [],
    filters: {}
}) => boolean | void;
~~~

### Parameter {#parameters}

Der Callback der Aktion nimmt ein Objekt mit den verarbeiteten [`config`](api/config/config-property.md)-Parametern entgegen:

- `rows` - Zeilen der Pivot-Tabelle. Ein Objekt mit der Feld-ID und einer Methode zur Datenextraktion; die Objektparameter sind folgende:
  - `field` - die ID eines Feldes
  - `method` - eine Methode zur Datenextraktion (für zeitbasierte Datenfelder)
- `columns` - definiert die Spalten der Pivot-Tabelle. Es handelt sich um ein Objekt mit der Feld-ID und einer Methode zur Datenextraktion; die Objektparameter sind folgende:
  - `field` - die ID eines Feldes
  - `method` - definiert eine Methode zur Datenextraktion (für zeitbasierte Datenfelder).
  Standardmäßig stehen Methoden für zeitbasierte Felder (Typ **date**) mit folgenden Werten zur Verfügung: "year", "quarter", "month", "week", "day", "hour", "minute"
- `values` - definiert die Datenaggregation für die Zellen der Pivot-Tabelle. Es handelt sich um ein Objekt, das die Feld-ID und die Methode zur Datenaggregation enthält. Die Objektparameter sind folgende:
  - `field` - die ID eines Feldes
  - `method` - definiert eine Methode zur Datenextraktion; zu Methoden und möglichen Optionen siehe [Methoden anwenden](guides/working-with-data.md#default-methods)
- `filters` - (optional) definiert, wie Daten in der Tabelle gefiltert werden; es handelt sich um ein Objekt mit Feld-IDs und der Datenaggregationsmethode. Die Beschreibung des `filter`-Objekts finden Sie hier: [`config`](api/config/config-property.md)

:::info
Zur Verarbeitung der internen Events können Sie die [Event-Bus-Methoden](api/overview/internal-eventbus-overview.md) verwenden.
:::

### Rückgabewert {#returns}

Der Callback kann einen booleschen Wert oder void zurückgeben.  
Gibt die Event-Handler-Funktion *false* zurück, wird die Operation, die das Event ausgelöst hat, blockiert und der `update-config`-Vorgang wird angehalten.

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
//das Config-Objekt in die Konsole ausgeben
table.api.on("update-config", (config) => {
    console.log("Config has changed", config);
});
~~~

**Verwandte Artikel**: [api.intercept()](api/internal/intercept-method.md)
