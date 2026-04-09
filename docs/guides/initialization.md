---
sidebar_label: Initialization
title: Initialization
description: You can learn about the initialization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Initialize Pivot

This guide explains how to add Pivot to a page. Take the following steps to get a ready-to-use component:

1. [Include the Pivot source files on a page](#include-source-files).
2. [Create a container for Pivot](#create-a-container).
3. [Initialize Pivot with a constructor](#create-a-pivot-instance).

## Include source files

Include two files from the `dist/` folder in your HTML page. For information on downloading the package, see [Downloading packages](/how-to-start#step-1-downloading-and-installing-packages).

Include the following source files:

- `pivot.js`
- `pivot.css`

Set correct relative paths to the source files:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">
~~~

## Create a container

Add a container for Pivot and give it an ID, for example `"root"`:

~~~html title="index.html"
<div id="root"></div>
~~~

## Create a Pivot instance

Initialize Pivot with the `pivot.Pivot` constructor. It takes two parameters:

- an HTML container (the ID of the HTML container)
- an object with configuration properties

The following code snippet initializes Pivot with fields, data, and a basic config:

~~~jsx
// create Pivot
const table = new pivot.Pivot("#root", {
    //configuration properties
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

:::info
Find the full list of Pivot configuration properties in the [Properties overview](api/overview/properties-overview.md).
:::

The live example below shows Pivot initialized with sample data:

<iframe src="https://snippet.dhtmlx.com/y2buoahe?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
