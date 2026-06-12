---
sidebar_label: Vue와의 통합
title: Vue와의 통합
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 Vue와의 통합에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판을 다운로드할 수도 있습니다.
---

# Vue와의 통합 {#integration-with-vue}

:::tip
[**Vue**](https://vuejs.org/)의 기본 개념과 패턴에 익숙하다고 가정합니다. 복습이 필요하다면 [**Vue 3 문서**](https://vuejs.org/guide/introduction.html#getting-started)를 참고하세요.
:::

DHTMLX Pivot은 일반 컴포넌트로서 **Vue**와 통합됩니다. 완전한 작동 설정 예시는 [**GitHub의 Vue Pivot 데모**](https://github.com/DHTMLX/vue-pivot-demo)를 참고하세요.

## 프로젝트 생성 {#create-a-project}

:::info
시작하기 전에 [**Node.js**](https://nodejs.org/en/)를 설치하세요.
:::

다음 명령어는 공식 **Vue** 프로젝트 스캐폴딩 도구를 실행합니다:

~~~bash
npm create vue@latest
~~~

이 명령어는 `create-vue`를 설치하고 실행합니다. 자세한 내용은 [Vue.js 빠른 시작](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)을 참고하세요.

프로젝트 이름을 *my-vue-pivot-app*으로 지정하세요.

### 의존성 설치 {#install-dependencies}

새 프로젝트 디렉터리로 이동합니다:

~~~bash
cd my-vue-pivot-app
~~~

패키지 매니저로 의존성을 설치하고 개발 서버를 시작합니다:

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

## Pivot 생성 {#create-pivot}

프로젝트에 Pivot 패키지를 추가한 다음 Pivot을 Vue 컴포넌트로 래핑합니다.

### 1단계. 패키지 설치 {#step-1-install-the-package}

[**Pivot 평가판 패키지**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn)를 다운로드하고 README의 단계를 따르세요. Pivot 평가판 패키지는 30일간 유효합니다.

### 2단계. 컴포넌트 생성 {#step-2-create-the-component}

Pivot을 마운트하는 Vue 컴포넌트를 생성합니다. *src/components/Pivot.vue* 파일을 새로 추가하세요.

#### 소스 파일 가져오기 {#import-source-files}

*src/components/Pivot.vue*를 열고 Pivot 소스 파일을 가져옵니다. 가져오기 경로는 패키지 에디션에 따라 다릅니다:

- **PRO 버전** (로컬 폴더에서 설치한 경우):

~~~html title="Pivot.vue"
<script>
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
</script>
~~~

패키지가 압축된 에셋을 제공하는 경우 *pivot.css* 대신 *pivot.min.css*를 가져옵니다.

- **평가판 버전**:

~~~html title="Pivot.vue"
<script>
import { Pivot } from '@dhx/trial-pivot';
import '@dhx/trial-pivot/dist/pivot.css';
</script>
~~~

이 튜토리얼에서는 Pivot 평가판을 사용합니다.

#### 컨테이너 설정 및 Pivot 마운트 {#set-up-the-container-and-mount-pivot}

페이지에 Pivot을 표시하려면 컨테이너 `div`를 추가한 다음 생성자를 사용하여 `mounted` 훅에서 Pivot을 초기화합니다. `unmounted` 훅에서 Pivot을 제거합니다.

다음 코드 스니펫은 최소한의 Pivot Vue 컴포넌트를 정의합니다:

~~~html {2,7-8,18} title="Pivot.vue"
<script>
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default {
    mounted() {
        // Pivot 컴포넌트를 초기화합니다
        this.table = new Pivot(this.$refs.container, {});
    },

    unmounted() {
        this.table.destructor(); // 언마운트 시 Pivot을 제거합니다
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

#### 스타일 추가 {#add-styles}

Pivot을 올바르게 렌더링하려면 프로젝트의 메인 CSS 파일에 다음 스타일을 추가합니다:

~~~css title="style.css"
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
    width: 100%;
    height: 100%;
}
~~~

#### 데이터 로드 {#load-data}

Pivot에 데이터를 공급하려면 데이터셋을 준비합니다. *src/data.js*를 생성하고 데이터와 필드 메타데이터를 내보냅니다:

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

*src/App.vue*를 열고 데이터를 가져온 다음 `data()` 옵션을 통해 노출합니다. 그런 다음 값을 새 `<Pivot/>` 컴포넌트에 props로 전달합니다:

~~~html {3,7-13,18} title="App.vue"
<script>
import Pivot from "./components/Pivot.vue";
import { getData } from "./data";

export default {
    components: { Pivot },
    data() {
        const { fields, dataset } = getData();
        return {
            fields,
            dataset
        };
    }
};
</script>

<template>
    <Pivot :fields="fields" :dataset="dataset" />
</template>
~~~

*src/components/Pivot.vue*를 열고 들어오는 props를 선언한 다음 Pivot 구성 객체에 적용합니다:

~~~html {6,10-11} title="Pivot.vue"
<script>
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default {
    props: ["fields", "dataset"],

    mounted() {
        this.table = new Pivot(this.$refs.container, {
            fields: this.fields,
            data: this.dataset,
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
            // 다른 구성 속성
        });
    },

    unmounted() {
        this.table.destructor();
    }
};
</script>

<template>
    <div ref="container" class="widget"></div>
</template>
~~~

이제 컴포넌트를 사용할 준비가 되었습니다. 마운트 시 Pivot은 제공된 데이터로 렌더링됩니다. 구성 속성의 전체 목록은 [Pivot API 문서](api/overview/properties-overview.md)를 참고하세요.

#### 이벤트 처리 {#handle-events}

Pivot에서 사용자 동작이 발생하면 구독할 수 있는 이벤트가 발생합니다. 이벤트의 전체 목록은 [이벤트 개요](api/overview/events-overview.md)를 참고하세요.

다음 코드 스니펫은 `mounted`를 `open-filter` 이벤트 리스너로 확장하여 사용자가 필터를 열 때 필드 ID를 로그에 기록합니다:

~~~html {22-24} title="Pivot.vue"
<script>
// ...
export default {
    // ...
    mounted() {
        this.table = new Pivot(this.$refs.container, {
            fields: this.fields,
            data: this.dataset,
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
            // 다른 구성 속성
        });

        this.table.api.on("open-filter", (ev) => {
            console.log("필터가 활성화된 필드 ID:", ev.id);
        });
    }
    // ...
}
</script>

// ...
~~~

앱을 시작하면 페이지에서 Pivot이 데이터를 렌더링하는 것을 확인할 수 있습니다.

![샘플 데이터와 함께 Vue 애플리케이션에 렌더링된 DHTMLX Pivot](../assets/trial_pivot.png)

이제 Pivot이 Vue와 통합되었습니다. 프로젝트 요구 사항에 맞게 구성을 사용자 정의하세요. 최종 예제는 [**GitHub의 vue-pivot-demo**](https://github.com/DHTMLX/vue-pivot-demo)를 참고하세요.
