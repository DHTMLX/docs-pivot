---
sidebar_label: 구성
title: 구성
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 구성에 대해 학습할 수 있습니다. 개발자 가이드와 API 레퍼런스를 탐색하고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Pivot의 무료 30일 평가판을 다운로드하세요.
---

# 구성 {#configuration}

다음 API를 통해 Pivot 테이블과 구성 패널을 설정합니다:

- [`config`](api/config/config-property.md) — Pivot 테이블의 구조와 데이터 집계 방식을 정의합니다
- [`render-table`](api/events/render-table-event.md) — 테이블 구성을 런타임에 변경합니다
- [`tableShape`](api/config/tableshape-property.md) — Pivot 테이블의 외관을 설정합니다
- [`columnShape`](api/config/columnshape-property.md) — 열의 외관과 동작을 설정합니다
- [`headerShape`](api/config/headershape-property.md) — 헤더의 외관과 동작을 설정합니다
- [`configPanel`](api/config/configpanel-property.md) — 구성 패널의 표시 여부를 제어합니다
- [`setLocale`](api/methods/setlocale-method.md) — 로케일을 적용합니다([지역화](guides/localization.md) 참조)
- [`data`](api/config/data-property.md), [`fields`](api/config/fields-property.md) — 데이터와 필드 메타데이터를 불러옵니다
- [`predicates`](api/config/predicates-property.md) — 집계 전에 데이터를 전처리합니다
- [`methods`](api/config/methods-property.md) — 사용자 정의 집계 메서드를 정의합니다
- [`limits`](api/config/limits-property.md) — 최종 데이터셋의 행과 열 수를 제한합니다

데이터 작업에 대한 자세한 내용은 [데이터 작업](guides/working-with-data.md)을 참조하세요.

다음 Pivot 테이블 요소를 구성할 수 있습니다:

- 열과 행
- 헤더와 푸터
- 셀
- 테이블 크기

## 테이블 크기 조정 {#resizing-the-table}

[`tableShape`](api/config/tableshape-property.md) 속성을 사용하여 행, 열, 헤더, 푸터의 크기를 변경합니다.

다음 코드 스니펫은 기본 크기를 보여줍니다:

~~~jsx
const sizes = {
    rowHeight: 34,
    headerHeight: 30,
    footerHeight: 30,
    columnWidth: 150
};
~~~

다음 코드 스니펫은 기본 크기를 재정의합니다:

~~~jsx {4-11}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    tableShape: {
        sizes: {
            rowHeight: 44,
            headerHeight: 60,
            footerHeight: 30,
            columnWidth: 170
        }
    },
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

:::info
특정 열의 너비를 설정하려면 [`columnShape`](api/config/columnshape-property.md) 속성의 `width` 파라미터를 사용하세요.
:::

## 열 너비를 콘텐츠에 자동 맞춤 {#autosize-columns-to-content}

[`columnShape`](api/config/columnshape-property.md) 속성의 `autoWidth` 파라미터를 사용하면 열 너비를 자동으로 계산합니다. `autoWidth`의 모든 하위 파라미터는 선택 사항이며, 전체 설명은 [`columnShape`](api/config/columnshape-property.md) 레퍼런스를 참조하세요.

`autoWidth` 객체는 다음 파라미터를 받습니다:

- `columns` — 자동 계산 너비를 적용할 필드를 선택하는 객체
- `auto` — 너비를 헤더, 셀 콘텐츠, 또는 둘 다에 맞춥니다
- `maxRows` — 열 크기를 감지하기 위해 분석할 데이터 행 수(기본값: 20)
- `firstOnly` — `true`(기본값)이면 각 필드를 한 번만 분석합니다. 동일한 필드 기반의 여러 열(예: `count`와 `sum`을 사용하는 `oil`)이 있을 경우, 첫 번째 열만 분석하고 나머지 열은 해당 너비를 상속합니다

