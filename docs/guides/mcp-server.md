---
sidebar_label: DHTMLX MCP server
title: DHTMLX Pivot MCP server for config, aggregation, and export
description: DHTMLX Pivot's config, aggregation methods, predicates, and export API reach AI assistants as current docs, not a training guess, through the MCP server.
---

# DHTMLX Pivot MCP server: configuration, aggregation, and export

DHTMLX Pivot turns [one configuration object](api/config/config-property.md) into a fully aggregated table, and opens onto a whole second API, [the underlying Table widget](api/methods/gettable-method.md), for exporting data or expanding tree rows. Layout changes and full table redraws each trigger their own event: [a layout edit](api/events/update-config-event.md) fires one, while [every redraw underneath](api/events/render-table-event.md) fires the other. Getting all of that right depends on current documentation, not a stale guess.

Query the DHTMLX MCP server instead: it returns the current [`config` shape](api/config/config-property.md), the [export path through getTable()](guides/exporting-data.md), and the [right event for persistence](/guides/working-with-server#save-the-users-layout-to-resume-the-session), so the assistant builds against Pivot as it actually behaves.

### MCP endpoint

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
The DHTMLX MCP server covers all major DHTMLX products, not only DHTMLX Pivot. The same endpoint and configuration instructions work regardless of which DHTMLX component you are building with.
:::

## What Pivot developers ask the MCP server

The MCP server can tell you nearly everything about DHTMLX Pivot's documentation, starting with:

- Looking up the current API for [methods](api/overview/methods-overview.md), [events](api/overview/events-overview.md), and [properties](api/overview/properties-overview.md), including the [Event Bus](api/overview/internal-eventbus-overview.md) and [state](api/overview/internal-state-overview.md) methods.
- Generating ready-to-run [initialization](guides/initialization.md) code with the `fields`, `data`, and [`config`](api/config/config-property.md) shape a specific table needs.
- Defining [rows, columns, and values](guides/working-with-data.md#define-pivot-structure) in the `config` property, including both accepted forms of a `values` entry.
- Choosing or writing [aggregation methods](guides/working-with-data.md#applying-maths-methods), from the built-in `sum`/`count`/`average` set to a custom one added through the [`methods`](api/config/methods-property.md) property.
- Pre-processing data with [predicates](guides/working-with-data.md#processing-data-with-predicates) before aggregation, such as grouping dates by month.
- Sizing, freezing, and templating table cells through [`tableShape`](api/config/tableshape-property.md) and [`headerShape`](api/config/headershape-property.md), including [tree mode](guides/configuration.md#enabling-the-tree-mode) and [frozen columns](guides/configuration.md#freezing-columns).
- [Localizing](guides/localization.md) labels and date/number formats, and [styling](guides/stylization.md) the table with `--wx-pivot-*` CSS variables.
- [Exporting](guides/exporting-data.md) a table to CSV or XLSX through the Table instance that [`getTable()`](api/methods/gettable-method.md) returns.
- Deciding between [`update-config`](api/events/update-config-event.md) and [`render-table`](api/events/render-table-event.md) when [persisting state to a server](/guides/working-with-server), or integrating Pivot with [React](guides/integration-with-react.md), [Vue](guides/integration-with-vue.md), [Angular](guides/integration-with-angular.md), and [Svelte](guides/integration-with-svelte.md).

## A Pivot question's path through the MCP server

A Pivot question sent to the DHTMLX MCP server runs through a Retrieval-Augmented Generation (RAG) pipeline built on the Model Context Protocol (MCP), and lands in one of two workflows: *Search*, which returns matching reference pages for the assistant to write from, or *Inference*, which reads those pages and answers the question itself. Only half of this request needs a documentation lookup. The assistant pinpoints that half and writes the rest, the server-specific save logic, from what it already knows.

Consider the prompt *"Write a handler that saves the Pivot config to the server on every layout change."*:

1. The assistant marks out the half that needs documentation: which event to listen for and how to read the current config.
2. The server locates the [working-with-server](/guides/working-with-server) documentation it maps to.
3. Because the ask is for generated code, *Search* takes it (a narrower question, like whether `render-table` fires more often than `update-config`, would go to *Inference* instead).
4. *Search* fetches the matching pages from a vector index of the current Pivot documentation.
5. The assistant gets those pages back as context.
6. From that context, the assistant writes the [`update-config`](api/events/update-config-event.md) listener, correctly skipping `render-table`'s more frequent firing, then adds the actual save request for the target server from its own knowledge.

Pivot's aggregation and export code stays matched to the current API this way.

## Linking your AI tool to the MCP server

Whichever AI development tool you use alongside Pivot, wiring it to the MCP server comes down to one step: pointing it at the endpoint URL below, either through a CLI command or a JSON configuration file.

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

Setup details for widely used tools come next.

### Claude Code

:::info
Claude Code's [official documentation](https://code.claude.com/docs/en/mcp) walks through every MCP setup path.
:::

To register the server from the command line, run:

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

No CLI on hand? Add the following configuration to your `.mcp.json` manually:

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

### Cursor

:::info
See Cursor's [official documentation](https://cursor.com/en-US/docs/mcp) for the full set of MCP configuration options.
:::

Steps to add the server:

1. Open Settings (`Cmd+Shift+J` on Mac, `Ctrl+Shift+J` on Windows/Linux)
2. Go to **Tools & MCP**
3. Click **Add Custom MCP**
4. Paste the following config:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Google Antigravity

#### Antigravity 2.0

:::info
The [official documentation](https://antigravity.google/docs/mcp) has the full picture on MCP server integration in Antigravity.
:::

These are the steps to complete for connecting DHTMLX MCP server with Google Antigravity:

1. Open the command palette
2. Type "mcp add"
3. Select "HTTP"
4. Provide the following values:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI

:::info
The [related guide](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes) explains what changes when migrating from Gemini CLI to Antigravity CLI.
:::

To connect the DHTMLX MCP server to Antigravity CLI, create `mcp_config.json` in one of these locations:

- Global: `~/.gemini/config/mcp_config.json`
- Workspace: `.agents/mcp_config.json`

Add the following configuration:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

Then run `agy` in the terminal.

### ChatGPT

:::info
See the [official documentation](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt) for every step of setting up an MCP connector in ChatGPT.
:::

Steps to configure the connector:

1. Go to **Settings** → **Apps & Connectors**
2. Click **Advanced settings**
3. Enable **Developer mode**
4. Return to **Apps & Connectors** and click "Create"
5. Fill in the connector details:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- Authentication: `No authentication`
6. Click **Create**

After you create the connector, ChatGPT pulls documentation from the MCP server during conversations.

:::info
For intensive coding workflows, other MCP-aware tools may be a better fit.
:::

### Other tools

Settings panels in other AI coding tools tend to call this "Model Context Protocol" or "Context Sources." Add `https://docs.dhtmlx.com/mcp` there as a custom source.

## Where your queries go

As a hosted service, the MCP server never runs on your hardware, never opens a local file, and never stores anything that identifies you.

The server logs queries only to debug problems and improve the service.

Request a commercial deployment to turn query logging off entirely. Reach `info@dhtmlx.com` to arrange it.

## Prompts that get Pivot right

Config, aggregation, layout, or server sync: which one is a prompt actually about? Naming it up front is what the groups below do for you.

**Config and aggregation**

~~~
How do I add a custom aggregation method using the methods property in DHTMLX Pivot? Use the docs.
~~~
~~~
How do I set a default sort order for a field in DHTMLX Pivot?
~~~
~~~
What's the difference between the two accepted forms of a values entry in the config property?
~~~

**Predicates and fields**

~~~
How do I group date values by month using a custom predicate in DHTMLX Pivot?
~~~
~~~
How do I apply a currency format with a dollar-sign prefix to a numeric field?
~~~

**Layout and styling**

~~~
How do I freeze the first two row fields on the left using tableShape in DHTMLX Pivot?
~~~
~~~
How do I enable tree mode in DHTMLX Pivot and choose which field becomes the parent row?
~~~
~~~
How do I change the hover color for primary buttons in the Material theme?
~~~

**Server sync and export**

~~~
How do I save the user's layout to a server whenever they change it?
~~~
~~~
How do I export the Pivot table to XLSX?
~~~

## Small tips for Pivot prompts

- **Say which API you mean.** `export`, tree-row expand/collapse, and filtering by row all run through the Table instance `getTable()` returns, not the Pivot instance directly. Naming that layer keeps the assistant from calling a Table-only method on the wrong object.
- **Distinguish a method from a predicate.** Aggregation methods (`sum`, `count`, a custom entry in `methods`) summarize values already in a row or column. Predicates transform a raw value before that grouping happens. State which stage your prompt targets.
- **Spell out the `values` entry form you want.** A `values` item can be a `"method(field)"` string or a `{ field, method }` object. Naming the form you're using stops the assistant from inventing a third shape.
- **Add "Use the docs"** when asking about `update-config` versus `render-table`. The two fire at different rates, and that distinction is exactly the kind of detail stale training data glosses over.
