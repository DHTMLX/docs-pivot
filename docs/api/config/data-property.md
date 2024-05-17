---
sidebar_label: data
title: data Config
description: You can learn about the data config in the documentation of the DHTMLX JavaScript Pivot library. Browse developer guides and API reference, try out code examples and live demos, and download a free 30-day evaluation version of DHTMLX Pivot.
---

# data

### Description

@short: Optional. An array of objects with data for the Pivot table 

### Usage

~~~jsx
data?: [];
~~~

### Parameters

Each object of the `data` array represents a row. The default value is an empty array.
There are no direct sub-properties of the `data` property. Each object in the array, however, can have any number of properties which will represent the dimensions and values for the Pivot table.

Example of the `data` array: 

~~~jsx
const data = [
   {
      name: "Argentina",
      year: 2015,
      continent: "South America",
      form: "Republic",
      gdp: 181.357,
      oil: 1.545,
      balance: 4.699,
      when: new Date("4/21/2015"),
   },
   {
      name: "Argentina",
      year: 2017,
      continent: "South America",
      form: "Republic",
      gdp: 212.507,
      oil: 1.732,
      balance: 7.167,
      when: new Date("1/15/2017"),
   },
   {
      name: "Argentina",
      year: 2014,
      continent: "South America",
      form: "Republic",
      gdp: 260.071,
      oil: 2.845,
      balance: 6.728,
      when: new Date("6/16/2014"),
   },
   {
      name: "Argentina",
      year: 2014,
      continent: "South America",
      form: "Republic",
      gdp: 324.405,
      oil: 4.333,
      balance: 5.99,
      when: new Date("2/20/2014"),
   },
   {
      name: "Argentina",
      year: 2014,
      continent: "South America",
      form: "Republic",
      gdp: 305.763,
      oil: 2.626,
      balance: 7.544,
      when: new Date("8/17/2014"),
   },
   //other data
];
~~~

### Example

~~~jsx {3-29}
const pivotWidget = new pivot.Pivot("#pivot", {
  fields,
  data: [
    {
      rank: 1,
      title: "Shingeki no Kyojin: The Final Season - Kanketsu-hen",
      popularity: 609,
      genre: "Action",
      studio: "MAPPA",
      type: "Special",
      episodes: 2,
      duration: 61,
      members: 347875,
      score: 9.17,
    },
    {
      rank: 2,
      title: "Fullmetal Alchemist: Brotherhood",
      popularity: 3,
      genre: "Action",
      studio: "Bones",
      type: "TV",
      episodes: 64,
      duration: 24,
      members: 3109951,
      score: 9.11,
    },
    //other data objects
  ],
  config: {
    rows: ["studio", "genre"],
    columns: [],
    values: [
      {
        id: "title",
        method: "count",
      },
      {
        id: "score",
        method: "max",
      },
    ],
  },
});
~~~
