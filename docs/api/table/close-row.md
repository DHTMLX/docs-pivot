---
sidebar_label: close-row
title: close-row
description: You can learn about the close-row event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot
---

# close-row

### Description

@short: Fires when closing (collapsing) a row

To trigger the Table event, it's necessary to get access to the underlying Table widget instance inside Pivot via the [`getTable`](/api/methods/gettable-method) method. The tree mode should be enabled via the [`tableShape`](/api/config/tableshape-property) property.

### Usage

```jsx {}
"close-row": ({
    id: string | number,
    nested?: boolean
}) => boolean|void;
```

### Parameters

The callback of the action takes an object with the following parameters:

- `id` - (required) the id of a row that has nested rows
- `nested` - (optional) if set to **true**, all nested items will be collapsed

:::note
If `id` is set to 0 and `nested` to **true**, all rows in the table will be collapsed
:::

Returning **false** from the event handler will prevent collapsing rows.

### Example

The snippet below demonstrates how to open/close all rows with a button click:

<iframe src="https://snippet.dhtmlx.com/i4mi6ejn?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related articles**: 
- [`getTable`](/api/methods/gettable-method)
- [Expanding/collapsing all rows](/guides/configuration/#expandingcollapsing-all-rows)

