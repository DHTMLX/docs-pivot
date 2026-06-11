---
sidebar_label: Was ist neu
title: Was ist neu
description: Sie können erkunden, was neu in DHTMLX Pivot ist, und die Release-Historie in der Dokumentation der DHTMLX JavaScript-UI-Bibliothek nachschlagen. Durchsuchen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Was ist neu {#whats-new}

Wenn Sie Pivot von einer älteren Version aktualisieren, lesen Sie [Migration zu neueren Versionen](news/migration.md) für Details.

## Version 2.1.1 {#version-211}

Veröffentlicht am 10. Juni 2026

### Fehlerbehebungen {#fixes}

- Der Fehler „getMonth" tritt auf, wenn Zeilenfilter auf Datensätze mit fehlenden oder leeren Werten angewendet werden

## Version 2.1 {#version-21}

Veröffentlicht am 6. Mai 2025

### Neue Funktionalität {#new-functionality}

- [Möglichkeit, Spalten rechts einzufrieren](guides/configuration.md#freezing-columns-on-the-right)
- [Standardausrichtung](guides/stylization.md#specific-css-classes) und [gebietsschemabasierte Formatierung](guides/localization.md#number-formatting) für numerische Werte
- [Möglichkeit, benutzerdefinierte Zahlenformate zu definieren](guides/working-with-data.md#applying-formats-to-fields) (für Datums- und Zahlenfelder) über `format` in der Eigenschaft [`fields`](api/config/fields-property.md)
- [Möglichkeit, Header- und Tabellenzellen zu gestalten](guides/stylization.md#cell-style) über den Parameter `cellStyle` der Eigenschaften [`tableShape`](api/config/tableshape-property.md) und [`headerShape`](api/config/headershape-property.md)
- Möglichkeit, HTML-Inhalt in Header- und Tabellenzellen über den Helfer [`pivot.template`](api/helpers/template.md) einzufügen, indem ein Template als `cell`-Eigenschaft der Header- und Spaltenobjekte definiert wird (Tabellenanpassung durch Abfangen des Events [render-table](api/events/render-table-event.md))
- [Excel- und CSV-Exporteinstellungen erweitert](guides/exporting-data.md):
  - Für das Format „xlsx" werden Datums- und Zahlenfelder als Rohwerte mit Standardformat oder dem über die Eigenschaft [`fields`](api/config/fields-property.md) definierten Format exportiert
  - Möglichkeit, Datei- und Sheetnamen zu definieren und Header/Footer aus einer exportierten Datei auszuschließen
  - Möglichkeit, Stile und Templates für exportierte Zellen hinzuzufügen
- [Möglichkeit, Daten über eine externe Eingabe zu filtern](api/table/filter-rows.md)
- Visueller Rahmen für die Zellennavigation
- [Integration mit Frameworks](/category/integration-with-frameworks)

### Neue API {#new-api}

- Einstellung `right` innerhalb des Objekts `split` der Eigenschaft [`tableShape`](api/config/tableshape-property.md)
- Einstellung `cellStyle` innerhalb der Eigenschaften [`tableShape`](api/config/tableshape-property.md) und [`headerShape`](api/config/headershape-property.md)
- Einstellung `format` innerhalb des Arrays [`fields`](api/config/fields-property.md)
- Event [`filter-rows`](api/table/filter-rows.md) der internen Tabelle
- [`pivot.template`](api/helpers/template.md) zur Definition von HTML-Inhalt für Tabellenzellen

### Fehlerbehebungen {#fixes-21}

- Gesamtspalten werden nicht sortiert
- Zeichenfolgenwerte mit führender 0 werden beim Export in Zahlen umgewandelt
- Das Predicate-Template wird nicht auf Zeilen/Spalten angewendet
- Resize-Observer-Fehler in Grenzfällen

### Breaking Changes {#breaking-changes}

- Der Parameter `colWidth` des Objekts `sizes` in der Eigenschaft `tableShape` wurde in `columnWidth` umbenannt

## Version 2.0.3 {#version-203}

Veröffentlicht am 29. November 2024

### Fehlerbehebungen {#fixes-203}

- Export von Baumstrukturen nach Excel/CSV enthält nur die obersten Ebenen
- Exportierte Spalten mit Autobreite sind in der resultierenden Excel-Datei zu schmal
- Falsche Position eines Popups mit Filtern
- Falsches Verhalten nach dem Ändern der Konfiguration mit der Methode setConfig
- Präzisere Typdefinitionen

## Version 2.0.2 {#version-202}

Veröffentlicht am 22. Oktober 2024

### Fehlerbehebungen {#fixes-202}

- Typdefinition `columnShape`
- Korrekter Paketinhalt

## Version 2.0 {#version-20}

Veröffentlicht am 26. August 2024

Bitte lesen Sie die Übersicht der Version auf [der Blog-Seite](https://dhtmlx.com/blog/)

### Breaking Change {#breaking-change}

:::note
Die API von Version 1.5 ist nicht kompatibel mit API v.2.0.
:::

Tipps zur Migration auf die neue Version finden Sie auf der Seite [Migration](news/migration.md).

### Neue Funktionalität {#new-functionality-20}

- Pivot 2.0 ist schnell beim Rendern und Generieren großer Datensätze ([Beispiel](https://snippet.dhtmlx.com/e6qwqrys))
- Neue Funktionen zur Konfiguration von Aussehen und Verhalten der Spalten sind über die Eigenschaft [`columnShape`](api/config/columnshape-property.md) verfügbar:
  - Einstellung von **autowidth** mit der Möglichkeit, die maximalen Zeilen für die **autoWidth**-Berechnung festzulegen ([Beispiel](https://snippet.dhtmlx.com/tn1yw14m))
  - Das Feature **firstOnly**, bei dem jedes Feld der gleichen Daten nur einmal analysiert wird, um die Spaltenbreite zu berechnen (standardmäßig)
- Jetzt können Sie das Aussehen und das Verhalten von Headern über die Eigenschaft [`headerShape`](api/config/headershape-property.md) konfigurieren, die Folgendes ermöglicht:
  - Anwenden eines Templates auf den Text in Headern ([Beispiel](https://snippet.dhtmlx.com/g89r9ryw))
  - Ändern der Textausrichtung ([Beispiel](https://snippet.dhtmlx.com/4qroi8ka))
  - Spalten einklappbar machen ([Beispiel](https://snippet.dhtmlx.com/pt2ljmcm))
- Form und Größen der Tabelle können über die Eigenschaft [`tableShape`](api/config/tableshape-property.md) konfiguriert werden, die Folgendes ermöglicht:
  - Konfigurieren der Höhe von Zeilen, Headern, Footer: rowHeight, headerHeight, footerHeight ([Größenänderung der Tabelle](guides/configuration.md#resizing-the-table))
  - Generieren von Gesamtwerten nicht nur für Spalten, sondern auch für Zeilen, was über den Parameter **totalColumn** der Eigenschaft `tableShape` ermöglicht wird ([Beispiel](https://snippet.dhtmlx.com/f0ag0t9t))
  - Ausblenden doppelter Werte in der Tabellenansicht (der Parameter **cleanRows** der Eigenschaft [`tableShape`](api/config/tableshape-property.md))
  - Spalten von links fixieren, sodass sie beim Scrollen statisch bleiben ([Beispiel](https://snippet.dhtmlx.com/lahf729o))
  - Alle Zeilen auf- oder zuklappen ([Beispiel](https://snippet.dhtmlx.com/i4mi6ejn))
- Weitere Funktionen zum Aggregieren von Daten wurden hinzugefügt:
  - [Begrenzen geladener Daten](guides/working-with-data.md#limiting-loaded-data)
  - Mehr [Operationen mit Daten](guides/working-with-data.md#applying-maths-methods) sind verfügbar
  - [Daten mit Predicates verarbeiten](guides/working-with-data.md#processing-data-with-predicates) – Anwenden benutzerdefinierter Vorverarbeitungsfunktionen für Daten
  - [Datumsformat über Gebietsschema festlegen](guides/localization.md#date-formatting)
- Neue Methoden wurden hinzugefügt: [`getTable()`](api/methods/gettable-method.md), [`setConfig()`](api/methods/setconfig-method.md), [`setLocale()`](api/methods/setlocale-method.md), [`showConfigPanel()`](api/methods/showconfigpanel-method.md)
- Neue Events wurden hinzugefügt: [`add-field`](api/events/add-field-event.md), [`delete-field`](api/events/delete-field-event.md), [`open-filter`](api/events/open-filter-event.md), [`render-table`](api/events/render-table-event.md), [`move-field`](api/events/move-field-event.md), [`show-config-panel`](api/events/show-config-panel-event.md), [`show-config-panel`](api/events/show-config-panel-event.md), [`update-config`](api/events/update-config-event.md), [`update-field`](api/events/update-field-event.md).
