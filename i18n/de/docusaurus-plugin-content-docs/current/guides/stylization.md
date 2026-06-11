---
sidebar_label: Gestaltung
title: Gestaltung
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie mehr über die Gestaltungsmöglichkeiten. Durchsuchen Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Code-Beispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Gestaltung {#styling}

Pivot wird mit einem Standard-Theme geliefert und stellt CSS-Variablen sowie Hilfsklassen zur Anpassung bereit. Überschreiben Sie die Variablen am Widget-Container (oder einem übergeordneten Element), um Farben, Rahmen und andere visuelle Eigenschaften zu ändern.

## Standard-Style {#default-style}

Das Standard-Theme von Pivot ist **Material**. Der folgende CSS-Ausschnitt zeigt die Variablen, die das Material-Theme am Widget-Container setzt:

~~~css
.wx-material-theme {
    --wx-theme-name: material;
    --wx-pivot-primary-hover: #194e9e;
    --wx-pivot-border-color: var(--wx-color-font-disabled);
    --wx-pivot-field-hover: linear-gradient(
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.1) 100%
    );
}
~~~

:::tip Hinweis
Zukünftige Versionen von Pivot können CSS-Variablen umbenennen. Überprüfen Sie die Variablennamen nach einem Upgrade und aktualisieren Sie diese in Ihrem Code, um Darstellungsprobleme zu vermeiden.
:::

## Integriertes Theme {#built-in-theme}

Pivot bietet ein integriertes Theme: **Material**. Wenden Sie das Theme an, indem Sie entweder die Theme-Klasse zum Widget-Container hinzufügen oder das vorgefertigte Skin-Stylesheet auf der Seite einbinden.

Der folgende Code-Ausschnitt wendet das Material-Theme an, indem die Klasse `wx-material-theme` zum Widget-Container hinzugefügt wird:

~~~html {}
<!-- Pivot-Container -->
<div id="root" class="wx-material-theme"></div>
~~~

Der folgende Code-Ausschnitt bindet das Material-Skin-Stylesheet direkt ein:

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## Integriertes Theme anpassen {#customize-built-in-theme}

Überschreiben Sie die Material-Theme-Variablen am Selektor `.wx-material-theme`, um Farben, Rahmen und andere visuelle Eigenschaften zu ändern.

Das folgende Beispiel überschreibt Material-Theme-Variablen, um Pivot in einem dunklen Farbschema darzustellen:

~~~html
<!-- benutzerdefinierte Styles -->
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-table-header-background: #2ca0e3;
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-pivot-background: #444;
        --wx-background: #444;
        --wx-background-alt: #666;
        --wx-pivot-content-background: #666;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #818080;
        --wx-input-background: #9e9e9e;
        --wx-color-font-disabled: #878585;
    }
</style>
~~~

## Benutzerdefinierter Style {#custom-style}

Ändern Sie das Erscheinungsbild von Pivot, indem Sie die CSS-Variablen mit einer benutzerdefinierten Klasse am Widget-Container überschreiben.

Das folgende Beispiel wendet über die Klasse `.demo` einen benutzerdefinierten Style auf Pivot an:

~~~html
<div id="pivot" class="demo"></div>
<style>
    .demo {
        --wx-background: #444;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-pivot-primary-hover: #194e9e;
        --wx-pivot-border-color: 1px solid #818080;
        --wx-table-header-background: #2ca0e3;
    }
</style>
~~~

## Scroll-Style {#scroll-style}

