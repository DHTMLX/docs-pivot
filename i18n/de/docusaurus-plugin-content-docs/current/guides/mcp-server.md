---
sidebar_label: DHTMLX MCP-Server
title: DHTMLX Pivot MCP-Server für Konfiguration, Aggregation und Export
description: Die Config, Aggregationsmethoden, Prädikate und die Export-API von DHTMLX Pivot erreichen KI-Assistenten über den MCP-Server als aktuelle Dokumentation, nicht als Vermutung aus dem Training.
---

# DHTMLX Pivot MCP-Server: Konfiguration, Aggregation und Export {#dhtmlx-pivot-mcp-server-configuration-aggregation-and-export}

DHTMLX Pivot verwandelt [ein Konfigurationsobjekt](api/config/config-property.md) in eine vollständig aggregierte Tabelle und öffnet den Zugang zu einer zweiten kompletten API, [dem zugrunde liegenden Table-Widget](api/methods/gettable-method.md), zum Exportieren von Daten oder zum Erweitern von Baumzeilen. Layoutänderungen und vollständige Tabellen-Neuzeichnungen lösen jeweils ein eigenes Event aus: [eine Layout-Bearbeitung](api/events/update-config-event.md) löst das eine aus, während [jede darunterliegende Neuzeichnung](api/events/render-table-event.md) das andere auslöst. Das alles richtig hinzubekommen, hängt von aktueller Dokumentation ab, nicht von einer veralteten Vermutung.

