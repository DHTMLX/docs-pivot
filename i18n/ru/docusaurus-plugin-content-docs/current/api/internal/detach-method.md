---
sidebar_label: api.detach()
title: Метод detach
description: Вы можете узнать о методе detach в документации библиотеки DHTMLX JavaScript Pivot. Просматривайте руководства разработчика и справочник АПИ, изучайте примеры кода и живые демо, а также загрузите бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# api.detach()

## Описание {#description}

@short: Позволяет удалять/отсоединять обработчики действий

## Использование {#usage}

~~~jsx
api.detach(tag: number | string ): void;
~~~

## Параметры {#parameters}

- `tag` - имя тега действия

### Пример {#example}

В примере ниже мы добавляем объект со свойством **tag** в обработчик [`api.on()`](api/internal/on-method.md), а затем используем метод `api.detach()`, чтобы прекратить логирование действия [`open-filter`](api/events/open-filter-event.md).

~~~jsx {31-34}
// создаём Pivot
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
        ]
    }
});

// добавляем обработчик
if (table.api) {
    table.api.on(
        "open-filter",
        ({ area }) => {
            console.log("Opened: " + area);
        },
        { tag: "track" }
    );
}

// отсоединяем обработчик
function stop() {
    table.api.detach("track");
}

const button = document.createElement("button");

button.addEventListener("click", stop);
button.textContent = "Stop logging";

document.body.appendChild(button);
~~~
