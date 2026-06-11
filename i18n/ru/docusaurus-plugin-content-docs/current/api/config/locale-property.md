---
sidebar_label: locale
title: locale Config
description: Вы можете узнать о конфиге locale в документации библиотеки DHTMLX JavaScript Pivot. Просматривайте руководства разработчика и справочник API, изучайте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# locale

### Описание {#description}

@short: Необязательный. Объект пользовательской локали Pivot

### Использование {#usage}

~~~jsx
locale?: object;
~~~

### Конфигурация по умолчанию {#default-config}

По умолчанию Pivot использует локаль [английского](guides/localization.md#default-locale) языка. Вы также можете задать пользовательскую локаль.

:::tip
Чтобы изменить текущую локаль динамически, используйте метод [`setLocale()`](api/methods/setlocale-method.md) компонента Pivot
:::

### Пример {#example}

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
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

    locale: pivot.locales.cn, // локаль "cn" будет установлена изначально
    // другие параметры
});
~~~
