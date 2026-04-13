---
sidebar_label: Integration with Vue
title: Integration with Vue
description: You can learn about the integration with Vue in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with Vue

:::tip
Familiarize yourself with the basic concepts and patterns of [Vue](https://vuejs.org/) before reading this documentation. See the [Vue 3 documentation](https://vuejs.org/guide/introduction.html#getting-started) for reference.
:::

DHTMLX Pivot is compatible with Vue 3. For a complete working example, see the [Example on GitHub](https://github.com/DHTMLX/vue-pivot-demo).

## Create a project

:::info
Before creating a new project, install [Node.js](https://nodejs.org/en/).
:::

Run the following command to create a Vue project:

~~~json
npm create vue@latest
~~~

This command installs and executes `create-vue`, the official Vue project scaffolding tool. See the [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application) for details.

Name the project *my-vue-pivot-app*.

### Install dependencies

Go to the app directory:

~~~json
cd my-vue-pivot-app
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

Create a Vue component to add Pivot to the application. In the *src/components/* directory, add a new file and name it *Pivot.vue*.

#### Import source files

Open *Pivot.vue* and import Pivot source files.

- PRO version installed from a local folder:

~~~html title="Pivot.vue"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

Depending on the package, source files may be minified. In that case import *pivot.min.css* instead.

- Trial version:

~~~html title="Pivot.vue"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

This tutorial uses the trial version of Pivot.

#### Set up the container

Create a container for Pivot and initialize it with the constructor:

~~~html {2,7-8,18} title="Pivot.vue"
<script>
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default {
    mounted() {
        // initialize the Pivot component
        this.table = new Pivot(this.$refs.container, {});
    },

    unmounted() {
        this.table.destructor(); // destruct Pivot
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### Add styles

Specify styles for Pivot and its container in the main CSS file of the project:

~~~css title="style.css"
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
    width: 100%;
    height: 100%;
}
~~~

#### Load data

Create the *data.js* file in the *src/* directory and add your data:

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

Open *App.vue*, import the data, and initialize the data via the `data()` method. Pass the data to the `<Pivot/>` component as props:

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

Open *Pivot.vue* and apply the props to the Pivot configuration object:

~~~html {6,10-11} title="Pivot.vue"
<script>
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default {
    props: ["fields", "dataset"],

    mounted() {
        this.table = new Pivot(this.$refs.container, {
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

The Pivot component is ready. When the element mounts, the component initializes Pivot with data. See the [Pivot API reference](/api/overview/properties-overview/) for the full list of properties.

#### Handle events

Pivot fires events when a user interacts with the widget. Use these events to detect actions and run the corresponding code. See the [full list of events](/api/overview/events-overview/).

Open *Pivot.vue* and add an event listener inside `mounted()`:

~~~html {22-24} title="Pivot.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.table = new Pivot(this.$refs.container, {
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

        this.table.api.on("open-filter", (ev) => {
            console.log("The field id for which filter is activated:", ev.id);
        });
    }
    // ...
}
</script>

// ...
~~~

After that, start the app to see Pivot loaded with data on the page.

![Pivot initialization](../assets/trial_pivot.png)

Customize the code to fit your requirements. See the complete example on [GitHub](https://github.com/DHTMLX/vue-pivot-demo).
