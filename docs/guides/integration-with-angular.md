---
sidebar_label: Integration with Angular
title: Integration with Angular
description: You can learn about the integration with Angular in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with Angular

:::tip
Be familiar with the basic concepts and patterns of **Angular** before reading this documentation. To refresh your knowledge, refer to the [**Angular documentation**](https://v17.angular.io/docs).
:::

DHTMLX Pivot is compatible with **Angular**. We have prepared code examples on how to use DHTMLX Pivot with **Angular**. For more information, refer to the corresponding [**Example on GitHub**](https://github.com/DHTMLX/angular-pivot-demo).

## Create a project

:::info
Before creating a new project, install [**Angular CLI**](https://v1.angular.io/cli) and [**Node.js**](https://nodejs.org/en/).
:::

Create a new *my-angular-pivot-app* project using Angular CLI:

~~~json
ng new my-angular-pivot-app
~~~

:::note
Disable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering) when creating the new Angular app.
:::

The command installs all the necessary tools. No additional commands are required.

### Install dependencies

Go to the newly created app directory:

~~~json
cd my-angular-pivot-app
~~~

Install dependencies and start the dev server with the [**yarn**](https://yarnpkg.com/) package manager:

~~~jsx
yarn
yarn start // or yarn dev
~~~

The app should run on a localhost (for instance `http://localhost:3000`).

## Create Pivot

Get the DHTMLX Pivot source code. Stop the dev server and install the Pivot package.

### Step 1. Package installation

Download the [**trial Pivot package**](/how-to-start/#installing-trial-pivot-via-npm-or-yarn) and follow the steps in the README file. Note that the trial version is available for 30 days only.

### Step 2. Create the component

Create an Angular component to add Pivot to the application. Create the *pivot* folder in the *src/app/* directory, add a new file into it, and name it *pivot.component.ts*. Then complete the steps described below.

#### Import source files

Open *pivot.component.ts* and import Pivot source files. Note that:

- if you use the PRO version installed from a local folder, use this import path:

~~~jsx
import { Pivot } from 'dhx-pivot-package';
~~~

- if you use the trial version of Pivot, specify the following path:

~~~jsx
import { Pivot } from '@dhx/trial-pivot';
~~~

This tutorial uses the **trial** version of Pivot.

#### Set the container and initialize Pivot

To display Pivot on the page, set the container and initialize Pivot with the corresponding constructor:

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

To display Pivot correctly, create *pivot.component.css* in the *src/app/pivot/* directory and specify the required styles:

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

To load data into Pivot, create *data.ts* in the *src/app/pivot/* directory and add data:

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

Open *pivot.component.ts*, import the data file, and add the data properties to the Pivot configuration object in the `ngOnInit()` method:

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

The Pivot component is ready to use. When the element is added to the page, Pivot initializes with data. Provide additional configuration settings as needed. See the [Pivot API docs](/api/overview/properties-overview/) for the full list of available properties.

#### Handle events

User actions in Pivot trigger events. Handle these events to detect actions and run custom code. See the [full list of events](/api/overview/events-overview/).

Open *pivot.component.ts* and add event handling to the `ngOnInit()` method:

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

Open *src/app/app.component.ts* and replace the default code with the following:

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

Create *app.module.ts* in the *src/app/* directory and specify *PivotComponent*:

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

Open *src/main.ts* and replace the existing code with the following:

~~~jsx title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

Start the app to see Pivot loaded with data on a page.

![Pivot initialization](../assets/trial_pivot.png)

Customize the code for your specific requirements. Find the final example on [**GitHub**](https://github.com/DHTMLX/angular-pivot-demo).
