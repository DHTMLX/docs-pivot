---
sidebar_label: MCP-сервер DHTMLX
title: MCP-сервер DHTMLX Pivot для конфигурации, агрегации и экспорта
description: Конфигурация, методы агрегации, предикаты и API экспорта DHTMLX Pivot попадают к ИИ-ассистентам через MCP-сервер как актуальная документация, а не как догадка на основе данных обучения.
---

# MCP-сервер DHTMLX Pivot: конфигурация, агрегация и экспорт {#dhtmlx-pivot-mcp-server-configuration-aggregation-and-export}

DHTMLX Pivot превращает [единый объект конфигурации](api/config/config-property.md) в полностью агрегированную таблицу и открывает доступ к целому второму API — [базовому виджету Table](api/methods/gettable-method.md) — для экспорта данных или раскрытия строк дерева. Изменения макета и полные перерисовки таблицы запускают собственные события: [редактирование макета](api/events/update-config-event.md) вызывает одно событие, а [каждая перерисовка внутри](api/events/render-table-event.md) — другое. Чтобы не ошибиться во всём этом, нужна актуальная документация, а не устаревшая догадка.

Вместо этого обратитесь к MCP-серверу DHTMLX: он возвращает [актуальную структуру `config`](api/config/config-property.md), [путь экспорта через getTable()](guides/exporting-data.md) и [нужное событие для сохранения состояния](/guides/working-with-server#save-the-users-layout-to-resume-the-session), поэтому ассистент генерирует код, который соответствует тому, как Pivot на самом деле ведёт себя сегодня.

### Конечная точка MCP {#mcp-endpoint}

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
MCP-сервер DHTMLX охватывает все основные продукты DHTMLX, а не только DHTMLX Pivot. Одна и та же конечная точка и инструкции по настройке работают независимо от того, с каким компонентом DHTMLX вы работаете.
:::

## О чём разработчики Pivot спрашивают MCP-сервер {#what-pivot-developers-ask-the-mcp-server}

MCP-сервер может рассказать почти всё о документации DHTMLX Pivot, начиная с:

- Поиска актуального API для [методов](api/overview/methods-overview.md), [событий](api/overview/events-overview.md) и [свойств](api/overview/properties-overview.md), включая методы [Event Bus](api/overview/internal-eventbus-overview.md) и [состояния](api/overview/internal-state-overview.md).
- Генерации готового к запуску кода [инициализации](guides/initialization.md) с нужными для конкретной таблицы `fields`, `data` и структурой [`config`](api/config/config-property.md).
- Определения [строк, столбцов и значений](guides/working-with-data.md#define-pivot-structure) в свойстве `config`, включая обе допустимые формы записи `values`.
- Выбора или написания [методов агрегации](guides/working-with-data.md#applying-maths-methods) — от встроенного набора `sum`/`count`/`average` до пользовательского метода, добавленного через свойство [`methods`](api/config/methods-property.md).
- Предварительной обработки данных с помощью [предикатов](guides/working-with-data.md#processing-data-with-predicates) перед агрегацией, например группировки дат по месяцам.
- Изменения размера, закрепления и шаблонизации ячеек таблицы через [`tableShape`](api/config/tableshape-property.md) и [`headerShape`](api/config/headershape-property.md), включая [режим дерева](guides/configuration.md#enabling-the-tree-mode) и [закреплённые столбцы](guides/configuration.md#freezing-columns).
- [Локализации](guides/localization.md) подписей и форматов дат/чисел, а также [стилизации](guides/stylization.md) таблицы с помощью CSS-переменных `--wx-pivot-*`.
- [Экспорта](guides/exporting-data.md) таблицы в CSV или XLSX через экземпляр Table, который возвращает [`getTable()`](api/methods/gettable-method.md).
- Выбора между [`update-config`](api/events/update-config-event.md) и [`render-table`](api/events/render-table-event.md) при [сохранении состояния на сервере](/guides/working-with-server), а также интеграции Pivot с [React](guides/integration-with-react.md), [Vue](guides/integration-with-vue.md), [Angular](guides/integration-with-angular.md) и [Svelte](guides/integration-with-svelte.md).

## Куда попадает вопрос о Pivot в MCP {#where-a-pivot-question-lands-in-mcp}

Вопрос о Pivot, отправленный на MCP-сервер DHTMLX, проходит через конвейер Retrieval-Augmented Generation (RAG), построенный на Model Context Protocol (MCP), и попадает в один из двух сценариев: *Search*, который возвращает подходящие страницы документации, из которых ассистент пишет ответ, или *Inference*, который читает эти страницы и сам отвечает на вопрос. Обращения к документации требует только половина этого запроса. Ассистент выделяет эту половину и дописывает остальное — логику сохранения, специфичную для конкретного сервера, — из того, что уже знает.

Рассмотрим промпт *«Напиши обработчик, который сохраняет config Pivot на сервер при каждом изменении макета»*:

1. Ассистент выделяет половину, которая требует документации: какое событие слушать и как прочитать текущий конфиг.
2. Сервер находит документацию [Работа с сервером](/guides/working-with-server), к которой это относится.
3. Поскольку запрос — на генерацию кода, его обрабатывает *Search* (более узкий вопрос, например, срабатывает ли `render-table` чаще, чем `update-config`, ушёл бы в *Inference*).
4. *Search* извлекает подходящие страницы из векторного индекса актуальной документации Pivot.
5. Ассистент получает эти страницы в качестве контекста.
6. Опираясь на этот контекст, ассистент пишет обработчик [`update-config`](api/events/update-config-event.md), корректно пропуская более частые срабатывания `render-table`, а затем добавляет сам запрос на сохранение для целевого сервера из собственных знаний.

Так код агрегации и экспорта Pivot остаётся согласованным с актуальным API.

## Подключение ИИ-инструмента к MCP-серверу {#linking-your-ai-tool-to-the-mcp-server}

Какой бы инструмент разработки с ИИ вы ни использовали вместе с Pivot, подключение к MCP-серверу сводится к одному шагу: указать в нём URL конечной точки ниже — через команду CLI или JSON-файл конфигурации.

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

Далее — инструкции по настройке для популярных инструментов.

### Claude Code {#claude-code}

:::info
[Официальная документация](https://code.claude.com/docs/en/mcp) Claude Code описывает все способы настройки MCP.
:::

Чтобы зарегистрировать сервер из командной строки, выполните:

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

Нет доступа к CLI? Добавьте следующую конфигурацию в `.mcp.json` вручную:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Cursor {#cursor}

:::info
Полный набор параметров настройки MCP — в [официальной документации](https://cursor.com/en-US/docs/mcp) Cursor.
:::

Шаги для добавления сервера:

1. Откройте Settings (`Cmd+Shift+J` на Mac, `Ctrl+Shift+J` на Windows/Linux)
2. Перейдите в **Tools & MCP**
3. Нажмите **Add Custom MCP**
4. Вставьте следующую конфигурацию:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Google Antigravity {#google-antigravity}

#### Antigravity 2.0 {#antigravity-20}

:::info
Полная картина по интеграции MCP-сервера в Antigravity — в [официальной документации](https://antigravity.google/docs/mcp).
:::

Чтобы подключить MCP-сервер DHTMLX к Google Antigravity, выполните следующие шаги:

1. Откройте палитру команд
2. Введите «mcp add»
3. Выберите «HTTP»
4. Укажите следующие значения:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI {#antigravity-cli}

:::info
[Соответствующее руководство](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes) объясняет, что меняется при переходе с Gemini CLI на Antigravity CLI.
:::

Чтобы подключить MCP-сервер DHTMLX к Antigravity CLI, создайте `mcp_config.json` в одном из следующих мест:

- Глобально: `~/.gemini/config/mcp_config.json`
- В рабочей области: `.agents/mcp_config.json`

Добавьте следующую конфигурацию:

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

Затем выполните `agy` в терминале.

### ChatGPT {#chatgpt}

:::info
Все шаги настройки MCP-коннектора в ChatGPT — в [официальной документации](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt).
:::

Шаги настройки коннектора:

1. Перейдите в **Settings** → **Apps & Connectors**
2. Нажмите **Advanced settings**
3. Включите **Developer mode**
4. Вернитесь в **Apps & Connectors** и нажмите «Create»
5. Заполните данные коннектора:
- Name:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- Authentication: `No authentication`
6. Нажмите **Create**

После создания коннектора ChatGPT получает документацию с MCP-сервера в ходе диалогов.

:::info
Для интенсивной работы с кодом лучше подойдут другие инструменты с поддержкой MCP.
:::

### Другие инструменты {#other-tools}

В панелях настроек других инструментов для разработки с ИИ это обычно называется «Model Context Protocol» или «Context Sources». Добавьте туда `https://docs.dhtmlx.com/mcp` как пользовательский источник.

## Куда уходят ваши запросы {#where-your-queries-go}

Будучи хостинговым сервисом, MCP-сервер никогда не выполняется на вашем оборудовании, не открывает локальные файлы и не хранит персональные данные.

Сервер логирует запросы только для отладки проблем и улучшения сервиса.

Запросите коммерческое развёртывание, чтобы полностью отключить логирование запросов. Свяжитесь по адресу `info@dhtmlx.com`, чтобы это организовать.

## Промпты, которые дают верный результат по Pivot {#prompts-that-get-pivot-right}

Промпт обычно касается одной из четырёх тем: конфига, агрегации, макета или синхронизации с сервером. Группы ниже уже называют тему за вас.

**Конфиг и агрегация**

~~~
How do I add a custom aggregation method in DHTMLX Pivot? Use the docs.
~~~
~~~
How do I set a default sort order for a field in DHTMLX Pivot?
~~~
~~~
What's the difference between the two accepted forms of a values entry in the config property?
~~~

**Предикаты и поля**

~~~
How do I group date values by month using a custom predicate in DHTMLX Pivot?
~~~
~~~
How do I apply a currency format with a dollar-sign prefix to a numeric field?
~~~

**Макет и стилизация**

~~~
How do I freeze the first two row fields on the left in DHTMLX Pivot?
~~~
~~~
How do I enable tree mode in DHTMLX Pivot and choose which field becomes the parent row?
~~~
~~~
How do I change the hover color for primary buttons in the Material theme?
~~~

**Синхронизация с сервером и экспорт**

~~~
How do I save the user's layout to a server whenever they change it?
~~~
~~~
How do I export the Pivot table to XLSX?
~~~

## Небольшие советы для промптов о Pivot {#small-tips-for-pivot-prompts}

- **Уточняйте, какое API вы имеете в виду.** `export`, раскрытие/сворачивание строк дерева и фильтрация по строкам — всё это работает через экземпляр Table, который возвращает `getTable()`, а не напрямую через экземпляр Pivot. Указание этого уровня не даёт ассистенту вызвать метод, доступный только у Table, не на том объекте.
- **Различайте метод и предикат.** Методы агрегации (`sum`, `count`, пользовательская запись в `methods`) сводят значения, уже находящиеся в строке или столбце. Предикаты преобразуют исходное значение до того, как происходит эта группировка. Указывайте, на какой этап нацелен ваш промпт.
- **Явно указывайте нужную форму записи `values`.** Элемент `values` может быть строкой `"method(field)"` или объектом `{ field, method }`. Указание используемой формы не даёт ассистенту придумать третий вариант.
- **Добавляйте «Use the docs»**, когда спрашиваете про `update-config` в сравнении с `render-table`. Эти события срабатывают с разной частотой, и именно такие детали устаревшие данные обучения обычно упускают.
