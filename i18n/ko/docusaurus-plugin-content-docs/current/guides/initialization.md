---
sidebar_label: 초기화
title: 초기화
description: DHTMLX JavaScript Pivot 라이브러리 문서에서 초기화에 대해 알아볼 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 체험해 보세요. DHTMLX Pivot의 무료 30일 평가판도 다운로드할 수 있습니다.
---

# 초기화 {#initialization}

이 가이드는 페이지에 Pivot을 생성하고 애플리케이션에 Pivot 테이블 기능을 추가하는 방법을 설명합니다. 다음 단계를 따라 사용 가능한 컴포넌트를 준비하세요:

1. [페이지에 Pivot 소스 파일 포함하기](#include-source-files).
2. [Pivot을 위한 컨테이너 생성하기](#create-a-container).
3. [생성자로 Pivot 초기화하기](#initialize-pivot).

## 소스 파일 포함 {#include-source-files}

Pivot 앱은 페이지에 두 개의 소스 파일이 필요합니다. 패키지 다운로드 방법은 [패키지 다운로드](how-to-start.md#step-1-downloading-and-installing-packages)를 참조하세요.

다음 파일을 포함하세요:

- *pivot.js*
- *pivot.css*

소스 파일에 대한 올바른 상대 경로를 설정하세요:

~~~html title="index.html"
<script type="text/javascript" src="./dist/pivot.js"></script>  
<link rel="stylesheet" href="./dist/pivot.css">
~~~

## 컨테이너 생성 {#create-a-container}

Pivot은 HTML 컨테이너 요소에 렌더링됩니다. 컨테이너를 추가하고 ID를 지정하세요. 예를 들어 *"root"*:

~~~html title="index.html"
<div id="root"></div>
~~~

## Pivot 초기화 {#initialize-pivot}

`pivot.Pivot` 생성자는 두 개의 매개변수를 받습니다:

- HTML 컨테이너의 ID
- 구성 속성이 담긴 객체

다음 코드 스니펫은 초기 필드, 데이터, 구조를 포함한 Pivot 인스턴스를 *"root"* 컨테이너에 생성합니다:

~~~jsx
// Pivot 생성
const table = new pivot.Pivot("#root", {
    // 구성 속성
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

생성자는 Pivot 인스턴스를 반환합니다. 반환된 인스턴스에서 API 메서드를 호출하세요:

- [`getTable`](api/methods/gettable-method.md) — 기반 Table 위젯 인스턴스에 접근합니다
- [`setConfig`](api/methods/setconfig-method.md) — 현재 Pivot 구성을 업데이트합니다
- [`setLocale`](api/methods/setlocale-method.md) — Pivot에 새 로케일을 적용합니다
- [`showConfigPanel`](api/methods/showconfigpanel-method.md) — 구성 패널을 표시하거나 숨깁니다

## 구성 속성 {#configuration-properties}

Pivot 생성자는 데이터, 레이아웃, 동작을 제어하는 구성 속성이 담긴 객체를 받습니다.

:::info
Pivot을 구성하기 위한 전체 속성 목록은 [속성 개요](api/overview/properties-overview.md)를 참조하세요.
:::

## 예제 {#example}

아래 스니펫은 초기 데이터로 Pivot을 초기화합니다:

<iframe src="https://snippet.dhtmlx.com/y2buoahe?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe>
