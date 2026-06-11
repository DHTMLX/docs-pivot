---
sidebar_label: open-row
title: open-row
description: В документации JavaScript-библиотеки DHTMLX Pivot вы можете узнать о событии open-row. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, скачивайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot
---

# open-row

### Описание {#description}

@short: Срабатывает при открытии (разворачивании) строки

Чтобы вызвать событие Table, необходимо получить доступ к экземпляру Table внутри Pivot через метод [`getTable`](api/methods/gettable-method.md). Режим дерева должен быть включён через свойство [`tableShape`](api/config/tableshape-property.md).

### Использование {#usage}

```jsx {}
"open-row": ({
    id: string | number,
    nested?: boolean
}) => boolean|void;
```

### Параметры {#parameters}

Колбэк действия принимает объект со следующими параметрами:

- `id` - (обязательный) идентификатор строки, содержащей вложенные строки
- `nested` - (необязательный) если установлено значение **true**, все вложенные элементы будут развёрнуты

:::note
Если `id` равен 0, а `nested` установлено в **true**, все строки в таблице будут развёрнуты
:::

### Пример {#example}

Фрагмент кода ниже демонстрирует, как открывать/закрывать все строки по нажатию кнопки:

<iframe src="https://snippet.dhtmlx.com/i4mi6ejn?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Связанные статьи**: 
- [`getTable`](api/methods/gettable-method.md)
- [Разворачивание/сворачивание всех строк](guides/configuration.md#expandingcollapsing-all-rows)
