---
sidebar_label: 로컬라이제이션
title: 로컬라이제이션
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 로컬라이제이션에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 무료 30일 평가판도 다운로드할 수 있습니다.
---

# 로컬라이제이션 {#localization}

Pivot를 사용하면 인터페이스의 모든 레이블을 로컬라이즈할 수 있습니다. 새 로케일을 생성하거나 기본 제공 로케일을 수정한 후, [`locale`](api/config/locale-property.md) 속성 또는 [`setLocale`](api/methods/setlocale-method.md) 메서드를 통해 Pivot에 로케일을 적용합니다.

## 기본 로케일 {#default-locale}

Pivot는 기본적으로 영어 로케일을 적용합니다. 다음 코드 스니펫은 내장 `en` 로케일의 구조를 보여줍니다:

~~~jsx
const en = {
    // pivot
    pivot: {
        sum: "Sum",
        min: "Min",
        max: "Max",
        count: "Count",
        counta: "CountA",
        countunique: "CountUnique",
        average: "Average",
        median: "Median",
        product: "Product",
        stdev: "StDev",
        stdevp: "StDevP",
        var: "Var",
        varp: "VarP",
        "Raw date": "Raw date",
        "Raw number": "Raw number",
        "Raw text": "Raw text",
        Year: "Year",
        Month: "Month",
        Day: "Day",
        Hour: "Hour",
        Minute: "Minute",
        Total: "Total",
        Values: "Values",
        Rows: "Rows",
        Columns: "Columns",
        "Click on the plus icon(s) to add data":
        "Click on the plus icon(s) to add data",
        'Click on "Show settings" to see the available configuration options':
        'Click on "Show settings" to see the available configuration options',
        "Show settings": "Show settings",
        "Hide settings": "Hide settings"
    },

    // query
    query: {
        "Add filter": "Add filter",
        "Add Filter": "Add Filter",
        "Add Group": "Add Group",
        Edit: "Edit",
        Delete: "Delete",
        
        "Select all": "Select all",
        "Unselect all": "Unselect all",
        
        Cancel: "Cancel",
        Apply: "Apply",
        
        and: "and",
        or: "or",
        in: "in",
        
        equal: "equal",
        "not equal": "not equal",
        contains: "contains",
        "not contains": "not contains",
        "begins with": "begins with",
        "not begins with": "not begins with",
        "ends with": "ends with",
        "not ends with": "not ends with",
        
        greater: "greater",
        "greater or equal": "greater or equal",
        less: "less",
        "less or equal": "less or equal",
        between: "between",
        "not between": "not between"
    },

    // calendar
    calendar: {
        monthFull: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        monthShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        
        dayFull: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],

        dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        hours: "Hours",
        minutes: "Minutes",
        done: "Done",
        clear: "Clear",
        today: "Today",
        am: ["am", "AM"],
        pm: ["pm", "PM"],
        
        weekStart: 7,
        clockFormat: 24,
    },

    // core
    core: {
        ok: "OK",
        cancel: "Cancel",
        select: "Select",
        "No data": "No data"
    },

    // formats
    formats: {
        dateFormat: "%d.%m.%Y",
        timeFormat: "%H:%i"
    },

    lang: "en-US",
};
~~~

## 로케일 적용 {#apply-a-locale}

Pivot는 `pivot.locales` 객체를 통해 `en`, `de`, `cn` 세 가지 내장 로케일을 제공합니다. 초기화 시 [`locale`](api/config/locale-property.md) 속성에 내장 로케일을 전달하십시오.

다음 코드 스니펫은 독일어 로케일로 Pivot를 초기화합니다:

~~~jsx
new pivot.Pivot("#root", {
    // other properties
    locale: pivot.locales.de,
});
~~~

커스텀 로케일을 적용하려면:

- 로케일 객체를 생성하거나(또는 내장 로케일을 수정하여) 모든 텍스트 레이블에 대한 번역을 제공합니다(어떤 언어든 가능)
- [`locale`](api/config/locale-property.md) 속성 또는 [`setLocale`](api/methods/setlocale-method.md) 메서드를 통해 Pivot에 로케일을 적용합니다

다음 코드 스니펫은 Pivot를 생성한 후 `setLocale`을 사용하여 런타임에 커스텀 한국어 로케일을 적용합니다:

~~~jsx
// Pivot 생성
const widget = new pivot.Pivot("#root", {
    data,
    // other configuration properties
});

const ko = { /* object with locale */ };
widget.setLocale(ko);
~~~

:::tip
인수 없이(또는 `null`을 인수로) [`setLocale`](api/methods/setlocale-method.md)을 호출하면 Pivot가 기본 영어 로케일로 초기화됩니다.
:::

## 날짜 형식 지정 {#date-formatting}

Pivot는 날짜를 `Date` 객체로 받습니다. 데이터를 Pivot에 전달하기 전에 문자열 값을 `Date`로 파싱하십시오. 기본 `dateFormat`은 현재 로케일에서 가져온 `"%d.%m.%Y"`입니다.

