---
sidebar_label: tableShape
title: tableShape Config
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 tableShape config에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 실행해 보세요. DHTMLX Pivot 30일 무료 평가판을 다운로드할 수도 있습니다.
---

# tableShape

### 설명 {#description}

@short: 선택 사항. Pivot 테이블의 외관을 구성합니다

### 사용법 {#usage}

~~~jsx
tableShape?: {
    templates?: {
        [field: string]: (
            value: any,
            operation: string
        ) => any;
    },
	totalRow?: boolean | "sumOnly",
	totalColumn?: boolean | "sumOnly",
    marks?: {
        [cssClass: string]: ((v: any, columnData: any, rowData: any) => boolean)
        | "max" 
        | "min"
    },
    sizes?: {
        rowHeight?: number,
        headerHeight?: number,
        columnWidth?: number,
        footerHeight?: number
    },
    tree?:boolean,
    cleanRows?: boolean,
    split?: {
        left?: boolean,
        right?: boolean,
    },
    cellStyle?: (
        field: string, 
        value: any, 
        area: "rows"|"columns"|"values", 
        method?: string,
        isTotal?: "row"|"column"|"both") 
        => string,
};
~~~

### 매개변수 {#parameters}

- `templates` - (선택 사항) 셀에 템플릿을 설정할 수 있습니다. 다음과 같은 구조의 객체입니다:
  - 각 키는 필드 id입니다
  - 값은 셀 값과 연산을 인수로 받아 문자열을 반환하는 함수입니다. 지정된 필드를 기반으로 하는 모든 열에 해당 템플릿이 적용됩니다. 예를 들어 측정 단위를 설정하거나 숫자 값의 소수점 이하 자릿수를 지정하는 데 사용할 수 있습니다. 아래 예제를 참고하세요.
- `marks` - (선택 사항) 셀에 필요한 값을 표시할 수 있습니다. 키는 CSS 클래스 이름이고, 값은 함수 또는 미리 정의된 문자열("max", "min") 중 하나인 객체입니다. 함수는 검사된 값에 대해 boolean을 반환해야 합니다. **true**가 반환되면 해당 CSS 클래스가 셀에 적용됩니다. 예제를 포함한 자세한 내용은 [셀 스타일](guides/stylization.md#cell-style)을 참고하세요.
- `sizes` - (선택 사항) 테이블의 다음 크기 매개변수를 정의합니다:
  - `rowHeight` - (선택 사항) Pivot 테이블의 행 높이(픽셀). 기본값은 34입니다
  - `headerHeight` - (선택 사항) 헤더 높이(픽셀). 기본값은 30입니다
  - `footerHeight` - (선택 사항) 푸터 높이(픽셀). 기본값은 30입니다
  - `columnWidth` - (선택 사항) 열 너비(픽셀). 기본값은 150입니다
- `cellStyle` - (선택 사항) 셀에 사용자 정의 스타일을 적용하는 함수입니다. 함수의 매개변수는 다음과 같습니다:
    - `field` - (필수) 스타일이 적용될 필드 이름을 나타내는 문자열
    - `value` - (필수) 셀의 값 (해당 행과 열의 실제 데이터)
    - `area` - (필수) 셀이 속한 테이블 영역을 나타내는 문자열("rows", "columns" 또는 "values" 영역)
    - `method` - (선택 사항) 셀에 수행되는 연산을 나타내는 문자열 (예: "sum", "count" 등)
    - `isTotal` - (선택 사항) 셀이 합계 행, 합계 열 또는 둘 다에 속하는지 정의합니다: "row"|"column"|"both"
    `cellStyle` 함수는 셀에 특정 스타일을 적용하는 CSS 클래스 이름으로 사용할 수 있는 문자열을 반환합니다.
- `tree` - (선택 사항) **true**로 설정하면 데이터를 확장 가능한 행으로 표시하는 트리 모드를 활성화합니다. 기본값은 **false**입니다. 예제를 포함한 자세한 내용은 [트리 모드로 전환](guides/configuration.md#enabling-the-tree-mode)을 참고하세요
- `totalColumn` - (선택 사항) **true**이면 행의 합계 값이 포함된 합계 열을 생성합니다(기본값은 **false**). "sumOnly"로 설정하면 합계 값 열만 생성됩니다(sum 연산에서만 사용 가능합니다)
- `totalRow` - (선택 사항) **true**이면 합계 값이 포함된 푸터를 생성합니다(기본값은 **false**). "sumOnly"로 설정하면 합계 행 값만 포함된 행이 생성됩니다(sum 연산에서만 사용 가능합니다)
- `cleanRows` - (선택 사항) **true**로 설정하면 테이블 뷰에서 스케일 열의 중복 값이 숨겨집니다. 기본값은 **false**입니다
- `split` - (선택 사항) 지정된 매개변수에 따라 오른쪽 또는 왼쪽 열을 고정할 수 있습니다([열 고정](guides/configuration.md#freezing-columns) 참고):
    - `left` (boolean) - **true**(**false**가 기본값)로 설정하면 왼쪽 열이 고정되어 스크롤 중에도 열이 정적으로 표시됩니다. 분할되는 열의 수는 [`config`](api/config/config-property.md) 속성에 정의된 행 필드의 수와 동일합니다
    - `right` (boolean) - 오른쪽에 합계 열을 고정합니다. 기본값은 **false**입니다

기본적으로 `tableShape`는 undefined이며, 합계 행과 합계 열이 없고, 템플릿과 marks가 적용되지 않으며, 데이터는 트리가 아닌 테이블로 표시되고, 스크롤 중 열이 고정되지 않음을 의미합니다.

## 예제 {#example}

아래 예제에서는 *state* 셀에 템플릿을 적용하여 주의 전체 이름과 약어를 결합한 이름을 표시합니다.

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
// other values,
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // "state" 셀 값을 커스터마이즈하는 템플릿 설정
            state: v => v+ ` (${states[v]})`,
        }
    },
    fields,
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // other values
        ],
    },
    fields,
});
~~~

**관련 샘플:**

- [Pivot 2. 트리 모드](https://snippet.dhtmlx.com/6ylkoukn)
- [Pivot 2. 고정 열](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. 행, 헤더, 푸터 높이 및 모든 열 너비 설정](https://snippet.dhtmlx.com/x46uyfy9)
- [Pivot 2. 행 정리](https://snippet.dhtmlx.com/rwwhgv2w?tag=pivot)
- [Pivot 2. 테이블 및 헤더 셀에 사용자 정의 CSS 추가](https://snippet.dhtmlx.com/nfdcs4i2)

**관련 문서**: 
- [구성](guides/configuration.md)
- [셀 스타일](guides/stylization.md#cell-style)
