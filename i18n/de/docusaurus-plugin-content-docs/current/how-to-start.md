---
sidebar_label: Erste Schritte
title: Erste Schritte
description: Erfahren Sie, wie Sie mit DHTMLX Pivot arbeiten – in der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek. Durchsuchen Sie Entwicklerleitfäden und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Erste Schritte {#how-to-start}

Dieses klare und umfassende Tutorial führt Sie durch die Schritte, die erforderlich sind, um ein voll funktionsfähiges Pivot auf einer Seite einzurichten.

![pivot-main](/assets/pivot_main.png)

## Schritt 1. Pakete herunterladen und installieren {#step-1-downloading-and-installing-packages}

[Laden Sie das Paket herunter](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml) und entpacken Sie es in einen Ordner Ihres Projekts.

Sie können JavaScript Pivot mit dem Paketmanager `yarn` oder `npm` in Ihr Projekt importieren.

:::info
Wenn Sie Pivot in React-, Angular-, Svelte- oder Vue-Projekte integrieren möchten, lesen Sie die entsprechenden [**Integrationsleitfäden**](/category/integration-with-frameworks/) für weitere Informationen.
:::

### Trial-Version von Pivot über npm oder yarn installieren {#installing-trial-pivot-via-npm-or-yarn}

:::info
Wenn Sie die Trial-Version von Pivot verwenden möchten, laden Sie das [**Trial-Pivot-Paket**](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml) herunter und folgen Sie den im *README*-Datei beschriebenen Schritten. Beachten Sie, dass die Trial-Version von Pivot nur 30 Tage lang verfügbar ist.
:::

### PRO-Version von Pivot über npm oder yarn installieren {#installing-pro-pivot-via-npm-or-yarn}

:::info
Sie können direkt im [Kundenbereich](https://dhtmlx.com/clients/) auf das private DHTMLX-**npm** zugreifen, indem Sie Ihre Anmeldedaten für **npm** generieren. Eine detaillierte Installationsanleitung ist dort ebenfalls verfügbar. Bitte beachten Sie, dass der Zugriff auf das private **npm** nur während einer aktiven proprietären Pivot-Lizenz möglich ist.
:::

## Schritt 2. Quelldateien einbinden {#step-2-including-source-files}

Erstellen Sie zunächst eine HTML-Datei und nennen Sie sie *index.html*. Binden Sie anschließend die Pivot-Quelldateien in die erstellte Datei ein.

Zwei Dateien sind erforderlich:

- die JS-Datei von Pivot
- die CSS-Datei von Pivot

~~~html {5-6} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Pivot</title>
        <script src="./dist/pivot.js"></script>   
        <link href="./dist/pivot.css" rel="stylesheet">
    </head>
    <body>
        <script>
        // Ihr Code kommt hier hin
        </script>
    </body>
</html>
~~~

## Schritt 3. Pivot erstellen {#step-3-creating-pivot}

Jetzt können Sie Pivot zur Seite hinzufügen. Erstellen Sie zunächst den DIV-Container für Pivot.

~~~html {} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Pivot</title>
        <script src="./dist/pivot.js"></script>   
        <link href="./dist/pivot.css" rel="stylesheet">  
    </head>
    <body>
        <div id="root"></div>
        <script>
            const table = new pivot.Pivot("#root", {
                // Konfigurationseigenschaften
            });
        </script>
    </body>
</html>
~~~

## Schritt 4. Pivot konfigurieren {#step-4-configuring-pivot}

Als Nächstes können Sie die Konfigurationseigenschaften festlegen, die die Pivot-Komponente bei der Initialisierung haben soll.

Um mit Pivot zu arbeiten, müssen Sie zunächst die Ausgangsdaten bereitstellen. Das folgende Beispiel erstellt ein Pivot mit:

- Zeilen für *studio* und *genre*
- der Spalte *title*
- der Wertaggregation für *score* mit der Methode *max*

Das Array **fields** ist erforderlich, um die Feld-IDs, Anzeigelabels und Datentypen zu definieren.

Das Array **data** soll die tatsächlichen Daten enthalten, die im Pivot-Widget angezeigt werden. Jedes Objekt im Array repräsentiert eine Zeile in der Tabelle.

Das Objekt **config** definiert die Struktur der Pivot-Tabelle, d. h. welche Felder als Zeilen und Spalten der Tabelle verwendet werden und welche Datenaggregationsmethoden auf die Felder angewendet werden sollen.

~~~jsx
const table = new pivot.Pivot("#root", {
    //Konfigurationseigenschaften
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: ["title"],
        values: [
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

## Wie geht es weiter {#whats-next}

Das war's. Mit diesen einfachen Schritten verfügen Sie über ein praktisches Werkzeug zur Datenanalyse. Jetzt können Sie mit Ihren Aufgaben beginnen oder die Welt von JavaScript Pivot weiter erkunden:

- Die Seiten [Leitfäden](/category/guides) enthalten Anleitungen zur Installation, zum Laden von Daten, zur Gestaltung und weitere hilfreiche Tipps für eine reibungslose Pivot-Konfiguration
- Die [API-Referenz](api/overview/main-overview.md) beschreibt die Funktionalität von Pivot
