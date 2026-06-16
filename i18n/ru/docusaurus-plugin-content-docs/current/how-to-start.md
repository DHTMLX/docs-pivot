---
sidebar_label: Начало работы
title: Начало работы
description: Вы можете узнать, как начать работу с DHTMLX Pivot, в документации JavaScript-библиотеки DHTMLX Pivot. Изучайте руководства разработчика и справочник API, запускайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Начало работы {#how-to-start}

Это понятное и подробное руководство проведёт вас через все шаги, необходимые для размещения полнофункционального Pivot на странице.

![Интерфейс DHTMLX Pivot: панель настройки и таблица с данными](/img/pivot-main.png)

## Шаг 1. Загрузка и установка пакетов {#step-1-downloading-and-installing-packages}

[Загрузите пакет](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml) и распакуйте его в папку вашего проекта.

Вы можете импортировать JavaScript Pivot в проект с помощью менеджера пакетов `yarn` или `npm`.

:::info
Если вы хотите интегрировать Pivot в проекты React, Angular, Svelte или Vue, обратитесь к соответствующим [**руководствам по интеграции**](/category/integration-with-frameworks/) для получения дополнительной информации.
:::

### Установка пробной версии Pivot через npm или yarn {#installing-trial-pivot-via-npm-or-yarn}

:::info
Если вы хотите использовать пробную версию Pivot, загрузите [**пакет пробной версии Pivot**](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml) и следуйте инструкциям из файла *README*. Обратите внимание, что пробная версия Pivot доступна только в течение 30 дней.
:::

### Установка PRO-версии Pivot через npm или yarn {#installing-pro-pivot-via-npm-or-yarn}

:::info
Вы можете получить доступ к приватному **npm** DHTMLX напрямую в [Личном кабинете](https://dhtmlx.com/clients/), сгенерировав логин и пароль для **npm**. Там же доступно подробное руководство по установке. Обратите внимание, что доступ к приватному **npm** предоставляется только при наличии активной лицензии на Pivot.
:::

## Шаг 2. Подключение исходных файлов {#step-2-including-source-files}

Начните с создания HTML-файла и назовите его *index.html*. Затем подключите исходные файлы Pivot к созданному файлу.

Необходимы два файла:

- JS-файл Pivot
- CSS-файл Pivot

~~~html {5-6} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Pivot</title>
        <script src="./dist/pivot.js"></script>   
        <link href="./dist/pivot.css" rel="stylesheet">
    </head>
    <body>
        <script>
        // ваш код будет здесь
        </script>
    </body>
</html>
~~~

## Шаг 3. Создание Pivot {#step-3-creating-pivot}

Теперь вы готовы добавить Pivot на страницу. Сначала создадим DIV-контейнер для Pivot.

~~~html {} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Pivot</title>
        <script src="./dist/pivot.js"></script>   
        <link href="./dist/pivot.css" rel="stylesheet">  
    </head>
    <body>
        <div id="root"></div>
        <script>
            const table = new pivot.Pivot("#root", {
                // свойства конфигурации
            });
        </script>
    </body>
</html>
~~~

## Шаг 4. Настройка Pivot {#step-4-configuring-pivot}

Далее вы можете задать свойства конфигурации, которые должен иметь компонент Pivot при инициализации.

Для начала работы с Pivot необходимо предоставить исходные данные. Пример ниже создаёт Pivot с:

- строками для полей *studio* и *genre*
- столбцом *title*
- агрегацией значений для *score* с методом *max*

Массив **fields** необходим для определения идентификаторов полей, подписей для отображения и типов данных.

Массив **data** должен содержать фактические данные, отображаемые в виджете Pivot. Каждый объект массива представляет строку таблицы.

Объект **config** определяет структуру таблицы Pivot: какие поля будут использоваться в качестве строк и столбцов таблицы, а также какие методы агрегации данных применяются к полям.

~~~jsx
const table = new pivot.Pivot("#root", {
    //свойства конфигурации
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

## Что дальше {#whats-next}

Вот и всё. Всего несколько простых шагов — и у вас есть удобный инструмент для анализа данных. Теперь вы можете приступить к решению своих задач или продолжить изучение возможностей JavaScript Pivot:

- Страницы раздела [Руководства](/category/guides) содержат инструкции по установке, загрузке данных, стилизации и другие полезные советы для работы с конфигурацией Pivot
- [Справочник API](api/overview/main-overview.md) содержит описание функциональности Pivot
