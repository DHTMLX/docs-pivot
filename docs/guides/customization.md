---
sidebar_label: Customization
title: Customization
description: You can learn about the customization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Customization

Besides configuring Pivot, you can apply the customization options that can help improve its appearance and readability by applying templates and custom styles.

## Applying templates to cells

To set a template to cells, use the `templates` parameter of the [`tableShape`](/api/properties/tableshape-property) property. It's an object where each key is a field id and the value is a function that returns a string. All columns based on the specified field will have the related template applied. 

In the example below we apply the template to the *score* values to display 2 digits after the decimal point for these values and we add the "€" sign to the *price* values. 

~~~jsx {1-2,7}
const templates = { price: (v) => (v ? "€" + v : v), 
score: (v) => (v ? parseFloat(v).toFixed(2) : v) };

const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    tree: true,
    templates,
  },
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        id: "title",
        method: "count",
      },
      {
        id: "score",
        method: "max",
      },
      {
        id: "price",
        method: "count",
      },
    ],
  },
});
~~~

## Applying templates to headers

To define the format of text in headers, apply `template` parameter of the [`headerShape`](/api/config/headershape-property). The parameter is the function that takes the field id, label and the method or predicate id (if any) and returns the processed value (the default template is as follows: *template: (label, id, subLabel) => label + (id ? ` (${subLabel})` : ""),*). By default, for the fields applied as rows the value of the `label` parameter is displayed and for the fields applied as values the label and method are shown (e.g., *Oil(count)*). 

Example:

In the example below for the **values** fields the header will display the method name (subLabel) and the label:

~~~jsx {19-22}
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        id: "title",
        method: "count",
      },
      {
        id: "score",
        method: "max",
      },
    ],
  },

  headerShape: {
    verticalText: true,
    template: (label, id, subLabel) => id + (subLabel ? ` (${subLabel})` : ""),
  },
});
~~~

## Styling

You can customize the appearance of Pivot by changing values of the corresponding CSS variables. Refer to the [Custom styles](/guides/stylization#custom-styles) section for details.

The widget API allows marking cells with the required values. You can do it by applying the `marks` parameter of the [`tableShape`](/api/config/tableshape-property) property. To see detailed description with an example, refer to [Styling cells](/guides/stylization#styling-cells)