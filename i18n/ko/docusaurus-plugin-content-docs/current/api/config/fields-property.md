---
sidebar_label: fields
title: fields Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 fields 설정에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# fields

### 설명 {#description}

@short: 선택 사항. Pivot 테이블의 필드를 정의하는 객체 배열

`fields` 속성은 구성 객체에서 위젯이 수신하는 데이터 필드의 타입을 해석하는 방법을 제어하고, 필드의 정렬 순서를 정의할 수 있게 합니다.

### 사용법 {#usage}

~~~jsx
fields?: [{
    id: string,
    label?: string,
    type: "number" | "date" | "text",
    sort?: "asc" | "desc" | ((a: any, b: any) => number),
    format?: string | boolean | numberFormatOptions{}
}];
~~~

### 매개변수 {#parameters}

기본적으로 이 속성이 설정되지 않은 경우, 위젯은 수신된 데이터를 자동으로 분석하고 그에 따라 `fields` 객체를 채웁니다.

`fields` 배열의 각 객체에는 다음 속성이 있어야 합니다:

- `id` - (필수) 필드의 ID
- `label` - (선택 사항) GUI에 표시될 필드 레이블
- `type` - (필수) 필드의 데이터 타입 ("number", "date", 또는 "text")
- `sort` - (선택 사항) 필드의 기본 정렬 순서를 정의합니다. "asc", "desc" 또는 사용자 정의 정렬 함수를 허용합니다
- `format` - (선택 사항) 필드에서 숫자와 날짜의 형식을 사용자 정의할 수 있습니다; 형식은 [내보내기](guides/exporting-data.md) 중에도 적용됩니다
    - `string` - (선택 사항) 날짜 형식 (기본적으로 Pivot은 로케일의 `dateFormat`을 사용합니다)
    - `boolean` - (선택 사항) **false**로 설정하면 숫자가 형식 없이 그대로 표시됩니다
    - `numberFormatOptions` - (선택 사항) 숫자 필드 형식 지정을 위한 옵션 객체; 기본적으로 숫자는 최대 3자리 소수 자릿수로 표시되고 정수 부분에 그룹 구분이 적용됩니다.
        - `minimumIntegerDigits`(number) - (선택 사항) 최소 정수 자릿수 (예: 값이 2로 설정되면 숫자 1이 "01"로 표시됨); 기본값은 1;
        - `minimumFractionDigits`(number) - (선택 사항) 사용할 최소 소수 자릿수 (예: 값이 2로 설정되면 숫자 10.5가 "10.50"으로 표시됨); 기본값은 0;
        - `maximumFractionDigits`(number) - (선택 사항) 사용할 최대 소수 자릿수 (예: 값이 2로 설정되면 숫자 10.3333...이 "10.33"으로 표시됨); 기본값은 3;  
        자릿수 옵션에 대한 자세한 내용은 [자릿수 옵션](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumintegerdigits)을 참조하세요
        - `prefix` (string) - (선택 사항) 통화 기호 등의 추가 기호를 위해 숫자 앞에 붙는 문자열
        - `suffix` (string) - (선택 사항) 통화 기호 등의 추가 기호를 위해 숫자 뒤에 붙는 문자열

:::info
[`tableShape`](api/config/tableshape-property.md) 속성을 통해 템플릿이 적용되면 `format` 설정이 재정의됩니다.
:::

### 예제 {#example}

~~~jsx {2-34}
const table = new pivot.Pivot("#root", {
    fields: [
        {
            id: "rank",
            label: "Rank",
            type: "number"
        },
        {
            id: "title",
            label: "Title",
            type: "text"
        },
        {
            id: "genre",
            label: "Genre",
            type: "text"
        },
        {
            id: "studio",
            label: "Studio",
            type: "text"
        },
        {
            id: "type",
            label: "Type",
            type: "text"
        },
        {
            id: "score",
            label: "Score",
            type: "number"
        },
        //다른 필드들
    ],
    data,
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
~~~

**관련 문서**: 

- [숫자 형식 지정](guides/localization.md#number-formatting)
- [필드에 형식 적용하기](guides/working-with-data.md#applying-formats-to-fields)

**관련 샘플**:  [Pivot 2. 필드 형식 정의하기](https://snippet.dhtmlx.com/77nc4j8v)
