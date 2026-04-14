---
sidebar_label: Integration with Svelte
title: Integration with Svelte
description: You can learn about the integration with Svelte in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with Svelte

:::tip
Be familiar with the basic concepts and patterns of **Svelte** before reading this documentation. To refresh your knowledge, refer to the [**Svelte documentation**](https://svelte.dev/).
:::

DHTMLX Pivot is compatible with **Svelte**. We have prepared code examples on how to use DHTMLX Pivot with **Svelte**. For more information, refer to the corresponding [**Example on GitHub**](https://github.com/DHTMLX/svelte-pivot-demo).

## Create a project

:::info
Before creating a new project, install [**Vite**](https://vite.dev/) (optional) and [**Node.js**](https://nodejs.org/en/).
:::

To create a **Svelte** project, run the following command:

~~~json
npm create vite@latest
~~~

Name the project *my-svelte-pivot-app*.

### Install dependencies

Go to the app directory:

~~~json
cd my-svelte-pivot-app
~~~

Install dependencies and start the dev server with a package manager:

- if you use [**yarn**](https://yarnpkg.com/), run the following commands:

~~~jsx
yarn 
yarn start // or yarn dev
~~~

- if you use [**npm**](https://www.npmjs.com/), run the following commands:

~~~json
npm install
npm run dev
~~~

The app should run on a localhost (for instance `http://localhost:3000`).

## Create Pivot

Get the DHTMLX Pivot source code. Stop the dev server and install the Pivot package.

### Step 1. Package installation

Download the [**trial Pivot package**](/how-to-start/#installing-trial-pivot-via-npm-or-yarn) and follow the steps in the README file. Note that the trial version is available for 30 days only.

### Step 2. Create the component

Create a Svelte component to add Pivot to the application. Add a new file to the *src/* directory and name it *Pivot.svelte*.

#### Import source files

Open *Pivot.svelte* and import Pivot source files. Note that:

- if you use the PRO version installed from a local folder, use these import paths:

~~~html title="Pivot.svelte"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

Depending on the package, source files may be minified. In that case, import *pivot.min.css* instead of *pivot.css*.

- if you use the trial version of Pivot, specify the following paths:

~~~html title="Pivot.svelte"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

This tutorial uses the **trial** version of Pivot.

#### Set the container and add Pivot

To display Pivot on the page, create the container and initialize the component:

~~~html {3,6,10-11,19} title="Pivot.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Pivot } from "@dhx/trial-pivot";
    import "@dhx/trial-pivot/dist/pivot.css";

    let container; // initialize container for Pivot
    let table;

    onMount(() => {
        // initialize the Pivot component
        table = new Pivot(container, {})
    });

    onDestroy(() => {
        table.destructor(); // destruct Pivot
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### Add styles

Add the following styles to the main CSS file to display Pivot correctly:

~~~css title="main.css"
/* specify styles for initial page */
html,
body,
#app { /* make sure that you use the #app root container */
    height: 100%;
    padding: 0;
    margin: 0;
}

/* specify styles for the Pivot container */
.widget {
    height: 100%;
    width: 100%;
}
~~~

#### Load data

To load data into Pivot, create a *data.js* file in the *src/* directory and add data:

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
        }, // other data items
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
        }, // other fields
    ];

    return { dataset, fields };
};
~~~

Open *App.svelte*, import data, and pass the data to the `<Pivot/>` component as props:

~~~html {3,5,8} title="App.svelte"
<script>
    import Pivot from "./Pivot.svelte";
    import { getData } from "./data.js";

    const {fields, dataset} = getData();
</script>

<Pivot fields={fields} dataset={dataset} />
~~~

Open *Pivot.svelte* and apply the props to the Pivot configuration object:

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
                }, // other values
            ]
        },
        // other configuration properties
    })
});

onDestroy(() => {
    table.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

The Pivot component is ready to use. When the element is added to the page, Pivot initializes with data. Provide additional configuration settings as needed. See the [Pivot API docs](/api/overview/properties-overview/) for the full list of available properties.

#### Handle events

User actions in Pivot trigger events. Handle these events to detect actions and run custom code. See the [full list of events](/api/overview/events-overview/).

Open *Pivot.svelte* and add event handling to the `onMount()` method:

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
                }, // other values
            ]
        },
        // other configuration properties
    });

    table.api.on("open-filter", (ev) => {
        console.log("The field id for which filter is activated:", ev.id);
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

// ...
~~~

Start the app to see Pivot loaded with data on a page.

![Pivot initialization](../assets/trial_pivot.png)

Customize the code for your specific requirements. Find the final example on [**GitHub**](https://github.com/DHTMLX/svelte-pivot-demo).
