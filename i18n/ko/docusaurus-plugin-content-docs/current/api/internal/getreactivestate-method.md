---
sidebar_label: api.getReactiveState()
title: getReactiveState 메서드
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 getReactiveState 메서드에 대해 학습할 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 사용해 보세요. DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수 있습니다.
---

# api.getReactiveState()

### 설명 {#description}

@short: Pivot의 반응형 속성을 담은 객체를 가져옵니다

### 사용법 {#usage}

~~~jsx
api.getReactiveState(): object;
~~~

### 반환값 {#returns}

이 메서드는 다음 매개변수를 포함하는 객체를 반환합니다:

~~~jsx
{
    config: {}, // 현재 설정 (행, 열, 값, 필터)
    activeFilter: {}, // 활성 필터 객체 (필터가 열려 있는 경우)
    columnShape: {}, // Pivot 열 구성
    data: [], // 소스 데이터
    fields: [], // 필드 배열
    filters: {}, // 필터링 규칙
    headerShape: {}, // 테이블 헤더 설정
    predicates: {}, // 필드별 사용 가능한 조건자
    limits: {}, // 데이터셋의 행과 열 최대 개수 제한
    methods: {}, // 데이터 집계 메서드
    tableShape: {}, // 테이블 설정 (크기, 합계 행, 템플릿)
    tableConfig: {}, // 테이블 구성 설정 (열, 데이터, 크기, 트리 모드, 푸터)
    configPanel: boolean, // 구성 패널의 표시 상태
    readonly: boolean, // 읽기 전용 모드 활성화 여부
}  
~~~

### 예제 {#example}

~~~jsx {21-26}
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

// 반응형 config 스토어를 구독하고 변경될 때마다 로그를 출력합니다
const state = table.api.getReactiveState();

state.config.subscribe((config) => {
    console.log("Pivot config changed. Its current state:", config);
});
~~~
