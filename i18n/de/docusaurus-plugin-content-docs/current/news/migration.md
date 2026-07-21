---
sidebar_label: Migration zu neueren Versionen
title: Migration zu neueren Versionen
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die Migration zu neueren Versionen. Erkunden Sie Entwicklerleitfäden und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Migration zu neueren Versionen

## 2.0 -> 2.1

- Der Parameter `colWidth` des `sizes`-Objekts in der Eigenschaft `tableShape` wurde in `columnWidth` umbenannt

## 1.5 -> 2.0

Diese Liste der Änderungen hilft Ihnen bei der Migration von der vorherigen Version Pivot 1.5 zur vollständig erneuerten Version Pivot 2.0

:::note
Prüfen Sie unseren [Konverter für die Datenmigration von v.1.5](https://snippet.dhtmlx.com/s4sfdhq4)
:::

### Geänderte API {#changed-api}

#### Eigenschaften {#properties}

Neue Eigenschaften sind keine vollständige Duplikate der vorherigen, sondern bieten erweiterte Funktionalität.

- [fieldList](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fieldlist_config.html) -> [fields](api/config/fields-property.md)
- [fields](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fields_config.html) ->  [config](api/config/config-property.md)
- [mark](https://docs.dhtmlx.com/pivot/1-5/api__pivot_mark_config.html) -> der Parameter `marks` der Eigenschaft [tableShape](api/config/tableshape-property.md)
- [types](https://docs.dhtmlx.com/pivot/1-5/api__pivot_types_config.html) -> [methods](api/config/methods-property.md)
- [layout](https://docs.dhtmlx.com/pivot/1-5/api__pivot_layout_config.html) -> [columnShape](api/config/columnshape-property.md), [headerShape](api/config/headershape-property.md), [readonly](api/config/readonly-property.md)
- [customFormat](https://docs.dhtmlx.com/pivot/1-5/api__pivot_customformat_config.html) -> [predicates](api/config/predicates-property.md) - benutzerdefinierte Vorverarbeitungsfunktionen für Daten

#### Ereignisse {#events}

- [filterApply](https://docs.dhtmlx.com/pivot/1-5/api__pivot_filterapply_event.html) -> [apply-filter](api/events/apply-filter-event.md)
- [fieldClick](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fieldclick_event.html) -> es gibt kein identisches Event, aber Sie können [update-field](api/events/update-field-event.md) verwenden

### Entfernte API {#removed-api}

- [Methoden aus Version 1.5](https://docs.dhtmlx.com/pivot/1-5/api__refs__pivot_methods.html) sind veraltet; alle neuen Methoden finden Sie hier: [Methoden](api/overview/main-overview.md#pivot-methods)
- [Pivot-1.5-Events](https://docs.dhtmlx.com/pivot/1-5/api__refs__pivot_events.html) (`change`, `fieldClick`, `applyButtonClick`) sind in Pivot 2.0 nicht mehr verfügbar, aber Sie finden in der neuen Version erweiterte Funktionalität (siehe [Pivot-Events](api/overview/events-overview.md))

### Wichtige Features {#important-features}

- Datenexport: [frühere Export-Option](https://docs.dhtmlx.com/pivot/1-5/guides__export.html) -> [neue Export-Option](guides/exporting-data.md)
- Sortierung: [Felder sortieren](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#configuringfields) -> [Daten sortieren](guides/working-with-data.md#sorting-data)
- Baumstruktur-Modus: [gridMode](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#gridmode) -> [Baumstruktur-Modus aktivieren](guides/configuration.md#enabling-the-tree-mode)
- Datumsformat: [Datumsfelder konfigurieren](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#configuringdatefields) ->
[Datumsformat festlegen](guides/localization.md#date-formatting)
- Anpassung: 
  - [Zellenformatierung](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#conditionalformattingofcells) -> [Zellenstil](guides/stylization.md#cell-style)
  - [Vorlagen für Kopfzeilen](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#settingtemplatesforheaders) ->
  [Vorlagen auf Kopfzeilen anwenden](guides/configuration.md#applying-templates-to-headers)
  - [Vorlagen für Zellen](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#settingtemplatesforcells) ->
  [Vorlagen auf Zellen anwenden](guides/configuration.md#applying-templates-to-cells)
- Filterung: [Arbeiten mit Filtern](https://docs.dhtmlx.com/pivot/1-5/guides__using_filters.html) -> [Daten filtern](guides/working-with-data.md#filtering-data)
