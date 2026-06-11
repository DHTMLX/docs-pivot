---
sidebar_label: Initialisierung
title: Initialisierung
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie alles über die Initialisierung. Durchsuchen Sie Entwicklerhandbücher und die API-Referenz, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Initialisierung {#initialization}

Diese Anleitung erklärt, wie Sie Pivot auf einer Seite erstellen und Ihre Anwendung mit Pivot-Tabellenfunktionen erweitern. Führen Sie die folgenden Schritte aus, um eine einsatzbereite Komponente zu erhalten:

1. [Binden Sie die Pivot-Quelldateien auf der Seite ein](#include-source-files).
2. [Erstellen Sie einen Container für Pivot](#create-a-container).
3. [Initialisieren Sie Pivot mit einem Konstruktor](#initialize-pivot).

## Quelldateien einbinden {#include-source-files}

Eine Pivot-App benötigt zwei Quelldateien auf der Seite. Anweisungen zum Herunterladen des Pakets finden Sie unter [Pakete herunterladen](how-to-start.md#step-1-downloading-and-installing-packages).

Binden Sie die folgenden Dateien ein:

- *pivot.js*
- *pivot.css*

Legen Sie die korrekten relativen Pfade zu den Quelldateien fest:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">
~~~

## Container erstellen {#create-a-container}

Pivot wird in ein HTML-Container-Element gerendert. Fügen Sie einen Container hinzu und weisen Sie ihm eine ID zu, zum Beispiel *"root"*:

~~~html title="index.html"
<div id="root"></div>
~~~

## Pivot initialisieren {#initialize-pivot}

Der Konstruktor `pivot.Pivot` akzeptiert zwei Parameter:

- die ID des HTML-Containers
- ein Objekt mit Konfigurationseigenschaften

Der folgende Code-Ausschnitt erstellt eine Pivot-Instanz im Container *"root"* mit initialen Feldern, Daten und Struktur:

~~~jsx
// Pivot erstellen
const table = new pivot.Pivot("#root", {
    // Konfigurationseigenschaften
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

Der Konstruktor gibt eine Pivot-Instanz zurück. Rufen Sie API-Methoden auf der zurückgegebenen Instanz auf:

- [`getTable`](api/methods/gettable-method.md) — Zugriff auf die zugrunde liegende Table-Widget-Instanz erhalten
- [`setConfig`](api/methods/setconfig-method.md) — die aktuelle Pivot-Konfiguration aktualisieren
- [`setLocale`](api/methods/setlocale-method.md) — eine neue Locale auf Pivot anwenden
- [`showConfigPanel`](api/methods/showconfigpanel-method.md) — das Konfigurationspanel ein- oder ausblenden

## Konfigurationseigenschaften {#configuration-properties}

Der Pivot-Konstruktor akzeptiert ein Objekt mit Konfigurationseigenschaften, die Daten, Layout und Verhalten steuern.

:::info
Die vollständige Liste der Eigenschaften zur Konfiguration von Pivot finden Sie unter [Eigenschaften-Übersicht](api/overview/properties-overview.md).
:::

## Beispiel {#example}

Der folgende Ausschnitt initialisiert Pivot mit den initialen Daten:

<iframe src="https://snippet.dhtmlx.com/y2buoahe?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
