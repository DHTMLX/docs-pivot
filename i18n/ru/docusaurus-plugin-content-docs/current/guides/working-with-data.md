---
sidebar_label: Работа с данными
title: Работа с данными
description: В документации библиотеки DHTMLX JavaScript Pivot вы найдёте информацию о работе с данными. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# Работа с данными

На этой странице описано, как агрегировать, форматировать, сортировать, фильтровать и предварительно обрабатывать данные в Pivot. Инструкции по загрузке и экспорту данных см. в разделах [Загрузка данных](guides/loading-data.md) и [Экспорт данных](guides/exporting-data.md).

## Определение полей {#define-fields}

Используйте свойство [`fields`](api/config/fields-property.md), чтобы объявить поля, которые Pivot может размещать в строках, столбцах и значениях. Каждый элемент массива `fields` описывает одно поле — его идентификатор, метку и тип данных.

Следующий фрагмент кода инициализирует Pivot с пятью полями:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields: [
        { id: "year", label: "Year", type: "number" },
        { id: "continent", label: "Continent", type: "text" },
        { id: "form", label: "Form", type: "text" },
        { id: "oil", label: "Oil", type: "number" },
        { id: "balance", label: "Balance", type: "number" }
    ],
    data,
    config: {...}
});
~~~

## Применение форматов к полям {#applying-formats-to-fields}

Pivot применяет формат по умолчанию к числовым полям и полям дат на основе текущей локали. Подробнее см. в разделах [Форматирование дат](guides/localization.md#date-formatting) и [Форматирование чисел](guides/localization.md#number-formatting).

Чтобы переопределить формат по умолчанию для конкретного поля, задайте параметр `format` свойства [`fields`](api/config/fields-property.md).

### Форматирование числовых полей {#format-numeric-fields}

Используйте `prefix` и `suffix`, чтобы добавить текст вокруг числовых значений, и `maximumFractionDigits`, чтобы управлять точностью десятичных знаков. Например, чтобы отображать `12.345` как `"12.35 EUR"`, задайте суффикс `" EUR"` и `maximumFractionDigits` равным `2`:

~~~js
const fields = [
     { id: "sales", type: "number", format: { suffix: " EUR", maximumFractionDigits: 2 } },
];
~~~

Форматирование по умолчанию ограничивает числовые поля тремя знаками после запятой и применяет разделение групп к целой части. Чтобы полностью отключить форматирование, задайте `format` значение `false`:

~~~js
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

В примере ниже поля `marketing`, `profit` и `sales` помечены как денежные с префиксом `$` и фиксированными двумя десятичными знаками:

~~~jsx
// инициализация Pivot с предопределённым набором данных и полями
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            { field: "marketing", method: "sum" },
            // другие значения

        ],
    },
    fields:[
        // пользовательский формат
        { id: "marketing", label: "Marketing", type:"number", format:{
                prefix: "$", minimumFractionDigits: 2, maximumFractionDigits: 2 }
        }
    ]
});
~~~

### Форматирование полей дат {#format-date-fields}

Чтобы переопределить общий `dateFormat` локали для отдельного поля, задайте параметр `format` свойства [`fields`](api/config/fields-property.md) в виде строки формата даты.

Следующий фрагмент кода задаёт `"%M %d, %Y"` в качестве формата для поля `date`:

~~~jsx
const fields = [
     { id: "date",  type: "date",  format: "%M %d, %Y" },
];
~~~

В примере ниже строковые даты преобразуются в объекты `Date`, после чего Pivot инициализируется с форматом `"%d %M %Y %H:%i"` для поля `date`. Значения поля отображаются в виде меток, например `"24 April 2025 14:30"`.

~~~jsx
// преобразование строковых дат в объекты Date
const dateFields = fields.filter(f => f.type === "date");
dataset.forEach(item => {
    dateFields.forEach(f => {
        const v = item[f.id];
        if (typeof v === "string") {
            item[f.id] = new Date(v);
        }
    });
});