모든 날짜 필드의 형식을 변경하려면 [`locale`](api/config/locale-property.md) 속성의 `formats` 객체에서 `dateFormat`에 새 값을 설정하십시오.

다음 코드 스니펫은 문자열 날짜를 `Date` 객체로 파싱한 후, 커스텀 `dateFormat`으로 Pivot를 초기화하고 `setConfig`를 통해 런타임에 형식을 업데이트합니다:

~~~jsx {17}
function setFormat(value) {
    table.setConfig({ locale: { formats: { dateFormat: value } } });
}

// 날짜 문자열을 Date 객체로 변환
const dateFields = fields.filter((f) => f.type == "date");
if (dateFields.length) {
    dataset.forEach((item) => {
        dateFields.forEach((f) => {
            const v = item[f.id];
            if (typeof v == "string") item[f.id] = new Date(v);
        });
    });
}

const table = new pivot.Pivot("#root", {
    locale: { formats: { dateFormat: "%d %M %Y %H:%i" } },
    fields,
    data: dataset,
    config: {
        rows: ["state"],
        columns: ["product_line", "product_type"],
        values: [
            {
                field: "date",
                method: "min"
            },
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            }
        ]
    }
});
~~~

특정 필드에 커스텀 형식을 설정하려면 [`fields`](api/config/fields-property.md) 속성의 `format` 파라미터를 사용하십시오. [필드에 형식 적용](guides/working-with-data.md#applying-formats-to-fields)을 참조하십시오.

## 날짜 및 시간 형식 문자 {#date-and-time-format-characters}

Pivot는 날짜 및 시간 형식을 정의하기 위해 다음 문자들을 사용합니다:

| 문자      | 정의                                              | 예시                    |
| :-------- | :------------------------------------------------ |:------------------------|
| %d        | 앞에 0이 붙는 숫자로 표시된 일                    | 01부터 31까지           |
| %j        | 숫자로 표시된 일                                  | 1부터 31까지            |
| %D        | 요일의 약어(단축 이름)                            | Su Mo Tu Sat            |
| %l        | 요일의 전체 이름                                  | Sunday Monday Tuesday   |
| %W        | 앞에 0이 붙는 숫자로 표시된 주(월요일을 첫째 날로 사용) | 01부터 52/53까지        |
| %m        | 앞에 0이 붙는 숫자로 표시된 월                    | 01부터 12까지           |
| %n        | 숫자로 표시된 월                                  | 1부터 12까지            |
| %M        | 월의 약어(단축 이름)                              | Jan Feb Mar             |
| %F        | 월의 전체 이름                                    | January February March  |
| %y        | 2자리 숫자로 표시된 연도                          | 24                      |
| %Y        | 4자리 숫자로 표시된 연도                          | 2024                    |
| %h        | 앞에 0이 붙는 12시간 형식의 시                    | 01부터 12까지           |
| %g        | 12시간 형식의 시                                  | 1부터 12까지            |
| %H        | 앞에 0이 붙는 24시간 형식의 시                    | 00부터 23까지           |
| %G        | 24시간 형식의 시                                  | 0부터 23까지            |
| %i        | 앞에 0이 붙는 분                                  | 01부터 59까지           |
| %s        | 앞에 0이 붙는 초                                  | 01부터 59까지           |
| %S        | 밀리초                                            | 128                     |
| %a        | am 또는 pm                                        | am(자정부터 정오까지) 및 pm(정오부터 자정까지)|
| %A        | AM 또는 PM                                        | AM(자정부터 정오까지) 및 PM(정오부터 자정까지)|
| %c        | ISO 8601 날짜 형식으로 날짜와 시간 표시           | 2024-10-04T05:04:09     |

2024년 9월 20일 16:47:08.128을 *2024-09-20 16:47:08.128*로 표시하려면 `"%Y-%m-%d %H:%i:%s.%S"` 형식을 사용하십시오.

## 숫자 형식 지정 {#number-formatting}

Pivot는 현재 로케일의 `lang` 값을 기반으로 모든 `number` 필드를 로컬라이즈합니다. 위젯은 [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 사양을 사용합니다. 기본 설정은 소수 자릿수를 3자리로 제한하고 정수 부분에 그룹 구분자를 적용합니다.

특정 숫자 필드의 형식 지정을 건너뛰거나 커스텀 형식을 설정하려면 [`fields`](api/config/fields-property.md) 속성의 `format` 파라미터를 사용하십시오. `format`을 `false`로 설정하면 형식 지정이 비활성화되고, 형식 설정이 담긴 객체로 설정할 수도 있습니다([필드에 형식 적용](guides/working-with-data.md#applying-formats-to-fields) 참조).

다음 코드 스니펫은 `year` 필드의 숫자 형식 지정을 비활성화합니다:

~~~jsx
const fields = [
     { id: "year", label: "Year", type: "number", format: false },
];
~~~

## 예제 {#example}

아래 스니펫은 여러 로케일 간 전환을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/aj5zmxpv?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 
