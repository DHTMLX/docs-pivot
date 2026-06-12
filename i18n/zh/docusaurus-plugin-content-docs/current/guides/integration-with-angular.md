---
sidebar_label: 与 Angular 集成
title: 与 Angular 集成
description: 您可以在 DHTMLX JavaScript Pivot 库的文档中了解与 Angular 的集成方法。浏览开发指南和 API 参考，查看代码示例和在线演示，并下载免费 30 天评估版 DHTMLX Pivot。
---

# 与 Angular 集成 {#integration-with-angular}

:::tip
本文假设您已熟悉 **Angular** 的基本概念和使用模式。如需复习，请参阅 [**Angular 文档**](https://v17.angular.io/docs)。
:::

DHTMLX Pivot 可作为普通组件与 **Angular** 集成。完整的可运行示例请参见 [**GitHub 上的 Angular Pivot 演示**](https://github.com/DHTMLX/angular-pivot-demo)。

## 创建项目 {#create-a-project}

:::info
开始之前，请先安装 [**Angular CLI**](https://v1.angular.io/cli) 和 [**Node.js**](https://nodejs.org/en/)。
:::

以下命令将创建一个名为 *my-angular-pivot-app* 的新 Angular 项目：

~~~bash
ng new my-angular-pivot-app
~~~

:::note
当 Angular CLI 询问时，请禁用服务器端渲染（SSR）和静态站点生成（SSG/Prerendering）——本指南假设使用客户端渲染应用。
:::

该命令会安装所有必要的工具，无需执行其他命令。

### 安装依赖 {#install-dependencies}

切换到新项目目录：

~~~bash
cd my-angular-pivot-app
~~~

使用 [**yarn**](https://yarnpkg.com/) 包管理器安装依赖并启动开发服务器：

~~~bash
yarn
yarn start # 或者：yarn dev
~~~

应用将在本地端口运行（例如 `http://localhost:3000`）。

## 创建 Pivot {#create-pivot}

将 Pivot 包添加到项目中，然后将 Pivot 封装为 Angular 组件。

### 第一步：安装包 {#step-1-install-the-package}

下载 [**试用版 Pivot 包**](how-to-start.md#installing-trial-pivot-via-npm-or-yarn) 并按照 README 中的步骤操作。试用版 Pivot 包有效期为 30 天。
  
### 第二步：创建组件 {#step-2-create-the-component}

创建一个用于挂载 Pivot 的 Angular 组件。在 *src/app/* 下新建 *pivot* 文件夹，并创建 *src/app/pivot/pivot.component.ts*。然后按以下步骤操作：

#### 导入源文件 {#import-source-files}

打开 *src/app/pivot/pivot.component.ts* 并导入 Pivot 包。导入路径取决于所使用的版本：

- **PRO 版本**（从本地文件夹安装）：

~~~jsx
import { Pivot } from 'dhx-pivot-package';
~~~

- **试用版本**：

~~~jsx
import { Pivot } from '@dhx/trial-pivot';
~~~

本教程使用 Pivot 的试用版本。

#### 设置容器并挂载 Pivot {#set-up-the-container-and-mount-pivot}

要在页面上显示 Pivot，需在组件模板中定义一个容器元素，然后在 `ngOnInit` 钩子中使用构造函数初始化 Pivot，并在 `ngOnDestroy` 钩子中销毁 Pivot。

以下代码片段定义了一个最小化的 Pivot Angular 组件：

~~~jsx {1,8,12-13,18-19} title="pivot.component.ts"
import { Pivot } from '@dhx/trial-pivot';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "pivot", // 模板名称，在 "app.component.ts" 文件中以 <pivot /> 形式使用
    styleUrls: ["./pivot.component.css"], // 引入 CSS 文件
    template: `<div #container class="widget"></div>`,
})

export class PivotComponent implements OnInit, OnDestroy {
    // Pivot 的容器引用
    @ViewChild('container', { static: true }) pivot_container!: ElementRef;

    private _table!: Pivot;

    ngOnInit() {
        // 初始化 Pivot 组件
        this._table = new Pivot(this.pivot_container.nativeElement, {});
    }

    ngOnDestroy(): void {
        this._table.destructor(); // 卸载时销毁 Pivot
    }
}
~~~

#### 添加样式 {#add-styles}

要正确渲染 Pivot，请创建 *src/app/pivot/pivot.component.css*，为页面和 Pivot 容器添加样式：

~~~css title="pivot.component.css"
/* 导入 Pivot 样式 */
@import "@dhx/trial-pivot/dist/pivot.css";

/* 初始页面样式 */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* Pivot 容器样式 */
.widget {
    width: 100%;
    height: 100%;
}
~~~

#### 加载数据 {#load-data}

要向 Pivot 提供数据，请准备数据集。创建 *src/app/pivot/data.ts* 并导出数据和字段元数据：

~~~jsx title="data.ts"
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
        }, // 其他数据项
    ];

    const fields: any = [
        {
            "id": "cogs",
            "label": "Cogs",
            "type": "number"
        },
        {
            "id": "date",
            "label": "Date",
            "type": "date"
        }, // 其他字段
    ];

    return { dataset, fields };
};
~~~

打开 *src/app/pivot/pivot.component.ts*，导入 `getData`，并在 `ngOnInit()` 中应用数据集：

~~~jsx {2,18,20-21} title="pivot.component.ts"
import { Pivot } from '@dhx/trial-pivot';
import { getData } from "./data"; // 导入数据
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "pivot", 
    styleUrls: ["./pivot.component.css"],
    template: `<div #container class="widget"></div>`,
})

