---
sidebar_label: Integration with Angular
title: Integration with Angular
description: You can learn about the integration with Angular in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with Angular

:::tip
Familiarize yourself with the basic concepts and patterns of [Angular](https://v17.angular.io/docs) before reading this documentation. See the [Angular documentation](https://v17.angular.io/docs) for reference.
:::

DHTMLX Pivot is compatible with Angular. For a complete working example, see the [Example on GitHub](https://github.com/DHTMLX/angular-pivot-demo).

## Create a project

:::info
Before creating a new project, install [Angular CLI](https://v17.angular.io/cli) and [Node.js](https://nodejs.org/en/).
:::

Create a new `my-angular-pivot-app` project using Angular CLI:

~~~json
ng new my-angular-pivot-app
~~~

:::note
Disable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering) when creating the Angular app to follow this guide.
:::

The command installs all necessary tools — no additional commands are needed.

### Install dependencies

Go to the new project directory:

~~~json
cd my-angular-pivot-app
~~~

Install dependencies and start the dev server using [yarn](https://yarnpkg.com/):

~~~jsx
yarn
yarn start // or yarn dev
~~~

The app runs on a localhost (for instance `http://localhost:3000`).

## Create a Pivot component

Stop the app and install the Pivot package.

### Step 1. Package installation

Download the [trial Pivot package](/how-to-start/#installing-trial-pivot-via-npm-or-yarn) and follow the steps in the README file. The trial version is available for 30 days.

### Step 2. Create the component

Create a `pivot` folder in the `src/app/` directory, add a new file named `pivot.component.ts`, then complete the steps below.

#### Import source files

Open `pivot.component.ts` and import Pivot source files.

- PRO version installed from a local folder:

~~~jsx
import { Pivot } from 'dhx-pivot-package';
~~~

- Trial version:

~~~jsx
import { Pivot } from '@dhx/trial-pivot';
~~~

This tutorial uses the trial version of Pivot.

#### Set up the container

Set the container to render the component and initialize Pivot with the constructor:

~~~jsx {1,8,12-13,18-19} title="pivot.component.ts"
import { Pivot } from '@dhx/trial-pivot';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "pivot", // a template name used in the "app.component.ts" file as <pivot />
    styleUrls: ["./pivot.component.css"], // include a css file
    template: `<div #container class="widget"></div>`,
})

export class PivotComponent implements OnInit, OnDestroy {
    // initialize container for Pivot
    @ViewChild('container', { static: true }) pivot_container!: ElementRef;

    private _table!: Pivot;

    ngOnInit() {
        // initialize the Pivot component
        this._table = new Pivot(this.pivot_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._table.destructor(); // destruct Pivot
    }
}
~~~

#### Add styles

Create the `pivot.component.css` file in the `src/app/pivot/` directory and specify styles for Pivot and its container:

~~~css title="pivot.component.css"
/* import Pivot styles */
@import "@dhx/trial-pivot/dist/pivot.css";

/* specify styles for initial page */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* specify styles for the Pivot container */
.widget {
    width: 100%;
    height: 100%;
}
~~~

#### Load data

Create the `data.ts` file in the `src/app/pivot/` directory and add your data:

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
        }, // other data items
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
        }, // other fields
    ];

    return { dataset, fields };
};
~~~

Open `pivot.component.ts`, import the data, and pass it to the Pivot configuration inside `ngOnInit()`:

~~~jsx {2,18,20-21} title="pivot.component.ts"
import { Pivot } from '@dhx/trial-pivot';
import { getData } from "./data"; // import data
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
        const { dataset, fields } = getData(); // initialize data properties
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
                    }, // other values
                ]
            },
            // other configuration properties
        });
    }

    ngOnDestroy(): void {
        this._table.destructor(); 
    }
}
~~~

The Pivot component is ready. When the element mounts, it initializes Pivot with data. See the [Pivot API reference](/api/overview/properties-overview/) for the full list of properties.

#### Handle events

Pivot fires events when a user interacts with the widget. Use these events to detect actions and run the corresponding code. See the [full list of events](/api/overview/events-overview/).

Open `pivot.component.ts` and add an event listener inside `ngOnInit()`:

~~~jsx {18-20} title="pivot.component.ts"
// ...
ngOnInit() {
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
                }, // other values
            ]
        }
    });

    this._table.api.on("open-filter", (ev) => {
        console.log("The field id for which filter is activated:", ev.id);
    });
}

ngOnDestroy(): void {
    this._table.destructor(); 
}
~~~

### Step 3. Add Pivot to the app

Open `src/app/app.component.ts` and replace the default code with the following:

~~~jsx {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<pivot/>` // a template created in the "pivot.component.ts" file 
})
export class AppComponent {
    name = "";
}
~~~

Create the `app.module.ts` file in the `src/app/` directory and specify `PivotComponent`:

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

Open `src/main.ts` and replace the existing code with the following:

~~~jsx title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

After that, start the app to see Pivot loaded with data on the page.

![Pivot initialization](../assets/trial_pivot.png)

Customize the code to fit your requirements. See the complete example on [GitHub](https://github.com/DHTMLX/angular-pivot-demo).
