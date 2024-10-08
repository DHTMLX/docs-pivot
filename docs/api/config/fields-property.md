---
sidebar_label: fields
title: fields Config
description: You can learn about the fields config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# fields

### Description

@short: Optional. An array of objects with fields for the Pivot table

The `fields` property in the configuration object controls how the widget interprets the types of the data fields it receives and allows defining the sorting order for a field.

### Usage

~~~jsx
fields?: [{
    id: string,
    label?: string,
    type: "number" | "date" | "text",
    sort?: "asc" | "desc" | ((a: any, b: any) => number)  
}];
~~~

### Parameters

By default, if the property is not set, the widget automatically analyzes the incoming data and populates the `fields` object accordingly. 

Each object in the `fields` array should have the following properties:

- `id` - (required) the ID of a field
- `label` - (optional) the field label to be displayed in GUI
- `type` - (required) data type in a field ( "number", "date", or "string")
- `sort` - (optional) defines the default sorting order for the field. Accepts "asc", "desc", or a custom sorting function

### Example

~~~jsx {2-34}
const table = new pivot.Pivot("#root", {
    fields: [
        {
            id: "rank",
            label: "Rank",
            type: "number"
        },
        {
            id: "title",
            label: "Title",
            type: "text"
        },
        {
            id: "genre",
            label: "Genre",
            type: "text"
        },
        {
            id: "studio",
            label: "Studio",
            type: "text"
        },
        {
            id: "type",
            label: "Type",
            type: "text"
        },
        {
            id: "score",
            label: "Score",
            type: "number"
        },
        //other fields
    ],
    data,
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
~~~
