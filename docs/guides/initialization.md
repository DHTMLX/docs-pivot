---
sidebar_label: Initialization
title: Initialization
description: You can learn about the initialization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Initialization

Use this guide to create Pivot on a page and add a Pivot table to your application. Take the following steps to get a ready-to-use component:

1. [Include the Pivot source files on a page](#include-source-files).
2. [Create a container for Pivot](#create-a-container).
3. [Initialize Pivot with a constructor](#initialize-pivot).

## Include source files

See also how to download packages: [Downloading packages](/how-to-start#step-1-downloading-and-installing-packages).

To create a Pivot app, include 2 source files on your page:

- *pivot.js*
- *pivot.css*

Set correct relative paths to the source files:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">
~~~

## Create a container

Add a container for Pivot and give it an ID, for example *"root"*:

~~~html title="index.html"
<div id="root"></div>
~~~

## Initialize Pivot

Initialize Pivot with the `pivot.Pivot` constructor. The constructor takes two parameters:

- the ID of the HTML container
- an object with configuration properties

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

## Configuration properties

:::info
The full list of properties to configure Pivot can be found [here](api/overview/properties-overview.md).
:::

## Example

The following code snippet initializes Pivot with initial data:

<iframe src="https://snippet.dhtmlx.com/y2buoahe?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