다음 코드 스니펫은 네 개의 필드에 `autoWidth`를 활성화하고, `firstOnly`를 비활성화하여 각 열이 개별적으로 측정되도록 합니다:

~~~jsx {18-30}
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
            // 모든 필드를 분석합니다
            firstOnly: false
        }
    }
});
~~~

## 셀에 템플릿 적용 {#applying-templates-to-cells}

### tableShape를 통해 템플릿 추가 {#add-templates-via-tableshape}

[`tableShape`](api/config/tableshape-property.md) 속성의 `templates` 파라미터를 사용하여 함수를 통해 셀 값을 렌더링합니다. 각 키는 필드 ID이고 각 값은 문자열을 반환하는 함수입니다. 지정된 필드를 기반으로 하는 모든 열에 템플릿이 적용됩니다.

아래 예제는 `state` 셀에 템플릿을 적용하여 주의 전체 이름과 약자를 함께 표시합니다:

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
  // 다른 값들
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // "state" 셀의 값을 커스터마이즈합니다
            state: v => v + ` (${states[v]})`,
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
            // 다른 값들
        ],
    },
    fields,
});
~~~

### template 헬퍼를 통해 템플릿 추가 {#adding-a-template-via-the-template-helper}

본문 셀에 HTML 콘텐츠를 삽입하려면 [`pivot.template`](api/helpers/template.md) 헬퍼를 사용하여 결과를 열 객체의 `cell` 속성에 할당합니다. [`api.intercept`](api/internal/intercept-method.md) 메서드로 [`render-table`](api/events/render-table-event.md) 이벤트를 가로채어 테이블이 렌더링되기 직전에 템플릿을 적용합니다.

아래 예제는 필드(`id`, `user_score`)에 따라 본문 셀에 아이콘(별 또는 깃발)을 추가합니다:

~~~js
function cellTemplate(value, method, row, column) {
    const field = column.fields ? column.fields[row.$level] : column.field;

    if (field === "id") {
        return idTemplate(value);
    }

    if (field === "user_score") {
        return scoreTemplate(value);
    }

    return value;
}

function idTemplate(value) {
    const name = value?.toString().split("-")[0];
    return `<span class="cell-id flag-${name}"></span> ${value}`;
}

function scoreTemplate(value) {
    return `<i class="cell-score wxi-star"></i> ${value}`;
}

widget.api.intercept("render-table", ({ config: tableConfig }) => {
    tableConfig.columns = tableConfig.columns.map((c) => {
        if (c.area === "rows") {
            // "rows" 영역 열의 셀에 템플릿을 적용합니다
            c.cell = pivot.template(({ value, method, row, column }) => cellTemplate(value, method, row, column));
        }
        return c;
    });
});
~~~

## 헤더에 템플릿 적용 {#applying-templates-to-headers}

### headerShape를 통해 템플릿 추가 {#add-templates-via-headershape}

헤더의 텍스트 형식을 제어하려면 [`headerShape`](api/config/headershape-property.md) 속성의 `template` 파라미터를 사용합니다. 이 파라미터는 다음 역할을 하는 함수입니다:

- 필드 레이블, ID, 서브레이블(메서드 이름, 있는 경우)을 받습니다
- 처리된 값을 반환합니다

기본 템플릿은 다음과 같습니다:

~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

사용자 정의 템플릿이 없으면 `values` 영역 필드는 레이블과 메서드를 표시하고(예: `Oil(count)`), 다른 영역 필드는 `label` 값을 표시합니다. [`predicates`](api/config/predicates-property.md) 템플릿은 `headerShape` 템플릿을 재정의합니다.

아래 예제는 헤더 텍스트를 소문자로 변환하여 `profit (sum)`과 같은 레이블을 생성합니다:

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // 헤더 텍스트에 대한 사용자 정의 템플릿
        template: (label, id, subLabel) => (label + (subLabel ? ` (${subLabel})` : "")).toLowerCase(),
        },
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
            // 다른 값들
        ],
    },
    fields,
});
~~~

