# Translation Glossary — All documentation template phrases

Purpose: a single reference for translations of recurring template phrases in the documentation
([../docs/](../docs/)). Consult it when translating new articles and when reviewing localizations —
the wording and markdown markup (`**...**:`, `### ...`, full-width `：` for zh) must match verbatim.

The **canonical** (most frequent) variant is given.

---

## 1. Section labels (bold lead before a link)

Pivot puts the colon **outside** the bold markers (`**...**:`); zh uses a full-width colon `：`
(also outside the bold markers: `**...**：`).

Use the **singular** form when a single item is referenced, the **plural** form for a list of two or
more. ko/zh have no number inflection — the same label serves both. The number must agree with the
English source (e.g. `**Related sample**:` → singular, `**Related samples**:` → plural).

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `**Related article**:` | `**Связанная статья**:` | `**Verwandter Artikel**:` | `**관련 문서**:` | `**相关文章**：` |
| `**Related articles**:` | `**Связанные статьи**:` | `**Verwandte Artikel**:` | `**관련 문서**:` | `**相关文章**：` |
| `**Related sample**:` | `**Связанный пример**:` | `**Verwandtes Beispiel**:` | `**관련 샘플**:` | `**相关示例**：` |
| `**Related samples**:` | `**Связанные примеры**:` | `**Verwandte Beispiele**:` | `**관련 샘플**:` | `**相关示例**：` |
| `**Related API**:` | `**Связанное API**:` | `**Verwandte API**:` | `**관련 API**:` | `**相关 API**：` |

ko: `관련 문서` is canonical for *article(s)*; the variants `관련 아티클` and `관련 글` should be
normalized to `관련 문서`. `관련 샘플` is canonical for *sample(s)*.

## 2. Section headings

Headings keep the original English slug as a `{#...}` anchor (e.g. `### Описание {#description}`) so
cross-page `#anchor` links stay valid — only the visible title is translated. The explicit `{#id}`
must match the English auto-slug **exactly**.

**API-page template:**

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `### Description` | `### Описание` | `### Beschreibung` | `### 설명` | `### 描述` |
| `### Usage` | `### Использование` | `### Verwendung` | `### 사용법` | `### 用法` |
| `### Example` | `### Пример` | `### Beispiel` | `### 예제` | `### 示例` |
| `### Parameters` | `### Параметры` | `### Parameter` | `### 파라미터` | `### 参数` |
| `### Returns` | `### Возвращает` | `### Rückgabewert` | `### 반환값` | `### 返回值` |
| `### Default config` | `### Конфигурация по умолчанию` | `### Standardkonfiguration` | `### 기본 설정` | `### 默认配置` |

- ko: `파라미터` is canonical for *Parameters* in **headings**; the variant `매개변수` in headings
  should be normalized to `파라미터` (running prose that uses `매개변수` grammatically is left as is).
- ru: `Возвращает` is canonical for *Returns*; the longer `Возвращаемое значение` should be
  normalized.

**Changelog headings (`news/whats-new.md`, `news/migration.md`):**

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `### New functionality` | `### Новая функциональность` | `### Neue Funktionalität` | `### 새로운 기능` | `### 新功能` |
| `### New API` | `### Новый API` | `### Neue API` | `### 새로운 API` | `### 新增 API` |
| `### Changed API` | `### Изменённое API` | `### Geänderte API` | `### 변경된 API` | `### 变更的 API` |
| `### Removed API` | `### Удалённое API` | `### Entfernte API` | `### 제거된 API` | `### 已移除的 API` |
| `### Fixes` | `### Исправления` | `### Fehlerbehebungen` | `### 수정 사항` | `### 修复` |
| `### Breaking change` | `### Критическое изменение` | `### Breaking Change` | `### 주요 변경 사항` | `### 破坏性变更` |
| `### Breaking changes` | `### Критические изменения` | `### Breaking Changes` | `### 주요 변경 사항` | `### 破坏性变更` |
| `### Important features` | `### Важные возможности` | `### Wichtige Features` | `### 중요 기능` | `### 重要功能` |

Migration sub-headings (`####` under *Changed API*):

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `#### Properties` | `#### Свойства` | `#### Eigenschaften` | `#### 속성` | `#### 属性` |
| `#### Events` | `#### События` | `#### Ereignisse` | `#### 이벤트` | `#### 事件` |

`API` stays the Latin `API` in every changelog heading (never the Cyrillic `АПИ`).

**Navigation heading:**

| EN | ru | de | ko | zh |
|---|---|---|---|---|
| `## What's next` | `## Что дальше` | `## Wie geht es weiter?` | `## 다음 단계` | `## 下一步` |

## 3. Admonition block titles (`:::note`, `:::tip` …)

Pivot uses **bare** admonitions (`:::note`, `:::tip`, … with no explicit `[Title]`), so the visible
title comes entirely from the `theme.admonition.*` keys of `i18n/<locale>/code.json` — those keys are
the single source of truth and must match the table below. The block **type** is never translated.
Canon: **capitalized first letter**, with each type distinct (no `caution`/`warning` duplicates).

| Type | ru | de | ko | zh |
|---|---|---|---|---|
| `:::note` | `Примечание` | `Hinweis` | `참고` | `注意` |
| `:::tip` | `Совет` | `Tipp` | `팁` | `提示` |
| `:::info` | `Информация` | `Info` | `정보` | `信息` |
| `:::warning` | `Предупреждение` | `Warnung` | `경고` | `警告` |
| `:::caution` | `Осторожно` | `Vorsicht` | `주의` | `谨慎` |
| `:::important` | `Важно` | `Wichtig` | `중요` | `重要` |
| `:::danger` | `Опасно` | `Gefahr` | `위험` | `危险` |

Only `:::note`, `:::tip`, `:::info` and `:::important` are currently used in the docs. There is no
`theme.admonition.important` key in `code.json` yet, so `:::important` falls back to the Docusaurus
default (English `Important`); add the key with the values above if a localized title is needed.

## 4. Do not translate

Keep these terms in English (Latin script) across all locales.

**Product & modules:**
- `Pivot` — the widget/product name (e.g. "DHTMLX Pivot"). *The generic concept* — a pivot table —
  may be localized; only the product/widget name stays `Pivot`.
- `DHTMLX`, `dhx` (the `dhx.*` code namespace)
- `Event Bus` — the module name. Keep the English spelling; German may hyphenate it inside a compound
  (`Event-Bus-Methoden`). Do not localize it (ru `шина событий`, zh `事件总线`, ko `이벤트 버스` →
  `Event Bus`).

**Frameworks & libraries:**
- `React`, `Vue`, `Svelte`, `Angular`

**Runtime, languages & tooling:**
- `Node.js`, `Vite`
- `JavaScript`, `TypeScript`
- `npm`, `yarn`, `CLI`

**Data formats:**
- `JSON`

**Services:**
- `GitHub`, `CDN`

**Other:**
- `API` — always the Latin `API`, never the Cyrillic transliteration `АПИ`.
- Code identifiers (method / config / event names, `dhx.*`) inside backticks are never translated.
