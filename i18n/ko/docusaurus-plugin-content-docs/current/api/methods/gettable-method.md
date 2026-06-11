---
sidebar_label: getTable()
title: getTable 메서드
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 getTable 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드할 수 있습니다.
---

# getTable()

### 설명 {#description}

@short: Pivot 테이블의 내부 Table 위젯 인스턴스에 접근합니다

이 메서드는 Pivot 내부의 Table 위젯 인스턴스에 접근해야 할 때 사용됩니다. Table 기능에 직접 접근하여 데이터 직렬화 및 다양한 형식으로의 내보내기 등의 작업을 수행할 수 있습니다. Table API에는 자체 `api.exec()` 메서드가 있으며, [`open-row`](api/table/open-row.md), [`close-row`](api/table/close-row.md), [`export`](api/table/export.md), [`filter-rows`](api/table/filter-rows.md) 이벤트를 호출할 수 있습니다.

### 사용법 {#usage}

~~~jsx
getTable(wait:boolean): Table | Promise;
~~~

### 매개변수 {#parameters}

`wait` - Table API가 Pivot에서 사용 가능해질 때까지 기다릴지 여부를 정의합니다(Pivot 초기화 중에 Table API를 사용할 때 필요합니다). 값이 **true**로 설정되면, 메서드는 Table API와 함께 promise를 반환합니다.

### 예제 {#example}

아래 예제에서는 Table 위젯 API에 접근하고, [`api.exec()`](api/internal/exec-method.md) 메서드를 사용하여 버튼 클릭으로 Table `export` 이벤트를 트리거합니다.

~~~jsx
// Pivot 생성
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

// table 인스턴스에 접근
let table_instance = table.getTable();

function toCSV() {
    table_instance.exec("export", {
        options: {
            format: "csv",
            cols: ";"
        }
    });
}

const exportButton = document.createElement("button");

exportButton.addEventListener("click", toCSV);
exportButton.textContent = "Export";

document.body.appendChild(exportButton);
~~~

**관련 문서:**:

- [`close-row`](api/table/close-row.md)
- [`export`](api/table/export.md)
- [`filter-rows`](api/table/filter-rows.md)
- [`open-row`](api/table/open-row.md)
