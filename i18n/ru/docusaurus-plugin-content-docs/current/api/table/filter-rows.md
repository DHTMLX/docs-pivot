---
sidebar_label: filter-rows
title: filter-rows
description: Вы можете узнать о событии filter-rows в документации библиотеки DHTMLX JavaScript Pivot. Изучайте руководства разработчика и справочник АПИ, пробуйте примеры кода и живые демо, загружайте бесплатную 30-дневную ознакомительную версию DHTMLX Pivot
---

# filter-rows

### Описание {#description}

@short: Срабатывает при фильтрации данных

Чтобы вызвать событие Table, необходимо получить доступ к экземпляру Table внутри Pivot с помощью метода [`getTable`](api/methods/gettable-method.md).

### Использование {#usage}

```jsx {}
"filter-rows": ({
    filter?: any
}) => boolean|void;
```

### Параметры {#parameters}

Калбэк действия принимает объект со следующими параметрами:

- `filter` - (необязательный) любая функция фильтрации, которая принимает каждый элемент из массива данных и возвращает **true** или **false** для каждого элемента

### Пример {#example}

Фрагмент ниже демонстрирует, как фильтровать агрегированные (видимые) данные в теле таблицы по значению ввода:

<iframe src="https://snippet.dhtmlx.com/s7tc9g4z?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**Связанная статья**: [`getTable`](api/methods/gettable-method.md)
