---
sidebar_label: Integration with Vue
title: Integration with Vue
description: You can learn about the integration with Vue in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with Vue

:::tip
You should be familiar with the basic concepts and patterns of [**Vue**](https://vuejs.org/) before reading this documentation. To refresh your knowledge, please refer to the [**Vue 3 documentation**](https://vuejs.org/guide/introduction.html#getting-started).
:::

DHTMLX Pivot is compatible with **Vue**. We have prepared code examples on how to use DHTMLX Pivot with **Vue 3**. For more information, refer to the corresponding [**Example on GitHub**](https://github.com/DHTMLX/vue-pivot-demo).

## Creating a project

:::info
Before you start to create a new project, install [**Node.js**](https://nodejs.org/en/).
:::

To create a **Vue** project, run the following command:

~~~json
npm create vue@latest
~~~

This command installs and executes `create-vue`, the official **Vue** project scaffolding tool. Check the details in the [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

Let's name the project as **my-vue-pivot-app**.

### Installation of dependencies

Go to the app directory:

~~~json
cd my-vue-pivot-app
~~~

Install dependencies and start the dev server. For this, use a package manager:

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

## Creating Pivot

Now you should get the DHTMLX Pivot source code. First of all, stop the app and proceed with installing the Pivot package.

### Step 1. Package installation

Download the [**trial Pivot package**](/how-to-start/#installing-trial-pivot-via-npm-and-yarn) and follow steps mentioned in the README file. Note that trial Pivot is available 30 days only.

### Step 2. Component creation

Now you need to create a Vue component, to add Pivot into the application. Create a new file in the ***src/components/*** directory and name it ***Pivot.vue***.

#### Import source files

Open the ***Pivot.vue*** file and import Pivot source files. Note that:

- if you use PRO version and install the Pivot package from a local folder, the import paths look like this:

~~~html title="Pivot.vue"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

Note that depending on the used package, the source files can be minified. In this case make sure that you are importing the CSS file as ***pivot.min.css***.

- if you use the trial version of Pivot, specify the following paths:

~~~html title="Pivot.vue"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
<script>
~~~

In this tutorial you can see how to configure the **trial** version of Pivot.

#### Setting the container and adding Pivot

To display Pivot on the page, you need to create the container for Pivot, and initialize this component using the corresponding constructor:

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

#### Adding styles

To display Pivot correctly, you need to specify important styles for Pivot and its container in the main css file of the project:

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

#### Loading data

To add data into the Pivot, you need to provide a data set. You can create the ***data.js*** file in the ***src/*** directory and add some data into it:

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
        }, // othe data items
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

Then open the ***App.vue*** file, import data, and initialize it via the inner `data()` method. After this you can pass data into the new created `<Pivot/>` component as **props**:

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

Go to the ***Pivot.vue*** file and apply the passed **props** to the Pivot configuration object:

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

Now the Pivot component is ready to use. When the element will be added to the page, it will initialize the Pivot with data. You can provide necessary configuration settings as well. Visit our [Pivot API docs](/api/overview/properties-overview/) to check the full list of available properties.

#### Handling events

When a user makes some action in the Pivot, it invokes an event. You can use these events to detect the action and run the desired code for it. See the [full list of events](/api/overview/events-overview/).

Open ***Pivot.vue*** and complete the `mounted()` method:

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

        table.api.on("open-filter", (ev) => {
            console.log("The field id for which filter is activated:", ev.id);
        });
    }
    // ...
}
</script>

// ...
~~~

After that, you can start the app to see Pivot loaded with data on a page.

![Pivot initialization](../assets/trial_pivot.png)

Now you know how to integrate DHTMLX Pivot with Vue. You can customize the code according to your specific requirements. The final example you can find on [**GitHub**](https://github.com/DHTMLX/vue-pivot-demo).
