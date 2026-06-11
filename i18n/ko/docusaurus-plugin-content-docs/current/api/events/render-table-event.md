---
sidebar_label: render-table
title: render-table 이벤트
description: DHTMLX JavaScript Pivot 라이브러리의 문서에서 render-table 이벤트에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Pivot의 무료 30일 평가판을 다운로드하세요.
---

# render-table

### 설명 {#description}

@short: 위젯 구성이 처리된 후, 테이블이 렌더링되기 직전에 발생합니다

이 이벤트를 사용하면 최종 테이블 구성을 즉석에서 변경하거나 테이블 렌더링을 완전히 차단할 수 있습니다.

### 사용법 {#usage}

~~~jsx
"render-table": ({
    config: {
        columns?: any[],
        data?: any[],
        footer?: boolean,
        sizes?: {
            rowHeight?: number,
            headerHeight?: number,
            columnWidth?: number,
            footerHeight?: number
        },
        split?: {
            left?: number;
            right?: number;
        },
        tree?: boolean,
        cellStyle?: (row: any, col: any) => string,
    }
}) => boolean | void;
~~~

### 매개변수 {#parameters}

액션의 callback은 다음 매개변수를 가진 `config` 객체를 받습니다:

- `columns` - (선택) 각 객체에 대해 다음 매개변수를 포함하는 열 배열:
    - `id` (number) - (필수) 열의 id
    - `cell` (any) - (선택) 셀 내용이 담긴 템플릿 ([template 헬퍼를 통한 템플릿 추가](guides/configuration.md#adding-a-template-via-the-template-helper) 참조)
    - `template` - (선택) [`tableShape`](api/config/tableshape-property.md) 속성을 통해 정의된 템플릿
    - `fields` (array) - (선택) 트리 모드의 계층형 열에서 필드를 정의합니다. 각 레벨에서 이 열에 표시되는 필드를 반영합니다
     - `field` - (선택) 필드의 id인 문자열
    - `method` (string) - (선택) 이 열의 필드에 대해 정의된 메서드
    - `methods` (array) - (선택) 트리 모드의 계층형 열에서 필드에 적용되는 메서드를 정의합니다
    - `format` (string or object) - (필수) 날짜 형식 또는 숫자 형식 ([필드에 형식 적용](guides/working-with-data.md#applying-formats-to-fields) 참조)
    - `isNumeric` (boolean) - (선택) 열에 숫자 값이 포함되어 있는지 여부를 정의합니다
    - `isTotal` (boolean) - (선택) 합계 열인지 여부를 정의합니다
    - `area` (string) - (선택) 열이 렌더링되는 영역: "rows", "columns", "values"
    - `header` - (선택) 각 셀에 대해 다음 속성을 포함하는 헤더 셀 배열:
        - `text` (string) - (선택) 셀 텍스트, 또는 형식화된 값, 또는 predicate 템플릿으로 처리된 값
        - `rowspan` (number) - (선택) 헤더가 차지할 행 수
        - `colspan` (number) - (선택) 헤더가 차지할 열 수
        - `value` (any) - (필수) 셀이 "columns" 영역에 속하는 경우 원시 값
        - `field` (string) - (필수) 셀이 "columns" 영역에 속하는 경우 값이 표시되는 필드
        - `method` (string) - (필수) 셀이 "columns" 영역에 속하고 predicate가 정의된 경우 필드 predicate
        - `format` (string or object) - 날짜 형식 또는 숫자 형식 ([필드에 형식 적용](guides/working-with-data.md#applying-formats-to-fields) 참조)
  - `footer` - (선택) 헤더 레이블 또는 헤더 설정과 동일한 footer 설정을 포함하는 객체
 - `data` - (선택) 테이블 데이터를 포함하는 객체 배열; 각 객체는 하나의 행을 나타냅니다:
    - `id` (number) - (필수) 행 id
    - `values` (array) - (필수) 행 데이터를 포함하는 배열
    - `open` (boolean) - (선택) 브랜치 상태
    - `$level` (boolean) - (선택) 브랜치 인덱스
- `footer` - (선택) **true**로 설정하면 테이블 하단에 footer가 표시됩니다; 기본값은 **false**이며 보이지 않습니다
- `sizes` - (선택) 테이블 크기 설정을 포함하는 객체 (columnWidth, footerHeight, headerHeight, rowHeight)
- `split` (object) - (선택) 다음 속성을 포함하는 객체:
    - `left` (number) - 왼쪽에서 고정할 열 수
    - `right` (number) - 오른쪽에서 고정할 열 수
- `tree` - (선택) 트리 모드 활성화 여부를 정의합니다 (활성화된 경우 **true**)
- `cellStyle` - (선택) 셀에 커스텀 스타일을 적용하는 함수입니다. 행과 열 객체를 받아 CSS 클래스 이름 문자열을 반환합니다: `(row, col) => string`

:::info
내부 이벤트를 처리하려면 [Event Bus 메서드](api/overview/internal-eventbus-overview.md)를 사용할 수 있습니다
:::

### 반환값 {#returns}

callback은 boolean 또는 void를 반환할 수 있습니다.  
이벤트 핸들러가 **false**를 반환하면 해당 작업이 차단됩니다. 이 경우 테이블 렌더링이 방지됩니다.

### 예제 {#example}

다음 예제는 [`config`](api/config/config-property.md) 객체를 콘솔에 출력하고 footer를 추가하는 방법을 보여줍니다.

~~~jsx {20-28}
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

table.api.intercept("render-table", (ev) => {
    console.log(ev.config); //config 객체 출력
    console.log(ev.config.columns); //columns 배열 출력

    ev.config.footer = true;
    ev.config.columns[0].footer = ["Custom footer"];

    // 여기서 "false"를 반환하면 테이블 렌더링이 방지됩니다
});
~~~

다음 예제는 버튼 클릭으로 모든 행을 펼치거나 접는 방법을 보여줍니다. 트리 모드는 [`tableShape`](api/config/tableshape-property.md) 속성을 통해 활성화해야 합니다.

~~~jsx
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true,
    },
    fields,
    data: dataset,
    config: {
        rows: ["type", "studio"],
        columns: [],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            },
            {
                field: "episodes",
                method: "count"
            }
        ]
    }
});

const api = table.api;
const tableApi = api.getTable();

//  테이블 구성 업데이트 시 모든 테이블 브랜치를 닫힌 상태로 설정
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // 여기서 "false"를 반환하면 테이블 렌더링이 방지됩니다
    // return false;
});

function openAll() {
    tableApi.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
    tableApi.exec("close-row", { id: 0, nested: true });
}
~~~

`render-table` 이벤트를 사용하여 열 고정 기능을 구성하는 방법도 참조하세요: [열 고정](guides/configuration.md#freezing-columns).

**관련 글:** [pivot.template 헬퍼](api/helpers/template.md)

**관련 샘플:** [Pivot 2. 커스텀 고정(고정) 열 (사용자 지정 수)](https://snippet.dhtmlx.com/53erlmgp)