### template 헬퍼를 통해 템플릿 추가 {#add-templates-via-the-template-helper}

헤더 셀에 HTML 콘텐츠를 삽입하려면 [`pivot.template`](api/helpers/template.md) 헬퍼를 사용하여 결과를 헤더 셀 객체의 `cell` 속성에 할당합니다. [`api.intercept`](api/internal/intercept-method.md) 메서드로 [`render-table`](api/events/render-table-event.md) 이벤트를 가로채어 테이블이 렌더링되기 직전에 템플릿을 적용합니다.

아래 예제는 다음에 아이콘을 추가합니다:

- 필드 이름에 따른 헤더 레이블(예: `id`에는 지구 아이콘)
- 셀 값에 따른 열 헤더(`status` 값에 따른 색상 화살표 표시기)

~~~jsx
function rowsHeaderTemplate(value, field) {
    let icon = "";
    if (field === "id") icon = "<i class='icon wxi-earth'></i>";
    if (field === "user_score") icon = "<i class='icon wxi-star'></i>";
    return `${value} ${icon}`;
}

function statusTemplate(value) {
    let icon = "";
    if (value === "Up") icon = "<i style='color:green' class='icon wxi-arrow-up'></i>";
    if (value === "Down") icon = "<i style='color:red' class='icon wxi-arrow-down'></i>";
    return `${value} ${icon}`;
}

widget.api.intercept("render-table", ({ config: tableConfig }) => {
    tableConfig.columns = tableConfig.columns.map((c) => {
        if (c.area === "rows") {
            // "rows" 영역 열의 첫 번째 헤더 행에 템플릿을 적용합니다
            c.header[0].cell = pivot.template(({ value, field }) => rowsHeaderTemplate(value, field));
        } else {
            // "status" 필드의 값을 표시하는 헤더 셀
            const headerCell = c.header.find((h) => h.field === "status");
            if (headerCell) {
                headerCell.cell = pivot.template(({ value }) => statusTemplate(value));
            }
        }
        return c;
    });
});
~~~

## 열 축소 활성화 {#make-columns-collapsible}

공유 헤더 아래의 열을 사용자가 축소하고 펼칠 수 있도록 하려면 [`headerShape`](api/config/headershape-property.md) 속성의 `collapsible` 파라미터를 `true`로 설정합니다.

다음 코드 스니펫은 헤더 열을 축소 가능하도록 활성화합니다:

~~~jsx {4-6}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    headerShape: {
        collapsible: true,
    },
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

## 열 고정 {#freezing-columns}

나머지 테이블이 스크롤될 때 왼쪽 또는 오른쪽 열이 표시되도록 고정합니다. [`tableShape`](api/config/tableshape-property.md) 속성의 `split` 파라미터를 사용하여 `left` 또는 `right`를 `true`로 설정합니다.

### 왼쪽에 열 고정 {#freeze-columns-on-the-left}

`split.left`가 `true`이면, 고정된 열 수는 [`config`](api/config/config-property.md) 속성의 `rows` 필드 수와 같습니다. 트리 모드에서는 `rows` 필드 수에 관계없이 열이 하나만 고정됩니다.

다음 코드 스니펫은 왼쪽에 열 하나를 고정합니다(`rows` 필드가 하나 정의된 경우):

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["genre"],
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
        split: {left: true } 
    }
});
~~~

사용자 정의 분할 수를 설정하려면 [`render-table`](api/events/render-table-event.md) 이벤트를 수신하여 `tableConfig.split`을 재정의합니다. colspan이 있는 열은 분할하지 마세요.

다음 코드 스니펫은 모든 `rows` 열과 `values` 필드 수의 두 배만큼 왼쪽에 고정합니다:

