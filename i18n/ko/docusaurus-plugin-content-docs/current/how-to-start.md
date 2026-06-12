---
sidebar_label: 시작하는 방법
title: 시작하는 방법
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 DHTMLX Pivot 작업을 시작하는 방법을 알아보세요. 개발자 가이드와 API 레퍼런스를 탐색하고, 코드 예제와 라이브 데모를 체험하며, DHTMLX Pivot의 무료 30일 평가판을 다운로드하세요.
---

# 시작하는 방법

이 명확하고 포괄적인 튜토리얼은 페이지에 완전한 기능을 갖춘 Pivot를 구성하기 위해 필요한 단계를 안내합니다.

![구성 패널과 데이터 테이블을 보여주는 DHTMLX Pivot 인터페이스](/assets/pivot_main.png)

## 1단계. 패키지 다운로드 및 설치 {#step-1-downloading-and-installing-packages}

[패키지를 다운로드](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml)하여 프로젝트 폴더에 압축을 푸세요.

`yarn` 또는 `npm` 패키지 매니저를 사용하여 JavaScript Pivot을 프로젝트에 가져올 수 있습니다.

:::info
Pivot을 React, Angular, Svelte 또는 Vue 프로젝트에 통합하려면 해당 [**통합 가이드**](/category/integration-with-frameworks/)를 참조하세요.
:::

### npm 또는 yarn을 통한 체험판 Pivot 설치 {#installing-trial-pivot-via-npm-or-yarn}

:::info
체험판 Pivot을 사용하려면 [**체험판 Pivot 패키지**](https://dhtmlx.com/docs/products/dhtmlxPivot/download.shtml)를 다운로드하고 *README* 파일에 안내된 단계를 따르세요. 체험판 Pivot은 30일 동안만 사용 가능합니다.
:::

### npm 또는 yarn을 통한 PRO Pivot 설치 {#installing-pro-pivot-via-npm-or-yarn}

:::info
[고객 전용 영역](https://dhtmlx.com/clients/)에서 **npm** 로그인 및 비밀번호를 생성하여 DHTMLX 개인 **npm**에 직접 접근할 수 있습니다. 자세한 설치 가이드도 해당 페이지에서 확인할 수 있습니다. 개인 **npm** 접근은 독점 Pivot 라이선스가 활성 상태인 동안에만 가능합니다.
:::

## 2단계. 소스 파일 포함 {#step-2-including-source-files}

HTML 파일을 생성하고 *index.html*로 이름을 지정하는 것부터 시작하세요. 그런 다음 Pivot 소스 파일을 생성한 파일에 포함합니다.

두 가지 필수 파일이 있습니다:

- Pivot의 JS 파일
- Pivot의 CSS 파일

~~~html {5-6} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Pivot</title>
        <script src="./dist/pivot.js"></script>   
        <link href="./dist/pivot.css" rel="stylesheet">
    </head>
    <body>
        <script>
        // 여기에 코드를 작성하세요
        </script>
    </body>
</html>
~~~

## 3단계. Pivot 생성 {#step-3-creating-pivot}

이제 페이지에 Pivot을 추가할 준비가 되었습니다. 먼저 Pivot을 위한 DIV 컨테이너를 생성합니다.

~~~html {} title="index.html"
<!DOCTYPE html>
<html>
    <head>
        <title>How to Start with Pivot</title>
        <script src="./dist/pivot.js"></script>   
        <link href="./dist/pivot.css" rel="stylesheet">  
    </head>
    <body>
        <div id="root"></div>
        <script>
            const table = new pivot.Pivot("#root", {
                // 구성 속성
            });
        </script>
    </body>
</html>
~~~

## 4단계. Pivot 구성 {#step-4-configuring-pivot}

다음으로 Pivot 컴포넌트가 초기화될 때 가질 구성 속성을 지정할 수 있습니다.

Pivot 작업을 시작하려면 먼저 초기 데이터를 제공해야 합니다. 아래 예제는 다음과 같은 Pivot을 생성합니다:

- *studio* 및 *genre*에 대한 행
- *title* 열
- *max* 방법을 사용한 *score*의 값 집계

**fields** 배열은 필드 ID, 표시 레이블, 데이터 타입을 정의하는 데 필요합니다.

**data** 배열은 Pivot 위젯에 표시될 실제 데이터를 포함해야 합니다. 배열의 각 객체는 테이블의 행을 나타냅니다.

**config** 객체는 Pivot 테이블의 구조를 정의합니다. 즉, 어떤 필드가 테이블의 행과 열로 적용되고 어떤 데이터 집계 방법이 필드에 적용되어야 하는지를 지정합니다.

~~~jsx
const table = new pivot.Pivot("#root", {
    //configuration properties
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: ["title"],
        values: [
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

## 다음 단계 {#whats-next}

이것으로 완료입니다. 이 간단한 단계만으로 데이터 분석에 유용한 도구를 갖추게 되었습니다. 이제 작업을 시작하거나 JavaScript Pivot의 내부 세계를 계속 탐색할 수 있습니다:

- [가이드](/category/guides) 페이지는 설치, 데이터 로딩, 스타일링 및 Pivot 구성을 원활하게 진행하는 데 도움이 되는 기타 유용한 팁에 대한 지침을 제공합니다
- [API 레퍼런스](api/overview/main-overview.md)는 Pivot 기능에 대한 설명을 제공합니다