// инициализация Pivot с полевым форматом даты
new pivot.Pivot("#pivot", {
    data,
    config: {
        rows: ["state"],
        columns: ["product_type"],
        values: [
            { field: "date", method: "min" },
            { field: "profit", method: "sum" },
            { field: "sales", method: "sum" }
        ]
    },
    fields:[
        // пользовательский формат: День Месяц Год Часы:Минуты
        { id: "date", label: "Date", type: "date", format: "%d %M %Y %H:%i" }
    ]
});
~~~

:::note
Для формата экспорта `xlsx` Pivot экспортирует поля дат и числовые поля как необработанные значения с форматом по умолчанию (или форматом, заданным через свойство [`fields`](api/config/fields-property.md)). Если для поля задан шаблон (см. свойство [`tableShape`](api/config/tableshape-property.md)), Pivot экспортирует отрисованное значение, полученное этим шаблоном. Если заданы и `template`, и `format`, шаблон имеет приоритет над форматом.
:::

## Определение структуры Pivot {#define-pivot-structure}

Используйте свойство [`config`](api/config/config-property.md), чтобы объявить, какие поля отображаются как строки, столбцы и агрегированные значения, а также как фильтруются данные. Свойство `config` не имеет предопределённых значений — вы должны задать его для отображения любых данных. Полный список параметров см. в справочнике [`config`](api/config/config-property.md).

Следующий фрагмент кода помещает `continent` и `name` в строки, `year` — в столбцы, три агрегации — в значения и добавляет фильтр по `name`:

~~~jsx {4-18}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            "count(oil)",
            { field: "oil", method: "sum" },
            { field: "gdp", method: "sum" }
        ]
    },
    fields,
    filters: {
        name: {
            contains: "B"
        }
    }
});
~~~

## Сортировка данных {#sorting-data}

Pivot поддерживает сортировку во всех трёх областях (значения, столбцы, строки) в процессе агрегации. В интерфейсе пользователи нажимают на заголовок столбца для сортировки.

Чтобы задать сортировку по умолчанию, используйте параметр `sort` свойства [`fields`](api/config/fields-property.md). Параметр принимает `"asc"`, `"desc"` или пользовательскую функцию сравнения.

В примере ниже над Pivot отображаются кликабельные метки полей, и при нажатии направление сортировки переключается:

~~~jsx
const bar = document.getElementById("bar");

let sorted = ["studio", "genre"];
setFields();
bar.addEventListener('click', (e) => switchSort(e.target.id), false);

function setFields(){
    let html = "";
    let sortedFields = fields.filter(f => (sorted.indexOf(f.id) != -1));

    sortedFields.forEach((f) =>{
        const order = f.sort || "asc";
        html += `<div class="field" id="${f.id}">
                    ${f.label}<i class="icon wxi-${order}" ></i>
                </div>`;
    });
    bar.innerHTML = html;
}

function switchSort(id){
    fields.forEach(f => {
        if(f.id == id){
             f.sort =  f.sort != "desc" ? "desc" : "asc";
        }
    });
    // обновление полей Pivot
    table.setConfig({ fields }); 
    // обновление иконок
    setFields(bar, fields);
}

const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: [
            "studio",
            "genre"
        ],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

Сортировка в интерфейсе включена по умолчанию. Чтобы отключить её, задайте параметр `sort` свойства [`columnShape`](api/config/columnshape-property.md) равным `false`.

Следующий фрагмент кода отключает сортировку в интерфейсе:

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    columnShape: {
        sort: false 
    }
});
~~~

## Фильтрация данных {#filtering-data}

Pivot поддерживает фильтры, привязанные к типам данных полей. Фильтры задаются через интерфейс Pivot после инициализации или декларативно через объект `filters` свойства [`config`](api/config/config-property.md).

В интерфейсе фильтры отображаются в виде выпадающих списков для каждого поля.

#### Типы фильтров {#filter-types}

Pivot поддерживает следующие условия фильтрации по типам данных:

