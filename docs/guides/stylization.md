---
sidebar_label: Stylization
title: Stylization
description: You can learn about the stylization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Stylization

TODO!!!

## Default style

~~~css
.wx-material-theme {
    ...
}
~~~

:::tip Note
Next versions of Pivot can bring some changes for the variables and their names. Please, do not forget to check the names after updating to the newer versions and modify them in your code to avoid problems with display of the component.
:::

## Built-in themes

You can use the [`theme`](TODO) property to apply one of the following themes: **material**, **willow** and **willow-dark**.

:::important
Besides using the `theme` property, you can also apply the needed theme via adding the corresponding *css* classes to the widget containers:

- **Material theme**
~~~html {}
    <!-- Pivot container -->
    <div id="root" class="wx-material-theme"></div>
~~~

- **Willow theme**
~~~html {}
    <!-- Pivot container -->
    <div id="root" class="wx-willow-theme"></div>
~~~

- **Willow-Dark theme**
~~~html {}
    <!-- Pivot container -->
    <div id="root" class="wx-willow-dark-theme"></div>
~~~

or just include the needed theme on the page from the skins folder:

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/willow-dark.css"/>
~~~
:::

In this snippet you can see how to apply the **willow-dark** theme to Pivot
<iframe src="https://snippet.dhtmlx.com/" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> TODO!!!

## Scroll style

You can also apply a custom style to a scroll bar of Pivot. For this, you can use the `.wx-styled-scroll` CSS class. Before using it, check compatibility with the modern browsers [here](https://caniuse.com/css-scrollbar).

~~~html {} title="index.html"
<!--container for Pivot-->
<div id="root" class="wx-styled-scroll"></div> 
~~~

## Custom style

In this snippet you can see how to apply a custom style to Pivot

<iframe src="https://snippet.dhtmlx.com/" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> TODO!!!

## Adaptivity

In this snippet you can see how to create adaptive version of Pivot using custom CSS styles

<iframe src="https://snippet.dhtmlx.com/" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> TODO!!!

**Related articles:** [Customization](../customization)
