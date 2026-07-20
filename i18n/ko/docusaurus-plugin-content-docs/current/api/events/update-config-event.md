---
sidebar_label: update-config
title: update-config 이벤트
description: DHTMLX JavaScript Pivot 라이브러리의 update-config 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 30일 무료 평가판을 다운로드할 수도 있습니다.
---

# update-config

### 설명 {#description}

@short: Pivot UI를 통해 행, 열 또는 집계 함수를 수정할 때 발생합니다

이 액션은 사용자의 집계 구성을 저장하는 데 유용하며, 다음에 위젯을 사용할 때 해당 구성을 적용하여 사용자가 이전 작업을 이어서 진행할 수 있도록 합니다.

### 사용법 {#usage}

~~~jsx
"update-config": ({
    rows: string[],
    columns: string[],
    values: [],
    filters: {}
}) => boolean | void;
~~~

### 매개변수 {#parameters}

이 액션의 콜백은 처리된 [`config`](api/config/config-property.md) 매개변수를 포함하는 객체를 받습니다:

- `rows` - Pivot 테이블의 행. 필드 ID와 데이터 추출 메서드를 포함하는 객체이며, 객체의 매개변수는 다음과 같습니다:
  - `field` - 필드의 ID
  - `method` - 데이터 추출 메서드 (시간 기반 데이터 필드에 사용)
- `columns` - Pivot 테이블의 열을 정의합니다. 필드 ID와 데이터 추출 메서드를 포함하는 객체이며, 객체의 매개변수는 다음과 같습니다:
  - `field` - 필드의 ID
  - `method` - 데이터 추출 메서드를 정의합니다 (시간 기반 데이터 필드에 사용).
  기본적으로 시간 기반 필드(**date** 타입)에 대해 "year", "quarter", "month", "week", "day", "hour", "minute" 값을 가진 메서드를 사용할 수 있습니다
- `values` - Pivot 테이블 셀의 데이터 집계를 정의합니다. 필드 ID와 데이터 집계 메서드를 포함하는 객체이며, 객체의 매개변수는 다음과 같습니다:
  - `field` - 필드의 ID
  - `method` - 데이터 추출 메서드를 정의합니다. 메서드와 가능한 옵션에 대해서는 [메서드 적용](guides/working-with-data.md#default-methods)을 참조하세요
- `filters` - (선택 사항) 테이블에서 데이터가 필터링되는 방식을 정의합니다. 필드 ID와 데이터 집계 메서드를 포함하는 객체입니다. `filter` 객체에 대한 설명은 [`config`](api/config/config-property.md)를 참조하세요

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다
:::

### 반환값 {#returns}

콜백은 boolean 또는 void를 반환할 수 있습니다.  
이벤트 핸들러 함수가 *false*를 반환하면, 이벤트를 트리거한 작업이 차단되고 `update-config` 작업이 중단됩니다.

### 예제 {#example}

~~~jsx {19-22}
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
//config 객체를 콘솔에 출력합니다
table.api.on("update-config", (config) => {
    console.log("Config has changed", config);
});
~~~

**관련 문서**: [api.intercept()](api/internal/intercept-method.md)