- текстовые поля — `equal`, `notEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`, `includes`
- числовые поля — `equal`, `notEqual`, `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `contains`, `notContains`, `beginsWith`, `notBeginsWith`, `endsWith`, `notEndsWith`
- поля дат — `equal`, `notEqual`, `greater`, `greaterOrEqual`, `less`, `lessOrEqual`, `between`, `notBetween`, `includes`

Правило `includes` ограничивает фильтр конкретным набором допустимых значений.

#### Добавление фильтра {#add-a-filter}

Чтобы объявить фильтр, добавьте объект `filters` в свойство [`config`](api/config/config-property.md), используя идентификатор поля в качестве ключа. Каждое значение — объект с условиями фильтрации.

Следующий фрагмент кода применяет два фильтра — один по `genre` (значения, содержащие `"D"`, ограниченные значением `"Drama"`) и один по `title` (значения, содержащие `"A"`):

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ],
        filters: {
            genre: {
                contains: "D",
                includes: ["Drama"]
            },
            title: {
                // фильтр для другого поля ("title")
                contains: "A"
            }
        }
    }
});
~~~

:::info
Чтобы фильтровать данные через API виджета Table, получите экземпляр Table с помощью метода [`getTable`](api/methods/gettable-method.md) и используйте событие [`filter-rows`](api/table/filter-rows.md).
:::

## Ограничение загружаемых данных {#limiting-loaded-data}

Чтобы предотвратить зависание компонента на очень больших наборах данных, ограничьте количество строк и столбцов в итоговом наборе с помощью свойства [`limits`](api/config/limits-property.md). Pivot прерывает отрисовку по достижении лимита. По умолчанию лимит составляет 10000 строк и 5000 столбцов.

:::note
Лимиты применяются к большим наборам данных. Числа приблизительны — Pivot не гарантирует точного количества строк/столбцов.
:::

Следующий фрагмент кода ограничивает набор данных 10 строками и 3 столбцами:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    config: {
        rows: ["studio"],
        columns: ["genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    limits: { rows: 10, columns: 3 }
});
~~~

## Применение математических методов {#applying-maths-methods}

### Методы по умолчанию {#default-methods}

Pivot включает следующие встроенные методы агрегации:

- `sum` (только числовые значения) — суммирует все выбранные значения; игнорирует пустые ячейки, логические значения вроде `TRUE` и текст
- `min` (числовые значения и даты) — возвращает минимальное значение; игнорирует пустые ячейки, логические значения и текст. Возвращает `0`, если во входных данных нет чисел
- `max` (числовые значения и даты) — возвращает максимальное значение; игнорирует пустые ячейки, логические значения и текст. Возвращает `0`, если во входных данных нет чисел
- `count` (числовые, текстовые значения и даты) — считает непустые ячейки; это метод по умолчанию, назначаемый каждому вновь добавленному полю
- `countunique` (числовые и текстовые значения) — считает количество уникальных значений во входных данных
- `average` (только числовые значения) — вычисляет среднее арифметическое; игнорирует пустые ячейки, логические значения и текст. Включает ячейки со значением ноль
- `counta` (числовые, текстовые значения и даты) — считает все непустые значения, включая числа, даты и текст
- `median` (только числовые значения) — возвращает медиану входных данных
- `product` (только числовые значения) — возвращает произведение всех чисел во входных данных
- `stdev` (только числовые значения) — стандартное отклонение, при котором входные данные рассматриваются как выборка из большей совокупности
- `stdevp` (только числовые значения) — стандартное отклонение, при котором входные данные рассматриваются как вся генеральная совокупность
- `var` (только числовые значения) — дисперсия, при которой входные данные рассматриваются как выборка из большей совокупности
- `varp` (только числовые значения) — дисперсия, при которой входные данные рассматриваются как вся генеральная совокупность

Следующий фрагмент кода показывает определения встроенных методов:

~~~jsx
const defaultMethods = {
    sum: { type: "number", label: "sum" },
    min: { type: ["number", "date"], label: "min" },
    max: { type: ["number", "date"], label: "max" },
    count: {
        type: ["number", "date", "text"],
        label: "count",
        branchMath: "sum"
    },
    counta: {
        type: ["number", "date", "text"],
        label: "counta",
        branchMath: "sum"
    },
    countunique: {
        type: ["number", "text"],
        label: "countunique",
        branchMath: "sum"
    },
    average: { type: "number", label: "average", branchMode: "raw" },
    median: { type: "number", label: "median", branchMode: "raw" },
    product: { type: "number", label: "product" },
    stdev: { type: "number", label: "stdev", branchMode: "raw" },
    stdevp: { type: "number", label: "stdevp", branchMode: "raw" },
    var: { type: "number", label: "var", branchMode: "raw" },
    varp: { type: "number", label: "varp", branchMode: "raw" }
};
~~~

Применяйте метод по умолчанию через параметр `values` свойства [`config`](api/config/config-property.md). См. раздел [Определение значений](#options-for-defining-values).

Следующий фрагмент кода назначает `count` полю `title` и `max` полю `score`:

~~~jsx
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                // идентификатор поля
                field: "title",
                // метод
                method: "count"
            },
            {
                id: "score",
                method: "max"
            }
        ]
    }
});
~~~

### Определение значений {#options-for-defining-values}

Каждую запись в `values` можно задать в одной из двух равнозначных форм:

- строка вида `"operation(fieldID)"`
- объект `{ field: string, method: string }` (оба поля обязательны)

Следующий фрагмент кода использует обе формы в одном массиве `values`:

~~~jsx
values: [
    "sum(sales)", // первый вариант
    { field: "sales", method: "sum" } // второй вариант
]
~~~

### Переопределение метода по умолчанию {#override-the-default-method}

Для каждого вновь добавленного поля Pivot назначает первый доступный метод для данного типа данных. Чтобы изменить это поведение, перехватите событие `add-field` с помощью метода [`api.intercept`](api/internal/intercept-method.md).

В примере ниже выполняется перехват `add-field` и принудительно устанавливается метод `max` при добавлении числового поля:

~~~jsx {20-27}
const table = new pivot.Pivot("#root", {
  fields,
  data: dataset,
  config: {
    rows: ["studio", "genre"],
    columns: [],
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
// переопределение метода по умолчанию для вновь добавляемых числовых полей
table.api.intercept("add-field", (ev) => {
  const { fields } = table.api.getState();
  const type = fields.find((f) => f.id == ev.field).type;

  if (ev.area == "values" && type == "number") {
    ev.method = "max";
  }
});
~~~

### Добавление пользовательских математических методов {#add-custom-math-methods}

Чтобы добавить пользовательский метод агрегации, используйте свойство [`methods`](api/config/methods-property.md). Каждая запись связывает имя метода (ключ) с объектом конфигурации, содержащим функцию `handler` и метаданные. Функция `handler` принимает массив значений и возвращает одно агрегированное значение.

В примере ниже добавляются два метода, специфичных для дат. `countunique_date` считает уникальные даты по их числовым меткам времени. `average_date` возвращает среднюю дату путём усреднения меток времени:

~~~jsx
function countUnique(values, converter) {
    const valueMap = {};
    return values.reduce((acc, d) => {
        if (converter) d = converter(d);
        if (!valueMap[d]) {
            acc++;
            valueMap[d] = true;
        }
        return acc;
    }, 0);
}

const methods = {
    countunique_date: {
        handler: values => countUnique(values, v => new Date(v).getTime()),
        type: "date",
        label: "CountUnique",
    },
    average_date: {
        type: "date",
        label: "Average",
        branchMode: "raw",
        handler: values => {
            if (!values.length) return null;
            const sum = values.reduce((acc, d) => acc + d.getTime(), 0);
            const avgTime = sum / values.length;
            return new Date(avgTime);
        }
    }
};

// показывать целые числа для результатов "count" и "unique count"
const templates = {};
fields.forEach(f => {
    if (f.type == "number")
        templates[f.id] = (v, method) =>
        v && method.indexOf("count") < 0 ? parseFloat(v).toFixed(3) : v;
});

// преобразование строковых дат в объекты Date
const dateFields = fields.filter(f => f.type == "date");
if (dateFields.length) {
    dataset.forEach(item => {
        dateFields.forEach(f => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    fields, 
    data: dataset,
    tableShape: { templates },
    methods: { ...pivot.defaultMethods, ...methods },
    config:{
        rows: ["state"],
        columns: [
            "product_line",
            "product_type"
        ],
        values: [
            {
                field: "sales",
                method: "sum"
            },
            {
                field: "sales",
                method: "count"
            },
            {
                field: "date",
                method: "countunique_date"
            },
            {
                field: "date",
                method: "average_date"
            }
        ]
    }
});
~~~

## Обработка данных с помощью предикатов {#processing-data-with-predicates}

Предикаты — это функции предварительной обработки, которые преобразуют исходные данные полей до того, как Pivot использует их в строках или столбцах. Например, предикат может группировать даты по месяцам перед агрегацией.

Следующий фрагмент кода показывает встроенные предикаты дат, применяемые Pivot по умолчанию:

~~~jsx
const defaultPredicates = {
    year: { label: "Year", type: "date", filter: { type: "number" } },
    quarter: { label: "Quarter", type: "date", filter: { type: "tuple" } },
    month: { label: "Month", type: "date", filter: { type: "tuple" } },
    week: { label: "Week", type: "date", filter: { type: "tuple" } },
    day: { label: "Day", type: "date", filter: { type: "number" } },
    hour: { label: "Hour", type: "date", filter: { type: "number" } },
    minute: { label: "Minute", type: "date", filter: { type: "number" } }
};
~~~

Чтобы добавить пользовательский предикат, настройте свойство [`predicates`](api/config/predicates-property.md). Каждая запись связывает идентификатор предиката (ключ) с объектом конфигурации:

- `type` — типы полей, которые принимает предикат (`"number"`, `"date"`, `"text"` или массив)
- `label` — метка предиката, отображаемая в выпадающем списке GUI для строки/столбца
- `handler` — функция, преобразующая значение и возвращающая обработанное значение
- `template` — необязательная функция, управляющая отображением обработанного значения
- `field` — необязательная функция, ограничивающая предикат конкретными полями
- `filter` — необязательная конфигурация фильтра, если тип фильтра должен отличаться от `type` или формат данных должен отличаться от `template`

Чтобы использовать пользовательский предикат, задайте его идентификатор как `method` строки или столбца, к которым предикат должен применяться.

Следующий фрагмент кода регистрирует два пользовательских предиката (`monthYear` и `profitSign`) и применяет их в конфигурации `columns`:

~~~jsx
const predicates = {
    monthYear: {
        label: "Month-year",
        type: "date",
        handler: (d) => new Date(d.getFullYear(), d.getMonth(), 1),
        template: (date, locale) => {
            const months = locale.getRaw().calendar.monthFull;
            return months[date.getMonth()] + " " + date.getFullYear();
        },
    },
    profitSign: {
        label: "Profit Sign",
        type: "number",
        filter: {
            type: "tuple",
            format: (v) => (v < 0 ? "Negative" : "Positive"),
        },
        field: (f) => f === "profit",
        handler: (v) => (v < 0 ? -1 : 1),
        template: (v) => (v < 0 ? "Negative profit" : "Positive profit"),
    },
};

// преобразование строковых дат в объекты Date
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    predicates: { ...pivot.defaultPredicates, ...predicates },
    tableShape: { tree: true },
    config: {
        rows: ["product_type", "product"],
        columns: [
            { field: "profit", method: "profitSign" },
            { field: "date", method: "monthYear" },
        ],
        values: ["sales", "expenses"],
    },
});
~~~

## Добавление столбцов и строк с итоговыми значениями {#add-columns-and-rows-with-total-values}

Используйте свойство [`tableShape`](api/config/tableshape-property.md), чтобы отрисовать итоговый столбец справа (`totalColumn: true`) или итоговую строку-футер (`totalRow: true`).

Следующий фрагмент кода включает и итоговый столбец, и итоговую строку:

~~~jsx {2-5}
const table = new pivot.Pivot("#root", {
    tableShape: {
        totalRow: true,
        totalColumn: true
    },
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["type"],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            }
        ]
    }
});
~~~

## Пример {#example}

Фрагмент ниже применяет пользовательские математические операции:

<iframe src="https://snippet.dhtmlx.com/lv90d8q2?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Связанные примеры**:

- [Pivot 2. Набор данных с псевдонимами](https://snippet.dhtmlx.com/7vc68rqd)
- [Pivot 2. Определение форматов полей](https://snippet.dhtmlx.com/77nc4j8v)
- [Pivot 2. Внешний фильтр](https://snippet.dhtmlx.com/s7tc9g4z)
- [Pivot 2. Общий итог для столбцов и строк](https://snippet.dhtmlx.com/f0ag0t9t)
