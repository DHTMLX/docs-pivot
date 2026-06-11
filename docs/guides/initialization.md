---
sidebar_label: Initialization
title: Initialization
description: You can learn about the initialization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Initialization

This guide explains how to create Pivot on a page and enrich your application with Pivot table features. Take the following steps to get a ready-to-use component:

1. [Include the Pivot source files on a page](#include-source-files).
2. [Create a container for Pivot](#create-a-container).
3. [Initialize Pivot with a constructor](#initialize-pivot).

## Include source files

A Pivot app requires two source files on the page. For instructions on downloading the package, see [Downloading packages](how-to-start.md#step-1-downloading-and-installing-packages).

Include the following files:

- *pivot.js*
- *pivot.css*

Set the correct relative paths to the source files:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">
~~~

## Create a container

Pivot renders into an HTML container element. Add a container and assign an ID, for example *"root"*:

~~~html title="index.html"
<div id="root"></div>
~~~

## Initialize Pivot

The `pivot.Pivot` constructor takes two parameters:

- the ID of the HTML container
- an object with configuration properties

The following code snippet creates a Pivot instance in the *"root"* container with initial fields, data, and structure:

~~~jsx
// create Pivot
const table = new pivot.Pivot("#root", {
    // configuration properties
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

The constructor returns a Pivot instance. Call API methods on the returned instance:

- [`getTable`](api/methods/gettable-method.md) — get access to the underlying Table widget instance
- [`setConfig`](api/methods/setconfig-method.md) — update the current Pivot configuration
- [`setLocale`](api/methods/setlocale-method.md) — apply a new locale to Pivot
- [`showConfigPanel`](api/methods/showconfigpanel-method.md) — show or hide the Configuration panel

## Configuration properties

The Pivot constructor accepts an object with configuration properties that control data, layout, and behavior.

:::info
For the full list of properties to configure Pivot, see [Properties overview](api/overview/properties-overview.md).
:::

## Example

The snippet below initializes Pivot with the initial data:

<iframe src="https://snippet.dhtmlx.com/y2buoahe?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
