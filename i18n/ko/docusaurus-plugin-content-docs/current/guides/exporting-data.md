---
sidebar_label: 데이터 내보내기
title: 데이터 내보내기
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 데이터를 내보내는 방법을 살펴볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 참고하고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드할 수 있습니다.
---

# 데이터 내보내기 {#exporting-data}

Pivot은 내부 Table 위젯을 통해 테이블 데이터를 XLSX 또는 CSV 형식으로 내보냅니다. [`getTable`](api/methods/gettable-method.md) 메서드로 Table 인스턴스에 접근한 후, Table의 [`api.exec`](api/internal/exec-method.md) 메서드로 [`export`](api/table/export.md) 이벤트를 실행합니다.

아래 예제는 Table 인스턴스에 접근하여 CSV 및 XLSX 형식으로 `export` 이벤트를 실행하는 방법을 보여줍니다:

~~~jsx
const widget = new pivot.Pivot("#root", { /* settings */ });

widget.getTable().exec("export", {
    options: {
        format: "csv",
        cols: ";"
    }
});

widget.getTable().exec("export", {
    options: {
        format: "xlsx",
        fileName: "My Report",
        sheetName: "Quarter 1"
    }
});
~~~

:::tip
[`getTable`](api/methods/gettable-method.md) 메서드는 선택적 `wait` boolean 파라미터를 받습니다. `true`를 전달하면 Table API가 사용 가능해질 때 resolve되는 promise를 반환합니다. Pivot 초기화 중에 Table API가 준비되어야 할 때 유용합니다.
:::

## 예제 {#example}

아래 스니펫은 데이터를 내보내는 방법을 보여줍니다:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**관련 문서**: 

- [날짜 형식 지정](guides/localization.md#date-formatting)
- [`export`](api/table/export.md)
