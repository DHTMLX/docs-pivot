---
sidebar_label: Pivot overview
title: JavaScript Pivot Overview
slug: /
description: You can have an overview of DHTMLX JavaScript Pivot library in the documentation. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# DHTMLX Pivot overview

JavaScript Pivot library is a ready-made component for creating Pivot tables from large datasets. The widget API can be easily adjusted to the needs of your web application. It provides the end user with functionality for comparing and analyzing complex data within one table.

## Pivot structure­

The Pivot UI consists of the two main components: the Configuration panel and the table with data.

![Main](assets/pivot.png)

## Configuration panel

The Configuration panel allows adding columns and rows to the table as well as values' fields that define data aggregation methods. You can add each item via the next areas in the panel: 

- Values: you can add values that define how data is aggregated (such as sum, min, max values)
- Columns: you can configure columns of the table (define which fields will be applied as columns)
- Rows: you can configure which fields should be applied as rows of the table

To hide the Configuration panel, click the **Hide Settings** button:

![config_panel](assets/config_panel.png)

### Values area

In the **Values** area you can define which aggregation methods (such as min, max, count) will be applied to the cells of the Pivot table. You can perform the next operations:

- add and remove fields to/from the values area
- change the order and priority of values in the table
- filter data 
- set operations that will be applied to the fields of the table

To add a new value, click the "+" button and select the required name from the drop-down list. A new value will appear in the table cells.

To remove a value, click the delete button ("x").

![add_remove](assets/add_remove.png)

To change the order of values in the table, drag an item to the desired position. The closer the value is to the left in the toolbar values list, the higher its priority and position in the table columns. The values with the highest priority are in the leftmost position in the column they belong to. The field with the **Count** value in the image below has the highest priority:

![priority](assets/priority.png)

To set operations that will be applied to all data of the column of the table, click the value operations for the required field in the drop-down list, and select the required option from the list.

![operations](assets/operations.png)

### Columns area

In the **Columns** area, you can perform the following operations:

- add and remove columns (i.e., add/remove fields applied as columns) 
- change the order and priority of columns in the table
- filter data 

To add a new column, click the "+" button and select the required name from the drop-down list. A new column name will appear in the table header.

![columns](assets/columns.png)

To remove a column, click the delete button ("x").

To change the order of columns in the table, drag an item to the desired position. The closer the column is to the left in the toolbar columns list, the higher its priority and position in the table header. The columns with the highest priority are in the leftmost position and include other columns with lower priority. For example, the **Year** column in the image below has the highest priority.

![columns-priority](assets/columns-priority.png)

### Rows area

In the Configuration panel for the **Rows** area, you can perform the following operations:

- add and remove rows (i.e., add/remove fields applied as rows) 
- change the order and priority of rows in the table
- filter data 

To add a new row, click the "+" button and select the required name from the drop-down list. A new row name will appear as a label of the first table column.

![rows](assets/rows.png)

To remove a row, click the delete button ("x").

To change the order of rows in the table, drag an item to the desired position. The higher the row is in the list, the higher its priority and position in the table header. The rows with the highest priority are in the topmost position and include other rows with lower priority. The **Continent** field in the image below has the highest priority.

![rows-priority](assets/rows-priority.png)


### Filters

Filters appear as drop-down lists for each field in all areas:

![filters](assets/filters.png)

The Pivot provides the next condition types for filtering:

- for text values: equal, notEqual, contains, notContains, beginsWith, notBeginsWith, endsWith, notEndsWith  
- for numeric values: greater: less, greaterOrEqual, lessOrEqual, equal,	notEqual, contains, notContains, begins with, not begins with, ends with, not ends with  
- for date types: greater, less, greaterOrEqual, lessOrEqual, equal, notEqual, between, notBetween

To filter data in the table, click the filter sign of one of the items in the required area, and then select the operator and set the value to filter by, and then click **Apply**.

![apply_filter](assets/apply_filter.png)

The fields to which filtering is applied are marked with a special filter sign:

![filter_applied](assets/filter_applied.png)


## Table

Data in the table is displayed as configured in the Configuration panel.

The sorting in columns is enabled by default:

![table](assets/table.png)

## What's next

Now you can get down to using Pivot in your application. Follow the directions of the [How to start](./how-to-start) tutorial for guidance.