~~~jsx {19-26}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            {
                field: "oil",
                method: "sum"
            },
            {
                field: "oil",
                method: "count"
            }
        ]
    }
});
table.api.on("render-table", ({ config: tableConfig }) => {
    const { config } = table.api.getState();

    tableConfig.split = {
        left: config.rows.length + config.values.length * 2
    };
});
~~~

### 오른쪽에 열 고정 {#freezing-columns-on-the-right}

`split.right`를 `true`로 설정하면 합계 열이 오른쪽에 고정됩니다.

다음 코드 스니펫은 오른쪽에 합계 열을 고정합니다:

~~~jsx {4-7}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    tableShape:{
        split: {right: true},
        totalColumn: true,
    },
    config:  {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

오른쪽에 사용자 정의 수의 열을 고정하려면 [`render-table`](api/events/render-table-event.md) 이벤트를 수신하여 `tableConfig.split`을 재정의합니다. colspan이 있는 열은 분할하지 마세요.

다음 코드 스니펫은 `values` 필드 수만큼 오른쪽에 열을 고정합니다:

~~~jsx {20-25}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    config:  {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});

widget.api.on("render-table", ({ config: tableConfig }) => {
    const { config } = widget.api.getState();
    tableConfig.split = {
        right: config.values.length,
    }
})
~~~

## 열 정렬 {#sort-in-columns}

UI에서의 정렬은 기본적으로 활성화되어 있으며, 사용자가 열 헤더를 클릭하면 정렬됩니다. 비활성화하려면 [`columnShape`](api/config/columnshape-property.md) 속성의 `sort` 파라미터를 `false`로 설정합니다.

다음 코드 스니펫은 UI 정렬을 비활성화합니다:

~~~jsx {19}
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
        sort: false
    }
});
~~~

기본 정렬, 사용자 정의 비교자, 런타임 업데이트에 대한 자세한 내용은 [데이터 정렬](guides/working-with-data.md#sorting-data)을 참조하세요.

## 트리 모드 활성화 {#enabling-the-tree-mode}

트리 모드는 확장 가능한 행으로 데이터를 계층적으로 표시합니다. [`tableShape`](api/config/tableshape-property.md) 속성의 `tree` 파라미터를 `true`(기본값 `false`)로 설정합니다. [`config`](api/config/config-property.md)의 `rows` 배열에서 첫 번째 필드가 상위 행이 됩니다.

다음 코드 스니펫은 `studio`를 상위로, `genre`를 중첩 행으로 하는 트리 모드를 활성화합니다:

~~~jsx {3}
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true
    },
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "max"
            }
        ]
    }
});
~~~

## 모든 행 펼치기 또는 축소하기 {#expandingcollapsing-all-rows}

모든 행을 프로그래밍 방식으로 펼치거나 축소하려면 [`tableShape`](api/config/tableshape-property.md) 속성을 통해 트리 모드를 활성화합니다. 그런 다음 [`getTable`](api/methods/gettable-method.md) 메서드로 Table 위젯 인스턴스에 접근하고, Table의 `api.exec` 메서드를 통해 [`open-row`](api/table/open-row.md) 또는 [`close-row`](api/table/close-row.md) 이벤트를 트리거합니다.

아래 예제는 트리 모드에서 모든 분기를 펼치거나 축소하는 "모두 열기"와 "모두 닫기" 버튼을 렌더링합니다:

~~~jsx
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true
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
const tableInstance = api.getTable();
// 렌더링 시 모든 테이블 분기를 닫힌 상태로 유지합니다
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // 테이블 렌더링을 방지하려면 여기서 false를 반환합니다
    // return false;
});

function openAll() {
    tableInstance.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
    tableInstance.exec("close-row", { id: 0, nested: true });
}

const openAllButton = document.createElement("button");
openAllButton.addEventListener("click", openAll);
openAllButton.textContent = "Open all";

const closeAllButton = document.createElement("button");
closeAllButton.addEventListener("click", closeAll);
closeAllButton.textContent = "Close all";

