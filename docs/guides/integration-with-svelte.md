---
sidebar_label: Integration with Svelte
title: Integration with Svelte
description: You can learn about the integration with Svelte in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with Svelte

:::tip
Familiarize yourself with the basic concepts and patterns of [Svelte](https://svelte.dev/) before reading this documentation. See the [Svelte documentation](https://svelte.dev/) for reference.
:::

DHTMLX Pivot is compatible with Svelte. For a complete working example, see the [Example on GitHub](https://github.com/DHTMLX/svelte-pivot-demo).

## Create a project

:::info
Before creating a new project, install [Vite](https://vite.dev/) (optional) and [Node.js](https://nodejs.org/en/).
:::

Run the following command to create a Svelte project:

~~~json
npm create vite@latest
~~~

Name the project `my-svelte-pivot-app`.

### Install dependencies

Go to the app directory:

~~~json
cd my-svelte-pivot-app
~~~

Install dependencies and start the dev server using a package manager:

- [yarn](https://yarnpkg.com/):

~~~jsx
yarn
yarn start // or yarn dev
~~~

- [npm](https://www.npmjs.com/):

~~~json
npm install
npm run dev
~~~

The app runs on a localhost (for instance `http://localhost:3000`).

## Create a Pivot component

Stop the app and install the Pivot package.

### Step 1. Package installation

Download the [trial Pivot package](/how-to-start/#installing-trial-pivot-via-npm-or-yarn) and follow the steps in the README file. The trial version is available for 30 days.

### Step 2. Create the component

Create a Svelte component to add Pivot to the application. Create a new file in the `src/` directory and name it `Pivot.svelte`.

#### Import source files

Open `Pivot.svelte` and import Pivot source files.

- PRO version installed from a local folder:

~~~html title="Pivot.svelte"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

Depending on the package, source files may be minified. In that case import `pivot.min.css` instead.

- Trial version:

~~~html title="Pivot.svelte"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

This tutorial uses the trial version of Pivot.

#### Set up the container

Create a container for Pivot and initialize it with the constructor:

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

Specify styles for Pivot and its container in the main CSS file of the project:

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

Create the `data.js` file in the `src/` directory and add your data:

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

Open `App.svelte`, import the data, and pass it to the `<Pivot/>` component as props:

~~~html {3,5,8} title="App.svelte"
<script>
    import Pivot from "./Pivot.svelte";
    import { getData } from "./data.js";

    const {fields, dataset} = getData();
</script>

<Pivot fields={fields} dataset={dataset} />
~~~

Open `Pivot.svelte` and apply the props to the Pivot configuration object:

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

The Pivot component is ready. When the element mounts, it initializes Pivot with data. See the [Pivot API reference](/api/overview/properties-overview/) for the full list of properties.

#### Handle events

Pivot fires events when a user interacts with the widget. Use these events to detect actions and run the corresponding code. See the [full list of events](/api/overview/events-overview/).

Open `Pivot.svelte` and add an event listener inside `onMount()`:

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

After that, start the app to see Pivot loaded with data on the page.

![Pivot initialization](../assets/trial_pivot.png)

Customize the code to fit your requirements. See the complete example on [GitHub](https://github.com/DHTMLX/svelte-pivot-demo).
