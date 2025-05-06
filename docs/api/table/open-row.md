---
sidebar_label: open-row
title: open-row
description: You can learn about the close-row event in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot
---

# open-row

### Description

@short: Fires when opening (expanding) a row

To trigger the Table event, it's necessary to get access to the Table instance inside Pivot via the [`getTable`](/api/methods/gettable-method) method. The tree mode should be enabled via the [`tableShape`](/api/config/tableshape-property) property.

### Usage

```jsx {}
"open-row": ({
    id: string | number,
    nested?: boolean
}) => boolean|void;
```

### Parameters

The callback of the action takes an object with the following parameters:

- `id` - (required) the id of a row that have nested rows
- `nested` - (optional) if set to **true**, all nested items will be expanded

:::note
If `id` is set to 0 and `nested` to **true**, all rows in the table will be expanded
:::

### Example

The snippet below demonstrates how to open/close all rows with a button click:

<iframe src="https://snippet.dhtmlx.com/i4mi6ejn?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Related articles**: 
- [`getTable`](/api/methods/gettable-method)
- [Expanding/collapsing all rows](/guides/configuration/#expandingcollapsing-all-rows)