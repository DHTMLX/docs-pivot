---
sidebar_label: Миграция на новые версии
title: Миграция на новые версии
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать о миграции на новые версии. Ознакомьтесь с руководствами разработчика и справочником по АПИ, изучите примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Миграция на новые версии {#migration-to-newer-versions}

## 2.0 -> 2.1 {#20---21}

- Параметр `colWidth` объекта `sizes` в свойстве `tableShape` переименован в `columnWidth`

## 1.5 -> 2.0 {#15---20}

Этот список изменений поможет вам выполнить миграцию с предыдущей версии Pivot 1.5 на полностью обновлённую версию Pivot 2.0

:::note
Воспользуйтесь нашим [конвертером для миграции данных из версии 1.5](https://snippet.dhtmlx.com/s4sfdhq4)
:::

### Изменённое АПИ {#changed-api}

#### Свойства {#properties}

Новые свойства не являются полными аналогами предыдущих, но предоставляют расширенную функциональность.

- [fieldList](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fieldlist_config.html) -> [fields](api/config/fields-property.md)
- [fields](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fields_config.html) ->  [config](api/config/config-property.md)
- [mark](https://docs.dhtmlx.com/pivot/1-5/api__pivot_mark_config.html) -> параметр `marks` свойства [tableShape](api/config/tableshape-property.md)
- [types](https://docs.dhtmlx.com/pivot/1-5/api__pivot_types_config.html) -> [methods](api/config/methods-property.md)
- [layout](https://docs.dhtmlx.com/pivot/1-5/api__pivot_layout_config.html) -> [columnShape](api/config/columnshape-property.md), [headerShape](api/config/headershape-property.md), [readonly](api/config/readonly-property.md)
- [customFormat](https://docs.dhtmlx.com/pivot/1-5/api__pivot_customformat_config.html) -> [predicates](api/config/predicates-property.md) - пользовательские функции предварительной обработки данных

#### События {#events}

- [filterApply](https://docs.dhtmlx.com/pivot/1-5/api__pivot_filterapply_event.html) -> [apply-filter](api/events/apply-filter-event.md)
- [fieldClick](https://docs.dhtmlx.com/pivot/1-5/api__pivot_fieldclick_event.html) -> идентичного события нет, но вы можете обратиться к [update-field](api/events/update-field-event.md)

### Удалённое АПИ {#removed-api}

- [Методы версии 1.5](https://docs.dhtmlx.com/pivot/1-5/api__refs__pivot_methods.html) являются устаревшими, все новые методы доступны здесь: [Методы](api/overview/main-overview.md#pivot-methods)
- [События Pivot 1.5](https://docs.dhtmlx.com/pivot/1-5/api__refs__pivot_events.html) (`change`, `fieldClick`, `applyButtonClick`) более не доступны в Pivot 2.0, однако в новой версии вы найдёте расширенную функциональность (см. [события Pivot](api/overview/events-overview.md))

### Важные возможности {#important-features}

- Экспорт данных: [предыдущий вариант экспорта](https://docs.dhtmlx.com/pivot/1-5/guides__export.html) -> [новый вариант экспорта](guides/exporting-data.md)
- Сортировка: [сортировка полей](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#configuringfields) -> [сортировка данных](guides/working-with-data.md#sorting-data)
- Режим дерева: [gridMode](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#gridmode) -> [включение режима дерева](guides/configuration.md#enabling-the-tree-mode)
- Формат даты: [настройка полей с датами](https://docs.dhtmlx.com/pivot/1-5/guides__configuration.html#configuringdatefields) ->
[настройка формата даты](guides/localization.md#date-formatting)
- Кастомизация:
  - [форматирование ячеек](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#conditionalformattingofcells) -> [стиль ячеек](guides/stylization.md#cell-style)
  - [шаблоны для заголовков](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#settingtemplatesforheaders) ->
  [применение шаблонов к заголовкам](guides/configuration.md#applying-templates-to-headers)
  - [шаблоны для ячеек](https://docs.dhtmlx.com/pivot/1-5/guides__customization.html#settingtemplatesforcells) ->
  [применение шаблонов к ячейкам](guides/configuration.md#applying-templates-to-cells)
- Фильтрация: [работа с фильтрами](https://docs.dhtmlx.com/pivot/1-5/guides__using_filters.html) -> [фильтрация данных](guides/working-with-data.md#filtering-data)
