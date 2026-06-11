---
sidebar_label: Инициализация
title: Инициализация
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать об инициализации компонента. Изучите руководства разработчика и справочник АПИ, попробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Инициализация

В этом руководстве описано, как создать Pivot на странице и расширить приложение возможностями сводной таблицы. Выполните следующие шаги, чтобы получить готовый к использованию компонент:

1. [Подключите исходные файлы Pivot на странице](#include-source-files).
2. [Создайте контейнер для Pivot](#create-a-container).
3. [Инициализируйте Pivot с помощью конструктора](#initialize-pivot).

## Подключение исходных файлов {#include-source-files}

Для работы приложения Pivot на странице необходимы два исходных файла. Инструкции по загрузке пакета см. в разделе [Загрузка пакетов](how-to-start.md#step-1-downloading-and-installing-packages).

Подключите следующие файлы:

- *pivot.js*
- *pivot.css*

Укажите правильные относительные пути к исходным файлам:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">
~~~

## Создание контейнера {#create-a-container}

Pivot отрисовывается внутри HTML-элемента-контейнера. Добавьте контейнер и задайте ему идентификатор, например *"root"*:

~~~html title="index.html"
<div id="root"></div>
~~~

## Инициализация Pivot {#initialize-pivot}

Конструктор `pivot.Pivot` принимает два параметра:

- идентификатор HTML-контейнера
- объект с параметрами конфигурации

Следующий фрагмент кода создаёт экземпляр Pivot в контейнере *"root"* с начальными полями, данными и структурой:

~~~jsx
// создание Pivot
const table = new pivot.Pivot("#root", {
    // параметры конфигурации
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: ["title"],
        values: [
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

Конструктор возвращает экземпляр Pivot. Вызывайте методы АПИ на возвращённом экземпляре:

- [`getTable`](api/methods/gettable-method.md) — получить доступ к экземпляру виджета Table
- [`setConfig`](api/methods/setconfig-method.md) — обновить текущую конфигурацию Pivot
- [`setLocale`](api/methods/setlocale-method.md) — применить новую локаль к Pivot
- [`showConfigPanel`](api/methods/showconfigpanel-method.md) — показать или скрыть панель конфигурации

## Параметры конфигурации {#configuration-properties}

Конструктор Pivot принимает объект с параметрами конфигурации, управляющими данными, компоновкой и поведением компонента.

:::info
Полный список параметров конфигурации Pivot см. в разделе [Обзор параметров](api/overview/properties-overview.md).
:::

## Пример {#example}

Фрагмент ниже инициализирует Pivot с начальными данными:

<iframe src="https://snippet.dhtmlx.com/y2buoahe?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
