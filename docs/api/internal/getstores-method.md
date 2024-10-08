---
sidebar_label: api.getStores()
title: getStores Method
description: You can learn about the getStores method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.getStores()

### Description

@short: Gets an object with the DataStore properties of Pivot

### Usage

~~~jsx
api.getStores(): object;
~~~

### Returns

The method returns an object with the **DataStore** parameters:

~~~jsx
{
    data: DataStore // ( object of parameters )
}
~~~

### Example

~~~jsx {21-22}
// create Pivot
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});

const stores = table.api.getStores();
console.log("DataStore:", stores);
~~~
