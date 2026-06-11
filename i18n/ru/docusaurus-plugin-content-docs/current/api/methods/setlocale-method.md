---
sidebar_label: setLocale()
title: setLocale()
description: Вы можете узнать о методе setLocale() в документации библиотеки DHTMLX JavaScript Pivot. Просматривайте руководства разработчика и справочник по АПИ, изучайте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# setLocale()

### Описание {#description}

@short: Применяет новую локаль к Pivot

### Использование {#usage}

~~~jsx
setLocale(null | locale?: object): void;
~~~

### Параметры {#parameters}

- `null` - (необязательный) сбрасывает локаль на значение по умолчанию (английский)
- `locale` - (необязательный) объект с данными новой применяемой локали

### Пример {#example}

~~~jsx 
// создаём Pivot
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
    }
});

// применяем локаль "de" к Pivot
table.setLocale(pivot.locales.de);

// применяем локаль по умолчанию к Pivot
table.setLocale(); // или setLocale(null);
~~~

**Связанные статьи**:
- [Локализация](guides/localization.md)
- [`locale`](api/config/locale-property.md)
