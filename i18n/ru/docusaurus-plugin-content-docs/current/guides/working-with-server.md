---
sidebar_label: Работа с сервером
title: Работа с сервером
description: В документации библиотеки DHTMLX JavaScript Pivot вы можете узнать, как интегрировать Pivot с серверной частью. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot.
---

Pivot работает полностью в браузере. Виджет принимает массив исходных строк и объект [`config`](/api/config/config-property) (строки / столбцы / значения) и агрегирует данные на стороне клиента. Встроенного транспортного слоя нет, однако публичное API предоставляет хуки для обмена данными с любым сервером.

Типичная интеграция включает три части:

1. **Загрузка** необработанных, неагрегированных данных с сервера при инициализации
2. **Сохранение конфига** при изменении макета пользователем, чтобы сессия восстанавливалась при следующем входе
3. **Сохранение агрегированной таблицы**, когда серверу нужен снимок свёрнутого результата

## Загрузка необработанных данных с сервера {#load-raw-data-from-the-server}

Свойство [`data`](/api/config/data-property) ожидает массив объектов-строк в исходном виде. Pivot самостоятельно агрегирует строки, поэтому сервер возвращает неразвёрнутые данные.

Получите данные и поля с помощью `fetch` (или любого HTTP-клиента), а затем создайте виджет после получения ответа:

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
        fetch(server + "/config").then(res => res.json()), // опционально
    ]).then(([data, fields, config]) => {
        new pivot.Pivot("#root", {
            data,
            fields,
            config,
        });
    });
</script>
~~~

Если сервер возвращает поля дат в виде строк ISO, преобразуйте их в экземпляры `Date` перед передачей массива в Pivot. Методы агрегации для полей типа дата требуют реальных значений `Date`:

~~~jsx
data.forEach(row => {
    if (typeof row.when === "string") row.when = new Date(row.when);
});
~~~

:::info
**Смотрите также**:
- [Загрузка данных](/guides/loading-data)
- [Форматирование дат](/guides/localization#date-formatting)
:::

## Сохранение макета пользователя для восстановления сессии {#save-the-users-layout-to-resume-the-session}

Чтобы пользователи могли вернуться к оставленному макету, сохраняйте объект [`config`](/api/config/config-property) при каждом изменении. Событие [`update-config`](/api/events/update-config-event) срабатывает, когда пользователь редактирует макет через интерфейс. Полезная нагрузка — обработанный конфиг вида `{ rows, columns, values, filters }`.

Используйте [`api.on()`](/api/internal/on-method) для наблюдения за событием без его изменения. Переключитесь на [`api.intercept()`](/api/internal/intercept-method), если обработчику необходимо изменить полезную нагрузку события.

Пример ниже подписывается на событие `update-config` и отправляет новый макет на сервер:

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
    ]).then(([data, fields]) => {
        const table = new pivot.Pivot("#root", { data, fields });

        table.api.on("update-config", newConfig => {
            fetch(server + "/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newConfig),
            });
        });
    });
</script>
~~~

При следующем посещении верните сохранённый конфиг из `/config` и передайте его как свойство `config` при инициализации. Виджет запустится с предыдущим макетом. Если макет поступает уже после создания виджета, примените сохранённый конфиг с помощью метода [`setConfig()`](/api/methods/setconfig-method).

Частые обновления могут перегружать сервер, когда пользователь перетаскивает поля в панели конфигурации. Оберните POST в таймер, чтобы дебаунсировать вызовы:

~~~jsx
let saveTimer;
table.api.on("update-config", newConfig => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newConfig),
        });
    }, 300);
});
~~~

:::note
Полезная нагрузка `update-config` — это *обработанный* конфиг: Pivot может нормализовать ссылки на поля до формы `{ field, method }`. Передавайте обработанную форму обратно как свойство `config` при инициализации. Дополнительное преобразование не требуется.
:::

:::tip
Верните `false` из обработчика, чтобы заблокировать изменение макета. Используйте это для управления сохранением через серверную валидацию.
:::

## Сохранение агрегированной таблицы {#save-the-aggregated-table}

Иногда ценен сам *результат*: серверный кэш отображённой таблицы, периодический отчёт или экспортный конвейер. Событие [`render-table`](/api/events/render-table-event) срабатывает после завершения агрегации в Pivot и содержит полную свёрнутую таблицу: `columns`, строки `data`, `footer`, `split` и т.д.

Пример ниже подписывается на `render-table` и отправляет снимок на сервер, пропуская начальный рендер:

~~~jsx
const table = new pivot.Pivot("#root", { data, fields, config });

let firstRender = true;
let saveTimer;

table.api.on("render-table", ({ config: tableConfig }) => {
    // пропускаем начальный рендер, вызванный первой агрегацией
    if (firstRender) {
        firstRender = false;
        return;
    }

    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/snapshot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                columns: tableConfig.columns,
                data: tableConfig.data,
                footer: tableConfig.footer,
                split: tableConfig.split,
            }),
        });
    }, 300);
});
~~~

:::note
Событие `render-table` срабатывает чаще, чем `update-config`. Оно запускается при каждом пересчёте, включая сортировку и раскрытие/сворачивание. Дебаунсируйте обработчик и пропускайте первый рендер, чтобы отправлять один POST на каждое реальное изменение.
:::

:::tip
Верните `false` из обработчика, чтобы предотвратить рендеринг. Используйте это, когда сервер отклоняет снимок или для режимов только для чтения.
:::

### Перезагрузка агрегированного снимка {#reload-an-aggregated-snapshot}

Pivot создаёт агрегированные таблицы и не отображает предварительно агрегированные. Свойство [`data`](/api/config/data-property) всегда принимает исходные строки. Снимок, сохранённый из `render-table`, поэтому подходит для следующих случаев:

- последующий экспортный конвейер (CSV, XLSX) на сервере
- представление только для чтения, отображаемое простой таблицей данных из сохранённых `columns` и `data`
- кэшированный отчёт, предоставляемый другим пользователям без повторного выполнения агрегации

**Связанные статьи**:

- [Загрузка данных](/guides/loading-data)
- [Экспорт данных](/guides/exporting-data)

**Связанное API**:

- [`api.on()`](/api/internal/on-method)
- [`update-config`](/api/events/update-config-event)
- [`render-table`](/api/events/render-table-event)
