---
sidebar_label: DHTMLX MCP 서버
title: config, 집계, 내보내기를 위한 DHTMLX Pivot MCP 서버
description: DHTMLX Pivot의 config, 집계 메서드, 프레디케이트, 내보내기 API는 MCP 서버를 통해 학습 데이터의 추측이 아니라 최신 문서로 AI 어시스턴트에 전달됩니다.
---

# DHTMLX Pivot MCP 서버: 구성, 집계, 내보내기

DHTMLX Pivot은 [하나의 config 객체](api/config/config-property.md)를 완전히 집계된 테이블로 변환하며, 데이터를 내보내거나 트리 행을 확장하기 위한 완전히 별개의 API인 [기반이 되는 Table 위젯](api/methods/gettable-method.md)도 함께 제공합니다. 레이아웃 변경과 테이블 전체 다시 그리기는 각각 고유한 이벤트를 발생시킵니다. [레이아웃 편집](api/events/update-config-event.md)은 하나를 발생시키고, [그 내부에서 일어나는 모든 다시 그리기](api/events/render-table-event.md)는 다른 하나를 발생시킵니다. 이 모든 것을 올바르게 처리하려면 오래된 추측이 아니라 최신 문서가 필요합니다.

대신 DHTMLX MCP 서버에 질의하세요. 서버는 현재의 [`config` 형태](api/config/config-property.md), [getTable()를 통한 내보내기 경로](guides/exporting-data.md), [저장에 사용할 올바른 이벤트](/guides/working-with-server#save-the-users-layout-to-resume-the-session)를 반환하므로, 어시스턴트는 Pivot이 오늘날 실제로 동작하는 방식과 일치하는 코드를 생성합니다.

### MCP 엔드포인트

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
DHTMLX MCP 서버는 DHTMLX Pivot뿐만 아니라 모든 주요 DHTMLX 제품을 다룹니다. 어떤 DHTMLX 컴포넌트로 개발하든 동일한 엔드포인트와 설정 지침을 사용할 수 있습니다.
:::

## Pivot 개발자가 MCP 서버에 묻는 것

MCP 서버는 DHTMLX Pivot 문서에 관한 거의 모든 것을 알려줄 수 있습니다. 예를 들면 다음과 같습니다.

- [메서드](api/overview/methods-overview.md), [이벤트](api/overview/events-overview.md), [속성](api/overview/properties-overview.md)에 대한 최신 API를 조회하며, 여기에는 [Event Bus](api/overview/internal-eventbus-overview.md) 및 [State](api/overview/internal-state-overview.md) 메서드도 포함됩니다.
- 특정 테이블에 필요한 `fields`, `data`, [`config`](api/config/config-property.md) 형태를 갖춘, 바로 실행 가능한 [초기화](guides/initialization.md) 코드를 생성합니다.
- `config` 속성에서 [행, 열, 값](guides/working-with-data.md#define-pivot-structure)을 정의하며, `values` 항목에 허용되는 두 가지 형태를 모두 다룹니다.
- 내장된 `sum`/`count`/`average` 세트부터 [`methods`](api/config/methods-property.md) 속성으로 추가한 커스텀 메서드까지, [집계 메서드](guides/working-with-data.md#applying-maths-methods)를 선택하거나 직접 작성합니다.
- 날짜를 월별로 그룹화하는 등, 집계 전에 [프레디케이트](guides/working-with-data.md#processing-data-with-predicates)로 데이터를 전처리합니다.
- [`tableShape`](api/config/tableshape-property.md)와 [`headerShape`](api/config/headershape-property.md)를 통해 테이블 셀의 크기 조정, 고정, 템플릿 적용을 수행하며, [트리 모드](guides/configuration.md#enabling-the-tree-mode)와 [열 고정](guides/configuration.md#freezing-columns)도 포함됩니다.
- 레이블과 날짜/숫자 형식을 [로컬라이징](guides/localization.md)하고, `--wx-pivot-*` CSS 변수로 테이블을 [스타일링](guides/stylization.md)합니다.
- [`getTable()`](api/methods/gettable-method.md)이 반환하는 Table 인스턴스를 통해 테이블을 CSV 또는 XLSX로 [내보냅니다](guides/exporting-data.md).
- [서버에 상태를 저장할 때](/guides/working-with-server) [`update-config`](api/events/update-config-event.md)와 [`render-table`](api/events/render-table-event.md) 중 무엇을 사용할지 결정하거나, Pivot을 [React](guides/integration-with-react.md), [Vue](guides/integration-with-vue.md), [Angular](guides/integration-with-angular.md), [Svelte](guides/integration-with-svelte.md)와 통합합니다.

## Pivot 질문이 MCP에서 처리되는 방식

DHTMLX MCP 서버로 전송된 Pivot 질문은 Model Context Protocol(MCP) 위에 구축된 Retrieval-Augmented Generation(RAG) 파이프라인을 거쳐 두 가지 워크플로 중 하나로 처리됩니다. 하나는 어시스턴트가 작성에 참고할 일치하는 레퍼런스 페이지를 반환하는 *Search*이고, 다른 하나는 그 페이지를 읽고 직접 질문에 답하는 *Inference*입니다. 이 요청 중 문서 조회가 필요한 부분은 절반뿐입니다. 어시스턴트는 그 절반을 정확히 짚어내고, 나머지인 서버별 저장 로직은 이미 알고 있는 지식을 바탕으로 작성합니다.

다음 프롬프트를 살펴보겠습니다. *"레이아웃이 변경될 때마다 Pivot config를 서버에 저장하는 핸들러를 작성하세요."*:

1. 어시스턴트는 문서가 필요한 절반을 표시합니다. 어떤 이벤트를 수신할지, 현재 config를 어떻게 읽을지입니다.
2. 서버는 이에 매핑되는 [working-with-server](/guides/working-with-server) 문서를 찾아냅니다.
3. 요청이 코드 생성이므로 *Search*가 이를 처리합니다(`render-table`이 `update-config`보다 더 자주 발생하는지와 같은 더 좁은 질문이라면 대신 *Inference*로 갑니다).
4. *Search*는 현재 Pivot 문서의 벡터 인덱스에서 일치하는 페이지를 가져옵니다.
5. 어시스턴트는 해당 페이지를 컨텍스트로 받습니다.
6. 그 컨텍스트를 바탕으로 어시스턴트는 [`update-config`](api/events/update-config-event.md) 리스너를 작성하면서 `render-table`의 더 잦은 발생을 올바르게 건너뛰고, 대상 서버로 보내는 실제 저장 요청은 자신의 지식을 바탕으로 추가합니다.

이런 방식으로 Pivot의 집계 및 내보내기 코드는 최신 API와 일치된 상태를 유지합니다.

## AI 도구를 MCP 서버에 연결하기

Pivot과 함께 어떤 AI 개발 도구를 사용하든, MCP 서버에 연결하는 작업은 한 단계로 요약됩니다. CLI 명령이나 JSON 설정 파일을 통해 아래 엔드포인트 URL을 지정하는 것입니다.

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

널리 사용되는 도구별 설정 방법은 다음과 같습니다.

### Claude Code

:::info
Claude Code의 [공식 문서](https://code.claude.com/docs/en/mcp)에서 모든 MCP 설정 경로를 확인할 수 있습니다.
:::

명령줄에서 서버를 등록하려면 다음을 실행하세요.

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

CLI가 없다면 `.mcp.json`에 다음 설정을 직접 추가하세요.

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Cursor

:::info
MCP 설정 옵션의 전체 목록은 Cursor의 [공식 문서](https://cursor.com/en-US/docs/mcp)를 참조하세요.
:::

서버를 추가하는 단계:

1. 설정을 엽니다(Mac에서는 `Cmd+Shift+J`, Windows/Linux에서는 `Ctrl+Shift+J`)
2. **Tools & MCP**로 이동합니다
3. **Add Custom MCP**를 클릭합니다
4. 다음 설정을 붙여넣습니다.

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Google Antigravity

#### Antigravity 2.0

:::info
Antigravity에서 MCP 서버 통합에 대한 전체 내용은 [공식 문서](https://antigravity.google/docs/mcp)에서 확인할 수 있습니다.
:::

DHTMLX MCP 서버를 Google Antigravity와 연결하기 위해 완료해야 할 단계는 다음과 같습니다.

1. 커맨드 팔레트를 엽니다
2. "mcp add"를 입력합니다
3. "HTTP"를 선택합니다
4. 다음 값을 입력합니다.
- 이름:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI

:::info
Gemini CLI에서 Antigravity CLI로 마이그레이션할 때 변경되는 사항은 [관련 가이드](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes)에서 설명합니다.
:::

DHTMLX MCP 서버를 Antigravity CLI에 연결하려면 다음 위치 중 한 곳에 `mcp_config.json`을 생성하세요.

- 전역: `~/.gemini/config/mcp_config.json`
- 워크스페이스: `.agents/mcp_config.json`

다음 설정을 추가하세요.

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

그런 다음 터미널에서 `agy`를 실행하세요.

### ChatGPT

:::info
ChatGPT에서 MCP 커넥터를 설정하는 모든 단계는 [공식 문서](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)를 참조하세요.
:::

커넥터를 구성하는 단계:

1. **Settings** → **Apps & Connectors**로 이동합니다
2. **Advanced settings**를 클릭합니다
3. **Developer mode**를 활성화합니다
4. **Apps & Connectors**로 돌아가 "Create"를 클릭합니다
5. 커넥터 세부 정보를 입력합니다.
- 이름:
~~~jsx
dhtmlx-mcp
~~~
- URL:
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- 인증: `No authentication`
6. **Create**를 클릭합니다

커넥터를 생성하면 ChatGPT는 대화 중에 MCP 서버에서 문서를 가져옵니다.

:::info
집중적인 코딩 워크플로에는 MCP를 지원하는 다른 도구가 더 적합할 수 있습니다.
:::

### 기타 도구

다른 AI 코딩 도구의 설정 패널에서는 이를 "Model Context Protocol" 또는 "Context Sources"라고 부르는 경우가 많습니다. 해당 위치에 `https://docs.dhtmlx.com/mcp`를 커스텀 소스로 추가하세요.

## 쿼리가 전송되는 위치

호스팅 서비스인 MCP 서버는 사용자의 하드웨어에서 실행되지 않으며, 로컬 파일을 열지 않고, 개인 정보를 저장하지 않습니다.

서버는 문제를 디버깅하고 서비스를 개선하기 위한 목적으로만 쿼리를 기록합니다.

쿼리 기록을 완전히 끄려면 상용 배포를 요청하세요. `info@dhtmlx.com`으로 문의하여 조율할 수 있습니다.

## Pivot을 제대로 다루는 프롬프트

프롬프트는 대개 config, 집계, 레이아웃, 서버 동기화라는 네 가지 주제 중 하나를 다룹니다. 아래 그룹은 이를 미리 명시해 줍니다.

**Config와 집계**

~~~
How do I add a custom aggregation method in DHTMLX Pivot? Use the docs.
~~~
~~~
How do I set a default sort order for a field in DHTMLX Pivot?
~~~
~~~
What's the difference between the two accepted forms of a values entry in the config property?
~~~

**프레디케이트와 필드**

~~~
How do I group date values by month using a custom predicate in DHTMLX Pivot?
~~~
~~~
How do I apply a currency format with a dollar-sign prefix to a numeric field?
~~~

**레이아웃과 스타일링**

~~~
How do I freeze the first two row fields on the left in DHTMLX Pivot?
~~~
~~~
How do I enable tree mode in DHTMLX Pivot and choose which field becomes the parent row?
~~~
~~~
How do I change the hover color for primary buttons in the Material theme?
~~~

**서버 동기화와 내보내기**

~~~
How do I save the user's layout to a server whenever they change it?
~~~
~~~
How do I export the Pivot table to XLSX?
~~~

## Pivot 프롬프트를 위한 간단한 팁

- **어떤 API를 의미하는지 명시하세요.** `export`, 트리 행 확장/축소, 행 기준 필터링은 모두 Pivot 인스턴스가 아니라 `getTable()`이 반환하는 Table 인스턴스를 통해 동작합니다. 이 계층을 명확히 지정하면 어시스턴트가 Table 전용 메서드를 잘못된 객체에서 호출하는 일을 방지할 수 있습니다.
- **메서드와 프레디케이트를 구분하세요.** 집계 메서드(`sum`, `count`, `methods`의 커스텀 항목)는 이미 행이나 열에 있는 값을 요약합니다. 프레디케이트는 그룹화가 일어나기 전에 원시 값을 변환합니다. 프롬프트가 어느 단계를 대상으로 하는지 명시하세요.
- **원하는 `values` 항목 형태를 명확히 표현하세요.** `values` 항목은 `"method(field)"` 문자열이거나 `{ field, method }` 객체일 수 있습니다. 사용 중인 형태를 명시하면 어시스턴트가 세 번째 형태를 임의로 만들어내는 것을 막을 수 있습니다.
- **"Use the docs"를 추가하세요.** `update-config`와 `render-table`의 차이를 물어볼 때 이렇게 하세요. 이 둘은 서로 다른 빈도로 발생하며, 이런 차이는 오래된 학습 데이터가 놓치기 쉬운 바로 그런 종류의 세부 사항입니다.