Wenden Sie mit der CSS-Klasse `.wx-styled-scroll` einen benutzerdefinierten Style auf die Pivot-Scrollleiste an. Prüfen Sie die Browser-Kompatibilität vor der Verwendung: [caniuse: CSS Scrollbar](https://caniuse.com/css-scrollbar).

Der folgende Code-Ausschnitt aktiviert die gestaltete Scrollleiste am Widget-Container:

~~~html {} title="index.html"
<!-- Container für Pivot -->
<div id="root" class="wx-styled-scroll"></div> 
~~~

## Zellen-Style {#cell-style}

Um Body- oder Footer-Zellen zu gestalten, verwenden Sie den Parameter `cellStyle` der Eigenschaft [`tableShape`](api/config/tableshape-property.md). Um Header-Zellen zu gestalten, verwenden Sie den Parameter `cellStyle` der Eigenschaft [`headerShape`](api/config/headershape-property.md). In beiden Fällen gibt die Funktion `cellStyle` einen CSS-Klassenamen zurück, den Pivot auf die Zelle anwendet.

Das folgende Beispiel wendet Styles auf Body- und Header-Zellen an:

- Body-Zellen erhalten eine Klasse basierend auf Zellwerten (z. B. `"Down"`, `"Up"`, `"Idle"` im Feld `status`) und auf Gesamtwerten (größer als 40 oder kleiner als 5)
- Header-Zellen erhalten eine Klasse basierend auf dem Wert des Feldes `streaming` — `status-down` für `"no"` und `status-up` für jeden anderen Wert

~~~jsx
const widget = new pivot.Pivot("#pivot", {
    tableShape: {
        totalColumn: true,
        totalRow:true,
        cellStyle: (field, value, area, method, isTotal) => {
            if (field === "status" && area === "rows" && value) {
                if (value === "Down") {
                    return "status-down";
                } else if (value === "Up") {
                    return "status-up";
                } else if (value === "Idle") {
                    return "status-idle";
                }
            }
            if(isTotal ==="column" && area == "values"){
                if(value > 40)
                    return "status-up";
                else if (value < 5)
                    return "status-down";
            }
        }
    },
    headerShape:{
        cellStyle:(field, value, area, method, isTotal) => {
            if(field == "streaming")
                return value ==="no"?"status-down":"status-up";
        }
    },
    fields,
    data: dataset,
    config: {
        rows: [
            "protocol",
            "status",
        ],
        columns: [
            "streaming"
        ],
        values: [
            {
                field: "id",
                method: "count"
            }
        ]
    }
});
~~~

## Werte in Zellen markieren {#mark-values-in-cells}

Verwenden Sie den Parameter `marks` der Eigenschaft [`tableShape`](api/config/tableshape-property.md), um eine CSS-Klasse auf Zellen anzuwenden, die eine Bedingung erfüllen. Jeder Eintrag in `marks` verknüpft einen CSS-Klassenamen (den Schlüssel) mit einer Regel (dem Wert).

Die Regel ist entweder ein vordefinierter String (`"max"` oder `"min"`) oder eine benutzerdefinierte Funktion `(value, columnData, rowData) => boolean`. Wenn die Funktion `true` zurückgibt, fügt Pivot die CSS-Klasse zur Zelle hinzu.

Erstellen Sie die CSS-Klassen in Ihrem Stylesheet, bevor Sie `marks` anwenden.

Das folgende Beispiel hebt Zellen mit den minimalen und maximalen Werten hervor und verwendet eine benutzerdefinierte Funktion, um Nicht-Ganzzahlen größer als 2 zu markieren:

~~~jsx {18-26}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    tableShape: {
        marks: {
            // integrierte Markierungen (Min/Max-Hervorhebung)
            min_cell: "min",
            max_cell: "max",
            // benutzerdefinierte Markierung
            g_avg: v => (v % 1 !== 0) && v > 2
        }
    }
});
~~~

Der folgende Code-Ausschnitt definiert die CSS-Klassen, auf die das `marks`-Objekt oben verweist:

~~~html title="index.html"
<style>
    .min_cell {
        background: #4caf50 !important;
        color: #fff;
    }

    #root .max_cell {
        background: #ff5722 !important;
        color: #fff;
    }

    .g_avg {
        background: #57a5c9 !important;
        color: #fff;
    }
</style>
~~~

## Spezifische CSS-Klassen {#specific-css-classes}

Pivot enthält mehrere CSS-Hilfsklassen, die Sie überschreiben können, um einzelne Tabellenelemente präzise zu steuern.

Pivot richtet Zahlen in Body-Zellen über die integrierte CSS-Klasse `.wx-number` rechtsbündig aus. Ausnahme ist die hierarchische Spalte im Baumstruktur-Modus (wenn `tree: true` in [`tableShape`](api/config/tableshape-property.md) gesetzt ist). Um die Standard-Ausrichtung von Zahlen zurückzusetzen, überschreiben Sie die Klasse.

Der folgende Code-Ausschnitt richtet Zahlen in Body-Zellen linksbündig aus:

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

Um Gesamtspalten zu gestalten, überschreiben Sie die CSS-Klasse `.wx-total`.

Der folgende Code-Ausschnitt gestaltet Gesamtzellen mit einem hellen Hintergrund und einer stärkeren Schriftgewichtung:

~~~html
<style>
    .wx-cell.wx-total {
        background: #fafafb;
        font-weight: var(--wx-header-font-weight);
    }
</style>
~~~

## Beispiel {#example}

Der folgende Ausschnitt wendet einen benutzerdefinierten Style auf Pivot an:

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Verwandte Beispiele**: 

- [Pivot 2. Gestaltung (benutzerdefiniertes CSS) für die Gesamtspalte](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. Min/Max- und benutzerdefinierte Markierungen für Zellen (bedingte Formatierung)](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. Alternierende Zeilenfarbe (gestreifte Zeilen, Zebra-Streifen)](https://snippet.dhtmlx.com/0cm0uko2)
