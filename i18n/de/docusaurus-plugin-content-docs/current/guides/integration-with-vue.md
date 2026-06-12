---
sidebar_label: Integration mit Vue
title: Integration mit Vue
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie alles über die Integration mit Vue. Lesen Sie Entwickleranleitungen und die API-Referenz, probieren Sie Code-Beispiele und Live-Demos aus, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Integration mit Vue {#integration-with-vue}

:::tip
Grundkenntnisse der Konzepte und Muster von [**Vue**](https://vuejs.org/) werden vorausgesetzt. Zur Auffrischung lesen Sie die [**Vue-3-Dokumentation**](https://vuejs.org/guide/introduction.html#getting-started).
:::

DHTMLX Pivot lässt sich als reguläre Komponente in **Vue** einbinden. Ein vollständiges Arbeitsbeispiel finden Sie in der [**Vue-Pivot-Demo auf GitHub**](https://github.com/DHTMLX/vue-pivot-demo).

## Projekt erstellen {#create-a-project}

:::info
Installieren Sie [**Node.js**](https://nodejs.org/en/), bevor Sie beginnen.
:::

Der folgende Befehl startet das offizielle **Vue**-Projektgerüst-Tool:

~~~bash
npm create vue@latest
~~~

Der Befehl installiert und führt `create-vue` aus. Weitere Informationen finden Sie im [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

Nennen Sie das Projekt *my-vue-pivot-app*.

### Abhängigkeiten installieren {#install-dependencies}

Wechseln Sie in das neue Projektverzeichnis:

~~~bash
cd my-vue-pivot-app
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

Die App sollte auf einem lokalen Port verfügbar sein (zum Beispiel `http://localhost:3000`).

## Pivot erstellen {#create-pivot}

Fügen Sie das Pivot-Paket zum Projekt hinzu und binden Sie Pivot in eine Vue-Komponente ein.

### Schritt 1. Paket installieren {#step-1-install-the-package}

Laden Sie das [**Pivot-Testpaket**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) herunter und befolgen Sie die Schritte in der README. Das Pivot-Testpaket ist 30 Tage gültig.

### Schritt 2. Komponente erstellen {#step-2-create-the-component}

Erstellen Sie eine Vue-Komponente, die Pivot einbindet. Legen Sie die neue Datei *src/components/Pivot.vue* an.

#### Quelldateien importieren {#import-source-files}

Öffnen Sie *src/components/Pivot.vue* und importieren Sie die Pivot-Quelldateien. Die Import-Pfade hängen von der Paketedition ab:

- **PRO-Version** (aus einem lokalen Ordner installiert):

~~~html title="Pivot.vue"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

Falls das Paket minimierte Assets enthält, importieren Sie *pivot.min.css* statt *pivot.css*.

- **Testversion**:

~~~html title="Pivot.vue"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

Dieses Tutorial verwendet die Testversion von Pivot.

#### Container einrichten und Pivot einbinden {#set-up-the-container-and-mount-pivot}

Um Pivot auf der Seite anzuzeigen, fügen Sie ein Container-`div` hinzu und initialisieren Sie Pivot im `mounted`-Hook mithilfe des Konstruktors. Zerstören Sie Pivot im `unmounted`-Hook.

Der folgende Code-Ausschnitt definiert eine minimale Pivot-Vue-Komponente:

~~~html {2,7-8,18} title="Pivot.vue"
<script>
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default {
    mounted() {
        // Pivot-Komponente initialisieren
        this.table = new Pivot(this.$refs.container, {});
    },

    unmounted() {
        this.table.destructor(); // Pivot beim Unmount zerstören
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### Styles hinzufügen {#add-styles}

Damit Pivot korrekt gerendert wird, fügen Sie die folgenden Styles in die CSS-Hauptdatei des Projekts ein:

~~~css title="style.css"
/* Styles für die initiale Seite */
html,
body,
#app { /* den #app-Root-Container verwenden */
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Styles für den Pivot-Container */
.widget {
    width: 100%;
    height: 100%;
}
~~~

#### Daten laden {#load-data}

Um Daten in Pivot zu laden, bereiten Sie einen Datensatz vor. Erstellen Sie *src/data.js* und exportieren Sie die Daten sowie die Feld-Metadaten:

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

Öffnen Sie *src/App.vue*, importieren Sie die Daten, und stellen Sie sie über die `data()`-Option bereit. Übergeben Sie die Werte dann als Props an die neue `<Pivot/>`-Komponente:

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

Öffnen Sie *src/components/Pivot.vue*, deklarieren Sie die eingehenden Props, und wenden Sie sie auf das Pivot-Konfigurationsobjekt an:

~~~html {6,10-11} title="Pivot.vue"
<script>
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default {
    props: ["fields", "dataset"],

    mounted() {
        this.table = new Pivot(this.$refs.container, {
            fields: this.fields,
            data: this.dataset,
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

Die Komponente ist nun einsatzbereit. Beim Einbinden rendert Pivot mit den übergebenen Daten. Die vollständige Liste der Konfigurationseigenschaften finden Sie in der [Pivot-API-Dokumentation](api/overview/properties-overview.md).

#### Events verarbeiten {#handle-events}

Benutzeraktionen in Pivot lösen Events aus, die Sie abonnieren können. Die vollständige Liste der Events finden Sie in der [Events-Übersicht](api/overview/events-overview.md).

Der folgende Code-Ausschnitt erweitert `mounted` um einen `open-filter`-Event-Listener, der die Feld-ID protokolliert, wenn ein Benutzer einen Filter öffnet:

~~~html {22-24} title="Pivot.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.table = new Pivot(this.$refs.container, {
            fields: this.fields,
            data: this.dataset,
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

        this.table.api.on("open-filter", (ev) => {
            console.log("Die Feld-ID, für die der Filter aktiviert wird:", ev.id);
        });
    }
    // ...
}
</script>

// ...
~~~

Starten Sie die App, um zu sehen, wie Pivot die Daten auf der Seite rendert.

![In einer Vue-Anwendung gerendertes DHTMLX Pivot mit Beispieldaten](../assets/trial_pivot.png)

Pivot ist nun in Vue integriert. Passen Sie die Konfiguration an die Anforderungen Ihres Projekts an. Das vollständige Beispiel finden Sie in der [**vue-pivot-Demo auf GitHub**](https://github.com/DHTMLX/vue-pivot-demo).
