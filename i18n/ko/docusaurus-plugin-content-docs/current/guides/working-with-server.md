---
sidebar_label: 서버와 연동하기
title: 서버와 연동하기
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 Pivot을 백엔드와 통합하는 방법을 살펴볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 참고하고, 코드 예제와 라이브 데모를 직접 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드할 수 있습니다.
---

Pivot은 전적으로 브라우저에서 실행됩니다. 위젯은 원시 행 배열과 [`config`](/api/config/config-property)(rows / columns / values)를 받아 클라이언트 측에서 행을 집계합니다. 내장된 전송 계층은 없지만, 공개 API에는 백엔드와의 왕복 통신을 위한 훅이 노출되어 있습니다.

일반적인 통합은 세 부분으로 구성됩니다.

1. **데이터 로드** — 초기화 시 서버에서 집계되지 않은 원시 데이터를 불러옵니다
2. **config 저장** — 사용자가 레이아웃을 변경할 때 저장하여 세션을 나중에 재개할 수 있도록 합니다
3. **집계된 테이블 저장** — 서버에서 집계 결과의 스냅샷이 필요할 때 저장합니다

## 서버에서 원시 데이터 로드하기 {#load-raw-data-from-the-server}

[`data`](/api/config/data-property) 프로퍼티는 원시 행 객체의 배열을 받습니다. Pivot이 행을 직접 집계하므로 서버는 집계되지 않은 데이터를 반환합니다.

`fetch`(또는 다른 HTTP 클라이언트)를 사용하여 데이터와 필드를 가져온 뒤, 응답이 도착하면 위젯을 생성합니다.

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
        fetch(server + "/config").then(res => res.json()), // 선택 사항
    ]).then(([data, fields, config]) => {
        new pivot.Pivot("#root", {
            data,
            fields,
            config,
        });
    });
</script>
~~~

서버가 날짜 필드를 ISO 문자열로 반환하는 경우, 배열을 Pivot에 전달하기 전에 `Date` 인스턴스로 변환하세요. 날짜 타입 필드의 집계 메서드는 실제 `Date` 값을 필요로 합니다.

~~~jsx
data.forEach(row => {
    if (typeof row.when === "string") row.when = new Date(row.when);
});
~~~

:::info
**참고 항목**:
- [데이터 로드하기](/guides/loading-data)
- [날짜 포맷](/guides/localization#date-formatting)
:::

## 세션 재개를 위한 사용자 레이아웃 저장하기 {#save-the-users-layout-to-resume-the-session}

사용자가 이전에 사용하던 레이아웃으로 돌아올 수 있도록 하려면, 변경이 있을 때마다 [`config`](/api/config/config-property) 객체를 저장하세요. [`update-config`](/api/events/update-config-event) 이벤트는 사용자가 UI를 통해 레이아웃을 편집할 때 발생합니다. 페이로드는 `{ rows, columns, values, filters }` 형태의 처리된 config입니다.

이벤트를 수정 없이 관찰하려면 [`api.on()`](/api/internal/on-method)을 사용하세요. 핸들러에서 이벤트 페이로드를 변경해야 할 경우에는 [`api.intercept()`](/api/internal/intercept-method)로 전환하세요.

아래 예제는 `update-config` 이벤트를 구독하고 새 레이아웃을 서버에 POST합니다.

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
    ]).then(([data, fields]) => {
        const table = new pivot.Pivot("#root", { data, fields });

        table.api.on("update-config", newConfig => {
            fetch(server + "/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newConfig),
            });
        });
    });
</script>
~~~

다음 방문 시, `/config`에서 저장된 config를 반환하고 초기화 시 `config` 프로퍼티로 전달하세요. 위젯이 이전 레이아웃으로 시작됩니다. 위젯이 이미 존재한 후 레이아웃이 도착한다면, [`setConfig()`](/api/methods/setconfig-method) 메서드로 저장된 config를 적용하세요.

사용자가 구성 패널에서 필드를 드래그할 때 빈번한 업데이트로 서버에 부하가 걸릴 수 있습니다. 타이머로 POST 요청을 디바운스하세요.

~~~jsx
let saveTimer;
table.api.on("update-config", newConfig => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newConfig),
        });
    }, 300);
});
~~~

:::note
`update-config` 페이로드는 *처리된* 구성입니다. Pivot은 필드 참조를 `{ field, method }` 형태로 정규화할 수 있습니다. 처리된 형태를 초기화 시 `config` 프로퍼티로 그대로 전달하세요. 별도의 변환은 필요하지 않습니다.
:::

:::tip
핸들러에서 `false`를 반환하면 레이아웃 변경을 차단할 수 있습니다. 서버 측 유효성 검사를 통과한 경우에만 저장하도록 제어할 때 활용하세요.
:::

## 집계된 테이블 저장하기 {#save-the-aggregated-table}

때로는 *결과* 자체가 핵심 값이 됩니다. 렌더링된 테이블의 서버 측 캐시, 주기적인 보고서, 또는 내보내기 파이프라인이 그 예입니다. [`render-table`](/api/events/render-table-event) 이벤트는 Pivot이 집계를 완료한 후 발생하며, `columns`, `data` 행, `footer`, `split` 등 완전히 집계된 테이블 정보를 담고 있습니다.

아래 예제는 `render-table`을 구독하고 스냅샷을 서버에 POST하며, 초기 렌더링은 건너뜁니다.

~~~jsx
const table = new pivot.Pivot("#root", { data, fields, config });

let firstRender = true;
let saveTimer;

table.api.on("render-table", ({ config: tableConfig }) => {
    // 첫 번째 집계에 의해 트리거되는 초기 렌더링을 건너뜁니다
    if (firstRender) {
        firstRender = false;
        return;
    }

    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/snapshot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                columns: tableConfig.columns,
                data: tableConfig.data,
                footer: tableConfig.footer,
                split: tableConfig.split,
            }),
        });
    }, 300);
});
~~~

:::note
`render-table` 이벤트는 `update-config`보다 더 자주 발생합니다. 정렬이나 확장/축소를 포함한 모든 재계산 시 이벤트가 실행됩니다. 핸들러를 디바운스하고 첫 번째 렌더링을 건너뛰어 실제 변경 사항당 POST가 한 번만 전송되도록 하세요.
:::

:::tip
핸들러에서 `false`를 반환하면 렌더링을 방지할 수 있습니다. 서버에서 스냅샷을 거부하거나 읽기 전용 모드에서 활용하세요.
:::

### 집계된 스냅샷 재사용하기 {#reload-an-aggregated-snapshot}

Pivot은 집계된 테이블을 생성하며, 이미 집계된 데이터는 표시하지 않습니다. [`data`](/api/config/data-property) 프로퍼티는 항상 원시 행을 받습니다. 따라서 `render-table`에서 저장한 스냅샷은 다음과 같은 경우에 적합합니다.

- 서버에서의 다운스트림 내보내기 파이프라인(CSV, XLSX)
- 저장된 `columns`와 `data`를 사용하는 일반 데이터 테이블로 렌더링하는 읽기 전용 뷰
- 집계를 다시 실행하지 않고 다른 사용자에게 제공하는 캐시된 보고서

**관련 문서**:

- [데이터 로드하기](/guides/loading-data)
- [데이터 내보내기](/guides/exporting-data)

**관련 API**:

- [`api.on()`](/api/internal/on-method)
- [`update-config`](/api/events/update-config-event)
- [`render-table`](/api/events/render-table-event)
