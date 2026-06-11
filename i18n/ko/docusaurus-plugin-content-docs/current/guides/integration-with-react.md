---
sidebar_label: React와의 통합
title: React와의 통합
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 React와의 통합에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Pivot 30일 무료 평가판을 다운로드하세요.
---

# React와의 통합 {#integration-with-react}

:::tip
[**React**](https://react.dev)의 기본 개념과 패턴에 익숙하다고 가정합니다. 복습이 필요하다면 [**React 문서**](https://react.dev/learn)를 참고하세요.
:::

DHTMLX Pivot은 일반 컴포넌트로 **React**와 통합됩니다. 완전한 동작 예제는 [**GitHub의 React Pivot 데모**](https://github.com/DHTMLX/react-pivot-demo)를 참고하세요.

## 프로젝트 생성 {#create-a-project}

:::info
시작하기 전에 [**Node.js**](https://nodejs.org/en/)를 설치하세요. [**Vite**](https://vite.dev/)는 선택 사항입니다.
:::

*my-react-pivot-app*이라는 이름으로 기본 **React** 프로젝트(또는 Vite 기반 프로젝트)를 생성합니다.

다음 명령어로 Create React App 프로젝트를 부트스트랩합니다:

~~~bash
npx create-react-app my-react-pivot-app
~~~

### 의존성 설치 {#install-dependencies}

새 프로젝트 디렉토리로 이동합니다:

~~~bash
cd my-react-pivot-app
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

앱이 로컬 포트(예: `http://localhost:3000`)에서 실행됩니다.

## Pivot 생성 {#create-pivot}

프로젝트에 Pivot 패키지를 추가한 후 Pivot을 React 컴포넌트로 래핑합니다.

### 1단계. 패키지 설치 {#step-1-install-the-package}

[**Pivot 평가판 패키지**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn)를 다운로드하고 README의 단계를 따르세요. Pivot 평가판 패키지는 30일간 유효합니다.

### 2단계. 컴포넌트 생성 {#step-2-create-the-component}

Pivot을 마운트하는 React 컴포넌트를 생성합니다. *src/Pivot.jsx* 파일을 새로 추가합니다.

#### 소스 파일 가져오기 {#import-source-files}

*src/Pivot.jsx*를 열고 Pivot 소스 파일을 가져옵니다. 가져오기 경로는 패키지 에디션에 따라 다릅니다:

- **PRO 버전** (로컬 폴더에서 설치):

~~~jsx title="Pivot.jsx"
import { Pivot } from 'dhx-pivot-package';
import 'dhx-pivot-package/dist/pivot.css';
~~~

패키지에 최소화된 에셋이 포함된 경우 *pivot.css* 대신 *pivot.min.css*를 가져옵니다.

- **평가판**:

~~~jsx title="Pivot.jsx"
import { Pivot } from '@dhx/trial-pivot';
import "@dhx/trial-pivot/dist/pivot.css";
~~~

이 튜토리얼에서는 Pivot 평가판을 사용합니다.

#### 컨테이너 설정 및 Pivot 마운트 {#set-up-the-container-and-mount-pivot}

페이지에 Pivot을 표시하려면 컨테이너 `div`를 생성한 후 생성자를 사용하여 `useEffect` hook에서 Pivot을 초기화합니다.

다음 코드 스니펫은 최소한의 Pivot React 컴포넌트를 정의합니다:

~~~jsx {2,6,9-10} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css"; // Pivot 스타일 포함

export default function PivotComponent(props) {
    let container = useRef(); // Pivot용 컨테이너 ref

    useEffect(() => {
        // Pivot 컴포넌트 초기화
        const table = new Pivot(container.current, {});

        return () => {
            table.destructor(); // 언마운트 시 Pivot 제거
        };
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

#### 스타일 추가 {#add-styles}

Pivot을 올바르게 렌더링하려면 프로젝트의 메인 CSS 파일에 다음 스타일을 추가합니다:

~~~css title="index.css"
/* 초기 페이지 스타일 */
html,
body,
#root {
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

*src/App.js*를 열고 데이터를 가져온 후 `<Pivot/>` 컴포넌트에 props로 전달합니다:

~~~jsx {2,5-6} title="App.js"
import Pivot from "./Pivot";
import { getData } from "./data";

function App() {
    const { fields, dataset } = getData();
    return <Pivot fields={fields} dataset={dataset} />;
}

export default App;
~~~

*src/Pivot.jsx*를 열고 props를 구조 분해하여 Pivot 설정 객체에 적용합니다:

~~~jsx {5,10-11} title="Pivot.jsx"
import { useEffect, useRef } from "react";
import { Pivot } from "@dhx/trial-pivot";
import "@dhx/trial-pivot/dist/pivot.css";

export default function PivotComponent({ fields, dataset }) {
    let container = useRef(); 

    useEffect(() => {
        const table = new Pivot(container.current, {
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

        return () => {
            table.destructor();
        }
    }, []);

    return <div ref={container} className="widget"></div>;
}
~~~

이제 컴포넌트를 사용할 준비가 되었습니다. 마운트 시 Pivot은 제공된 데이터로 렌더링됩니다. 전체 설정 속성 목록은 [Pivot API 문서](api/overview/properties-overview.md)를 참고하세요.

#### 이벤트 처리 {#handle-events}

Pivot에서 발생하는 사용자 동작은 구독할 수 있는 이벤트를 발생시킵니다. 전체 이벤트 목록은 [이벤트 개요](api/overview/events-overview.md)를 참고하세요.

다음 코드 스니펫은 사용자가 필터를 열 때 필드 ID를 로그에 기록하는 `open-filter` 이벤트 리스너를 `useEffect`에 추가합니다:

~~~jsx {19-21} title="Pivot.jsx"
// ...
useEffect(() => {
    const table = new Pivot(container.current, {
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
    
    return () => {
        table.destructor();
    }
}, []);
// ...
~~~

앱을 시작하면 페이지에 Pivot이 데이터를 렌더링하는 것을 확인할 수 있습니다.

![Pivot 초기화](../assets/trial_pivot.png)

이제 Pivot이 React와 통합되었습니다. 프로젝트 요구 사항에 맞게 설정을 사용자 정의하세요. 최종 예제는 [**GitHub의 react-pivot-demo**](https://github.com/DHTMLX/react-pivot-demo)를 참고하세요.
