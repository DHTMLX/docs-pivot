---
sidebar_label: open-row
title: open-row
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das open-row-Event. Sehen Sie sich Entwicklerhandbücher und API-Referenzen an, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter
---

# open-row

### Beschreibung {#description}

@short: Wird ausgelöst, wenn eine Zeile geöffnet (aufgeklappt) wird

Um das Table-Event auszulösen, muss über die Methode [`getTable`](api/methods/gettable-method.md) auf die Table-Instanz innerhalb von Pivot zugegriffen werden. Der Baumstruktur-Modus muss über die Eigenschaft [`tableShape`](api/config/tableshape-property.md) aktiviert sein.

### Verwendung {#usage}

```jsx {}
"open-row": ({
    id: string | number,
    nested?: boolean
}) => boolean|void;
```

### Parameter {#parameters}

Der Callback der Aktion erhält ein Objekt mit den folgenden Parametern:

- `id` - (erforderlich) die ID einer Zeile, die verschachtelte Zeilen enthält
- `nested` - (optional) wenn auf **true** gesetzt, werden alle verschachtelten Einträge aufgeklappt

:::note
Wenn `id` auf 0 und `nested` auf **true** gesetzt ist, werden alle Zeilen in der Tabelle aufgeklappt
:::

### Beispiel {#example}

Der folgende Code-Ausschnitt zeigt, wie alle Zeilen per Klick auf eine Schaltfläche geöffnet/geschlossen werden können:

<iframe src="https://snippet.dhtmlx.com/i4mi6ejn?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Verwandte Artikel**: 
- [`getTable`](api/methods/gettable-method.md)
- [Alle Zeilen auf-/zuklappen](guides/configuration.md#expandingcollapsing-all-rows)
