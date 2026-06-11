---
sidebar_label: Интеграция с Angular
title: Интеграция с Angular
description: Вы можете узнать об интеграции с Angular в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Интеграция с Angular {#integration-with-angular}

:::tip
Предполагается знакомство с основными концепциями и паттернами **Angular**. Для повторения см. [**документацию Angular**](https://v17.angular.io/docs).
:::

DHTMLX Pivot интегрируется с **Angular** как обычный компонент. Для полного рабочего примера см. [**демо Angular Pivot на GitHub**](https://github.com/DHTMLX/angular-pivot-demo).

## Создание проекта {#create-a-project}

:::info
Перед началом установите [**Angular CLI**](https://v1.angular.io/cli) и [**Node.js**](https://nodejs.org/en/).
:::

Следующая команда создаёт новый Angular-проект с именем *my-angular-pivot-app*:

~~~bash
ng new my-angular-pivot-app
~~~

:::note
При запросе Angular CLI отключите Server-Side Rendering (SSR) и Static Site Generation (SSG/Prerendering) — данное руководство предполагает клиентский рендеринг.
:::

Команда установит все необходимые инструменты. Дополнительные команды не требуются.

### Установка зависимостей {#install-dependencies}

Перейдите в директорию нового проекта:

~~~bash
cd my-angular-pivot-app
~~~

Установите зависимости и запустите сервер разработки с помощью менеджера пакетов [**yarn**](https://yarnpkg.com/):

~~~bash
yarn
yarn start # или: yarn dev
~~~

Приложение должно запуститься на локальном порту (например, `http://localhost:3000`).

## Создание Pivot {#create-pivot}

Добавьте пакет Pivot в проект, затем оберните Pivot в Angular-компонент.

### Шаг 1. Установка пакета {#step-1-install-the-package}

Загрузите [**ознакомительный пакет Pivot**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) и следуйте инструкциям в README. Ознакомительный пакет Pivot действителен в течение 30 дней.
  
### Шаг 2. Создание компонента {#step-2-create-the-component}

Создайте Angular-компонент, который монтирует Pivot. Добавьте папку *pivot* в *src/app/* и создайте файл *src/app/pivot/pivot.component.ts*. Затем выполните следующие шаги:

#### Импорт исходных файлов {#import-source-files}

Откройте *src/app/pivot/pivot.component.ts* и импортируйте пакет Pivot. Путь импорта зависит от редакции пакета:

- **PRO-версия** (установлена из локальной папки):

~~~jsx
import { Pivot } from 'dhx-pivot-package';
~~~

- **Ознакомительная версия**:

~~~jsx
import { Pivot } from '@dhx/trial-pivot';
~~~

В этом руководстве используется ознакомительная версия Pivot.

#### Настройка контейнера и монтирование Pivot {#set-up-the-container-and-mount-pivot}

Чтобы отобразить Pivot на странице, определите элемент-контейнер в шаблоне компонента, затем инициализируйте Pivot в хуке `ngOnInit` с помощью конструктора. Уничтожьте Pivot в хуке `ngOnDestroy`.

Следующий фрагмент кода определяет минимальный Angular-компонент Pivot:

~~~jsx {1,8,12-13,18-19} title="pivot.component.ts"
import { Pivot } from '@dhx/trial-pivot';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "pivot", // имя шаблона, используемое в файле "app.component.ts" как <pivot />
    styleUrls: ["./pivot.component.css"], // подключение CSS-файла
    template: `<div #container class="widget"></div>`,
})

export class PivotComponent implements OnInit, OnDestroy {
    // ссылка на контейнер для Pivot
    @ViewChild('container', { static: true }) pivot_container!: ElementRef;

    private _table!: Pivot;

    ngOnInit() {
        // инициализация компонента Pivot
        this._table = new Pivot(this.pivot_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._table.destructor(); // уничтожение Pivot при размонтировании
    }
}
~~~

#### Добавление стилей {#add-styles}

Чтобы Pivot отображался корректно, создайте файл *src/app/pivot/pivot.component.css* со стилями для страницы и контейнера Pivot:

~~~css title="pivot.component.css"
/* импорт стилей Pivot */
@import "@dhx/trial-pivot/dist/pivot.css";

/* стили для начальной страницы */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* стили для контейнера Pivot */
.widget {
    width: 100%;
    height: 100%;
}
~~~

#### Загрузка данных {#load-data}

Чтобы передать данные в Pivot, подготовьте набор данных. Создайте файл *src/app/pivot/data.ts* и экспортируйте данные и метаданные полей:

~~~jsx title="data.ts"
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

    const fields: any = [
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

Откройте *src/app/pivot/pivot.component.ts*, импортируйте `getData` и примените набор данных в `ngOnInit()`:

~~~jsx {2,18,20-21} title="pivot.component.ts"
import { Pivot } from '@dhx/trial-pivot';
import { getData } from "./data"; // импорт данных
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "pivot", 
    styleUrls: ["./pivot.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class PivotComponent implements OnInit, OnDestroy {
    @ViewChild('container', { static: true }) pivot_container!: ElementRef;

    private _table!: Pivot;

    ngOnInit() {
        const { dataset, fields } = getData(); // извлечение данных и метаданных полей
        this._table = new Pivot(this.pivot_container.nativeElement, {
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
    }

    ngOnDestroy(): void {
        this._table.destructor(); 
    }
}
~~~

Компонент готов к использованию. При монтировании Pivot отрисовывается с переданными данными. Полный список свойств конфигурации см. в [документации API Pivot](api/overview/properties-overview.md).

#### Обработка событий {#handle-events}

Действия пользователя в Pivot генерируют события, на которые можно подписаться. Полный список событий см. в [обзоре событий](api/overview/events-overview.md).

Следующий фрагмент кода расширяет `ngOnInit` слушателем события `open-filter`, который выводит в консоль идентификатор поля при открытии фильтра пользователем:

~~~jsx {18-20} title="pivot.component.ts"
// ...
ngOnInit() {
    const { dataset, fields } = getData();
    this._table = new Pivot(this.pivot_container.nativeElement, {
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
        }
    });

    this._table.api.on("open-filter", (ev) => {
        console.log("The field id for which the filter is activated:", ev.id);
    });
}

ngOnDestroy(): void {
    this._table.destructor(); 
}
~~~

### Шаг 3. Добавление Pivot в приложение {#step-3-add-pivot-to-the-app}

Чтобы встроить `PivotComponent` в приложение, откройте *src/app/app.component.ts* и замените код по умолчанию следующим:

~~~jsx {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<pivot/>` // шаблон, созданный в файле "pivot.component.ts"
})
export class AppComponent {
    name = "";
}
~~~

Затем создайте файл *src/app/app.module.ts* и зарегистрируйте `PivotComponent`:

~~~jsx {4-5,8} title="app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { PivotComponent } from "./pivot/pivot.component";

@NgModule({
    declarations: [AppComponent, PivotComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
~~~

Наконец, откройте *src/main.ts* и замените его содержимое следующим кодом начальной загрузки:

~~~jsx title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

Запустите приложение, чтобы увидеть отрисовку данных в Pivot на странице.

![Инициализация Pivot](../assets/trial_pivot.png)

Pivot теперь интегрирован с Angular. Настройте конфигурацию в соответствии с требованиями проекта. Итоговый пример см. в [**angular-pivot-demo на GitHub**](https://github.com/DHTMLX/angular-pivot-demo).
