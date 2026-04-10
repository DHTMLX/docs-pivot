---
sidebar_label: Integration with React
title: Integration with React
description: You can learn about the integration with React in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Integration with React

:::tip
Familiarize yourself with the basic concepts and patterns of [React](https://react.dev) before reading this documentation. See the [React documentation](https://react.dev/learn) for reference.
:::

DHTMLX Pivot is compatible with React. For a complete working example, see the [Example on GitHub](https://github.com/DHTMLX/react-pivot-demo).

## Create a project

:::info
Before creating a new project, install [Vite](https://vite.dev/) (optional) and [Node.js](https://nodejs.org/en/).
:::

Create a basic React project or use React with Vite. The following command creates a project named `my-react-pivot-app`:

~~~json
npx create-react-app my-react-pivot-app
~~~

### Install dependencies

Go to the new project directory:

~~~json
cd my-react-pivot-app
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

Create a React component to add Pivot to the application. Create a new file in the `src/` directory and name it `Pivot.jsx`.

#### Import source files

Open `Pivot.jsx` and import Pivot source files.

- PRO version installed from a local folder:

~~~jsx title="Pivot.jsx"
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
~~~

Depending on the package, source files may be minified. In that case import `pivot.min.css` instead.

- Trial version:

~~~jsx title="Pivot.jsx"
import { Pivot } from '@dhx/trial-pivot';
import "@dhx/trial-pivot/dist/pivot.css";
~~~

This tutorial uses the trial version of Pivot.

#### Set up the container

Create a container for Pivot and initialize it with the constructor:

~~~jsx {2,6,9-10} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css"; // include Pivot styles

export default function PivotComponent(props) {
    let container = useRef(); // initialize container for Pivot

    useEffect(() => {
        // initialize the Pivot component
        const table = new Pivot(container.current, {});

        return () => {
            table.destructor(); // destruct Pivot
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### Add styles

Specify styles for Pivot and its container in the main CSS file of the project:

~~~css title="index.css"
/* specify styles for initial page */
html,
body,
#root {
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

Open `App.js`, import the data, and pass it to the `<Pivot/>` component as props:

~~~jsx {2,5-6} title="App.js"
import Pivot from "./Pivot";
import { getData } from "./data";

function App() {
    const { fields, dataset } = getData();
    return <Pivot fields={fields} dataset={dataset} />;
}

export default App;
~~~

Open `Pivot.jsx` and apply the props to the Pivot configuration object:

~~~jsx {5,10-11} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default function PivotComponent(props) {
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

The Pivot component is ready. When the element mounts, it initializes Pivot with data. See the [Pivot API reference](/api/overview/properties-overview/) for the full list of properties.

#### Handle events

Pivot fires events when a user interacts with the widget. Use these events to detect actions and run the corresponding code. See the [full list of events](/api/overview/events-overview/).

Open `Pivot.jsx` and add an event listener inside `useEffect()`:

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
        console.log("The field id for which filter is activated:", ev.id);
    });
    
    return () => {
        table.destructor();
    }
}, []);
// ...
~~~

After that, start the app to see Pivot loaded with data on the page.

![Pivot initialization](../assets/trial_pivot.png)

Customize the code to fit your requirements. See the complete example on [GitHub](https://github.com/DHTMLX/react-pivot-demo).
