---
sidebar_label: Lokalisierung
title: Lokalisierung
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die Lokalisierung. Entwickleranleitungen und API-Referenz, Code-Beispiele und Live-Demos sowie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot.
---

# Lokalisierung {#localization}

Pivot ermöglicht es Ihnen, jede Beschriftung in der Oberfläche zu lokalisieren. Erstellen Sie eine neue Locale oder ändern Sie eine vorhandene, und wenden Sie die Locale dann über die Eigenschaft [`locale`](api/config/locale-property.md) oder die Methode [`setLocale`](api/methods/setlocale-method.md) auf Pivot an.

## Standard-Locale {#default-locale}

Pivot verwendet standardmäßig die englische Locale. Der folgende Code-Ausschnitt zeigt die Struktur der integrierten `en`-Locale:

~~~jsx
const en = {
    // pivot
    pivot: {
        sum: "Sum",
        min: "Min",
        max: "Max",
        count: "Count",
        counta: "CountA",
        countunique: "CountUnique",
        average: "Average",
        median: "Median",
        product: "Product",
        stdev: "StDev",
        stdevp: "StDevP",
        var: "Var",
        varp: "VarP",
        "Raw date": "Raw date",
        "Raw number": "Raw number",
        "Raw text": "Raw text",
        Year: "Year",
        Month: "Month",
        Day: "Day",
        Hour: "Hour",
        Minute: "Minute",
        Total: "Total",
        Values: "Values",
        Rows: "Rows",
        Columns: "Columns",
        "Click on the plus icon(s) to add data":
        "Click on the plus icon(s) to add data",
        'Click on "Show settings" to see the available configuration options':
        'Click on "Show settings" to see the available configuration options',
        "Show settings": "Show settings",
        "Hide settings": "Hide settings"
    },

    // query
    query: {
        "Add filter": "Add filter",
        "Add Filter": "Add Filter",
        "Add Group": "Add Group",
        Edit: "Edit",
        Delete: "Delete",
        
        "Select all": "Select all",
        "Unselect all": "Unselect all",
        
        Cancel: "Cancel",
        Apply: "Apply",
        
        and: "and",
        or: "or",
        in: "in",
        
        equal: "equal",
        "not equal": "not equal",
        contains: "contains",
        "not contains": "not contains",
        "begins with": "begins with",
        "not begins with": "not begins with",
        "ends with": "ends with",
        "not ends with": "not ends with",
        
        greater: "greater",
        "greater or equal": "greater or equal",
        less: "less",
        "less or equal": "less or equal",
        between: "between",
        "not between": "not between"
    },

    // calendar
    calendar: {
        monthFull: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        monthShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        
        dayFull: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],

        dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        hours: "Hours",
        minutes: "Minutes",
        done: "Done",
        clear: "Clear",
        today: "Today",
        am: ["am", "AM"],
        pm: ["pm", "PM"],
        
        weekStart: 7,
        clockFormat: 24,
    },

    // core
    core: {
        ok: "OK",
        cancel: "Cancel",
        select: "Select",
        "No data": "No data"
    },

    // formats
    formats: {
        dateFormat: "%d.%m.%Y",
        timeFormat: "%H:%i"
    },

    lang: "en-US",
};
~~~

## Locale anwenden {#apply-a-locale}

Pivot stellt drei integrierte Locales über das Objekt `pivot.locales` bereit: `en`, `de` und `cn`. Übergeben Sie eine integrierte Locale bei der Initialisierung an die Eigenschaft [`locale`](api/config/locale-property.md).

Der folgende Code-Ausschnitt initialisiert Pivot mit der deutschen Locale:

~~~jsx
new pivot.Pivot("#root", {
    // other properties
    locale: pivot.locales.de,
});
~~~

So wenden Sie eine benutzerdefinierte Locale an:

- Erstellen Sie ein Locale-Objekt (oder ändern Sie ein vorhandenes) und stellen Sie Übersetzungen für alle Textbeschriftungen bereit (in einer beliebigen Sprache).
- Wenden Sie die Locale über die Eigenschaft [`locale`](api/config/locale-property.md) oder die Methode [`setLocale`](api/methods/setlocale-method.md) auf Pivot an.

Der folgende Code-Ausschnitt erstellt Pivot und wendet dann zur Laufzeit mit `setLocale` eine benutzerdefinierte koreanische Locale an:

~~~jsx
// create Pivot
const widget = new pivot.Pivot("#root", {
    data,
    // other configuration properties
});

const ko = { /* object with locale */ };
widget.setLocale(ko);
~~~

:::tip
Rufen Sie [`setLocale`](api/methods/setlocale-method.md) ohne Argumente (oder mit `null`) auf, um Pivot auf die englische Standard-Locale zurückzusetzen.
:::

## Datumsformate {#date-formatting}

