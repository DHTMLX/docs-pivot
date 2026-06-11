---
sidebar_label: Что нового
title: Что нового
description: Вы можете ознакомиться с новыми возможностями DHTMLX Pivot и историей его выпусков в документации библиотеки DHTMLX JavaScript UI. Изучайте руководства для разработчиков и справочник по АПИ, пробуйте примеры кода и живые демо, а также загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Что нового {#whats-new}

Если вы обновляете Pivot с более старой версии, ознакомьтесь со страницей [Миграция на новые версии](news/migration.md) для получения подробной информации.

## Версия 2.1.1 {#version-211}

Выпущена 10 июня 2026 г.

### Исправления {#fixes}

- Возникает ошибка "getMonth" при применении фильтров строк к наборам данных с отсутствующими или пустыми значениями

## Версия 2.1 {#version-21}

Выпущена 6 мая 2025 г.

### Новая функциональность {#new-functionality}

- [Возможность фиксировать столбцы справа](guides/configuration.md#freezing-columns-on-the-right)
- [Выравнивание по умолчанию](guides/stylization.md#specific-css-classes) и [форматирование на основе локали](guides/localization.md#number-formatting) для числовых значений
- [Возможность задавать пользовательские числовые форматы](guides/working-with-data.md#applying-formats-to-fields) (для полей дат и числовых полей) через параметр `format`, добавленный в свойство [`fields`](api/config/fields-property.md)
- [Возможность стилизовать ячейки заголовка и таблицы](guides/stylization.md#cell-style) с помощью параметра `cellStyle` свойств [`tableShape`](api/config/tableshape-property.md) и [`headerShape`](api/config/headershape-property.md)
- Возможность вставлять HTML-содержимое в ячейки заголовка и таблицы с помощью вспомогательного метода [`pivot.template`](api/helpers/template.md), определяя шаблон в свойстве `cell` объектов заголовка и столбца (настройка таблицы путём перехвата события [render-table](api/events/render-table-event.md))
- [Расширены настройки экспорта в Excel и CSV](guides/exporting-data.md):
  - для формата "xlsx" поля дат и числовые поля экспортируются как необработанные значения с форматом по умолчанию или форматом, заданным через свойство [`fields`](api/config/fields-property.md)
  - возможность задавать имена файла и листа, а также исключать верхний/нижний колонтитул из экспортируемого файла
  - возможность добавлять стили и шаблоны для экспортируемых ячеек
- [Возможность фильтровать данные через внешний элемент ввода](api/table/filter-rows.md)
- Визуальная рамка при навигации по ячейкам
- [Интеграция с фреймворками](/category/integration-with-frameworks)

### Новый АПИ {#new-api}

- Параметр `right` внутри объекта `split` свойства [`tableShape`](api/config/tableshape-property.md)
- Параметр `cellStyle` внутри свойств [`tableShape`](api/config/tableshape-property.md) и [`headerShape`](api/config/headershape-property.md)
- Параметр `format` внутри массива [`fields`](api/config/fields-property.md)
- Событие [`filter-rows`](api/table/filter-rows.md) внутреннего компонента Table
- [`pivot.template`](api/helpers/template.md) для определения HTML-содержимого ячеек таблицы

### Исправления {#fixes-21}

- Итоговые столбцы не сортируются
- Строковые значения с ведущим нулём преобразуются в числа при экспорте
- Шаблон предиката не применяется к строкам/столбцам
- Ошибка наблюдателя изменения размеров в граничных случаях

### Критические изменения {#breaking-changes}

- Параметр `colWidth` объекта `sizes` в свойстве `tableShape` переименован в `columnWidth`

## Версия 2.0.3 {#version-203}

Выпущена 29 ноября 2024 г.

### Исправления {#fixes-203}

- При экспорте в Excel/CSV древовидной структуры экспортируются только верхние ветви
- Экспортируемые столбцы с автоматической шириной оказываются слишком узкими в итоговом файле Excel
- Неверное положение всплывающего окна с фильтрами
- Некорректное поведение после изменения конфигурации с помощью метода setConfig
- Более точные определения типов

## Версия 2.0.2 {#version-202}

Выпущена 22 октября 2024 г.

### Исправления {#fixes-202}

- Определение типа `columnShape`
- Корректное содержимое пакета

## Версия 2.0 {#version-20}

Выпущена 26 августа 2024 г.

Пожалуйста, ознакомьтесь с обзором выпуска на [странице блога](https://dhtmlx.com/blog/)

### Критическое изменение {#breaking-change}

:::note
АПИ версии 1.5 несовместим с АПИ версии 2.0.
:::

Советы по миграции на новую версию смотрите на странице [Миграция](news/migration.md).

### Новая функциональность {#new-functionality-20}

- Pivot 2.0 быстро выполняет рендеринг и генерацию больших наборов данных ([пример](https://snippet.dhtmlx.com/e6qwqrys))
- Новые возможности настройки внешнего вида и поведения столбцов доступны через свойство [`columnShape`](api/config/columnshape-property.md):
  - настройка **autowidth** с возможностью задать maxRows для обработки при расчёте **autoWidth** ([пример](https://snippet.dhtmlx.com/tn1yw14m))
  - функция **firstOnly**, при которой каждое поле с одинаковыми данными анализируется только один раз для расчёта ширины столбца (по умолчанию)
- Теперь можно настраивать внешний вид и поведение заголовков с помощью свойства [`headerShape`](api/config/headershape-property.md), которое позволяет:
  - применять шаблон к тексту в заголовках ([пример](https://snippet.dhtmlx.com/g89r9ryw))
  - изменять ориентацию текста ([пример](https://snippet.dhtmlx.com/4qroi8ka))
  - делать столбцы сворачиваемыми ([пример](https://snippet.dhtmlx.com/pt2ljmcm))
- Форма и размеры таблицы настраиваются через свойство [`tableShape`](api/config/tableshape-property.md), которое позволяет:
  - настраивать высоту строк, заголовков, нижнего колонтитула: rowHeight, headerHeight, footerHeight ([Изменение размеров таблицы](guides/configuration.md#resizing-the-table))
  - генерировать итоговые значения не только для столбцов, но и для строк — с помощью параметра **totalColumn** свойства `tableShape` ([пример](https://snippet.dhtmlx.com/f0ag0t9t))
  - скрывать дублирующиеся значения в представлении таблицы (параметр **cleanRows** свойства [`tableShape`](api/config/tableshape-property.md))
  - фиксировать столбцы слева, делая их статичными при прокрутке ([пример](https://snippet.dhtmlx.com/lahf729o))
  - разворачивать или сворачивать все строки ([пример](https://snippet.dhtmlx.com/i4mi6ejn))
- Добавлены дополнительные возможности для агрегирования данных:
  - [ограничение загружаемых данных](guides/working-with-data.md#limiting-loaded-data)
  - доступно больше [операций с данными](guides/working-with-data.md#applying-maths-methods)
  - [обработка данных с помощью предикатов](guides/working-with-data.md#processing-data-with-predicates) — применение пользовательских функций предварительной обработки данных
  - [задание формата даты через локаль](guides/localization.md#date-formatting)
- Добавлены новые методы: [`getTable()`](api/methods/gettable-method.md), [`setConfig()`](api/methods/setconfig-method.md), [`setLocale()`](api/methods/setlocale-method.md), [`showConfigPanel()`](api/methods/showconfigpanel-method.md)
- Добавлены новые события: [`add-field`](api/events/add-field-event.md), [`delete-field`](api/events/delete-field-event.md), [`open-filter`](api/events/open-filter-event.md), [`render-table`](api/events/render-table-event.md), [`move-field`](api/events/move-field-event.md), [`show-config-panel`](api/events/show-config-panel-event.md), [`show-config-panel`](api/events/show-config-panel-event.md), [`update-config`](api/events/update-config-event.md), [`update-field`](api/events/update-field-event.md).
