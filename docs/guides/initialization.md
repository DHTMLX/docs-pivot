---
sidebar_label: Initialization
title: Initialization
description: You can learn about the initialization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Initialization

This guide will give you detailed instructions on how to create Pivot on a page to enrich your application with features of the Pivot table. Take the following steps to get a ready-to-use component:

1. [Include the Pivot source files on a page](#including-source-files).
2. [Create a container for Pivot](#creating-container).
3. [Initialize Pivot with a constructor](#initializing-pivot).

## Including source files

[Download the package](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml) and unpack it into a folder of your project.

To create a Pivot app, you need to include 2 source files on your page:

- *pivot.js*
- *pivot.css*

Make sure that you set correct relative paths to the source files:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">
~~~

## Creating container

Add a container for Pivot and give it an ID, for example *"root"*:

~~~jsx title="index.html"
<div id="root"></div>
~~~

## Initializing Pivot

Initialize Pivot with the **pivot.Pivot** constructor. It takes two parameters:

- an HTML container (the ID of the HTML container)
- an object with configuration properties. [See the full list here](#configuration-properties)

~~~jsx title="index.html"
// create Pivot
new pivot.Pivot("#root", {
    // configuration properties
 config: {
    rows: ["continent", "name"],
    columns: ["year"],
    values: [{ field: "oil", method: "sum" }],
  },
  fields: [
    { id: "name", label: "Name", type: "text" },
    { id: "year", label: "Year", type: "number" },
    { id: "continent", label: "Continent", type: "text" },
    { id: "oil", label: "Oil", type: "number" },
  ],
  data: [
    {
      name: "Argentina",
      year: 2015,
      continent: "South America",
      form: "Republic",
      gdp: 181.357,
      oil: 1.545,
      balance: 4.699,
      when: new Date("4/21/2015"),
    },
    {
      name: "Argentina",
      year: 2017,
      continent: "South America",
      form: "Republic",
      gdp: 212.507,
      oil: 1.732,
      balance: 7.167,
      when: new Date("1/15/2017"),
    },
  ],
});
~~~

### Configuration properties

:::note
The full list of properties to configure **Pivot** can be found [**here**](api/overview/properties_overview.md).
:::

## Example

In this snippet you can see how to initialize **Pivot** with the initial data:

<iframe src="https://snippet.dhtmlx.com/" frameborder="0" class="snippet_iframe" width="100%" height="500"></iframe> TODO!!!