---
sidebar_label: Svelte와의 통합
title: Svelte와의 통합
description: DHTMLX JavaScript Pivot 라이브러리의 문서에서 Svelte와의 통합에 대해 알아볼 수 있습니다. 개발자 가이드와 API 참조를 살펴보고, 코드 예제와 라이브 데모를 사용해 보고, DHTMLX Pivot의 무료 30일 평가판을 다운로드하세요.
---

# Svelte와의 통합 {#integration-with-svelte}

:::tip
**Svelte**의 기본 개념과 패턴에 익숙하다고 가정합니다. 복습이 필요하다면 [**Svelte 문서**](https://svelte.dev/)를 참조하세요.
:::

DHTMLX Pivot은 일반 컴포넌트로서 **Svelte**와 통합됩니다. 완전한 동작 예제는 [**GitHub의 Svelte Pivot 데모**](https://github.com/DHTMLX/svelte-pivot-demo)를 참조하세요.

## 프로젝트 만들기 {#create-a-project}

:::info
시작하기 전에 [**Node.js**](https://nodejs.org/en/)를 설치하세요. [**Vite**](https://vite.dev/)는 선택 사항입니다.
:::

다음 명령어는 Vite 프로젝트 스캐폴딩 도구를 실행하고 Svelte 템플릿을 선택할 수 있게 해줍니다:

~~~bash
npm create vite@latest
~~~

프로젝트 이름을 *my-svelte-pivot-app*으로 지정하세요.

### 의존성 설치 {#install-dependencies}

새 프로젝트 디렉토리로 이동하세요:

~~~bash
cd my-svelte-pivot-app
~~~

패키지 매니저로 의존성을 설치하고 개발 서버를 시작하세요:

- [**yarn**](https://yarnpkg.com/) 사용 시:

~~~bash
yarn 
yarn start # 또는: yarn dev
~~~

- [**npm**](https://www.npmjs.com/) 사용 시:

~~~bash
npm install
npm run dev
~~~

앱은 로컬 포트(예: `http://localhost:3000`)에서 실행됩니다.

## Pivot 만들기 {#create-pivot}

프로젝트에 Pivot 패키지를 추가한 다음, Svelte 컴포넌트로 Pivot을 감싸세요.

### 1단계. 패키지 설치 {#step-1-install-the-package}

[**Pivot 체험판 패키지**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn)를 다운로드하고 README의 단계를 따르세요. Pivot 체험판 패키지는 30일 동안 유효합니다.

### 2단계. 컴포넌트 만들기 {#step-2-create-the-component}

Pivot을 마운트하는 Svelte 컴포넌트를 만드세요. 새 파일 *src/Pivot.svelte*를 추가하세요.

#### 소스 파일 가져오기 {#import-source-files}

*src/Pivot.svelte*를 열고 Pivot 소스 파일을 가져오세요. 가져오기 경로는 패키지 에디션에 따라 다릅니다:

- **PRO 버전** (로컬 폴더에서 설치):

~~~html title="Pivot.svelte"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

패키지가 최소화된 에셋을 포함하는 경우, *pivot.css* 대신 *pivot.min.css*를 가져오세요.

- **체험판 버전**:

~~~html title="Pivot.svelte"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

이 튜토리얼에서는 Pivot 체험판 버전을 사용합니다.

#### 컨테이너 설정 및 Pivot 마운트 {#set-up-the-container-and-mount-pivot}

페이지에 Pivot을 표시하려면 컨테이너 `div`를 추가한 다음, 생성자를 사용해 `onMount` 라이프사이클 훅에서 Pivot을 초기화하세요. `onDestroy` 훅에서 Pivot을 소멸시키세요.

다음 코드 스니펫은 최소한의 Pivot Svelte 컴포넌트를 정의합니다:

~~~html {3,6,10-11,19} title="Pivot.svelte"
<script>
    import { onMount, onDestroy } from "svelte";
    import { Pivot } from "@dhx/trial-pivot";
    import "@dhx/trial-pivot/dist/pivot.css";

    let container; // Pivot을 위한 컨테이너 참조
    let table;

    onMount(() => {
        // Pivot 컴포넌트 초기화
        table = new Pivot(container, {});
    });

    onDestroy(() => {
        table.destructor(); // 언마운트 시 Pivot 소멸
    });
</script>

<div bind:this={container} class="widget"></div>
~~~

#### 스타일 추가 {#add-styles}

Pivot을 올바르게 렌더링하려면 프로젝트의 메인 CSS 파일에 다음 스타일을 추가하세요:

~~~css title="main.css"
/* 초기 페이지 스타일 */
html,
body,
#app { /* #app 루트 컨테이너 사용 */
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Pivot 컨테이너 스타일 */
.widget {
    height: 100%;
    width: 100%;
}
~~~

#### 데이터 로드 {#load-data}

Pivot에 데이터를 제공하려면 데이터셋을 준비하세요. *src/data.js*를 만들고 데이터와 필드 메타데이터를 내보내세요:

~~~jsx title="data.js"
export function getData() {
    const dataset = [
        {
            "cogs": 51,
            "date": "10/1/2018",
            "inventory_margin": 503,
            "margin": 71,
            "market_size": "Major Market",
            "market": "Central",
            "marketing": 46,
            "product_line": "Leaves",
            "product_type": "Herbal Tea",
            "product": "Lemon",
            "profit": -5,
            "sales": 122,
            "state": "Colorado",
            "expenses": 76,
            "type": "Decaf"
        },
        {
            "cogs": 52,
            "date": "10/1/2018",
            "inventory_margin": 405,
            "margin": 71,
            "market_size": "Major Market",
            "market": "Central",
            "marketing": 17,
            "product_line": "Leaves",
            "product_type": "Herbal Tea",
            "product": "Mint",
            "profit": 26,
            "sales": 123,
            "state": "Colorado",
            "expenses": 45,
            "type": "Decaf"
        }, // 다른 데이터 항목
    ];

    const fields = [
        {
            "id": "cogs",
            "label": "Cogs",
            "type": "number"
        },
        {
            "id": "date",
            "label": "Date",
            "type": "date"
        }, // 다른 필드
    ];

    return { dataset, fields };
};
~~~

*src/App.svelte*를 열고 데이터를 가져온 다음 새 `<Pivot/>` 컴포넌트에 props로 전달하세요:

~~~html {3,5,8} title="App.svelte"
<script>
    import Pivot from "./Pivot.svelte";
    import { getData } from "./data.js";

    const { fields, dataset } = getData();
</script>

<Pivot fields={fields} dataset={dataset} />
~~~

*src/Pivot.svelte*를 열고 `export let`으로 들어오는 props를 선언하고 Pivot 설정 객체에 적용하세요:

~~~html {6-7,14-15} title="Pivot.svelte"
<script>
import { onMount, onDestroy } from "svelte";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export let fields;
export let dataset;

let container;
let table;

onMount(() => {
    table = new Pivot(container, {
        fields,
        data: dataset,
        config: {
            rows: ["state", "product_type"],
            columns: ["product_line", "type"],
            values: [
                {
                    field: "profit",
                    method: "sum"
                }, // 다른 값
            ]
        },
        // 다른 설정 속성
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

<div bind:this={container} class="widget"></div>
~~~

이제 컴포넌트를 사용할 준비가 되었습니다. 마운트 시 Pivot은 제공된 데이터로 렌더링됩니다. 전체 설정 속성 목록은 [Pivot API 문서](api/overview/properties-overview.md)를 참조하세요.

#### 이벤트 처리 {#handle-events}

Pivot에서의 사용자 동작은 구독할 수 있는 이벤트를 발생시킵니다. 전체 이벤트 목록은 [이벤트 개요](api/overview/events-overview.md)를 참조하세요.

다음 코드 스니펫은 사용자가 필터를 열 때 필드 ID를 기록하는 `open-filter` 이벤트 리스너로 `onMount`를 확장합니다:

~~~html {22-24} title="Pivot.svelte"
<script>
// ...
let table;

onMount(() => {
    table = new Pivot(container, {
        fields,
        data: dataset,
        config: {
            rows: ["state", "product_type"],
            columns: ["product_line", "type"],
            values: [
                {
                    field: "profit",
                    method: "sum"
                }, // 다른 값
            ]
        },
        // 다른 설정 속성
    });

    table.api.on("open-filter", (ev) => {
        console.log("필터가 활성화된 필드 id:", ev.id);
    });
});

onDestroy(() => {
    table.destructor();
});
</script>

// ...
~~~

앱을 시작하면 Pivot이 페이지에 데이터를 렌더링하는 것을 확인할 수 있습니다.

![Pivot 초기화](../assets/trial_pivot.png)

이제 Pivot이 Svelte와 통합되었습니다. 프로젝트 요구사항에 맞게 설정을 커스터마이즈하세요. 최종 예제는 [**GitHub의 svelte-pivot-demo**](https://github.com/DHTMLX/svelte-pivot-demo)를 참조하세요.
