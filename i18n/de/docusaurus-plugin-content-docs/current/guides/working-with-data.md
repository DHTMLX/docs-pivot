---
sidebar_label: Arbeiten mit Daten
title: Arbeiten mit Daten
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie, wie Sie mit Daten arbeiten. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Arbeiten mit Daten

Diese Seite beschreibt, wie Sie Daten in Pivot aggregieren, formatieren, sortieren, filtern und vorverarbeiten können. Anweisungen zum Laden und Exportieren von Daten finden Sie unter [Daten laden](guides/loading-data.md) und [Daten exportieren](guides/exporting-data.md).

## Felder definieren {#define-fields}

Verwenden Sie die Eigenschaft [`fields`](api/config/fields-property.md), um die Felder zu deklarieren, die Pivot in Zeilen, Spalten und Werten platzieren kann. Jedes Element im `fields`-Array beschreibt ein Feld — seine ID, sein Label und seinen Datentyp.

Der folgende Code-Ausschnitt initialisiert Pivot mit fünf Feldern:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields: [
        { id: "year", label: "Year", type: "number" },
        { id: "continent", label: "Continent", type: "text" },
        { id: "form", label: "Form", type: "text" },
        { id: "oil", label: "Oil", type: "number" },
        { id: "balance", label: "Balance", type: "number" }
    ],
    data,
    config: {...}
});
~~~

## Formate auf Felder anwenden {#applying-formats-to-fields}

Pivot wendet ein Standardformat auf numerische Felder und Datumsfelder basierend auf der aktuellen Locale an. Weitere Informationen finden Sie unter [Datumsformatierung](guides/localization.md#date-formatting) und [Zahlenformatierung](guides/localization.md#number-formatting).

Um den Standard für ein bestimmtes Feld zu überschreiben, legen Sie den Parameter `format` der Eigenschaft [`fields`](api/config/fields-property.md) fest.

### Numerische Felder formatieren {#format-numeric-fields}

Verwenden Sie `prefix` und `suffix`, um Text um numerische Werte hinzuzufügen, und `maximumFractionDigits`, um die Dezimalgenauigkeit zu steuern. Um beispielsweise `12.345` als `"12.35 EUR"` darzustellen, setzen Sie das Suffix auf `" EUR"` und `maximumFractionDigits` auf `2`:

~~~js
const fields = [
     { id: "sales", type: "number", format: { suffix: " EUR", maximumFractionDigits: 2 } },
];
~~~

Die Standardformatierung begrenzt numerische Felder auf 3 Nachkommastellen und wendet eine Gruppentrennzeichenformatierung auf den ganzzahligen Teil an. Um die Formatierung vollständig zu deaktivieren, setzen Sie `format` auf `false`:

~~~js
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

Das folgende Beispiel markiert `marketing`, `profit` und `sales` als Währungsfelder mit einem `$`-Präfix und fixen 2-stelligen Dezimalstellen:

~~~jsx
// Pivot mit einem vordefinierten Datensatz und Feldern initialisieren
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            { field: "marketing", method: "sum" },
            // weitere Werte

        ],
    },
    fields:[
        // benutzerdefiniertes Format
        { id: "marketing", label: "Marketing", type:"number", format:{
                prefix: "$", minimumFractionDigits: 2, maximumFractionDigits: 2 }
        }
    ]
});
~~~

### Datumsfelder formatieren {#format-date-fields}

Um das locale-weite `dateFormat` für ein einzelnes Feld zu überschreiben, setzen Sie den Parameter `format` von [`fields`](api/config/fields-property.md) auf einen Datumsformat-String.

Der folgende Code-Ausschnitt setzt `"%M %d, %Y"` als Format für das Feld `date`:

~~~jsx
const fields = [
     { id: "date",  type: "date",  format: "%M %d, %Y" },
];
~~~

Das folgende Beispiel konvertiert String-Datumsangaben in `Date`-Objekte und initialisiert dann Pivot mit dem Format `"%d %M %Y %H:%i"` für das Feld `date`. Feldwerte werden als Labels wie `"24 April 2025 14:30"` dargestellt.

~~~jsx
// Datums-Strings in Date-Objekte konvertieren
const dateFields = fields.filter(f => f.type === "date");
dataset.forEach(item => {
    dateFields.forEach(f => {
        const v = item[f.id];
        if (typeof v === "string") {
            item[f.id] = new Date(v);
        }
    });
});

