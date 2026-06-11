---
sidebar_label: Integration mit Svelte
title: Integration mit Svelte
description: Sie können mehr über die Integration mit Svelte in der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren. Durchsuchen Sie Entwicklerhandbücher und API-Referenz, probieren Sie Codebeispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# Integration mit Svelte {#integration-with-svelte}

:::tip
Grundkenntnisse der Konzepte und Muster von **Svelte** werden vorausgesetzt. Zur Auffrischung lesen Sie die [**Svelte-Dokumentation**](https://svelte.dev/).
:::

DHTMLX Pivot lässt sich als reguläre Komponente in **Svelte** integrieren. Ein vollständiges, funktionsfähiges Setup finden Sie in der [**Svelte Pivot-Demo auf GitHub**](https://github.com/DHTMLX/svelte-pivot-demo).

## Projekt erstellen {#create-a-project}

:::info
Installieren Sie [**Node.js**](https://nodejs.org/en/) bevor Sie beginnen. [**Vite**](https://vite.dev/) ist optional.
:::

Der folgende Befehl führt das Vite-Projektgerüst-Tool aus und ermöglicht die Auswahl einer Svelte-Vorlage:

~~~bash
npm create vite@latest
~~~

Benennen Sie das Projekt *my-svelte-pivot-app*.

### Abhängigkeiten installieren {#install-dependencies}

Wechseln Sie in das neu erstellte Projektverzeichnis:

~~~bash
cd my-svelte-pivot-app
~~~

Installieren Sie die Abhängigkeiten und starten Sie den Entwicklungsserver mit Ihrem Paketmanager:

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

Die App sollte auf einem lokalen Port laufen (zum Beispiel `http://localhost:3000`).

## Pivot erstellen {#create-pivot}

Fügen Sie das Pivot-Paket zum Projekt hinzu und binden Sie Pivot anschließend in eine Svelte-Komponente ein.

### Schritt 1. Paket installieren {#step-1-install-the-package}

Laden Sie das [**Test-Pivot-Paket**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) herunter und folgen Sie den Schritten in der README-Datei. Das Test-Pivot-Paket ist 30 Tage gültig.

### Schritt 2. Komponente erstellen {#step-2-create-the-component}

Erstellen Sie eine Svelte-Komponente, die Pivot einbindet. Fügen Sie eine neue Datei *src/Pivot.svelte* hinzu.

#### Quelldateien importieren {#import-source-files}

Öffnen Sie *src/Pivot.svelte* und importieren Sie die Pivot-Quelldateien. Die Import-Pfade hängen von der Paketversion ab:

- **PRO-Version** (aus einem lokalen Ordner installiert):

~~~html title="Pivot.svelte"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

Wenn das Paket minimierte Assets enthält, importieren Sie *pivot.min.css* anstelle von *pivot.css*.

- **Testversion**:

~~~html title="Pivot.svelte"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

Dieses Tutorial verwendet die Testversion von Pivot.

#### Container einrichten und Pivot einbinden {#set-up-the-container-and-mount-pivot}

Um Pivot auf der Seite anzuzeigen, fügen Sie ein Container-`div` hinzu und initialisieren Sie Pivot dann im `onMount`-Lifecycle-Hook mithilfe des Konstruktors. Zerstören Sie Pivot im `onDestroy`-Hook.

Der folgende Code-Ausschnitt definiert eine minimale Pivot-Svelte-Komponente:

~~~html {3,6,10-11,19} title="Pivot.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Pivot } from "@dhx/trial-pivot";
    import "@dhx/trial-pivot/dist/pivot.css";

    let container; // Container-Referenz für Pivot
    let table;

    onMount(() => {
        // Pivot-Komponente initialisieren
        table = new Pivot(container, {});
    });

    onDestroy(() => {
        table.destructor(); // Pivot beim Unmount zerstören
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### Styles hinzufügen {#add-styles}

Damit Pivot korrekt gerendert wird, fügen Sie die folgenden Styles zur CSS-Hauptdatei des Projekts hinzu:

~~~css title="main.css"
/* Styles für die Startseite */
html,
body,
#app { /* #app-Root-Container verwenden */
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

Um Pivot mit Daten zu versorgen, bereiten Sie einen Datensatz vor. Erstellen Sie *src/data.js* und exportieren Sie die Daten und Feld-Metadaten:

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
        }, // weitere Datensätze
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

Öffnen Sie *src/App.svelte*, importieren Sie die Daten und übergeben Sie sie als Props an die neue `<Pivot/>`-Komponente:

~~~html {3,5,8} title="App.svelte"
<script>
    import Pivot from "./Pivot.svelte";
    import { getData } from "./data.js";

    const { fields, dataset } = getData();
</script>

<Pivot fields={fields} dataset={dataset} />
~~~

Öffnen Sie *src/Pivot.svelte*, deklarieren Sie die eingehenden Props mit `export let` und wenden Sie sie auf das Pivot-Konfigurationsobjekt an:

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
                }, // weitere Werte
            ]
        },
        // weitere Konfigurationseigenschaften
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

Die Komponente ist nun einsatzbereit. Beim Einbinden rendert Pivot mit den übergebenen Daten. Die vollständige Liste der Konfigurationseigenschaften finden Sie in der [Pivot-API-Dokumentation](api/overview/properties-overview.md).

#### Events behandeln {#handle-events}

Benutzeraktionen in Pivot lösen Events aus, die Sie abonnieren können. Die vollständige Liste der Events finden Sie in der [Übersicht der Events](api/overview/events-overview.md).

Der folgende Code-Ausschnitt erweitert `onMount` um einen `open-filter`-Event-Listener, der die Feld-ID protokolliert, wenn ein Benutzer einen Filter öffnet:

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
                }, // weitere Werte
            ]
        },
        // weitere Konfigurationseigenschaften
    });

    table.api.on("open-filter", (ev) => {
        console.log("Die Feld-ID, für die der Filter aktiviert wurde:", ev.id);
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

// ...
~~~

Starten Sie die App, um zu sehen, wie Pivot die Daten auf der Seite rendert.

![Pivot-Initialisierung](../assets/trial_pivot.png)

Pivot ist nun in Svelte integriert. Passen Sie die Konfiguration an die Anforderungen Ihres Projekts an. Das vollständige Beispiel finden Sie in der [**svelte-pivot-demo auf GitHub**](https://github.com/DHTMLX/svelte-pivot-demo).
