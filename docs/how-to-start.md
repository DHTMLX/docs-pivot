---
sidebar_label: How to start
title: How to Start
description: You can explore how to start working with DHTMLX Pivot in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# How to start

This clear and comprehensive tutorial will guide your through the steps you need to take in order to get a full-functional Pivot on a page.

![pivot-main](/assets/pivot_main.png)

## Step 1. Downloading and installing packages

[Download the package](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml) and unpack it into a folder of your project.

You can import JavaScript Pivot into your project using `yarn` or `npm` package manager.

:::info
If you want to integrate Pivot into React, Angular, Svelte or Vue projects, refer to the corresponding [**integration guides**](/category/integration-with-frameworks/) for more information.
:::

### Installing trial Pivot via npm and yarn

:::info
If you want to use trial version of Pivot, download the [**trial Pivot package**](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml) and follow the steps mentioned in the *README* file. Note that trial Pivot is available for 30 days only.
:::

### Installing PRO Pivot via npm and yarn

:::info
If you have already purchased Pivot under the proprietary license, send your **license number** to the *contact@dhtmlx.com* email in order to receive *login* and *password* for private **npm** as well as detailed guide on how to install Pivot. Note that private **npm** is available before the expiration of the proprietary Pivot license.
:::

## Step 2. Including source files

Start from creating an HTML file and call it *index.html*. Then proceed to include Pivot source files into the created file.

There are two necessary files:

- the JS file of Pivot
- the CSS file of Pivot

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
        // your code will be here
        </script>
    </body>
</html>
~~~

## Step 3. Creating Pivot

Now you are ready to add Pivot to the page. First, let's create the DIV container for Pivot.

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
                // configuration properties
            });
        </script>
    </body>
</html>
~~~

## Step 4. Configuring Pivot

Next you can specify configuration properties you want the Pivot component to have when initialized.

To start working with Pivot, first you need to provide the initial data. The example below creates a Pivot with:

- rows for the *studio* and *genre*
- the *title* column
- the value aggregation for *score* with the *max* method

The **fields** array is necessary to define the fields IDs, labels for display, and data types.

The **data** array should hold the actual data that is displayed in the Pivot widget. Each object in the array represents a row in the table.

The **config** object defines the structure of the Pivot table, namely, which fields will be applied as rows and columns of the table and which data aggregation methods should be applied to the fields.

~~~jsx
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

## What's next

That's all. Just these simple steps and you have a handy tool for analyzing data. Now you can start working with your tasks or keep exploring the inner world of JavaScript Pivot:

- [Guides](/category/guides) pages provide instructions about installation, loading data, styling, and other helpful tips to go smoothly with the Pivot configuration
- [API reference](/api/overview/main-overview) gives description of the Pivot functionality
