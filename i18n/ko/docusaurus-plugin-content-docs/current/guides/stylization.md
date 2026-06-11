---
sidebar_label: 스타일링
title: 스타일링
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 스타일링에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 무료 30일 평가판도 다운로드할 수 있습니다.
---

# 스타일링 {#styling}

Pivot은 기본 테마를 제공하며, 사용자 정의를 위한 CSS 변수와 유틸리티 클래스를 노출합니다. 위젯 컨테이너(또는 상위 요소)에서 변수를 재정의하여 색상, 테두리 및 기타 시각적 속성을 변경할 수 있습니다.

## 기본 스타일 {#default-style}

Pivot의 기본 테마는 **Material**입니다. 다음 CSS 코드는 Material 테마가 위젯 컨테이너에 설정하는 변수를 보여줍니다:

~~~css
.wx-material-theme {
    --wx-theme-name: material;
    --wx-pivot-primary-hover: #194e9e;
    --wx-pivot-border-color: var(--wx-color-font-disabled);
    --wx-pivot-field-hover: linear-gradient(
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.1) 100%
    );
}
~~~

:::tip 참고
Pivot의 향후 버전에서는 CSS 변수 이름이 변경될 수 있습니다. 업그레이드 후 변수 이름을 확인하고, 표시 문제가 발생하지 않도록 코드에서 업데이트하십시오.
:::

## 내장 테마 {#built-in-theme}

Pivot은 하나의 내장 테마인 **Material**을 제공합니다. 위젯 컨테이너에 테마 클래스를 추가하거나, 페이지에 미리 빌드된 스킨 스타일시트를 포함하여 테마를 적용할 수 있습니다.

다음 코드는 위젯 컨테이너에 `wx-material-theme` 클래스를 추가하여 Material 테마를 적용합니다:

~~~html {}
<!-- Pivot 컨테이너 -->
<div id="root" class="wx-material-theme"></div>
~~~

다음 코드는 Material 스킨 스타일시트를 직접 포함합니다:

~~~html {}
<link type="stylesheet" href="path/to/pivot/skins/material.css"/>
~~~

## 내장 테마 사용자 정의 {#customize-built-in-theme}

`.wx-material-theme` 선택자에서 Material 테마 변수를 재정의하여 색상, 테두리 및 기타 시각적 속성을 변경할 수 있습니다.

아래 예제는 Material 테마 변수를 재정의하여 Pivot을 어두운 색상 구성표로 렌더링합니다:

~~~html
<!-- 사용자 정의 스타일 -->
<style>
    .wx-material-theme {
        color-scheme: dark;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-table-header-background: #2ca0e3;
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-icon-color-hover: rgba(255, 255, 255, 0.2);
        --wx-pivot-background: #444;
        --wx-background: #444;
        --wx-background-alt: #666;
        --wx-pivot-content-background: #666;
        --wx-border: 1px solid #818080;
        --wx-border-medium: 1px solid #818080;
        --wx-input-background: #9e9e9e;
        --wx-color-font-disabled: #878585;
    }
</style>
~~~

## 사용자 정의 스타일 {#custom-style}

위젯 컨테이너에 적용된 사용자 정의 클래스에서 CSS 변수를 재정의하여 Pivot의 외관을 변경할 수 있습니다.

아래 예제는 `.demo` 클래스를 통해 Pivot에 사용자 정의 스타일을 적용합니다:

~~~html
<div id="pivot" class="demo"></div>
<style>
    .demo {
        --wx-background: #444;
        --wx-color-font: rgba(255, 255, 255, 0.9);
        --wx-color-secondary-font: rgba(255, 255, 255, 0.5);
        --wx-icon-color: rgba(255, 255, 255, 0.7);
        --wx-pivot-primary-hover: #194e9e;
        --wx-pivot-border-color: 1px solid #818080;
        --wx-table-header-background: #2ca0e3;
    }
</style>
~~~

## 스크롤 스타일 {#scroll-style}

