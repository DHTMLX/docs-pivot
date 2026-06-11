---
sidebar_label: columnShape
title: columnShape Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 columnShape config에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Pivot 30일 무료 평가판을 다운로드하세요.
---

# columnShape

### 설명 {#description}

@short: 선택 사항. Pivot 열의 외관과 동작을 구성합니다

### 사용법 {#usage}

~~~jsx  
columnShape?: {
    sort?: boolean,
    width?: {
        [field: string]: number
    },
    autoWidth?: {
        columns: {
            [field: string]: boolean
        },
        auto?: boolean | "header" | "data",
        maxRows?: number,
        firstOnly?: boolean
    }
};
~~~

### 매개변수 {#parameters}

- `sort` - (선택 사항) **true**(기본값)이면 열 헤더 클릭 시 UI에서 정렬이 활성화됩니다. **false**이면 정렬이 비활성화됩니다
- `width` - (선택 사항) 열의 너비를 정의합니다. 각 키가 필드 id이고 값이 픽셀 단위의 열 너비인 객체입니다
- `autoWidth` - (선택 사항) 열 너비를 자동으로 계산하는 방법을 정의하는 객체입니다. 기본 구성은 20개의 행을 사용하며, 헤더와 데이터를 기반으로 너비를 계산하고 각 필드는 한 번만 분석됩니다. 객체의 매개변수는 다음과 같습니다:
    - `columns` - (필수) 각 키가 필드 id이고 boolean 값이 해당 열 너비를 자동으로 계산할지 여부를 정의하는 객체입니다
    - `auto` - (선택 사항) **header**로 설정하면 헤더 텍스트에 맞게 너비를 조정하고, **data**로 설정하면 콘텐츠가 가장 넓은 셀에 맞게 너비를 조정하며, **true**로 설정하면 헤더와 셀의 콘텐츠 모두에 맞게 너비를 조정합니다.
    autowidth가 **false**로 설정된 경우, `width` 값이 설정되거나 [`tableShape`](api/config/tableshape-property.md) 속성의 `columnWidth` 값이 적용됩니다.
    - `maxRows` - (선택 사항) autoWidth 계산 시 처리할 행의 수입니다
    - `firstOnly` - (선택 사항) **true**(기본값)로 설정하면 동일한 데이터의 각 필드는 열 너비 계산을 위해 한 번만 분석됩니다. 동일한 데이터를 기반으로 여러 열이 있는 경우(예: *count* 연산의 *oil* 필드와 *sum* 연산의 *oil* 필드), 첫 번째 열의 데이터만 분석되고 나머지는 해당 너비를 상속합니다

## 예제 {#example}

~~~jsx {18-31}
const table = new pivot.Pivot("#root", {
    fields,
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
    },
    columnShape: {
        autoWidth: {
            // 이 필드들의 열 너비를 계산합니다
            columns: {
                studio: true,
                genre: true,
                title: true,
                score: true
            },
            auto: true,
            // 모든 필드를 분석합니다
            firstOnly: false
        }
    }
});
~~~

**관련 샘플:**
- [Pivot 2. 자동 너비 - 콘텐츠에 맞게 열 크기 조정](https://snippet.dhtmlx.com/tn1yw14m)
- [Pivot 2. 열 너비 설정](https://snippet.dhtmlx.com/ceu34kkn)
