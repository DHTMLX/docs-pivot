---
sidebar_label: Working with server
title: Working with Server
description: You can explore how to work with Server in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# Working with server

JavaScript Pivot allows working both with the client and server data. The widget doesn't have any special requirements for the backend. It can be easily connected with any backend platform which supports the REST API (RESTful API).

:::info
By default, the widget is shipped with the built-in **Go** and **Node** backend. But you can use your custom server scripts as well
:::

## RestDataProvider

JavaScript Pivot has the **RestDataProvider** service that completely supports REST API for dealing with the backend. It allows interacting with the server and perform the following data operations:

- ***"event"***
- ...

## REST methods

The **RestDataProvider** service includes the special REST methods for dynamic data loading:

TODO!!!

## Interacting with backend  

To interact with the server, you need to connect **RestDataProvider** to the corresponding server scripts. If you want to use the built-in backend, you can find the needed scripts in the following repositories:

- [**Go**](https://github.com/web-widgets/pivot-go) backend
- [**Node**](https://github.com/web-widgets/pivot-node) backend

or you can create a custom one.

To connect **RestDataProvider** to the backend, you need to call the **pivot.RestDataProvider** constructor by passing the corresponding **URL** as a parameter.

~~~js {}
...
~~~

### Example

TODO!!!