`.wx-styled-scroll` CSS 클래스를 사용하여 Pivot 스크롤 바에 사용자 정의 스타일을 적용하십시오. 사용 전에 브라우저 호환성을 확인하십시오: [caniuse: CSS Scrollbar](https://caniuse.com/css-scrollbar).

다음 코드는 위젯 컨테이너에 스타일이 적용된 스크롤 바를 활성화합니다:

~~~html {} title="index.html"
<!-- Pivot 컨테이너 -->
<div id="root" class="wx-styled-scroll"></div> 
~~~

## 셀 스타일 {#cell-style}

본문 또는 푸터 셀에 스타일을 적용하려면 [`tableShape`](api/config/tableshape-property.md) 속성의 `cellStyle` 파라미터를 사용하십시오. 헤더 셀에 스타일을 적용하려면 [`headerShape`](api/config/headershape-property.md) 속성의 `cellStyle` 파라미터를 사용하십시오. 두 경우 모두 `cellStyle` 함수는 Pivot이 셀에 적용할 CSS 클래스 이름을 반환합니다.

아래 예제는 본문 셀과 헤더 셀에 스타일을 적용합니다:

- 본문 셀은 셀 값(예: `status` 필드의 `"Down"`, `"Up"`, `"Idle"`)과 합계 값(40보다 크거나 5보다 작은 경우)에 따라 클래스를 받습니다.
- 헤더 셀은 `streaming` 필드의 값에 따라 클래스를 받습니다 — `"no"`이면 `status-down`, 다른 값이면 `status-up`

~~~jsx
const widget = new pivot.Pivot("#pivot", {
    tableShape: {
        totalColumn: true,
        totalRow:true,
        cellStyle: (field, value, area, method, isTotal) => {
            if (field === "status" && area === "rows" && value) {
                if (value === "Down") {
                    return "status-down";
                } else if (value === "Up") {
                    return "status-up";
                } else if (value === "Idle") {
                    return "status-idle";
                }
            }
            if(isTotal ==="column" && area == "values"){
                if(value > 40)
                    return "status-up";
                else if (value < 5)
                    return "status-down";
            }
        }
    },
    headerShape:{
        cellStyle:(field, value, area, method, isTotal) => {
            if(field == "streaming")
                return value ==="no"?"status-down":"status-up";
        }
    },
    fields,
    data: dataset,
    config: {
        rows: [
            "protocol",
            "status",
        ],
        columns: [
            "streaming"
        ],
        values: [
            {
                field: "id",
                method: "count"
            }
        ]
    }
});
~~~

## 셀의 값 표시 {#mark-values-in-cells}

[`tableShape`](api/config/tableshape-property.md) 속성의 `marks` 파라미터를 사용하여 조건을 충족하는 셀에 CSS 클래스를 적용하십시오. `marks`의 각 항목은 CSS 클래스 이름(키)과 규칙(값)을 쌍으로 연결합니다.

규칙은 사전 정의된 문자열(`"max"` 또는 `"min"`)이거나 사용자 정의 함수 `(value, columnData, rowData) => boolean`입니다. 함수가 `true`를 반환하면 Pivot은 해당 셀에 CSS 클래스를 추가합니다.

`marks`를 적용하기 전에 스타일시트에 CSS 클래스를 미리 생성하십시오.

아래 예제는 최솟값과 최댓값이 있는 셀을 강조 표시하고, 사용자 정의 함수를 사용하여 2보다 큰 비정수 값을 표시합니다:

~~~jsx {18-26}
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
    tableShape: {
        marks: {
            // 내장 marks (최솟값/최댓값 강조 표시)
            min_cell: "min",
            max_cell: "max",
            // 사용자 정의 mark
            g_avg: v => (v % 1 !== 0) && v > 2
        }
    }
});
~~~

다음 코드는 위의 `marks` 객체에서 참조하는 CSS 클래스를 정의합니다:

~~~html title="index.html"
<style>
    .min_cell {
        background: #4caf50 !important;
        color: #fff;
    }

    #root .max_cell {
        background: #ff5722 !important;
        color: #fff;
    }

    .g_avg {
        background: #57a5c9 !important;
        color: #fff;
    }
</style>
~~~

## 특정 CSS 클래스 {#specific-css-classes}

Pivot은 테이블 요소를 세밀하게 제어할 수 있는 여러 유틸리티 CSS 클래스를 제공하며, 이를 재정의할 수 있습니다.

Pivot은 내장 `.wx-number` CSS 클래스를 통해 본문 셀의 숫자를 오른쪽으로 정렬합니다. 단, [`tableShape`](api/config/tableshape-property.md)에서 `tree: true`가 설정된 경우(트리 모드)의 계층적 열은 예외입니다. 기본 숫자 정렬을 초기화하려면 해당 클래스를 재정의하십시오.

다음 코드는 본문 셀의 숫자를 왼쪽으로 정렬합니다:

~~~html
<style>
    .wx-number {
        justify-content: start;
    }
</style>
~~~

합계 열에 스타일을 적용하려면 `.wx-total` CSS 클래스를 재정의하십시오.

다음 코드는 합계 셀에 밝은 배경과 굵은 글꼴 두께를 적용합니다:

~~~html
<style>
    .wx-cell.wx-total {
        background: #fafafb;
        font-weight: var(--wx-header-font-weight);
    }
</style>
~~~

## 예제 {#example}

아래 코드는 Pivot에 사용자 정의 스타일을 적용합니다:

<iframe src="https://snippet.dhtmlx.com/p8imq6hx?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**관련 샘플**: 

- [Pivot 2. 합계 열에 대한 스타일링 (사용자 정의 CSS)](https://snippet.dhtmlx.com/9lkdbzmm)
- [Pivot 2. 셀에 대한 최솟값/최댓값 및 사용자 정의 marks (조건부 형식)](https://snippet.dhtmlx.com/4cm4asbd)
- [Pivot 2. 교대 행 색상 (줄무늬 행, 얼룩말 줄무늬)](https://snippet.dhtmlx.com/0cm0uko2)
