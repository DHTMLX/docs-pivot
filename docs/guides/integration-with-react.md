---
sidebar_label: Integration with React
title: Integration with React
description: You can learn about the integration with React in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with React

:::tip
Familiarity with the basic concepts and patterns of [**React**](https://react.dev) is assumed. To refresh, see the [**React documentation**](https://react.dev/learn).
:::

DHTMLX Pivot integrates with **React** as a regular component. For a full working setup, see the [**React Pivot demo on GitHub**](https://github.com/DHTMLX/react-pivot-demo).

## Create a project

:::info
Install [**Node.js**](https://nodejs.org/en/) before you start. [**Vite**](https://vite.dev/) is optional.
:::

Create a basic **React** project (or a Vite-based one) named *my-react-pivot-app*.

The following command bootstraps a Create React App project:

~~~bash
npx create-react-app my-react-pivot-app
~~~

### Install dependencies

Change into the new project directory:

~~~bash
cd my-react-pivot-app
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

Add the Pivot package to the project, then wrap Pivot in a React component.

### Step 1. Install the package

Download the [**trial Pivot package**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) and follow the steps in the README. The trial Pivot package is valid for 30 days.

### Step 2. Create the component

Create a React component that mounts Pivot. Add a new file *src/Pivot.jsx*.

#### Import source files

Open *src/Pivot.jsx* and import the Pivot source files. The import paths depend on the package edition:

- **PRO version** (installed from a local folder):

~~~jsx title="Pivot.jsx"
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
~~~

If the package ships minified assets, import *pivot.min.css* instead of *pivot.css*.

- **Trial version**:

~~~jsx title="Pivot.jsx"
import { Pivot } from '@dhx/trial-pivot';
import "@dhx/trial-pivot/dist/pivot.css";
~~~

This tutorial uses the trial version of Pivot.

#### Set up the container and mount Pivot

To display Pivot on the page, create a container `div`, then initialize Pivot in a `useEffect` hook using the constructor.

The following code snippet defines a minimal Pivot React component:

~~~jsx {2,6,9-10} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css"; // include Pivot styles

export default function PivotComponent(props) {
    let container = useRef(); // container ref for Pivot

    useEffect(() => {
        // initialize the Pivot component
        const table = new Pivot(container.current, {});

        return () => {
            table.destructor(); // destroy Pivot on unmount
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### Add styles

To render Pivot correctly, add the following styles to the project's main CSS file:

~~~css title="index.css"
/* styles for the initial page */
html,
body,
#root {
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

Open *src/App.js*, import the data, and pass it to the `<Pivot/>` component as props:

~~~jsx {2,5-6} title="App.js"
import Pivot from "./Pivot";
import { getData } from "./data";

function App() {
    const { fields, dataset } = getData();
    return <Pivot fields={fields} dataset={dataset} />;
}

export default App;
~~~

Open *src/Pivot.jsx*, destructure the props, and apply them to the Pivot configuration object:

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
                    }, // other values
                ]
            },
            // other configuration properties
        });

        return () => {
            table.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

The component is now ready to use. On mount, Pivot renders with the supplied data. For the full list of configuration properties, see the [Pivot API docs](api/overview/properties-overview.md).

#### Handle events

User actions in Pivot fire events that you can subscribe to. For the full list of events, see [Events overview](api/overview/events-overview.md).

The following code snippet extends `useEffect` with an `open-filter` event listener that logs the field ID when a user opens a filter:

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
                }, // other values
            ]
        },
        // other configuration properties
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

Start the app to see Pivot render the data on the page.

![DHTMLX Pivot rendered in a React application with sample data](../assets/trial_pivot.png)

Pivot is now integrated with React. Customize the configuration to suit the project requirements. For the final example, see [**react-pivot-demo on GitHub**](https://github.com/DHTMLX/react-pivot-demo).