Pivot akzeptiert Datumsangaben als `Date`-Objekte. Wandeln Sie Zeichenkettenwerte in `Date` um, bevor Sie Daten an Pivot übergeben. Das standardmäßige `dateFormat` ist `"%d.%m.%Y"` und wird aus der aktuellen Locale übernommen.

Um das Format für alle Datumsfelder zu ändern, setzen Sie einen neuen Wert für `dateFormat` im Objekt `formats` der Eigenschaft [`locale`](api/config/locale-property.md).

Der folgende Code-Ausschnitt wandelt Datumszeichenketten in `Date`-Objekte um, initialisiert dann Pivot mit einem benutzerdefinierten `dateFormat` und aktualisiert das Format zur Laufzeit über `setConfig`:

~~~jsx {17}
function setFormat(value) {
    table.setConfig({ locale: { formats: { dateFormat: value } } });
}

// convert date strings to Date objects
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    locale: { formats: { dateFormat: "%d %M %Y %H:%i" } },
    fields,
    data: dataset,
    config: {
        rows: ["state"],
        columns: ["product_line", "product_type"],
        values: [
            {
                field: "date",
                method: "min"
            },
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            }
        ]
    }
});
~~~

Um ein benutzerdefiniertes Format für ein bestimmtes Feld festzulegen, verwenden Sie den Parameter `format` der Eigenschaft [`fields`](api/config/fields-property.md). Siehe [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields).

## Zeichen für Datum- und Zeitformat {#date-and-time-format-characters}

Pivot verwendet die folgenden Zeichen, um das Datum- und Zeitformat zu definieren:

| Zeichen   | Definition                                                    | Beispiel                  |
| :-------- | :------------------------------------------------------------ | :------------------------ |
| %d        | Tag als Zahl mit führender Null                               | von 01 bis 31             |
| %j        | Tag als Zahl                                                  | von 1 bis 31              |
| %D        | Kurzname des Wochentags (Abkürzung)                           | So Mo Di Sa               |
| %l        | Vollständiger Name des Wochentags                             | Sonntag Montag Dienstag   |
| %W        | Woche als Zahl mit führender Null (mit Montag als erstem Wochentag) | von 01 bis 52/53     |
| %m        | Monat als Zahl mit führender Null                             | von 01 bis 12             |
| %n        | Monat als Zahl                                                | von 1 bis 12              |
| %M        | Kurzname des Monats                                           | Jan Feb Mär               |
| %F        | Vollständiger Name des Monats                                 | Januar Februar März       |
| %y        | Jahr als Zahl, 2-stellig                                      | 24                        |
| %Y        | Jahr als Zahl, 4-stellig                                      | 2024                      |
| %h        | Stunden im 12-Stunden-Format mit führender Null               | von 01 bis 12             |
| %g        | Stunden im 12-Stunden-Format                                  | von 1 bis 12              |
| %H        | Stunden im 24-Stunden-Format mit führender Null               | von 00 bis 23             |
| %G        | Stunden im 24-Stunden-Format                                  | von 0 bis 23              |
| %i        | Minuten mit führender Null                                    | von 01 bis 59             |
| %s        | Sekunden mit führender Null                                   | von 01 bis 59             |
| %S        | Millisekunden                                                 | 128                       |
| %a        | am oder pm                                                    | am (für die Zeit von Mitternacht bis Mittag) und pm (für die Zeit von Mittag bis Mitternacht)|
| %A        | AM oder PM                                                    | AM (für die Zeit von Mitternacht bis Mittag) und PM (für die Zeit von Mittag bis Mitternacht)|
| %c        | Zeigt Datum und Uhrzeit im ISO-8601-Format an                 | 2024-10-04T05:04:09       |

Um den 20. September 2024 um 16:47:08.128 als *2024-09-20 16:47:08.128* darzustellen, verwenden Sie das Format `"%Y-%m-%d %H:%i:%s.%S"`.

## Zahlenformate {#number-formatting}

Pivot lokalisiert alle `number`-Felder anhand des `lang`-Werts der aktuellen Locale. Das Widget verwendet die Spezifikation [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat). Die Standardeinstellungen begrenzen die Nachkommastellen auf 3 und wenden Tausendergruppentrennzeichen auf den ganzzahligen Teil an.

Um die Formatierung für ein bestimmtes numerisches Feld zu deaktivieren oder ein benutzerdefiniertes Format festzulegen, verwenden Sie den Parameter `format` der Eigenschaft [`fields`](api/config/fields-property.md). Setzen Sie `format` auf `false`, um die Formatierung zu deaktivieren, oder auf ein Objekt mit Format-Einstellungen (siehe [Formate auf Felder anwenden](guides/working-with-data.md#applying-formats-to-fields)).

Der folgende Code-Ausschnitt deaktiviert die Zahlenformatierung für das Feld `year`:

~~~jsx
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

## Beispiel {#example}

Der folgende Ausschnitt wechselt zwischen mehreren Locales:

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
