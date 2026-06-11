---
sidebar_label: filter-rows
title: filter-rows
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über das filter-rows-Event. Lesen Sie Entwickleranleitungen und die API-Referenz, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter
---

# filter-rows

### Beschreibung {#description}

@short: Wird beim Filtern von Daten ausgelöst

Um das Table-Event auszulösen, ist es erforderlich, über die Methode [`getTable`](api/methods/gettable-method.md) auf die Table-Instanz innerhalb von Pivot zuzugreifen.

### Verwendung {#usage}

```jsx {}
"filter-rows": ({
    filter?: any
}) => boolean|void;
```

### Parameter {#parameters}

Der Callback der Aktion nimmt ein Objekt mit den folgenden Parametern entgegen:

- `filter` - (optional) eine beliebige Filterfunktion, die jedes Element aus dem Daten-Array entgegennimmt und für jedes Element **true** oder **false** zurückgibt

### Beispiel {#example}

Der folgende Ausschnitt zeigt, wie aggregierte (sichtbare) Daten im Tabellenkörper anhand eines Eingabewerts gefiltert werden:

<iframe src="https://snippet.dhtmlx.com/s7tc9g4z?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Verwandter Artikel**: [`getTable`](api/methods/gettable-method.md)
