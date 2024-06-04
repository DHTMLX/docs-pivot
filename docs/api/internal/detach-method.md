---
sidebar_label: api.detach()
title: detach Method
description: You can learn about the detach method in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# api.detach()

## Description

Allows removing/detaching action handlers

## Usage

~~~jsx {}
api.detach(tag: number | string ): void;
~~~

## Parameters

- `tag` - the name of the action tag

### Example

In the example below we add an object with the **tag** property to the [`api.on()`](/api/internal/on-method) handler, and then we use the `api.detach()` method to stop logging the `open-filter` action.

~~~jsx {}
//create Pivot
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    values: [
      {
        field: "title",
        method: "count",
      },
      {
        field: "score",
        method: "max",
      },
    ],
  },
});

// Add handler
if (pivotWidget.api) {
  pivotWidget.api.on(
    "open-filter",
    ({ area }) => {
      console.log("Opened: " + area);
    },
    { tag: "track" }
  );
}

// Detach handler
function stop() {
  pivotWidget.api.detach("track");
}

const button = document.createElement("button");
button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~

