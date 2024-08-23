---
sidebar_label: api.setNext()
title: setNext Method
description: You can learn about the setNext method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.setNext()

### Description

@short: Allows adding some action into the Event Bus order

### Usage

~~~jsx {}
api.setNext(next: any): void;
~~~

### Parameters

- `next` - (required) the action to be included into the **Event Bus** order  

### Example

The example below shows how to use the `api.setNext()` method to integrate some custom class into the Event Bus order:

~~~jsx
const widget = new pivot.Pivot("#pivot", { fields: [], data: [] });
const server = "https://some-backend-url";

// Assume you have a custom server service class named someServerService
const someServerService = new ServerDataService(server);

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    widget.setConfig({ data, fields });
    
    // Integrate the serverDataService into the Event Bus order of widget
    widget.api.setNext(someServerService);
});
~~~


**Related articles**: [`setConfig`](/api/methods/setconfig-method)
