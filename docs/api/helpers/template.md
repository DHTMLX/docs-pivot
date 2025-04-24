---
sidebar_label: template
title: template
description: You can learn about the Pivot template helper in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

## template

### Description

The `template` function allows applying a template to the table header and body cells.

### Usage

For body cells:

~~~jsx
pivot.template({value, method, row, column}) => string; 
~~~

For header cells:

~~~jsx
pivot.template({value, field, method, cell, column}) =>  string;
~~~

### Parameters

For body cells the function takes the next parameters:

- `value` (any) - (required) raw cell value
- `method` (string) - (required) a method or predicate used for a column
- `row` - (required) an object with row data:
    - `id` (number) - (required) row id
    - `values` (array) - (required) an array with row data
    - `open` (boolean)- (optional) branch state
    - `$level` (boolean)- (optional) branch index
- `column` - (required) an object with column data:
    - `id` (number) - (required) the id of a column
    - `cell` (any) - (optional) a template with the cell content (please, refer to [Applying templates to cells](/guides/configuration/#applying-templates-to-cells))
    - `fields` (array) - (optional) defines fields in the hierarchical column in the tree mode. Reflects fields displayed in this column on different levels
    - `method` (string) - (optional) a method, if defined for a field in this column
    - `methods` (array) - (optional) defines methods applied to fields in the hierarchical column in the tree mode
    - `format` (string or object) - (required) date or number [format](/guides/localization/#applying-custom-format-to-numeric-and-date-fields)
    - `isNumeric` (boolean) - (optional) defines whether a column contains numeric values
    - `isTotal` (boolean) - (optional) defines whether it is a total column
    - `area` (string) - (optional) an area where the column is rendered: "rows", "columns", "values"
    - `header`- (optional) an array of header cells with the next properties for each cell:
        - `text` (string) - (optional) cell text, or formatted value, or processed with a predicate template
        - `rowspan` (number) - (optional) the number of rows a header should span
        - `colspan` (number) - (optional) the number of columns a header should span
        - `value` (any) - (required) raw value, if a cell belongs to "columns" area
        - `field` (string) - (required) a field, which value is displayed, if a cell belongs to "columns" area
        - `method` (string) - (required) a field predicate, if a cell belongs to "columns" area and predicate is defined
        - `format` (string or object) - (required) date or number [format](/guides/localization/#applying-custom-format-to-numeric-and-date-fields)

For header cells the function parameters are the following:

- `value` (any) - (required) raw cell value
- `method` (string) - (optional) a predicate used for a column
- `field` (string) - (optional) a field which value is displayed in a cell
- `cell` - (required) an object with cell data:
    - `text` (string) - (optional) cell text, or formatted value, or processed with a predicate template
    - `rowspan` (number) - (optional) the number of rows a header should span
    - `colspan` (number) - (optional) the number of columns a header should span
    - `value` (any) - (required) raw value, if a cell belongs to "columns" area
    - `field` (string) - (required) a field, which value is displayed, if a cell belongs to "columns" area
    - `method` (string) - (required) a field predicate, if a cell belongs to "columns" area and predicate is defined
    - `format` (string or object) - (required) date or number [format](/guides/localization/#applying-custom-format-to-numeric-and-date-fields)
- `column` - (required) an object with column data (the same as for the body cell)

### Example

The snippet below shows how to define templates via the `pivot.template` helper. The helper is applied right before the table renders, which is done by intercepting the [render-table](/api/events/render-table-event) event using the [api.intercept()](/api/internal/intercept-method) method. 

The snippet demonstrates how you can add icons to:

- body cells based on their field (id, user_score) (the template adds the flag and star icons)
- the header labels based on the field name (for example, if the field is "id", it adds the globe icon next to the header value)
- the column headers based on the value (colored arrow indicators are added)

<iframe src="https://snippet.dhtmlx.com/4viq7cft?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>


**Related articles:** 

- [`render-table` event](/api/events/render-table-event)
- [Applying templates to cells](/guides/configuration/#applying-templates-to-cells)
- [Applying templates to headers](/guides/configuration/#applying-templates-to-headers)