export class PivotComponent implements OnInit, OnDestroy {
    @ViewChild('container', { static: true }) pivot_container!: ElementRef;

    private _table!: Pivot;

    ngOnInit() {
        const { dataset, fields } = getData(); // 解包数据和字段元数据
        this._table = new Pivot(this.pivot_container.nativeElement, {
            fields,
            data: dataset,
            config: {
                rows: ["state", "product_type"],
                columns: ["product_line", "type"],
                values: [
                    {
                        field: "profit",
                        method: "sum"
                    }, // 其他值
                ]
            },
            // 其他配置属性
        });
    }

    ngOnDestroy(): void {
        this._table.destructor(); 
    }
}
~~~

组件现已可以使用。挂载时，Pivot 将使用提供的数据进行渲染。完整的配置属性列表请参见 [Pivot API 文档](api/overview/properties-overview.md)。

#### 处理事件 {#handle-events}

用户在 Pivot 中的操作会触发相应事件，您可以对这些事件进行订阅。完整的事件列表请参见 [事件概览](api/overview/events-overview.md)。

以下代码片段在 `ngOnInit` 中扩展了一个 `open-filter` 事件监听器，当用户打开过滤器时记录字段 ID：

~~~jsx {18-20} title="pivot.component.ts"
// ...
ngOnInit() {
    const { dataset, fields } = getData();
    this._table = new Pivot(this.pivot_container.nativeElement, {
        fields,
        data: dataset,
        config: {
            rows: ["state", "product_type"],
            columns: ["product_line", "type"],
            values: [
                {
                    field: "profit",
                    method: "sum"
                }, // 其他值
            ]
        }
    });

    this._table.api.on("open-filter", (ev) => {
        console.log("The field id for which the filter is activated:", ev.id);
    });
}

ngOnDestroy(): void {
    this._table.destructor(); 
}
~~~

### 第三步：将 Pivot 添加到应用 {#step-3-add-pivot-to-the-app}

要将 `PivotComponent` 嵌入应用，请打开 *src/app/app.component.ts* 并将默认代码替换为以下内容：

~~~jsx {5} title="app.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<pivot/>` // 在 "pivot.component.ts" 文件中创建的模板
})
export class AppComponent {
    name = "";
}
~~~

然后创建 *src/app/app.module.ts* 并注册 `PivotComponent`：

~~~jsx {4-5,8} title="app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { PivotComponent } from "./pivot/pivot.component";

@NgModule({
    declarations: [AppComponent, PivotComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
~~~

最后，打开 *src/main.ts* 并将其内容替换为以下引导代码：

~~~jsx title="main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
~~~

启动应用，查看 Pivot 在页面上渲染数据的效果。

![在 Angular 应用程序中渲染的 DHTMLX Pivot（含示例数据）](../assets/trial_pivot.png)

Pivot 现已与 Angular 集成完毕。您可以根据项目需求自定义配置。完整示例请参见 [**GitHub 上的 angular-pivot-demo**](https://github.com/DHTMLX/angular-pivot-demo)。
