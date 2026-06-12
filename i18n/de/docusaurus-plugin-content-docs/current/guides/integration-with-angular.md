---
sidebar_label: Integration mit Angular
title: Integration mit Angular
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie, wie die Integration mit Angular funktioniert. Durchsuchen Sie Entwickler-Guides und die API-Referenz, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Testversion von DHTMLX Pivot herunter.
---

# Integration mit Angular {#integration-with-angular}

:::tip
Grundkenntnisse der Konzepte und Muster von **Angular** werden vorausgesetzt. Zur Auffrischung lesen Sie die [**Angular-Dokumentation**](https://v17.angular.io/docs).
:::

DHTMLX Pivot lässt sich wie eine reguläre Komponente in **Angular** einbinden. Ein vollständiges, lauffähiges Beispiel finden Sie in der [**Angular Pivot Demo auf GitHub**](https://github.com/DHTMLX/angular-pivot-demo).

## Projekt erstellen {#create-a-project}

:::info
Installieren Sie [**Angular CLI**](https://v1.angular.io/cli) und [**Node.js**](https://nodejs.org/en/), bevor Sie beginnen.
:::

Der folgende Befehl erstellt ein neues Angular-Projekt mit dem Namen *my-angular-pivot-app*:

~~~bash
ng new my-angular-pivot-app
~~~

:::note
Deaktivieren Sie Server-Side Rendering (SSR) und Static Site Generation (SSG/Prerendering), wenn die Angular CLI danach fragt — dieser Guide setzt eine client-seitig gerenderte App voraus.
:::

Der Befehl installiert alle erforderlichen Werkzeuge. Weitere Befehle sind nicht notwendig.

### Abhängigkeiten installieren {#install-dependencies}

Wechseln Sie in das neue Projektverzeichnis:

~~~bash
cd my-angular-pivot-app
~~~

Installieren Sie die Abhängigkeiten und starten Sie den Entwicklungsserver mit dem Paketmanager [**yarn**](https://yarnpkg.com/):

~~~bash
yarn
yarn start # oder: yarn dev
~~~

Die App sollte auf einem lokalen Port erreichbar sein (zum Beispiel `http://localhost:3000`).

## Pivot erstellen {#create-pivot}

Fügen Sie das Pivot-Paket zum Projekt hinzu und binden Sie Pivot anschließend in eine Angular-Komponente ein.

### Schritt 1. Paket installieren {#step-1-install-the-package}

Laden Sie das [**Pivot-Testpaket**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) herunter und folgen Sie den Anweisungen in der README-Datei. Das Testpaket ist 30 Tage gültig.
  
### Schritt 2. Komponente erstellen {#step-2-create-the-component}

Erstellen Sie eine Angular-Komponente, die Pivot einbindet. Legen Sie einen Ordner *pivot* unter *src/app/* an und erstellen Sie die Datei *src/app/pivot/pivot.component.ts*. Folgen Sie dann diesen Schritten:

#### Quelldateien importieren {#import-source-files}

Öffnen Sie *src/app/pivot/pivot.component.ts* und importieren Sie das Pivot-Paket. Der Import-Pfad hängt von der Paketedition ab:

- **PRO-Version** (aus einem lokalen Ordner installiert):

~~~jsx
import { Pivot } from 'dhx-pivot-package';
~~~

- **Testversion**:

~~~jsx
import { Pivot } from '@dhx/trial-pivot';
~~~

Dieses Tutorial verwendet die Testversion von Pivot.

#### Container einrichten und Pivot einbinden {#set-up-the-container-and-mount-pivot}

Um Pivot auf der Seite anzuzeigen, definieren Sie ein Container-Element im Component-Template und initialisieren Sie Pivot im `ngOnInit`-Hook über den Konstruktor. Zerstören Sie Pivot im `ngOnDestroy`-Hook.

Das folgende Code-Snippet definiert eine minimale Pivot Angular-Komponente:

~~~jsx {1,8,12-13,18-19} title="pivot.component.ts"
import { Pivot } from '@dhx/trial-pivot';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "pivot", // Template-Name, der in "app.component.ts" als <pivot /> verwendet wird
    styleUrls: ["./pivot.component.css"], // CSS-Datei einbinden
    template: `<div #container class="widget"></div>`,
})

export class PivotComponent implements OnInit, OnDestroy {
    // Container-Referenz für Pivot
    @ViewChild('container', { static: true }) pivot_container!: ElementRef;

    private _table!: Pivot;

    ngOnInit() {
        // Pivot-Komponente initialisieren
        this._table = new Pivot(this.pivot_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._table.destructor(); // Pivot beim Entfernen zerstören
    }
}
~~~

#### Stile hinzufügen {#add-styles}

Damit Pivot korrekt gerendert wird, erstellen Sie *src/app/pivot/pivot.component.css* mit Stilen für die Seite und den Pivot-Container:

~~~css title="pivot.component.css"
/* Pivot-Stile importieren */
@import "@dhx/trial-pivot/dist/pivot.css";

/* Stile für die Startseite */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* Stile für den Pivot-Container */
.widget {
    width: 100%;
    height: 100%;
}
~~~

#### Daten laden {#load-data}

Um Pivot mit Daten zu versorgen, bereiten Sie einen Datensatz vor. Erstellen Sie *src/app/pivot/data.ts* und exportieren Sie die Daten sowie die Feld-Metadaten:

~~~jsx title="data.ts"
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

    const fields: any = [
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

Öffnen Sie *src/app/pivot/pivot.component.ts*, importieren Sie `getData` und wenden Sie den Datensatz in `ngOnInit()` an:

~~~jsx {2,18,20-21} title="pivot.component.ts"
import { Pivot } from '@dhx/trial-pivot';
import { getData } from "./data"; // Daten importieren
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "pivot", 
    styleUrls: ["./pivot.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class PivotComponent implements OnInit, OnDestroy {
    @ViewChild('container', { static: true }) pivot_container!: ElementRef;

    private _table!: Pivot;

    ngOnInit() {
        const { dataset, fields } = getData(); // Daten und Feld-Metadaten entpacken
        this._table = new Pivot(this.pivot_container.nativeElement, {
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
    }

    ngOnDestroy(): void {
        this._table.destructor(); 
    }
}
~~~

Die Komponente ist jetzt einsatzbereit. Beim Einbinden rendert Pivot die übergebenen Daten. Die vollständige Liste der Konfigurationseigenschaften finden Sie in der [Pivot API-Dokumentation](api/overview/properties-overview.md).

#### Events behandeln {#handle-events}

Benutzeraktionen in Pivot lösen Events aus, die Sie abonnieren können. Die vollständige Liste der Events finden Sie in der [Events-Übersicht](api/overview/events-overview.md).

Das folgende Code-Snippet erweitert `ngOnInit` um einen `open-filter`-Event-Listener, der die Feld-ID protokolliert, wenn ein Benutzer einen Filter öffnet:

~~~jsx {18-20} title="pivot.component.ts"
// ...
ngOnInit() {
    const { dataset, fields } = getData();
    this._table = new Pivot(this.pivot_container.nativeElement, {
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
        }
    });

    this._table.api.on("open-filter", (ev) => {
        console.log("Die Feld-ID, für die der Filter aktiviert wird:", ev.id);
    });
}

ngOnDestroy(): void {
    this._table.destructor(); 
}
~~~

### Schritt 3. Pivot zur App hinzufügen {#step-3-add-pivot-to-the-app}

Um `PivotComponent` in die App einzubetten, öffnen Sie *src/app/app.component.ts* und ersetzen Sie den Standardcode durch Folgendes:

~~~jsx {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<pivot/>` // Template, das in "pivot.component.ts" erstellt wurde
})
export class AppComponent {
    name = "";
}
~~~

Erstellen Sie dann *src/app/app.module.ts* und registrieren Sie `PivotComponent`:

~~~jsx {4-5,8} title="app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { PivotComponent } from "./pivot/pivot.component";

@NgModule({
    declarations: [AppComponent, PivotComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
~~~

Öffnen Sie abschließend *src/main.ts* und ersetzen Sie den Inhalt durch folgenden Bootstrap-Code:

~~~jsx title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

Starten Sie die App, um zu sehen, wie Pivot die Daten auf der Seite rendert.

![In einer Angular-Anwendung gerendertes DHTMLX Pivot mit Beispieldaten](../assets/trial_pivot.png)

Pivot ist nun in Angular integriert. Passen Sie die Konfiguration an die Anforderungen Ihres Projekts an. Das vollständige Beispiel finden Sie in der [**angular-pivot-demo auf GitHub**](https://github.com/DHTMLX/angular-pivot-demo).
