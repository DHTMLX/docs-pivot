---
sidebar_label: Интеграция с React
title: Интеграция с React
description: Вы можете узнать об интеграции с React в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Интеграция с React {#integration-with-react}

:::tip
Предполагается знакомство с базовыми концепциями и паттернами [**React**](https://react.dev). Для повторения см. [**документацию React**](https://react.dev/learn).
:::

DHTMLX Pivot интегрируется с **React** как обычный компонент. Для полного рабочего примера см. [**демо React Pivot на GitHub**](https://github.com/DHTMLX/react-pivot-demo).

## Создание проекта {#create-a-project}

:::info
Перед началом работы установите [**Node.js**](https://nodejs.org/en/). [**Vite**](https://vite.dev/) опционален.
:::

Создайте базовый проект **React** (или проект на основе Vite) с именем *my-react-pivot-app*.

Следующая команда создаёт проект Create React App:

~~~bash
npx create-react-app my-react-pivot-app
~~~

### Установка зависимостей {#install-dependencies}

Перейдите в директорию нового проекта:

~~~bash
cd my-react-pivot-app
~~~

Установите зависимости и запустите dev-сервер с помощью вашего пакетного менеджера:

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

Добавьте пакет Pivot в проект, затем оберните Pivot в React-компонент.

### Шаг 1. Установка пакета {#step-1-install-the-package}

Загрузите [**ознакомительный пакет Pivot**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) и следуйте инструкциям в README. Ознакомительный пакет Pivot действителен в течение 30 дней.

### Шаг 2. Создание компонента {#step-2-create-the-component}

Создайте React-компонент, который монтирует Pivot. Добавьте новый файл *src/Pivot.jsx*.

#### Импорт исходных файлов {#import-source-files}

Откройте *src/Pivot.jsx* и импортируйте исходные файлы Pivot. Пути импорта зависят от редакции пакета:

- **PRO-версия** (установлена из локальной папки):

~~~jsx title="Pivot.jsx"
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
~~~

Если пакет поставляется с минифицированными ресурсами, импортируйте *pivot.min.css* вместо *pivot.css*.

- **Ознакомительная версия**:

~~~jsx title="Pivot.jsx"
import { Pivot } from '@dhx/trial-pivot';
import "@dhx/trial-pivot/dist/pivot.css";
~~~

В этом руководстве используется ознакомительная версия Pivot.

#### Настройка контейнера и монтирование Pivot {#set-up-the-container-and-mount-pivot}

Для отображения Pivot на странице создайте контейнер `div`, затем инициализируйте Pivot в хуке `useEffect` с помощью конструктора.

Следующий фрагмент кода определяет минимальный React-компонент Pivot:

~~~jsx {2,6,9-10} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css"; // подключение стилей Pivot

export default function PivotComponent(props) {
    let container = useRef(); // реф контейнера для Pivot

    useEffect(() => {
        // инициализация компонента Pivot
        const table = new Pivot(container.current, {});

        return () => {
            table.destructor(); // уничтожение Pivot при размонтировании
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### Добавление стилей {#add-styles}

Для корректного отображения Pivot добавьте следующие стили в основной CSS-файл проекта:

~~~css title="index.css"
/* стили для начальной страницы */
html,
body,
#root {
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

Для передачи данных в Pivot подготовьте набор данных. Создайте *src/data.js* и экспортируйте данные и метаданные полей:

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

Откройте *src/App.js*, импортируйте данные и передайте их в компонент `<Pivot/>` как пропсы:

~~~jsx {2,5-6} title="App.js"
import Pivot from "./Pivot";
import { getData } from "./data";

function App() {
    const { fields, dataset } = getData();
    return <Pivot fields={fields} dataset={dataset} />;
}

export default App;
~~~

Откройте *src/Pivot.jsx*, деструктурируйте пропсы и примените их к объекту конфигурации Pivot:

~~~jsx {5,10-11} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default function PivotComponent({ fields, dataset }) {
    let container = useRef(); 

    useEffect(() => {
        const table = new Pivot(container.current, {
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

        return () => {
            table.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

Компонент готов к использованию. При монтировании Pivot отображает переданные данные. Полный список свойств конфигурации см. в [документации API Pivot](api/overview/properties-overview.md).

#### Обработка событий {#handle-events}

Действия пользователя в Pivot генерируют события, на которые можно подписаться. Полный список событий см. в [обзоре событий](api/overview/events-overview.md).

Следующий фрагмент кода расширяет `useEffect` обработчиком события `open-filter`, который записывает в лог идентификатор поля при открытии фильтра пользователем:

~~~jsx {19-21} title="Pivot.jsx"
// ...
useEffect(() => {
    const table = new Pivot(container.current, {
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
        console.log("The field id for which the filter is activated:", ev.id);
    });
    
    return () => {
        table.destructor();
    }
}, []);
// ...
~~~

Запустите приложение, чтобы увидеть, как Pivot отображает данные на странице.

![DHTMLX Pivot, отрендеренный в приложении React с демонстрационными данными](../assets/trial_pivot.png)

Pivot теперь интегрирован с React. Настройте конфигурацию под требования проекта. Готовый пример см. в [**react-pivot-demo на GitHub**](https://github.com/DHTMLX/react-pivot-demo).
