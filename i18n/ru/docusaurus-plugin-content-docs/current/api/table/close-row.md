---
sidebar_label: close-row
title: close-row
description: Вы можете узнать о событии close-row в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник API, пробуйте примеры кода и живые демо, а также скачайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot
---

# close-row

### Описание {#description}

@short: Срабатывает при закрытии (сворачивании) строки

Чтобы вызвать событие Table, необходимо получить доступ к базовому экземпляру виджета Table внутри Pivot через метод [`getTable`](api/methods/gettable-method.md). Режим дерева должен быть включён через свойство [`tableShape`](api/config/tableshape-property.md).

### Использование {#usage}

```jsx {}
"close-row": ({
    id: string | number,
    nested?: boolean
}) => boolean|void;
```

### Параметры {#parameters}

Колбэк действия принимает объект со следующими параметрами:

- `id` - (обязательный) идентификатор строки, содержащей вложенные строки
- `nested` - (необязательный) если задано значение **true**, все вложенные элементы будут свёрнуты

:::note
Если `id` равно 0, а `nested` — **true**, все строки в таблице будут свёрнуты
:::

### Пример {#example}

Приведённый ниже сниппет демонстрирует, как открывать/закрывать все строки по нажатию кнопки:

<iframe src="https://snippet.dhtmlx.com/i4mi6ejn?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Связанные статьи**: 
- [`getTable`](api/methods/gettable-method.md)
- [Разворачивание/сворачивание всех строк](guides/configuration.md#expandingcollapsing-all-rows)
