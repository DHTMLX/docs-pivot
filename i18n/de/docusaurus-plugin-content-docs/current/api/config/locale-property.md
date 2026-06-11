---
sidebar_label: locale
title: locale Config
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die locale-Konfiguration. Lesen Sie Entwicklerhandbücher und API-Referenzen, testen Sie Code-Beispiele und Live-Demos und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# locale

### Beschreibung {#description}

@short: Optional. Ein Objekt für eine benutzerdefinierte Locale von Pivot

### Verwendung {#usage}

~~~jsx
locale?: object;
~~~

### Standardkonfiguration {#default-config}

Standardmäßig verwendet Pivot die [englische](guides/localization.md#default-locale) Locale. Sie können auch eine benutzerdefinierte Locale festlegen.

:::tip
Um die aktuelle Locale dynamisch zu ändern, können Sie die Methode [`setLocale()`](api/methods/setlocale-method.md) von Pivot verwenden.
:::

### Beispiel {#example}

~~~jsx {19}
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

    locale: pivot.locales.cn, // die Locale "cn" wird initial gesetzt
    // weitere Parameter
});
~~~
