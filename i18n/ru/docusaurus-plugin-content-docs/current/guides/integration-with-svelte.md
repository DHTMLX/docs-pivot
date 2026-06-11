---
sidebar_label: Интеграция со Svelte
title: Интеграция со Svelte
description: Вы можете узнать об интеграции со Svelte в документации библиотеки DHTMLX JavaScript Pivot. Изучите руководства разработчика и справочник АПИ, ознакомьтесь с примерами кода и живыми демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Интеграция со Svelte {#integration-with-svelte}

:::tip
Предполагается знакомство с основными концепциями и паттернами **Svelte**. Для повторения см. [**документацию Svelte**](https://svelte.dev/).
:::

DHTMLX Pivot интегрируется со **Svelte** как обычный компонент. Для полного рабочего примера см. [**демо Svelte Pivot на GitHub**](https://github.com/DHTMLX/svelte-pivot-demo).

## Создание проекта {#create-a-project}

:::info
Перед началом установите [**Node.js**](https://nodejs.org/en/). [**Vite**](https://vite.dev/) — опционально.
:::

Следующая команда запускает инструмент создания проекта Vite и позволяет выбрать шаблон Svelte:

~~~bash
npm create vite@latest
~~~

Назовите проект *my-svelte-pivot-app*.

### Установка зависимостей {#install-dependencies}

Перейдите в директорию нового проекта:

~~~bash
cd my-svelte-pivot-app
~~~

Установите зависимости и запустите сервер разработки с помощью менеджера пакетов:

- с [**yarn**](https://yarnpkg.com/):

~~~bash
yarn 
yarn start # или: yarn dev
~~~

- с [**npm**](https://www.npmjs.com/):

~~~bash
npm install
npm run dev
~~~

Приложение должно запуститься на локальном порту (например, `http://localhost:3000`).

## Создание Pivot {#create-pivot}

Добавьте пакет Pivot в проект, затем оберните Pivot в компонент Svelte.

### Шаг 1. Установка пакета {#step-1-install-the-package}

Загрузите [**ознакомительный пакет Pivot**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) и следуйте инструкциям в README. Ознакомительный пакет Pivot действителен в течение 30 дней.

### Шаг 2. Создание компонента {#step-2-create-the-component}

Создайте компонент Svelte, который монтирует Pivot. Добавьте новый файл *src/Pivot.svelte*.

#### Импорт исходных файлов {#import-source-files}

Откройте *src/Pivot.svelte* и импортируйте исходные файлы Pivot. Пути импорта зависят от редакции пакета:

- **PRO-версия** (установлена из локальной папки):

~~~html title="Pivot.svelte"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

Если пакет поставляется с минифицированными ресурсами, импортируйте *pivot.min.css* вместо *pivot.css*.

- **Ознакомительная версия**:

~~~html title="Pivot.svelte"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

В этом руководстве используется ознакомительная версия Pivot.

#### Настройка контейнера и монтирование Pivot {#set-up-the-container-and-mount-pivot}

Чтобы отобразить Pivot на странице, добавьте контейнер `div`, затем инициализируйте Pivot в хуке жизненного цикла `onMount` с помощью конструктора. Уничтожьте Pivot в хуке `onDestroy`.

Следующий фрагмент кода определяет минимальный компонент Svelte для Pivot:

~~~html {3,6,10-11,19} title="Pivot.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Pivot } from "@dhx/trial-pivot";
    import "@dhx/trial-pivot/dist/pivot.css";

    let container; // ссылка на контейнер для Pivot
    let table;

    onMount(() => {
        // инициализация компонента Pivot
        table = new Pivot(container, {});
    });

    onDestroy(() => {
        table.destructor(); // уничтожение Pivot при размонтировании
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### Добавление стилей {#add-styles}

Чтобы Pivot отображался корректно, добавьте следующие стили в основной CSS-файл проекта:

~~~css title="main.css"
/* стили для начальной страницы */
html,
body,
#app { /* используйте корневой контейнер #app */
    height: 100%;
    padding: 0;
    margin: 0;
}

/* стили для контейнера Pivot */
.widget {
    height: 100%;
    width: 100%;
}
~~~

#### Загрузка данных {#load-data}

Чтобы передать данные в Pivot, подготовьте набор данных. Создайте *src/data.js* и экспортируйте данные и метаданные полей:

~~~jsx title="data.js"
export function getData() {
    const dataset = [
        {
            "cogs": 51,
            "date": "10/1/2018",
            "inventory_margin": 503,
            "margin": 71,
            "market_size": "Major Market",
            "market": "Central",
            "marketing": 46,
            "product_line": "Leaves",
            "product_type": "Herbal Tea",
            "product": "Lemon",
            "profit": -5,
            "sales": 122,
            "state": "Colorado",
            "expenses": 76,
            "type": "Decaf"
        },
        {
            "cogs": 52,
            "date": "10/1/2018",
            "inventory_margin": 405,
            "margin": 71,
            "market_size": "Major Market",
            "market": "Central",
            "marketing": 17,
            "product_line": "Leaves",
            "product_type": "Herbal Tea",
            "product": "Mint",
            "profit": 26,
            "sales": 123,
            "state": "Colorado",
            "expenses": 45,
            "type": "Decaf"
        }, // другие элементы данных
    ];

    const fields = [
        {
            "id": "cogs",
            "label": "Cogs",
            "type": "number"
        },
        {
            "id": "date",
            "label": "Date",
            "type": "date"
        }, // другие поля
    ];

    return { dataset, fields };
};
~~~

Откройте *src/App.svelte*, импортируйте данные и передайте их новому компоненту `<Pivot/>` как пропсы:

~~~html {3,5,8} title="App.svelte"
<script>
    import Pivot from "./Pivot.svelte";
    import { getData } from "./data.js";

    const { fields, dataset } = getData();
</script>

<Pivot fields={fields} dataset={dataset} />
~~~

Откройте *src/Pivot.svelte*, объявите входящие пропсы с помощью `export let` и примените их к объекту конфигурации Pivot:

~~~html {6-7,14-15} title="Pivot.svelte"
<script>
import { onMount, onDestroy } from "svelte";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export let fields;
export let dataset;

let container;
let table;

onMount(() => {
    table = new Pivot(container, {
        fields,
        data: dataset,
        config: {
            rows: ["state", "product_type"],
            columns: ["product_line", "type"],
            values: [
                {
                    field: "profit",
                    method: "sum"
                }, // другие значения
            ]
        },
        // другие свойства конфигурации
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

Компонент готов к использованию. При монтировании Pivot отображает переданные данные. Полный список свойств конфигурации см. в [документации АПИ Pivot](api/overview/properties-overview.md).

#### Обработка событий {#handle-events}

Действия пользователя в Pivot вызывают события, на которые можно подписаться. Полный список событий см. в [обзоре событий](api/overview/events-overview.md).

Следующий фрагмент кода расширяет `onMount` обработчиком события `open-filter`, который записывает в лог идентификатор поля при открытии пользователем фильтра:

~~~html {22-24} title="Pivot.svelte"
<script>
// ...
let table;

onMount(() => {
    table = new Pivot(container, {
        fields,
        data: dataset,
        config: {
            rows: ["state", "product_type"],
            columns: ["product_line", "type"],
            values: [
                {
                    field: "profit",
                    method: "sum"
                }, // другие значения
            ]
        },
        // другие свойства конфигурации
    });

    table.api.on("open-filter", (ev) => {
        console.log("Идентификатор поля, для которого активирован фильтр:", ev.id);
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

// ...
~~~

Запустите приложение, чтобы увидеть, как Pivot отображает данные на странице.

![Инициализация Pivot](../assets/trial_pivot.png)

Pivot теперь интегрирован со Svelte. Настройте конфигурацию в соответствии с требованиями проекта. Финальный пример см. на [**svelte-pivot-demo на GitHub**](https://github.com/DHTMLX/svelte-pivot-demo).
