---
sidebar_label: api.getState()
title: getState 메서드
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 getState 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드할 수 있습니다.
---

# api.getState()

### 설명 {#description}

@short: Pivot의 StateStore 프로퍼티가 담긴 객체를 반환합니다

### 사용법 {#usage}

~~~jsx
api.getState(): object;
~~~

### 반환값 {#returns}

이 메서드는 다음 파라미터를 포함하는 객체를 반환합니다:

~~~jsx
{
    config: {}, // 현재 config (rows, columns, values, filters)
    activeFilter: {}, // 활성 필터 객체 (필터가 열려 있는 경우)
    columnShape: {}, // pivot 열 구성
    data: [], // 소스 데이터
    fields: [], // fields 배열
    filters: {}, // 필터링 규칙
    headerShape: {}, // 테이블 헤더 설정
    predicates: {}, // 필드별 사용 가능한 predicates
    limits: {}, // 데이터셋의 행과 열 최대 개수 제한
    methods: {}, // 데이터 집계 메서드
    tableShape: {}, // 테이블 설정 (크기, 합계 행, 템플릿)
    tableConfig: {}, // 테이블 구성 설정 (columns, data, 크기, 트리 모드, footer)
    configPanel: boolean, // 구성 패널 표시 여부 상태
    readonly: boolean, // 읽기 전용 모드 활성화 여부
}  
~~~

### 예제 {#example}

~~~jsx {21-22}
// Pivot 생성
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

const { config } = table.api.getState();
console.log(config); //config 상태를 콘솔에 출력
~~~
