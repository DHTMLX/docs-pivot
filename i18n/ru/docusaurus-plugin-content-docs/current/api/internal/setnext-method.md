---
sidebar_label: api.setNext()
title: Метод setNext
description: Вы можете узнать о методе setNext в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

# api.setNext()

### Описание {#description}

@short: Позволяет добавить действие в цепочку Event Bus

### Использование {#usage}

~~~jsx
api.setNext(next: any): void;
~~~

### Параметры {#parameters}

- `next` - (обязательный) действие, которое нужно включить в цепочку **Event Bus**  

### Пример {#example}

Пример ниже показывает, как использовать метод `api.setNext()` для интеграции пользовательского класса в цепочку Event Bus:

~~~jsx {13-14}
const table = new pivot.Pivot("#root", { fields: [], data: [] });
const server = "https://some-backend-url";

// Предположим, у вас есть пользовательский класс серверного сервиса someServerService
const someServerService = new ServerDataService(server);

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({ data, fields });
    
    // Интегрируем serverDataService в цепочку Event Bus виджета
    table.api.setNext(someServerService);
});
~~~

**Связанные статьи**: [`setConfig`](api/methods/setconfig-method.md)
