---
sidebar_label: setLocale()
title: setLocale()
description: DHTMLX JavaScript Pivot 라이브러리의 공식 문서에서 setLocale() 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 확인하거나 DHTMLX Pivot 무료 30일 평가판을 다운로드하세요.
---

# setLocale()

### 설명 {#description}

@short: Pivot에 새 로케일을 적용합니다

### 사용법 {#usage}

~~~jsx
setLocale(null | locale?: object): void;
~~~

### 매개변수 {#parameters}

- `null` - (선택 사항) 기본 로케일(영어)로 초기화합니다
- `locale` - (선택 사항) 적용할 새 로케일의 데이터 객체

### 예제 {#example}

~~~jsx 
// Pivot 생성
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

// Pivot에 "de" 로케일 적용
table.setLocale(pivot.locales.de);

// Pivot에 기본 로케일 적용
table.setLocale(); // 또는 setLocale(null);
~~~

**관련 문서**:
- [로컬라이제이션](guides/localization.md)
- [`locale`](api/config/locale-property.md)
