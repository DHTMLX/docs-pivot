---
sidebar_label: close-row
title: close-row
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das close-row-Event. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter
---

# close-row

### Beschreibung {#description}

@short: Wird ausgelöst, wenn eine Zeile geschlossen (eingeklappt) wird

Um das Table-Event auszulösen, muss über die Methode [`getTable`](api/methods/gettable-method.md) auf die zugrunde liegende Table-Widget-Instanz innerhalb von Pivot zugegriffen werden. Der Baumstruktur-Modus muss über die Eigenschaft [`tableShape`](api/config/tableshape-property.md) aktiviert sein.

### Verwendung {#usage}

```jsx {}
"close-row": ({
    id: string | number,
    nested?: boolean
}) => boolean|void;
```

### Parameter {#parameters}

Der Callback der Aktion nimmt ein Objekt mit den folgenden Parametern entgegen:

- `id` - (erforderlich) die ID einer Zeile, die verschachtelte Zeilen enthält
- `nested` - (optional) wenn auf **true** gesetzt, werden alle verschachtelten Elemente eingeklappt

:::note
Wenn `id` auf 0 und `nested` auf **true** gesetzt wird, werden alle Zeilen in der Tabelle eingeklappt
:::

### Beispiel {#example}

Der folgende Ausschnitt zeigt, wie alle Zeilen per Schaltflächenklick geöffnet bzw. geschlossen werden:

<iframe src="https://snippet.dhtmlx.com/i4mi6ejn?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Verwandte Artikel**: 
- [`getTable`](api/methods/gettable-method.md)
- [Alle Zeilen auf- und zuklappen](guides/configuration.md#expandingcollapsing-all-rows)
