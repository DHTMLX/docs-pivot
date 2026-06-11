---
sidebar_label: config
title: config Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die config-Konfigurationseigenschaft. Lesen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# config

### Beschreibung {#description}

@short: Optional. Definiert die Struktur der Pivot-Tabelle und die Art der Datenaggregation

### Verwendung {#usage}

~~~jsx
config?: {
    rows?: string | {field: string, method?: string}[],
    columns?: string | {field: string, method?: string}[],
    values?: string | {field: string, method?: string}[],
    filters?: {}  
};
~~~

### Parameter {#parameters}

Die `config`-Parameter legen fest, welche Felder als Zeilen und Spalten verwendet werden und welche zusätzlichen Datenaggregationsmethoden auf Zeilen/Spalten angewendet werden sollen.

- `rows` - (optional) definiert die Zeilen der Pivot-Tabelle. Der Standardwert ist ein leeres Array. Es kann ein String sein, der eine einzelne Feld-ID repräsentiert, oder ein Objekt mit der Feld-ID und einer Methode zur Datenextraktion; die Objektparameter sind folgende:
  - `field` - (erforderlich) die ID eines Feldes
  - `method` - (optional) definiert eine Methode zur Datenaggregation im Feld; Methoden für zeitbasierte Datenfelder sind standardmäßig verfügbar: "year", "quarter", "month", "week", "day", "hour", "minute", die Daten entsprechend gruppieren; hier können Sie auch den Namen einer benutzerdefinierten Methode angeben ([siehe `predicates`](api/config/predicates-property.md)) für Felder beliebiger Datentypen
- `columns` - (optional) definiert Spalten für die Pivot-Tabelle. Standardmäßig ist es ein leeres Array. Es kann eine einzelne Feld-ID oder ein Objekt mit der Feld-ID und einer Methode zur Datenextraktion sein; die Objektparameter sind folgende:
  - `field` - (erforderlich) die ID eines Feldes
  - `method` - (optional) definiert eine Methode zur Datenverarbeitung (für zeitbasierte Datenfelder).
  Standardmäßig sind Methoden für zeitbasierte Felder (Typ **date**) mit folgenden Werten verfügbar: "year", "quarter", "month", "week", "day", "hour", "minute". Hier können Sie auch den Namen einer benutzerdefinierten Methode angeben ([siehe `predicates`](api/config/predicates-property.md)) für Felder beliebiger Datentypen
- `values` - (optional) definiert die Datenaggregation für die Zellen der Pivot-Tabelle. Standardmäßig ist es ein leeres Array. Jedes Element kann ein String sein, der eine Datenfeld-ID und eine Aggregationsmethode repräsentiert, oder ein Objekt, das die Feld-ID und die Methode zur Datenaggregation enthält. Die Objektparameter sind folgende:
  - `field` - (erforderlich) die ID eines Feldes
  - `method` - (erforderlich) definiert eine Methode zur Datenextraktion; Informationen zu Methodentypen und deren Beschreibung finden Sie unter [Methoden anwenden](guides/working-with-data.md#default-methods)

<details>

<summary><b>Optionen zur Definition von Werten</b></summary>

Sie können `values` auf eine von zwei gleichwertigen Arten definieren:
- Option 1 ist ein String, der die Feld-ID repräsentiert
- Option 2 ist ein Objekt, das die Feld-ID und die Methode zur Datenaggregation enthält

### Beispiel {#example}

~~~jsx
values: [
    "sum(sales)", // Option 1
    { field: "sales", method: "sum" }, // Option 2
]
~~~

</details>

- `filters` - (optional) legt fest, wie Daten in der Tabelle gefiltert werden; es ist ein Objekt mit Feld-IDs und einer Filterregel. Der Standardwert ist ein leeres Objekt. Die Objektparameter sind folgende:
  - `field` - (optional) der Filterschlüssel, der die ID eines Feldes oder ein Array von IDs mit den Filterkriterien ist:
    - `equal` - (optional) akzeptiert Zahlen, Strings und Datumswerte
    - `notEqual` - (optional) akzeptiert Zahlen, Strings und Datumswerte
    - `greater` - (optional) akzeptiert Zahlen und Datumswerte
    - `greaterOrEqual` - (optional) akzeptiert Zahlen und Datumswerte
    - `less` - (optional) akzeptiert Zahlen und Datumswerte
    - `lessOrEqual` - akzeptiert Zahlen und Datumswerte
    - `between` - ein Objekt mit folgenden Parametern:
      - `start` - Date
      - `end` - Date
    - `notBetween` - ein Objekt mit folgenden Parametern:
      - `start` - Date
      - `end` - Date
    - `contains` - akzeptiert Strings und Zahlen
    - `notContains` - akzeptiert Strings und Zahlen
    - `beginsWith` - akzeptiert Strings und Zahlen
    - `notBeginsWith` - akzeptiert Strings und Zahlen
    - `endsWith` - akzeptiert Strings und Zahlen
    - `notEndsWith` - akzeptiert Strings und Zahlen
    - `includes` - (optional) ein Array von Werten, die aus den bereits gefilterten angezeigt werden sollen; verfügbar für Text- und Datumswerte

:::info
Wenn die Konfiguration von Pivot verarbeitet wird, erhalten ihre Eigenschaften zusätzliche Daten. Wenn Sie den Konfigurationszustand über die Methode [`api.getState()`](api/internal/getstate-method.md) abrufen, sieht das vollständige Objekt wie folgt aus:

~~~jsx
interface IParsedField {
    id: string,
    field: string,
    method: string | null,
    area: 'rows'|'columns'|'values',
    base?: string,
    label: string,
    type: 'number'|'date'|'text'
}

interface IParsedConfig {
    rows: IParsedField[],
    columns: IParsedField[],
    values: IParsedField[],
    filters: {
        [field: string]: number | string | [] | 
        { [operation: string]: number | string | [] | { start:Date, end: Date} }
    }
}
~~~

Parameter:

- `id` - eine eindeutige ID des verarbeiteten Feldes
- `field` - ein Feldname
- `method` - der für die Aggregation verwendete Operationsname. Eine Methode ist bei Zeilen und Spalten optional; wenn angegeben, wirkt sie als Prädikat und legt fest, wie die Felddaten vor der Aggregation vorverarbeitet werden. Bei Werten ist die Methode ein Pflichtparameter.
- `area` - der Bereich, dem das Feld hinzugefügt wird
- `base` - wird in Spalten und Zeilen für Felder mit einem Prädikat verwendet. Definiert den ursprünglichen Feldnamen, während der Feldname nach dem Muster "field_by_predicate" gebildet wird
- `label` - Text-Label
- `type` - Datentyp
:::

### Beispiel {#example-1}

~~~jsx {4-26}
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ],
        filters: {
            genre: {
                contains: "D",
                includes: ["Drama"]
            },
            title: {
                // Filter für ein weiteres Feld ("title")
                contains: "A"
            }
        }
    }
});
~~~
