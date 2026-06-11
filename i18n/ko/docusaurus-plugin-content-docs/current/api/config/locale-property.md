---
sidebar_label: locale
title: locale 설정
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 locale 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 실행해 보세요. 또한 DHTMLX Pivot 30일 무료 평가판을 다운로드할 수 있습니다.
---

# locale

### 설명 {#description}

@short: 선택 사항. Pivot의 사용자 정의 로케일 객체

### 사용법 {#usage}

~~~jsx
locale?: object;
~~~

### 기본 설정 {#default-config}

기본적으로 Pivot은 [영어](guides/localization.md#default-locale) 로케일을 사용합니다. 사용자 정의 로케일로 변경할 수도 있습니다.

:::tip
현재 로케일을 동적으로 변경하려면 Pivot의 [`setLocale()`](api/methods/setlocale-method.md) 메서드를 사용할 수 있습니다.
:::

### 예제 {#example}

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

    locale: pivot.locales.cn, // 처음에 "cn" 로케일이 설정됩니다
    // 기타 매개변수
});
~~~
