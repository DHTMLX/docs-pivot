---
sidebar_label: Интеграция с Vue
title: Интеграция с Vue
description: Узнайте об интеграции с Vue в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную пробную версию DHTMLX Pivot.
---

# Интеграция с Vue {#integration-with-vue}

:::tip
Предполагается знакомство с базовыми концепциями и паттернами [**Vue**](https://vuejs.org/). Для повторения см. [**документацию Vue 3**](https://vuejs.org/guide/introduction.html#getting-started).
:::

DHTMLX Pivot интегрируется с **Vue** как обычный компонент. Полный рабочий пример см. в [**демо Vue Pivot на GitHub**](https://github.com/DHTMLX/vue-pivot-demo).

## Создание проекта {#create-a-project}

:::info
Перед началом работы установите [**Node.js**](https://nodejs.org/en/).
:::

Следующая команда запускает официальный инструмент создания проектов **Vue**:

~~~bash
npm create vue@latest
~~~

Команда устанавливает и запускает `create-vue`. Подробнее см. [Быстрый старт Vue.js](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

Назовите проект *my-vue-pivot-app*.

### Установка зависимостей {#install-dependencies}

Перейдите в директорию нового проекта:

~~~bash
cd my-vue-pivot-app
~~~

Установите зависимости и запустите сервер разработки с помощью вашего пакетного менеджера:

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

Добавьте пакет Pivot в проект, затем оберните Pivot в компонент Vue.

### Шаг 1. Установка пакета {#step-1-install-the-package}

Скачайте [**пробный пакет Pivot**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) и следуйте инструкциям в README. Пробный пакет Pivot действителен в течение 30 дней.

### Шаг 2. Создание компонента {#step-2-create-the-component}

Создайте компонент Vue, который монтирует Pivot. Добавьте новый файл *src/components/Pivot.vue*.

#### Импорт исходных файлов {#import-source-files}

Откройте *src/components/Pivot.vue* и импортируйте исходные файлы Pivot. Пути импорта зависят от редакции пакета:

- **PRO версия** (установленная из локальной папки):

~~~html title="Pivot.vue"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

Если пакет поставляется с минифицированными ресурсами, импортируйте *pivot.min.css* вместо *pivot.css*.

- **Пробная версия**:

~~~html title="Pivot.vue"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

В этом руководстве используется пробная версия Pivot.

#### Настройка контейнера и монтирование Pivot {#set-up-the-container-and-mount-pivot}

Чтобы отобразить Pivot на странице, добавьте контейнер `div`, затем инициализируйте Pivot в хуке `mounted` с помощью конструктора. Уничтожьте Pivot в хуке `unmounted`.

Следующий фрагмент кода определяет минимальный компонент Pivot для Vue:

~~~html {2,7-8,18} title="Pivot.vue"
<script>
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default {
    mounted() {
        // инициализируем компонент Pivot
        this.table = new Pivot(this.$refs.container, {});
    },

    unmounted() {
        this.table.destructor(); // уничтожаем Pivot при размонтировании
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### Добавление стилей {#add-styles}

Для корректного отображения Pivot добавьте следующие стили в главный CSS-файл проекта:

~~~css title="style.css"
/* стили для начальной страницы */
html,
body,
#app { /* используем корневой контейнер #app */
    height: 100%;
    padding: 0;
    margin: 0;
}

/* стили для контейнера Pivot */
.widget {
    width: 100%;
    height: 100%;
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

Откройте *src/App.vue*, импортируйте данные и передайте их через опцию `data()`. Затем передайте значения новому компоненту `<Pivot/>` в качестве пропсов:

~~~html {3,7-13,18} title="App.vue"
<script>
import Pivot from "./components/Pivot.vue";
import { getData } from "./data";

export default {
    components: { Pivot },
    data() {
        const { fields, dataset } = getData();
        return {
            fields,
            dataset
        };
    }
};
</script>

<template>
    <Pivot :fields="fields" :dataset="dataset" />
</template>
~~~

Откройте *src/components/Pivot.vue*, объявите входящие пропсы и примените их к объекту конфигурации Pivot:

~~~html {6,10-11} title="Pivot.vue"
<script>
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default {
    props: ["fields", "dataset"],

    mounted() {
        this.table = new Pivot(this.$refs.container, {
            fields: this.fields,
            data: this.dataset,
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
    },

    unmounted() {
        this.table.destructor();
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

Компонент готов к использованию. При монтировании Pivot отображает данные. Полный список свойств конфигурации см. в [документации АПИ Pivot](api/overview/properties-overview.md).

#### Обработка событий {#handle-events}

Действия пользователя в Pivot генерируют события, на которые можно подписаться. Полный список событий см. в [Обзоре событий](api/overview/events-overview.md).

Следующий фрагмент кода расширяет `mounted` обработчиком события `open-filter`, который выводит в консоль идентификатор поля при открытии фильтра пользователем:

~~~html {22-24} title="Pivot.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.table = new Pivot(this.$refs.container, {
            fields: this.fields,
            data: this.dataset,
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

        this.table.api.on("open-filter", (ev) => {
            console.log("Идентификатор поля, для которого активирован фильтр:", ev.id);
        });
    }
    // ...
}
</script>

// ...
~~~

Запустите приложение, чтобы увидеть, как Pivot отображает данные на странице.

![Инициализация Pivot](../assets/trial_pivot.png)

Pivot теперь интегрирован с Vue. Настройте конфигурацию в соответствии с требованиями проекта. Финальный пример см. в [**vue-pivot-demo на GitHub**](https://github.com/DHTMLX/vue-pivot-demo).
