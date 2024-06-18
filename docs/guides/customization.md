---
sidebar_label: Customization
title: Customization
description: You can learn about the customization in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Customization

Besides configuring Pivot, you can apply the customization options that can help improve Pivot appearance and readability by applying templates and custom styles.

## Applying templates to cells

To set a template to cells, use the `templates` parameter of the [`tableShape`](/api/properties/tableshape-property) property. It's an object where each key is a field id and the value is a function that returns a string. All columns based on the specified field will have the related template applied. 

In the example below we apply the template to the *score* values to display 2 digits after the decimal point for these values and we add the "€" sign to the *price* values. 

~~~jsx {1-4,8}
const templates = { 
price: (v) => (v ? "€" + v : v),
score: (v) => (v ? parseFloat(v).toFixed(2) : v) 
};

const widget = new pivot.Pivot("#pivot", {
  tableShape: {
    templates,
  },
  fields,
  data,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
      {
        field: "price",
        method: "count",
      },
    ],
  },
});
~~~

## Applying templates to headers

To define the format of text in headers, apply the `template` parameter of the [`headerShape`](/api/config/headershape-property) property. The parameter is the function that takes the field id, label and sublabel (the name of a method if any is applied) and returns the processed value (the default template is as follows: *template: (label, id, subLabel) => label + (subLabel ? `(${subLabel})` : "")*). By default, for the fields applied as values the label and method are shown (e.g., *Oil(count)*). 
If no other template is applied to columns, the value of the `label` parameter is displayed. If any [`predicate`](/config/predicates-property) template is applied, it will override the template of the `headerShape` property. 

Example:

In the example below for the **values** fields the header will display the method name (subLabel) and the label:

~~~jsx {19-22}
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data,
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },

  headerShape: {
    vertical: true,
    template: (label, id, subLabel) => id + (subLabel ? ` (${subLabel})` : ""),
  },
});
~~~

## Styling

You can customize the appearance of Pivot by changing values of the corresponding CSS variables. Refer to the [Custom styles](/guides/stylization#custom-styles) section for details.

The widget API allows marking cells with the required values. You can do it by applying the `marks` parameter of the [`tableShape`](/api/config/tableshape-property) property. To see detailed description with an example, refer to [Styling cells](/guides/stylization#styling-cells)