// Pivot mit einem feldspezifischen Datumsformat initialisieren
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state"],
        columns: ["product_type"],
        values: [
            { field: "date", method: "min" },
            { field: "profit", method: "sum" },
            { field: "sales", method: "sum" }
        ]
    },
    fields:[
        // benutzerdefiniertes Format: Tag Monat Jahr Stunde:Minute
        { id: "date", label: "Date", type: "date", format: "%d %M %Y %H:%i" }
    ]
});
~~~

:::note
Für das `xlsx`-Exportformat exportiert Pivot Datums- und Zahlenfelder als Rohwerte mit ihrem Standardformat (oder dem über die Eigenschaft [`fields`](api/config/fields-property.md) definierten Format). Wenn für ein Feld ein Template definiert ist (siehe die Eigenschaft [`tableShape`](api/config/tableshape-property.md)), exportiert Pivot den vom Template erzeugten gerenderten Wert. Wenn sowohl `template` als auch `format` gesetzt sind, überschreibt das Template das Format.
:::

## Pivot-Struktur definieren {#define-pivot-structure}

Verwenden Sie die Eigenschaft [`config`](api/config/config-property.md), um zu deklarieren, welche Felder als Zeilen, Spalten und aggregierte Werte erscheinen und wie die Daten gefiltert werden. Die Eigenschaft `config` hat keine vordefinierten Werte — Sie müssen sie setzen, um Daten zu rendern. Die vollständige Parameterliste finden Sie in der Referenz zu [`config`](api/config/config-property.md).

Der folgende Code-Ausschnitt platziert `continent` und `name` in Zeilen, `year` in Spalten, drei Aggregationen in Werten und einen Filter auf `name`:

~~~jsx {4-18}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ]
    },
    fields,
    filters: {
        name: {
            contains: "B"
        }
    }
});
~~~

## Daten sortieren {#sorting-data}

Pivot unterstützt die Sortierung in allen drei Bereichen (Werte, Spalten, Zeilen) während der Aggregation. In der Benutzeroberfläche klicken Benutzer auf einen Spalten-Header, um zu sortieren.

Um eine Standardsortierung festzulegen, verwenden Sie den Parameter `sort` der Eigenschaft [`fields`](api/config/fields-property.md). Der Parameter akzeptiert `"asc"`, `"desc"` oder eine benutzerdefinierte Vergleichsfunktion.

Das folgende Beispiel rendert anklickbare Feld-Labels über Pivot und schaltet die Sortierreihenfolge beim Klicken um:

~~~jsx
const bar = document.getElementById("bar");

let sorted = ["studio", "genre"];
setFields();
bar.addEventListener('click', (e) => switchSort(e.target.id), false);

function setFields(){
    let html = "";
    let sortedFields = fields.filter(f => (sorted.indexOf(f.id) != -1));

    sortedFields.forEach((f) =>{
        const order = f.sort || "asc";
        html += `<div class="field" id="${f.id}">
                    ${f.label}<i class="icon wxi-${order}" ></i>
                </div>`;
    });
    bar.innerHTML = html;
}

function switchSort(id){
    fields.forEach(f => {
        if(f.id == id){
             f.sort =  f.sort != "desc" ? "desc" : "asc";
        }
    });
    // Pivot-Felder aktualisieren
    table.setConfig({ fields }); 
    // Icons aktualisieren
    setFields(bar, fields);
}

const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: [
            "studio",
            "genre"
        ],
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
~~~

Die Sortierung in der Benutzeroberfläche ist standardmäßig aktiviert. Um sie zu deaktivieren, setzen Sie den Parameter `sort` der Eigenschaft [`columnShape`](api/config/columnshape-property.md) auf `false`.

Der folgende Code-Ausschnitt deaktiviert die UI-Sortierung:

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data,
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
    },
    columnShape: {
        sort: false 
    }
});
~~~

## Daten filtern {#filtering-data}

Pivot unterstützt Filter, die an Felddatentypen gebunden sind. Sie können Filter über die Pivot-Benutzeroberfläche nach der Initialisierung oder deklarativ über das `filters`-Objekt der Eigenschaft [`config`](api/config/config-property.md) setzen.

In der Benutzeroberfläche erscheinen Filter als Dropdown-Listen für jedes Feld.

#### Filtertypen {#filter-types}

Pivot unterstützt die folgenden Filterbedingungen je Datentyp:

