---
sidebar_label: Integration with Svelte
title: Integration with Svelte
description: You can learn about the integration with Svelte in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with Svelte

:::tip
Familiarity with the basic concepts and patterns of **Svelte** is assumed. To refresh, see the [**Svelte documentation**](https://svelte.dev/).
:::

DHTMLX Pivot integrates with **Svelte** as a regular component. For a full working setup, see the [**Svelte Pivot demo on GitHub**](https://github.com/DHTMLX/svelte-pivot-demo).

## Create a project

:::info
Install [**Node.js**](https://nodejs.org/en/) before you start. [**Vite**](https://vite.dev/) is optional.
:::

The following command runs the Vite project scaffolding tool and lets you pick a Svelte template:

~~~bash
npm create vite@latest
~~~

Name the project *my-svelte-pivot-app*.

### Install dependencies

Change into the new project directory:

~~~bash
cd my-svelte-pivot-app
~~~

Install dependencies and start the dev server with your package manager:

- with [**yarn**](https://yarnpkg.com/):

~~~bash
yarn 
yarn start # or: yarn dev
~~~

- with [**npm**](https://www.npmjs.com/):

~~~bash
npm install
npm run dev
~~~

The app should run on a local port (for example, `http://localhost:3000`).

## Create Pivot

Add the Pivot package to the project, then wrap Pivot in a Svelte component.

### Step 1. Install the package

Download the [**trial Pivot package**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) and follow the steps in the README. The trial Pivot package is valid for 30 days.

### Step 2. Create the component

Create a Svelte component that mounts Pivot. Add a new file *src/Pivot.svelte*.

#### Import source files

Open *src/Pivot.svelte* and import the Pivot source files. The import paths depend on the package edition:

- **PRO version** (installed from a local folder):

~~~html title="Pivot.svelte"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

If the package ships minified assets, import *pivot.min.css* instead of *pivot.css*.

- **Trial version**:

~~~html title="Pivot.svelte"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

This tutorial uses the trial version of Pivot.

#### Set up the container and mount Pivot

To display Pivot on the page, add a container `div`, then initialize Pivot in the `onMount` lifecycle hook using the constructor. Destroy Pivot in the `onDestroy` hook.

The following code snippet defines a minimal Pivot Svelte component:

~~~html {3,6,10-11,19} title="Pivot.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Pivot } from "@dhx/trial-pivot";
    import "@dhx/trial-pivot/dist/pivot.css";

    let container; // container reference for Pivot
    let table;

    onMount(() => {
        // initialize the Pivot component
        table = new Pivot(container, {});
    });

    onDestroy(() => {
        table.destructor(); // destroy Pivot on unmount
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### Add styles

To render Pivot correctly, add the following styles to the project's main CSS file:

~~~css title="main.css"
/* styles for the initial page */
html,
body,
#app { /* use the #app root container */
    height: 100%;
    padding: 0;
    margin: 0;
}

/* styles for the Pivot container */
.widget {
    height: 100%;
    width: 100%;
}
~~~

#### Load data

To feed data into Pivot, prepare a dataset. Create *src/data.js* and export the data and field metadata:

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

Open *src/App.svelte*, import the data, and pass it to the new `<Pivot/>` component as props:

~~~html {3,5,8} title="App.svelte"
<script>
    import Pivot from "./Pivot.svelte";
    import { getData } from "./data.js";

    const { fields, dataset } = getData();
</script>

<Pivot fields={fields} dataset={dataset} />
~~~

Open *src/Pivot.svelte*, declare the incoming props with `export let`, and apply them to the Pivot configuration object:

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
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

The component is now ready to use. On mount, Pivot renders with the supplied data. For the full list of configuration properties, see the [Pivot API docs](api/overview/properties-overview.md).

#### Handle events

User actions in Pivot fire events that you can subscribe to. For the full list of events, see [Events overview](api/overview/events-overview.md).

The following code snippet extends `onMount` with an `open-filter` event listener that logs the field ID when a user opens a filter:

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
        console.log("The field id for which the filter is activated:", ev.id);
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

// ...
~~~

Start the app to see Pivot render the data on the page.

![DHTMLX Pivot rendered in a Svelte application with sample data](/img/trial_pivot.png)

Pivot is now integrated with Svelte. Customize the configuration to suit the project requirements. For the final example, see [**svelte-pivot-demo on GitHub**](https://github.com/DHTMLX/svelte-pivot-demo).
