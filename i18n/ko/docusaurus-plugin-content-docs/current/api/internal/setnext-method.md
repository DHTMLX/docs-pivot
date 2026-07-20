---
sidebar_label: api.setNext()
title: setNext 메서드
description: DHTMLX JavaScript Pivot 라이브러리의 setNext 메서드에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 참고하고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot 무료 30일 평가판도 다운로드할 수 있습니다.
---

# api.setNext()

### 설명 {#description}

@short: Event Bus 순서에 특정 액션을 추가할 수 있습니다

### 사용법 {#usage}

~~~jsx
api.setNext(next: any): void;
~~~

### 매개변수 {#parameters}

- `next` - (필수) **Event Bus** 순서에 포함할 액션

### 예제 {#example}

아래 예제는 `api.setNext()` 메서드를 사용하여 사용자 정의 클래스를 Event Bus 순서에 통합하는 방법을 보여줍니다:

~~~jsx {13-14}
const table = new pivot.Pivot("#root", { fields: [], data: [] });
const server = "https://some-backend-url";

// ServerDataService라는 사용자 정의 서버 서비스 클래스가 있다고 가정합니다
const someServerService = new ServerDataService(server);

Promise.all([
    fetch(server + "/data").then((res) => res.json()),
    fetch(server + "/fields").then((res) => res.json())
]).then(([data, fields]) => {
    table.setConfig({ data, fields });
    
    // serverDataService를 위젯의 Event Bus 순서에 통합합니다
    table.api.setNext(someServerService);
});
~~~

**관련 문서**: [`setConfig`](api/methods/setconfig-method.md)
