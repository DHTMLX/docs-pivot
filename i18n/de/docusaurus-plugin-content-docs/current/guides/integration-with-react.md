---
sidebar_label: Integration mit React
title: Integration mit React
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die Integration mit React. Erkunden Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Integration mit React {#integration-with-react}

:::tip
Es werden grundlegende Kenntnisse der Konzepte und Muster von [**React**](https://react.dev) vorausgesetzt. Zur Auffrischung empfiehlt sich die [**React-Dokumentation**](https://react.dev/learn).
:::

DHTMLX Pivot lässt sich als reguläre Komponente in **React** integrieren. Ein vollständiges Beispiel-Setup finden Sie in der [**React Pivot Demo auf GitHub**](https://github.com/DHTMLX/react-pivot-demo).

## Projekt erstellen {#create-a-project}

:::info
Installieren Sie [**Node.js**](https://nodejs.org/en/), bevor Sie beginnen. [**Vite**](https://vite.dev/) ist optional.
:::

Erstellen Sie ein einfaches **React**-Projekt (oder ein Vite-basiertes) mit dem Namen *my-react-pivot-app*.

Der folgende Befehl richtet ein Create React App-Projekt ein:

~~~bash
npx create-react-app my-react-pivot-app
~~~

### Abhängigkeiten installieren {#install-dependencies}

Wechseln Sie in das neue Projektverzeichnis:

~~~bash
cd my-react-pivot-app
~~~

Installieren Sie die Abhängigkeiten und starten Sie den Dev-Server mit Ihrem Paketmanager:

- mit [**yarn**](https://yarnpkg.com/):

~~~bash
yarn
yarn start # oder: yarn dev
~~~

- mit [**npm**](https://www.npmjs.com/):

~~~bash
npm install
npm run dev
~~~

Die Anwendung sollte auf einem lokalen Port laufen (beispielsweise `http://localhost:3000`).

## Pivot erstellen {#create-pivot}

Fügen Sie das Pivot-Paket zum Projekt hinzu und umschließen Sie Pivot anschließend mit einer React-Komponente.

### Schritt 1. Paket installieren {#step-1-install-the-package}

Laden Sie das [**Pivot-Testpaket**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) herunter und folgen Sie den Schritten in der README. Das Pivot-Testpaket ist 30 Tage gültig.

### Schritt 2. Komponente erstellen {#step-2-create-the-component}

Erstellen Sie eine React-Komponente, die Pivot einbindet. Legen Sie eine neue Datei *src/Pivot.jsx* an.

#### Quelldateien importieren {#import-source-files}

Öffnen Sie *src/Pivot.jsx* und importieren Sie die Pivot-Quelldateien. Die Import-Pfade hängen von der Paketedition ab:

- **PRO-Version** (aus einem lokalen Ordner installiert):

~~~jsx title="Pivot.jsx"
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
~~~

Falls das Paket minifizierte Assets enthält, importieren Sie statt *pivot.css* die Datei *pivot.min.css*.

- **Testversion**:

~~~jsx title="Pivot.jsx"
import { Pivot } from '@dhx/trial-pivot';
import "@dhx/trial-pivot/dist/pivot.css";
~~~

Dieses Tutorial verwendet die Testversion von Pivot.

#### Container einrichten und Pivot einbinden {#set-up-the-container-and-mount-pivot}

Um Pivot auf der Seite anzuzeigen, erstellen Sie ein Container-`div` und initialisieren Sie Pivot anschließend in einem `useEffect`-Hook mithilfe des Konstruktors.

Das folgende Code-Snippet definiert eine minimale Pivot-React-Komponente:

~~~jsx {2,6,9-10} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css"; // Pivot-Styles einbinden

export default function PivotComponent(props) {
    let container = useRef(); // Container-Ref für Pivot

    useEffect(() => {
        // die Pivot-Komponente initialisieren
        const table = new Pivot(container.current, {});

        return () => {
            table.destructor(); // Pivot beim Unmount zerstören
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### Styles hinzufügen {#add-styles}

Damit Pivot korrekt dargestellt wird, fügen Sie die folgenden Styles zur CSS-Hauptdatei des Projekts hinzu:

~~~css title="index.css"
/* Styles für die Ausgangsseite */
html,
body,
#root {
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Styles für den Pivot-Container */
.widget {
    height: 100%;
    width: 100%;
}
~~~

#### Daten laden {#load-data}

Um Pivot mit Daten zu versorgen, bereiten Sie einen Datensatz vor. Erstellen Sie *src/data.js* und exportieren Sie die Daten sowie die Feld-Metadaten:

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
        }, // weitere Dateneinträge
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
        }, // weitere Felder
    ];

    return { dataset, fields };
};
~~~

Öffnen Sie *src/App.js*, importieren Sie die Daten und übergeben Sie diese als Props an die `<Pivot/>`-Komponente:

~~~jsx {2,5-6} title="App.js"
import Pivot from "./Pivot";
import { getData } from "./data";

function App() {
    const { fields, dataset } = getData();
    return <Pivot fields={fields} dataset={dataset} />;
}

export default App;
~~~

Öffnen Sie *src/Pivot.jsx*, destrukturieren Sie die Props und wenden Sie diese auf das Pivot-Konfigurationsobjekt an:

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
                    }, // weitere Werte
                ]
            },
            // weitere Konfigurationseigenschaften
        });

        return () => {
            table.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

Die Komponente ist nun einsatzbereit. Beim Einbinden rendert Pivot mit den bereitgestellten Daten. Die vollständige Liste der Konfigurationseigenschaften finden Sie in der [Pivot-API-Dokumentation](api/overview/properties-overview.md).

#### Events verarbeiten {#handle-events}

Benutzeraktionen in Pivot lösen Events aus, die Sie abonnieren können. Die vollständige Liste der Events finden Sie in der [Events-Übersicht](api/overview/events-overview.md).

Das folgende Code-Snippet erweitert `useEffect` um einen `open-filter`-Event-Listener, der die Feld-ID protokolliert, wenn ein Benutzer einen Filter öffnet:

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
                }, // weitere Werte
            ]
        },
        // weitere Konfigurationseigenschaften
    });

    table.api.on("open-filter", (ev) => {
        console.log("Die Feld-ID, für die der Filter aktiviert wurde:", ev.id);
    });
    
    return () => {
        table.destructor();
    }
}, []);
// ...
~~~

Starten Sie die Anwendung, um zu sehen, wie Pivot die Daten auf der Seite rendert.

![Pivot-Initialisierung](../assets/trial_pivot.png)

Pivot ist nun in React integriert. Passen Sie die Konfiguration an die Projektanforderungen an. Das vollständige Beispiel finden Sie in der [**react-pivot-demo auf GitHub**](https://github.com/DHTMLX/react-pivot-demo).
