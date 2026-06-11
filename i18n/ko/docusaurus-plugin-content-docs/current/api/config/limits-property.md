---
sidebar_label: limits
title: limits Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 limits config에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 사용해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드하실 수 있습니다.
---

# limits

### 설명 {#description}

@short: 선택 사항입니다. 최종 데이터셋의 행과 열 수에 대한 최대 제한을 정의합니다.

[데이터 제한](guides/working-with-data.md#limiting-loaded-data)도 함께 참고하시기 바랍니다.

### 사용법 {#usage}

~~~jsx
limits?: {
    rows?: number,
    columns?: number,
    raws?: number
};
~~~

### 파라미터 {#parameters}

각 파라미터는 데이터 렌더링을 중단할 시점을 정의합니다:

- `rows` - (선택 사항) 최종 데이터셋의 최대 행 수를 설정합니다. 기본값은 10000입니다.
- `columns` - (선택 사항) 최종 데이터셋의 최대 열 수를 설정합니다. 기본값은 5000입니다.
- `raws` - (선택 사항) 데이터 그룹화 전 소스 데이터의 최대 행 수입니다(집계에 사용되는 원시 데이터 레코드). 기본값은 무한대입니다.

:::note
Limits는 대용량 데이터셋에 사용됩니다. Limits 값은 근사치이며 행과 열의 정확한 값을 나타내지 않습니다.
:::

## 예제 {#example}

~~~jsx {18}
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
            },
        ],
    },
    limits:{ rows: 25, columns: 4 }
});
~~~

**관련 샘플**: [Pivot 2. 데이터 제한](https://snippet.dhtmlx.com/7ryns8oe)
