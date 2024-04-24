---
sidebar_label: api.exec()
title: exec Method
description: You can learn about the exec method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.exec()

### Description

@short: Allows triggering the inner events

## Usage

~~~jsx {}
api.exec(
	event: string,
	config: object
): void;
~~~

## Parameters

- `event` - (required) an event to be fired
- `config` - (required) the config object with parameters (see the event to be fired)

## Actions

:::info
The full list of Pivot actions can be found [**here**](/api/overview/events_overview)
:::

## Example

~~~jsx {}
// create Pivot
const table = new pivot.Pivot("#root", {
    ...
});

// TODO
~~~
