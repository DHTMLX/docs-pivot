---
sidebar_label: close-filter
title: close-filter Event
description: You can learn about the close-filter event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# close-filter

### Description

@short: TODO!!! 

It's intended to be mainly used for performing operations or validations that should occur right after closing the filter box.

### Usage

~~~jsx {}
"close-filter": {
  handler: any
} => boolean | void;
~~~

### Parameters

The callback of the action takes an object with the following parameters:

- `handler` - (required) any filtering function that takes an object with data and returns **true**, **false** or void.

Returning **false** will block the closure of the filter box.

### Example

TODO!!!