document.body.appendChild(openAllButton);
document.body.appendChild(closeAllButton);
~~~

## 헤더 텍스트 방향 변경 {#change-header-text-orientation}

헤더 텍스트를 가로에서 세로로 회전하려면 [`headerShape`](api/config/headershape-property.md) 속성의 `vertical` 파라미터를 `true`로 설정합니다.

다음 코드 스니펫은 헤더 텍스트를 세로로 렌더링합니다:

~~~jsx {4-6}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    headerShape: {
        vertical: true
    },
    config: {
        rows: ["studio"],
        columns: ["type"],
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

## 구성 패널 표시 여부 제어 {#controlling-visibility-of-configuration-panel}

구성 패널은 기본적으로 표시됩니다. 사용자는 **설정 숨기기** / **설정 표시** 버튼으로 패널을 토글할 수 있습니다. [`configPanel`](api/config/configpanel-property.md) 속성, [`show-config-panel`](api/events/show-config-panel-event.md) 이벤트, 또는 [`showConfigPanel`](api/methods/showconfigpanel-method.md) 메서드를 통해 패널을 프로그래밍 방식으로 제어합니다.

### 구성 패널 숨기기 {#hide-the-configuration-panel}

초기화 시 패널을 숨기려면 [`configPanel`](api/config/configpanel-property.md) 속성을 `false`로 설정합니다.

다음 코드 스니펫은 패널이 숨겨진 상태로 Pivot을 초기화합니다:

~~~jsx
// 초기화 시 구성 패널이 숨겨집니다
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    configPanel: false,
    config: {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

런타임에 패널을 토글하려면 [`api.exec`](api/internal/exec-method.md) 메서드로 [`show-config-panel`](api/events/show-config-panel-event.md) 이벤트를 트리거하고 `mode` 파라미터를 `false`로 설정합니다.

다음 코드 스니펫은 초기화 후 패널을 숨깁니다:

~~~jsx {19-22}
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
    }
});
// 구성 패널을 숨깁니다
table.api.exec("show-config-panel", {
    mode: false
});
~~~

### 기본 토글 비활성화 {#disable-the-default-toggling}

기본 토글 버튼을 완전히 차단하려면 [`api.intercept`](api/internal/intercept-method.md) 메서드로 [`show-config-panel`](api/events/show-config-panel-event.md) 이벤트를 가로채고 `false`를 반환합니다.

다음 코드 스니펫은 토글 버튼을 비활성화합니다:

~~~jsx {20-22}
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
    }
});

table.api.intercept("show-config-panel", () => {
    return false;
});
~~~

대안 API로는 [`showConfigPanel`](api/methods/showconfigpanel-method.md) 메서드를 사용합니다.

### 패널에서 필드 작업 {#actions-with-fields-in-the-panel}

구성 패널은 다음 필드 작업을 지원합니다:

- [`add-field`](api/events/add-field-event.md) — 영역에 필드를 추가합니다
- [`delete-field`](api/events/delete-field-event.md) — 영역에서 필드를 제거합니다
- [`update-field`](api/events/update-field-event.md) — 필드의 메서드 또는 설정을 업데이트합니다
- [`move-field`](api/events/move-field-event.md) — 영역 내 필드의 순서를 변경합니다

**관련 샘플:**
- [Pivot 2. 테이블 및 헤더 셀에 텍스트 템플릿 추가](https://snippet.dhtmlx.com/n9ylp6b2)
- [Pivot 2. 사용자 정의 고정(fixed) 열 (원하는 수)](https://snippet.dhtmlx.com/53erlmgp)
- [Pivot 2. 모든 행 펼치기 및 축소하기](https://snippet.dhtmlx.com/i4mi6ejn)
- [Pivot 2. 왼쪽 및 오른쪽에 고정(fixed) 열](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. 정렬](https://snippet.dhtmlx.com/j7vtief6)
