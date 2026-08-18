---
sidebar_label: DHTMLX MCP 服务器
title: 用于 config、聚合和导出的 DHTMLX Pivot MCP 服务器
description: 通过 MCP 服务器，DHTMLX Pivot 的 config、聚合方法、谓词和导出 API 以最新文档的形式提供给 AI 助手，而不是训练时产生的推测。
---

# DHTMLX Pivot MCP 服务器：配置、聚合和导出 {#dhtmlx-pivot-mcp-server-configuration-aggregation-and-export}

DHTMLX Pivot 将[一个配置对象](api/config/config-property.md)转换为完全聚合的表格，并开放了整个第二套 API——[底层的 Table widget](api/methods/gettable-method.md)，用于导出数据或展开树形行。布局更改和完整表格重绘各自触发自己的事件：[布局编辑](api/events/update-config-event.md)触发其中一个，而[底层的每一次重绘](api/events/render-table-event.md)触发另一个。要做对这一切，靠的是最新文档，而不是过时的猜测。

不妨改为查询 DHTMLX MCP 服务器：它会返回当前的 [`config` 结构](api/config/config-property.md)、[通过 getTable() 的导出路径](guides/exporting-data.md)，以及[用于持久化的正确事件](/guides/working-with-server#save-the-users-layout-to-resume-the-session)，从而让助手生成的代码与 Pivot 当前实际的行为方式相匹配。

### MCP 端点 {#mcp-endpoint}

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

:::note
DHTMLX MCP 服务器覆盖了所有主要的 DHTMLX 产品，而不仅仅是 DHTMLX Pivot。无论您使用哪个 DHTMLX 组件进行开发，相同的端点和配置说明都同样适用。
:::

## Pivot 开发者向 MCP 服务器提出的问题 {#what-pivot-developers-ask-the-mcp-server}

MCP 服务器几乎可以告诉您关于 DHTMLX Pivot 文档的一切，从以下内容开始：

- 查阅当前的 [方法](api/overview/methods-overview.md)、[事件](api/overview/events-overview.md)和[属性](api/overview/properties-overview.md) API，包括 [Event Bus](api/overview/internal-eventbus-overview.md) 和[状态](api/overview/internal-state-overview.md)方法。
- 生成可直接运行的[初始化](guides/initialization.md)代码，包含特定表格所需的 `fields`、`data` 和 [`config`](api/config/config-property.md) 结构。
- 在 `config` 属性中定义[行、列和值](guides/working-with-data.md#define-pivot-structure)，包括 `values` 条目所接受的两种形式。
- 选择或编写[聚合方法](guides/working-with-data.md#applying-maths-methods)，从内置的 `sum`/`count`/`average` 集合，到通过 [`methods`](api/config/methods-property.md) 属性添加的自定义方法。
- 在聚合之前使用[谓词](guides/working-with-data.md#processing-data-with-predicates)对数据进行预处理，例如按月对日期进行分组。
- 通过 [`tableShape`](api/config/tableshape-property.md) 和 [`headerShape`](api/config/headershape-property.md) 调整表格单元格的大小、冻结和模板化，包括[树形模式](guides/configuration.md#enabling-the-tree-mode)和[冻结列](guides/configuration.md#freezing-columns)。
- [本地化](guides/localization.md)标签及日期/数字格式，并通过 `--wx-pivot-*` CSS 变量为表格设置[样式](guides/stylization.md)。
- 通过 [`getTable()`](api/methods/gettable-method.md) 返回的 Table 实例，将表格[导出](guides/exporting-data.md)为 CSV 或 XLSX 格式。
- 在[将状态持久化到服务器](/guides/working-with-server)时，在 [`update-config`](api/events/update-config-event.md) 和 [`render-table`](api/events/render-table-event.md) 之间做出选择，或将 Pivot 与 [React](guides/integration-with-react.md)、[Vue](guides/integration-with-vue.md)、[Angular](guides/integration-with-angular.md) 和 [Svelte](guides/integration-with-svelte.md) 集成。

## Pivot 问题在 MCP 中的去向 {#where-a-pivot-question-lands-in-mcp}

发送到 DHTMLX MCP 服务器的 Pivot 问题会经过一条基于 Model Context Protocol（MCP）构建的检索增强生成（RAG）流水线，并落入两种工作流之一：*Search*，返回匹配的参考页面供助手据此编写代码；或 *Inference*，直接读取这些页面并自行回答问题。这类请求中只有一半需要查阅文档。助手会精确定位出这一半，其余部分——即特定于服务器的保存逻辑——则依靠自身已有的知识来编写。

以提示词 *"编写一个处理程序，在每次布局更改时将 Pivot 的 config 保存到服务器。"* 为例：

1. 助手划定出需要查阅文档的那一半：应监听哪个事件，以及如何读取当前的 config。
2. 服务器定位到其映射的[与服务器配合使用](/guides/working-with-server)文档。
3. 由于该请求需要生成代码，因此由 *Search* 处理（而更细化的问题，例如 `render-table` 是否比 `update-config` 触发得更频繁，则会交给 *Inference* 处理）。
4. *Search* 从当前 Pivot 文档的向量索引中获取匹配的页面。
5. 助手将这些页面作为上下文获取回来。
6. 基于该上下文，助手编写 [`update-config`](api/events/update-config-event.md) 监听器，正确跳过触发更频繁的 `render-table`，然后依靠自身知识添加针对目标服务器的实际保存请求。

如此一来，Pivot 的聚合和导出代码便能始终与当前 API 保持一致。

## 将您的 AI 工具连接到 MCP 服务器 {#linking-your-ai-tool-to-the-mcp-server}

无论您在使用 Pivot 时搭配哪种 AI 开发工具，将其接入 MCP 服务器都只需一步：通过 CLI 命令或 JSON 配置文件，将其指向下面的端点 URL。

~~~jsx
https://docs.dhtmlx.com/mcp
~~~

以下是常用工具的具体设置说明。

### Claude Code {#claude-code}

:::info
Claude Code 的[官方文档](https://code.claude.com/docs/en/mcp)详细介绍了每一种 MCP 配置方式。
:::

要通过命令行注册该服务器，请运行：

~~~jsx
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
~~~

手头没有 CLI？请手动将以下配置添加到您的 `.mcp.json` 文件中：

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

### Cursor {#cursor}

:::info
有关完整的 MCP 配置选项，请参阅 Cursor 的[官方文档](https://cursor.com/en-US/docs/mcp)。
:::

添加服务器的步骤：

1. 打开设置（Mac 上按 `Cmd+Shift+J`，Windows/Linux 上按 `Ctrl+Shift+J`）
2. 进入 **Tools & MCP**
3. 点击 **Add Custom MCP**
4. 粘贴以下 config：

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

### Google Antigravity {#google-antigravity}

#### Antigravity 2.0 {#antigravity-20}

:::info
关于在 Antigravity 中集成 MCP 服务器的完整说明，请参阅[官方文档](https://antigravity.google/docs/mcp)。
:::

以下是将 DHTMLX MCP 服务器与 Google Antigravity 连接所需完成的步骤：

1. 打开命令面板
2. 输入 "mcp add"
3. 选择 "HTTP"
4. 提供以下值：
- Name：
~~~jsx
dhtmlx-mcp
~~~
- URL：
~~~jsx
https://docs.dhtmlx.com/mcp
~~~

#### Antigravity CLI {#antigravity-cli}

:::info
该[相关指南](https://antigravity.google/docs/gcli-migration#mcp-config-formatting-changes)说明了从 Gemini CLI 迁移到 Antigravity CLI 时会发生哪些变化。
:::

要将 DHTMLX MCP 服务器连接到 Antigravity CLI，请在以下位置之一创建 `mcp_config.json`：

- 全局：`~/.gemini/config/mcp_config.json`
- 工作区：`.agents/mcp_config.json`

添加以下配置：

~~~jsx
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "serverUrl": "https://docs.dhtmlx.com/mcp"
    }
  }
}
~~~

然后在终端中运行 `agy`。

### ChatGPT {#chatgpt}

:::info
有关在 ChatGPT 中设置 MCP 连接器的每一步操作，请参阅[官方文档](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)。
:::

配置连接器的步骤：

1. 进入 **Settings** → **Apps & Connectors**
2. 点击 **Advanced settings**
3. 启用 **Developer mode**
4. 返回 **Apps & Connectors** 并点击 "Create"
5. 填写连接器详情：
- Name：
~~~jsx
dhtmlx-mcp
~~~
- URL：
~~~jsx
https://docs.dhtmlx.com/mcp
~~~
- Authentication：`No authentication`
6. 点击 **Create**

创建连接器后，ChatGPT 会在对话过程中从 MCP 服务器提取文档。

:::info
对于高强度的编码工作流，其他支持 MCP 的工具可能更合适。
:::

### 其他工具 {#other-tools}

其他 AI 编码工具的设置面板通常将此功能称为 "Model Context Protocol" 或 "Context Sources"。请在其中将 `https://docs.dhtmlx.com/mcp` 添加为自定义源。

## 您的查询数据流向何处 {#where-your-queries-go}

作为一项托管服务，MCP 服务器从不在您的硬件上运行，从不打开本地文件，也从不存储个人信息。

服务器仅出于调试问题和改进服务的目的记录查询。

如需完全关闭查询日志记录，请申请商业部署。请联系 `info@dhtmlx.com` 进行安排。

## 让 Pivot 得到正确结果的提示词 {#prompts-that-get-pivot-right}

一条提示词通常涉及四件事之一：config、聚合、布局或服务器同步。下面的分组会预先为您点明这一点。

**Config 与聚合**

~~~
How do I add a custom aggregation method in DHTMLX Pivot? Use the docs.
~~~
~~~
How do I set a default sort order for a field in DHTMLX Pivot?
~~~
~~~
What's the difference between the two accepted forms of a values entry in the config property?
~~~

**谓词与字段**

~~~
How do I group date values by month using a custom predicate in DHTMLX Pivot?
~~~
~~~
How do I apply a currency format with a dollar-sign prefix to a numeric field?
~~~

**布局与样式**

~~~
How do I freeze the first two row fields on the left in DHTMLX Pivot?
~~~
~~~
How do I enable tree mode in DHTMLX Pivot and choose which field becomes the parent row?
~~~
~~~
How do I change the hover color for primary buttons in the Material theme?
~~~

**服务器同步与导出**

~~~
How do I save the user's layout to a server whenever they change it?
~~~
~~~
How do I export the Pivot table to XLSX?
~~~

## Pivot 提示词写作小贴士 {#small-tips-for-pivot-prompts}

- **说明您指的是哪个 API。** `export`、树形行的展开/折叠以及按行筛选，都是通过 `getTable()` 返回的 Table 实例运行的，而不是直接通过 Pivot 实例。明确指出这一层级，可以避免助手在错误的对象上调用仅 Table 才有的方法。
- **区分方法与谓词。** 聚合方法（`sum`、`count`，或 `methods` 中的自定义条目）用于汇总已存在于某行或某列中的值。谓词则在分组发生之前对原始值进行转换。请说明您的提示词针对的是哪个阶段。
- **明确说明您想要的 `values` 条目形式。** `values` 条目可以是 `"method(field)"` 字符串，也可以是 `{ field, method }` 对象。明确说明您使用的形式，可以避免助手臆造出第三种结构。
- **在询问 `update-config` 与 `render-table` 的区别时，加上一句 "Use the docs"。** 这两个事件的触发频率不同，而这正是过时训练数据容易忽略的那类细节。