- Textfelder — `equal`, `notEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`, `includes`
- Numerische Felder — `equal`, `notEqual`, `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`
- Datumsfelder — `equal`, `notEqual`, `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `between`, `notBetween`, `includes`

Die Regel `includes` schränkt einen Filter auf eine bestimmte Menge zulässiger Werte ein.

#### Filter hinzufügen {#add-a-filter}

Um einen Filter zu deklarieren, fügen Sie das `filters`-Objekt zur Eigenschaft [`config`](api/config/config-property.md) hinzu, mit der Feld-ID als Schlüssel. Jeder Wert ist ein Objekt mit Filterbedingungen.

Der folgende Code-Ausschnitt wendet zwei Filter an — einen auf `genre` (Werte, die `"D"` enthalten, eingeschränkt auf `"Drama"`) und einen auf `title` (Werte, die `"A"` enthalten):

~~~jsx
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

:::info
Um Daten stattdessen über die Table-Widget-API zu filtern, greifen Sie mit der Methode [`getTable`](api/methods/gettable-method.md) auf die Table-Instanz zu und verwenden Sie das Event [`filter-rows`](api/table/filter-rows.md).
:::

## Geladene Daten begrenzen {#limiting-loaded-data}

Um zu verhindern, dass die Komponente bei sehr großen Datensätzen hängt, begrenzen Sie die Anzahl der Zeilen und Spalten im finalen Datensatz mit der Eigenschaft [`limits`](api/config/limits-property.md). Pivot unterbricht das Rendering, sobald das Limit erreicht ist. Die Standardobergrenze liegt bei 10000 für Zeilen und 5000 für Spalten.

:::note
Limits gelten für große Datensätze. Die Zahlen sind ungefähr — Pivot garantiert keine exakte Zeilen-/Spaltenanzahl.
:::

Der folgende Code-Ausschnitt begrenzt den Datensatz auf 10 Zeilen und 3 Spalten:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio"],
        columns: ["genre"],
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
    },
    limits: { rows: 10, columns: 3 }
});
~~~

## Mathematische Methoden anwenden {#applying-maths-methods}

### Standardmethoden {#default-methods}

Pivot enthält die folgenden integrierten Aggregationsmethoden:

- `sum` (nur numerische Werte) — summiert alle ausgewählten Werte; ignoriert leere Zellen, logische Werte wie `TRUE` und Text
- `min` (numerische Werte und Datumswerte) — gibt den Minimalwert zurück; ignoriert leere Zellen, logische Werte und Text. Gibt `0` zurück, wenn die Eingabe keine Zahlen enthält
- `max` (numerische Werte und Datumswerte) — gibt den Maximalwert zurück; ignoriert leere Zellen, logische Werte und Text. Gibt `0` zurück, wenn die Eingabe keine Zahlen enthält
- `count` (numerische, Text- und Datumswerte) — zählt nicht leere Zellen; dies ist die Standardmethode, die jedem neu hinzugefügten Feld zugewiesen wird
- `countunique` (numerische Werte und Textwerte) — zählt die Anzahl eindeutiger Werte in der Eingabe
- `average` (nur numerische Werte) — berechnet das arithmetische Mittel der Eingabe; ignoriert leere Zellen, logische Werte und Text. Berücksichtigt Zellen mit dem Wert null
- `counta` (numerische, Text- und Datumswerte) — zählt alle nicht leeren Werte, einschließlich Zahlen, Datumsangaben und Text
- `median` (nur numerische Werte) — gibt den Median der Eingabe zurück
- `product` (nur numerische Werte) — gibt das Produkt aller Zahlen in der Eingabe zurück
- `stdev` (nur numerische Werte) — Standardabweichung, wobei die Eingabe als Stichprobe einer größeren Menge behandelt wird
- `stdevp` (nur numerische Werte) — Standardabweichung, wobei die Eingabe als die gesamte Population behandelt wird
- `var` (nur numerische Werte) — Varianz, wobei die Eingabe als Stichprobe einer größeren Menge behandelt wird
- `varp` (nur numerische Werte) — Varianz, wobei die Eingabe als die gesamte Population behandelt wird

Der folgende Code-Ausschnitt zeigt die integrierten Methodendefinitionen:

~~~jsx
const defaultMethods = {
    sum: { type: "number", label: "sum" },
    min: { type: ["number", "date"], label: "min" },
    max: { type: ["number", "date"], label: "max" },
    count: {
        type: ["number", "date", "text"],
        label: "count",
        branchMath: "sum"
    },
    counta: {
        type: ["number", "date", "text"],
        label: "counta",
        branchMath: "sum"
    },
    countunique: {
        type: ["number", "text"],
        label: "countunique",
        branchMath: "sum"
    },
    average: { type: "number", label: "average", branchMode: "raw" },
    median: { type: "number", label: "median", branchMode: "raw" },
    product: { type: "number", label: "product" },
    stdev: { type: "number", label: "stdev", branchMode: "raw" },
    stdevp: { type: "number", label: "stdevp", branchMode: "raw" },
    var: { type: "number", label: "var", branchMode: "raw" },
    varp: { type: "number", label: "varp", branchMode: "raw" }
};
~~~

Wenden Sie eine Standardmethode über den Parameter `values` der Eigenschaft [`config`](api/config/config-property.md) an. Siehe [Werte definieren](#options-for-defining-values).

Der folgende Code-Ausschnitt weist dem Feld `title` die Methode `count` und dem Feld `score` die Methode `max` zu:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                // Feld-ID
                field: "title",
                // Methode
                method: "count"
            },
            {
                id: "score",
                method: "max"
            }
        ]
    }
});
~~~

### Werte definieren {#options-for-defining-values}

Definieren Sie jeden Eintrag in `values` in einer von zwei äquivalenten Formen:

- ein String der Form `"operation(fieldID)"`
- ein Objekt `{ field: string, method: string }` (beide Felder erforderlich)

Der folgende Code-Ausschnitt verwendet beide Formen im selben `values`-Array:

~~~jsx
values: [
    "sum(sales)", // Option eins
    { field: "sales", method: "sum" } // Option zwei
]
~~~

### Die Standardmethode überschreiben {#override-the-default-method}

Für jedes neu hinzugefügte Feld weist Pivot die erste verfügbare Methode für den Datentyp zu. Um dieses Verhalten zu ändern, fangen Sie das Event `add-field` mit der Methode [`api.intercept`](api/internal/intercept-method.md) ab.

Das folgende Beispiel fängt `add-field` ab und erzwingt die Methode `max`, sobald ein numerisches Feld hinzugefügt wird:

~~~jsx {20-27}
const table = new pivot.Pivot("#root", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },
});
// Standardmethode für neu hinzugefügte numerische Felder überschreiben
table.api.intercept("add-field", (ev) => {
  const { fields } = table.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "max";
  }
});
~~~

### Benutzerdefinierte mathematische Methoden hinzufügen {#add-custom-math-methods}

Um eine benutzerdefinierte Aggregationsmethode hinzuzufügen, verwenden Sie die Eigenschaft [`methods`](api/config/methods-property.md). Jeder Eintrag verknüpft einen Methodennamen (den Schlüssel) mit einem Konfigurationsobjekt, das eine `handler`-Funktion und Metadaten enthält. Der `handler` nimmt ein Array von Werten entgegen und gibt einen einzelnen aggregierten Wert zurück.

Das folgende Beispiel fügt zwei datumsspezifische Methoden hinzu. `countunique_date` zählt eindeutige Datumsangaben anhand ihrer numerischen Zeitstempel. `average_date` gibt das durchschnittliche Datum zurück, indem Zeitstempel gemittelt werden:

~~~jsx
function countUnique(values, converter) {
    const valueMap = {};
    return values.reduce((acc, d) => {
        if (converter) d = converter(d);
        if (!valueMap[d]) {
            acc++;
            valueMap[d] = true;
        }
        return acc;
    }, 0);
}

const methods = {
    countunique_date: {
        handler: values => countUnique(values, v => new Date(v).getTime()),
        type: "date",
        label: "CountUnique",
    },
    average_date: {
        type: "date",
        label: "Average",
        branchMode: "raw",
        handler: values => {
            if (!values.length) return null;
            const sum = values.reduce((acc, d) => acc + d.getTime(), 0);
            const avgTime = sum / values.length;
            return new Date(avgTime);
        }
    }
};

// Ganzzahlen für "count"- und "unique count"-Ergebnisse anzeigen
const templates = {};
fields.forEach(f => {
    if (f.type == "number")
        templates[f.id] = (v, method) =>
        v && method.indexOf("count") < 0 ? parseFloat(v).toFixed(3) : v;
});

// Datums-Strings in Date-Objekte konvertieren
const dateFields = fields.filter(f => f.type == "date");
if (dateFields.length) {
    dataset.forEach(item => {
        dateFields.forEach(f => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    tableShape: { templates },
    methods: { ...pivot.defaultMethods, ...methods },
    config:{
        rows: ["state"],
        columns: [
            "product_line",
            "product_type"
        ],
        values: [
            {
                field: "sales",
                method: "sum"
            },
            {
                field: "sales",
                method: "count"
            },
            {
                field: "date",
                method: "countunique_date"
            },
            {
                field: "date",
                method: "average_date"
            }
        ]
    }
});
~~~

## Daten mit Prädikaten verarbeiten {#processing-data-with-predicates}

Prädikate sind Vorverarbeitungsfunktionen, die Rohfelddaten transformieren, bevor Pivot die Daten in Zeilen oder Spalten verwendet. Ein Prädikat kann beispielsweise Datumsangaben vor der Aggregation nach Monat gruppieren.

Der folgende Code-Ausschnitt zeigt die integrierten Datumspr­ädikate, die Pivot standardmäßig anwendet:

~~~jsx
const defaultPredicates = {
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

Um ein benutzerdefiniertes Prädikat hinzuzufügen, konfigurieren Sie die Eigenschaft [`predicates`](api/config/predicates-property.md). Jeder Eintrag verknüpft eine Prädikat-ID (den Schlüssel) mit einem Konfigurationsobjekt:

- `type` — die Feldtypen, die dieses Prädikat akzeptiert (`"number"`, `"date"`, `"text"` oder ein Array)
- `label` — das Prädikat-Label, das im GUI-Dropdown für eine Zeile/Spalte angezeigt wird
- `handler` — Funktion, die einen Wert transformiert und den verarbeiteten Wert zurückgibt
- `template` — optionale Funktion, die steuert, wie der verarbeitete Wert angezeigt wird
- `field` — optionale Funktion, die das Prädikat auf bestimmte Felder beschränkt
- `filter` — optionale Filter-Konfiguration, wenn der Filtertyp vom `type` abweichen soll oder wenn das Datenformat vom `template` abweichen soll

Um ein benutzerdefiniertes Prädikat zu verwenden, setzen Sie seine ID als `method` der Zeile oder Spalte, auf die das Prädikat angewendet werden soll.

Der folgende Code-Ausschnitt registriert zwei benutzerdefinierte Prädikate (`monthYear` und `profitSign`) und wendet sie in der `columns`-Konfiguration an:

~~~jsx
const predicates = {
    monthYear: {
        label: "Month-year",
        type: "date",
        handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1),
        template: (date, locale) => {
            const months = locale.getRaw().calendar.monthFull;
            return months[date.getMonth()] + " " + date.getFullYear();
        },
    },
    profitSign: {
        label: "Profit Sign",
        type: "number",
        filter: {
            type: "tuple",
            format: (v) => (v < 0 ? "Negative" : "Positive"),
        },
        field: (f) => f === "profit",
        handler: (v) => (v < 0 ? -1 : 1),
        template: (v) => (v < 0 ? "Negative profit" : "Positive profit"),
    },
};

// Datums-Strings in Date-Objekte konvertieren
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    predicates: { ...pivot.defaultPredicates, ...predicates },
    tableShape: { tree: true },
    config: {
        rows: ["product_type", "product"],
        columns: [
            { field: "profit", method: "profitSign" },
            { field: "date", method: "monthYear" },
        ],
        values: ["sales", "expenses"],
    },
});
~~~

## Spalten und Zeilen mit Gesamtwerten hinzufügen {#add-columns-and-rows-with-total-values}

Verwenden Sie die Eigenschaft [`tableShape`](api/config/tableshape-property.md), um eine Gesamtspalte rechts (`totalColumn: true`) oder eine Gesamtzeile als Fußzeile (`totalRow: true`) zu rendern.

Der folgende Code-Ausschnitt aktiviert sowohl die Gesamtspalte als auch die Gesamtzeile:

~~~jsx {2-5}
const table = new pivot.Pivot("#root", {
    tableShape: {
        totalRow: true,
        totalColumn: true
    },
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["type"],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            }
        ]
    }
});
~~~

## Beispiel {#example}

Der folgende Ausschnitt wendet benutzerdefinierte mathematische Operationen an:

<iframe src="https://snippet.dhtmlx.com/lv90d8q2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Verwandte Beispiele**:

- [Pivot 2. Datensatz mit Aliasen](https://snippet.dhtmlx.com/7vc68rqd)
- [Pivot 2. Feldformate definieren](https://snippet.dhtmlx.com/77nc4j8v)
- [Pivot 2. Externer Filter](https://snippet.dhtmlx.com/s7tc9g4z)
- [Pivot 2. Gesamtsumme für Spalten und Zeilen](https://snippet.dhtmlx.com/f0ag0t9t)