Fragen Sie stattdessen den DHTMLX MCP-Server: Er liefert die aktuelle [`config`-Struktur](api/config/config-property.md), den [Exportweg über getTable()](guides/exporting-data.md) und das [richtige Event für die Persistenz](/guides/working-with-server#save-the-users-layout-to-resume-the-session), sodass der Assistent Code generiert, der dem tatsächlichen aktuellen Verhalten von Pivot entspricht.

### MCP-Endpunkt {#mcp-endpoint}

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
Der DHTMLX MCP-Server deckt alle wichtigen DHTMLX-Produkte ab, nicht nur DHTMLX Pivot. Derselbe Endpunkt und dieselben Konfigurationsanweisungen funktionieren unabhängig davon, mit welcher DHTMLX-Komponente Sie arbeiten.
:::

## Was Pivot-Entwickler den MCP-Server fragen {#what-pivot-developers-ask-the-mcp-server}

Der MCP-Server kann Ihnen nahezu alles über die Dokumentation von DHTMLX Pivot verraten, angefangen bei:

- Nachschlagen der aktuellen API für [Methoden](api/overview/methods-overview.md), [Events](api/overview/events-overview.md) und [Eigenschaften](api/overview/properties-overview.md), einschließlich der [Event Bus](api/overview/internal-eventbus-overview.md)- und [State](api/overview/internal-state-overview.md)-Methoden.
- Generieren von sofort lauffähigem [Initialisierungs](guides/initialization.md)-Code mit der Struktur aus `fields`, `data` und [`config`](api/config/config-property.md), die eine bestimmte Tabelle benötigt.
- Definieren von [Zeilen, Spalten und Werten](guides/working-with-data.md#define-pivot-structure) in der `config`-Eigenschaft, einschließlich beider akzeptierten Formen eines `values`-Eintrags.
- Auswählen oder Schreiben von [Aggregationsmethoden](guides/working-with-data.md#applying-maths-methods), von der integrierten Gruppe `sum`/`count`/`average` bis zu einer benutzerdefinierten Methode, die über die [`methods`](api/config/methods-property.md)-Eigenschaft hinzugefügt wird.
- Vorverarbeiten von Daten mit [Prädikaten](guides/working-with-data.md#processing-data-with-predicates) vor der Aggregation, zum Beispiel beim Gruppieren von Datumswerten nach Monat.
- Größenanpassung, Fixierung und Templating von Tabellenzellen über [`tableShape`](api/config/tableshape-property.md) und [`headerShape`](api/config/headershape-property.md), einschließlich [Baummodus](guides/configuration.md#enabling-the-tree-mode) und [fixierten Spalten](guides/configuration.md#freezing-columns).
- [Lokalisieren](guides/localization.md) von Labels und Datums-/Zahlenformaten sowie [Gestalten](guides/stylization.md) der Tabelle mit den CSS-Variablen `--wx-pivot-*`.
- [Exportieren](guides/exporting-data.md) einer Tabelle nach CSV oder XLSX über die Table-Instanz, die von [`getTable()`](api/methods/gettable-method.md) zurückgegeben wird.
- Entscheiden zwischen [`update-config`](api/events/update-config-event.md) und [`render-table`](api/events/render-table-event.md), wenn Sie [den State auf einem Server persistieren](/guides/working-with-server), oder Integrieren von Pivot mit [React](guides/integration-with-react.md), [Vue](guides/integration-with-vue.md), [Angular](guides/integration-with-angular.md) und [Svelte](guides/integration-with-svelte.md).

## Wo eine Pivot-Frage im MCP landet {#where-a-pivot-question-lands-in-mcp}

Eine Pivot-Frage, die an den DHTMLX MCP-Server gesendet wird, durchläuft eine Retrieval-Augmented-Generation-(RAG)-Pipeline, die auf dem Model Context Protocol (MCP) aufbaut, und landet in einem von zwei Workflows: *Search*, der passende Referenzseiten zurückgibt, aus denen der Assistent schreibt, oder *Inference*, der diese Seiten liest und die Frage selbst beantwortet. Nur die Hälfte dieser Anfrage benötigt einen Dokumentationsabgleich. Der Assistent grenzt diese Hälfte ein und schreibt den Rest, die serverspezifische Speicherlogik, aus dem, was er bereits weiß.

Betrachten Sie den Prompt *„Schreibe einen Handler, der die Pivot-Config bei jeder Layoutänderung auf dem Server speichert.“*:

1. Der Assistent grenzt die Hälfte ein, die Dokumentation benötigt: welches Event abgehört werden muss und wie die aktuelle Config gelesen wird.
2. Der Server ermittelt die zugehörige Dokumentation [Mit dem Server arbeiten](/guides/working-with-server).
3. Da nach generiertem Code gefragt wird, übernimmt *Search* die Anfrage (eine engere Frage, etwa ob `render-table` häufiger auslöst als `update-config`, würde stattdessen an *Inference* gehen).
4. *Search* ruft die passenden Seiten aus einem Vektorindex der aktuellen Pivot-Dokumentation ab.
5. Der Assistent erhält diese Seiten als Kontext zurück.
6. Aus diesem Kontext schreibt der Assistent den [`update-config`](api/events/update-config-event.md)-Listener, wobei er das häufigere Auslösen von `render-table` korrekt ausklammert, und fügt anschließend aus eigenem Wissen die eigentliche Speicheranfrage für den Zielserver hinzu.

So bleibt der Aggregations- und Export-Code von Pivot mit der aktuellen API abgestimmt.

## KI-Tool mit dem MCP-Server verbinden {#linking-your-ai-tool-to-the-mcp-server}

Unabhängig davon, welches KI-Entwicklungstool Sie neben Pivot verwenden, läuft die Anbindung an den MCP-Server auf einen einzigen Schritt hinaus: das Tool per CLI-Befehl oder JSON-Konfigurationsdatei auf die untenstehende Endpunkt-URL zu verweisen.

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

Im Folgenden finden Sie die Einrichtungsdetails für gängige Tools.

### Claude Code {#claude-code}

:::info
Die [offizielle Dokumentation](https://code.claude.com/docs/en/mcp) von Claude Code führt durch jeden MCP-Einrichtungsweg.
:::

Um den Server über die Kommandozeile zu registrieren, führen Sie aus:

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

Keine CLI zur Hand? Fügen Sie die folgende Konfiguration manuell zu Ihrer `.mcp.json` hinzu:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Cursor {#cursor}

:::info
Die vollständigen MCP-Konfigurationsoptionen finden Sie in der [offiziellen Dokumentation](https://cursor.com/en-US/docs/mcp) von Cursor.
:::

Schritte zum Hinzufügen des Servers:

1. Öffnen Sie die Einstellungen (`Cmd+Shift+J` unter Mac, `Ctrl+Shift+J` unter Windows/Linux)
2. Gehen Sie zu **Tools & MCP**
3. Klicken Sie auf **Add Custom MCP**
4. Fügen Sie die folgende Konfiguration ein:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Google Antigravity {#google-antigravity}

#### Antigravity 2.0 {#antigravity-20}

:::info
Die [offizielle Dokumentation](https://antigravity.google/docs/mcp) bietet den vollständigen Überblick über die MCP-Server-Integration in Antigravity.
:::

Das sind die Schritte, um den DHTMLX MCP-Server mit Google Antigravity zu verbinden:

1. Öffnen Sie die Befehlspalette
2. Geben Sie "mcp add" ein
3. Wählen Sie "HTTP"
4. Geben Sie die folgenden Werte an:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI {#antigravity-cli}

:::info
Der [zugehörige Leitfaden](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes) erklärt, was sich bei der Migration von Gemini CLI zu Antigravity CLI ändert.
:::

Um den DHTMLX MCP-Server mit Antigravity CLI zu verbinden, erstellen Sie `mcp_config.json` an einem der folgenden Orte:

- Global: `~/.gemini/config/mcp_config.json`
- Workspace: `.agents/mcp_config.json`

Fügen Sie die folgende Konfiguration hinzu:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

Führen Sie anschließend `agy` im Terminal aus.

### ChatGPT {#chatgpt}

:::info
Alle Schritte zur Einrichtung eines MCP-Connectors in ChatGPT finden Sie in der [offiziellen Dokumentation](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt).
:::

Schritte zur Konfiguration des Connectors:

1. Gehen Sie zu **Settings** → **Apps & Connectors**
2. Klicken Sie auf **Advanced settings**
3. Aktivieren Sie **Developer mode**
4. Kehren Sie zu **Apps & Connectors** zurück und klicken Sie auf "Create"
5. Füllen Sie die Connector-Details aus:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- Authentication: `No authentication`
6. Klicken Sie auf **Create**

Nachdem Sie den Connector erstellt haben, ruft ChatGPT während der Unterhaltungen Dokumentation vom MCP-Server ab.

:::info
Für intensive Coding-Workflows sind andere MCP-fähige Tools möglicherweise besser geeignet.
:::

### Andere Tools {#other-tools}

In den Einstellungsbereichen anderer KI-Coding-Tools wird dies meist als "Model Context Protocol" oder "Context Sources" bezeichnet. Fügen Sie dort `https://docs.dhtmlx.com/mcp` als benutzerdefinierte Quelle hinzu.

## Wohin Ihre Anfragen gehen {#where-your-queries-go}

Als gehosteter Dienst läuft der MCP-Server niemals auf Ihrer eigenen Hardware, öffnet niemals eine lokale Datei und speichert niemals personenbezogene Daten.

Der Server protokolliert Anfragen ausschließlich zur Fehlerbehebung und zur Verbesserung des Dienstes.

Fordern Sie ein kommerzielles Deployment an, um die Protokollierung von Anfragen vollständig zu deaktivieren. Wenden Sie sich dazu an `info@dhtmlx.com`.

## Prompts, die Pivot richtig treffen {#prompts-that-get-pivot-right}

Ein Prompt dreht sich in der Regel um eines von vier Themen: Config, Aggregation, Layout oder Server-Sync. Die folgenden Gruppen benennen dieses Thema jeweils von vornherein für Sie.

**Config und Aggregation**

~~~
How do I add a custom aggregation method in DHTMLX Pivot? Use the docs.
~~~
~~~
How do I set a default sort order for a field in DHTMLX Pivot?
~~~
~~~
What's the difference between the two accepted forms of a values entry in the config property?
~~~

**Prädikate und Felder**

~~~
How do I group date values by month using a custom predicate in DHTMLX Pivot?
~~~
~~~
How do I apply a currency format with a dollar-sign prefix to a numeric field?
~~~

**Layout und Styling**

~~~
How do I freeze the first two row fields on the left in DHTMLX Pivot?
~~~
~~~
How do I enable tree mode in DHTMLX Pivot and choose which field becomes the parent row?
~~~
~~~
How do I change the hover color for primary buttons in the Material theme?
~~~

**Server-Sync und Export**

~~~
How do I save the user's layout to a server whenever they change it?
~~~
~~~
How do I export the Pivot table to XLSX?
~~~

## Kleine Tipps für Pivot-Prompts {#small-tips-for-pivot-prompts}

- **Sagen Sie, welche API Sie meinen.** `export`, das Auf-/Zuklappen von Baumzeilen und das Filtern nach Zeile laufen alle über die Table-Instanz, die `getTable()` zurückgibt, nicht direkt über die Pivot-Instanz. Diese Ebene zu benennen, verhindert, dass der Assistent eine Table-exklusive Methode auf dem falschen Objekt aufruft.
- **Unterscheiden Sie eine Methode von einem Prädikat.** Aggregationsmethoden (`sum`, `count`, ein benutzerdefinierter Eintrag in `methods`) fassen Werte zusammen, die bereits in einer Zeile oder Spalte stehen. Prädikate transformieren einen Rohwert, bevor diese Gruppierung stattfindet. Geben Sie an, welche Phase Ihr Prompt anspricht.
- **Geben Sie die gewünschte Form des `values`-Eintrags genau an.** Ein `values`-Element kann ein `"method(field)"`-String oder ein `{ field, method }`-Objekt sein. Die verwendete Form zu benennen, hindert den Assistenten daran, eine dritte Form zu erfinden.
- **Fügen Sie "Use the docs" hinzu**, wenn Sie nach `update-config` im Vergleich zu `render-table` fragen. Die beiden lösen mit unterschiedlicher Häufigkeit aus, und genau diese Unterscheidung ist die Art von Detail, die veraltete Trainingsdaten übergehen.
