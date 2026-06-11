---
sidebar_label: setLocale()
title: setLocale()
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek können Sie mehr über die Methode setLocale() erfahren. Entwicklerhandbücher und API-Referenz, Code-Beispiele und Live-Demos sowie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot.
---

# setLocale()

### Beschreibung {#description}

@short: Wendet eine neue Locale auf Pivot an

### Verwendung {#usage}

~~~jsx
setLocale(null | locale?: object): void;
~~~

### Parameter {#parameters}

- `null` - (optional) setzt auf die Standard-Locale zurück (Englisch)
- `locale` - (optional) das Objekt mit den Daten der neuen Locale, die angewendet werden soll

### Beispiel {#example}

~~~jsx 
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

// die Locale "de" auf Pivot anwenden
table.setLocale(pivot.locales.de);

// die Standard-Locale auf Pivot anwenden
table.setLocale(); // oder setLocale(null);
~~~

**Verwandte Artikel**:
- [Lokalisierung](guides/localization.md)
- [`locale`](api/config/locale-property.md)
