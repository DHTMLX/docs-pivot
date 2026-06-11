---
sidebar_label: Daten exportieren
title: Daten exportieren
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie, wie Sie Daten exportieren. Lesen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Daten exportieren {#exporting-data}

Pivot exportiert Tabellendaten im XLSX- oder CSV-Format über das zugrunde liegende Table-Widget. Greifen Sie mit der Methode [`getTable`](api/methods/gettable-method.md) auf die Table-Instanz zu und lösen Sie dann das [`export`](api/table/export.md)-Event mit der Methode [`api.exec`](api/internal/exec-method.md) der Table aus.

Das folgende Beispiel greift auf die Table-Instanz zu und löst das `export`-Event im CSV- und XLSX-Format aus:

~~~jsx
const widget = new pivot.Pivot("#root", { /* Einstellungen */ });

widget.getTable().exec("export", {
    options: {
        format: "csv",
        cols: ";"
    }
});

widget.getTable().exec("export", {
    options: {
        format: "xlsx",
        fileName: "My Report",
        sheetName: "Quarter 1"
    }
});
~~~

:::tip
Die Methode [`getTable`](api/methods/gettable-method.md) akzeptiert einen optionalen booleschen Parameter `wait`. Übergeben Sie `true`, um ein Promise zu erhalten, das aufgelöst wird, sobald die Table-API verfügbar ist. Nützlich, wenn die Table-API bereits während der Pivot-Initialisierung bereit sein muss.
:::

## Beispiel {#example}

Der folgende Ausschnitt exportiert Daten:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Verwandte Artikel**: 

- [Datumsformatierung](guides/localization.md#date-formatting)
- [`export`](api/table/export.md)
