---
sidebar_label: readonly
title: readonly Config
description: Sie können mehr über die readonly-Konfiguration in der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# readonly

### Beschreibung {#description}

@short: Optional. Aktiviert/deaktiviert den Nur-Lese-Modus

Im Nur-Lese-Modus ist es nicht möglich, die Pivot-Struktur über die Benutzeroberfläche zu konfigurieren.

### Verwendung {#usage}

~~~jsx  
 readonly?: boolean;
~~~

### Parameter {#parameters}

Die Eigenschaft kann auf **true** oder **false** gesetzt werden:

- `true` - aktiviert den Nur-Lese-Modus
- `false` - Standard, deaktiviert den Nur-Lese-Modus

## Beispiel {#example}

~~~jsx {18}
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
    },
    readonly: true
});
~~~

**Verwandtes Beispiel**: [Pivot 2. Nur-Lese-Modus](https://snippet.dhtmlx.com/0k0mvycv)
