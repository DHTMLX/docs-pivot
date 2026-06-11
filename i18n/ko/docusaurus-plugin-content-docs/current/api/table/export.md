---
sidebar_label: export
title: export
description: DHTMLX JavaScript Pivot 라이브러리의 export 이벤트에 대해 알아보실 수 있습니다. 개발자 가이드와 API 레퍼런스를 살펴보고, 코드 예제와 라이브 데모를 직접 체험해 보세요. DHTMLX Pivot 30일 무료 평가판도 다운로드하실 수 있습니다
---

# export

### 설명 {#description}

@short: 데이터를 내보낼 때 발생합니다

Table 이벤트를 트리거하려면 [`getTable`](api/methods/gettable-method.md) 메서드를 통해 Pivot 내부의 Table 인스턴스에 접근해야 합니다.

### 사용법 {#usage}

```jsx
"export": ({
    options: {
        format: "csv" | "xlsx",
        fileName?: string,
        header?: boolean,
        footer?: boolean,
        download?: boolean,

        /* XLSX 설정*/
        styles?: boolean | {
            header?: {
                fontWeight?: "bold",
                color?: string,
                background?: string,
                align?: "left"|"right"|"center",
                borderBottom?:  string,
                borderRight?:  string,
            }
            lastHeaderCell?:  { /*  header와 동일 */  },
            cell?: { /*  header와 동일 */ };
            firstFooterCell?: { /*  header와 동일 */ },
            footer?: {/*  header와 동일 */},
        }
        cellTemplate?: (value: any, row: any, column: object ) 
            => string | null,
        headerCellTemplate?: (text: string, cell: object, column: object, type: "header"| "footer") 
            => string | null,
        cellStyle?: (value: any, row: any, column: object) 
            => { format: string; align: "left"|"right"|"center" } | null,
        headerCellStyle?: (text: string, cell: object, column: object, type: "header"| "footer") 
            => { format: string; align: "left"|"right"|"center" } | null,
        sheetName?: string,

        /* CSV 설정 */
        rows: string,
        cols: string,
    },
    result?: any,
}) => boolean|void;
```

Table 위젯의 `export` 액션에는 필요에 따라 구성할 수 있는 다음과 같은 파라미터가 있습니다:

- `options` - 내보내기 옵션이 담긴 객체입니다. 옵션은 형식 유형에 따라 다릅니다
- `result` - 내보낸 Excel 또는 CSV 데이터의 결과값입니다 (일반적으로 `download` 옵션에 따라 Blob 또는 파일 형태입니다)

    **두 형식 모두에 적용되는 공통 옵션 ("csv" 및 "xlsx")**:

    - `format` (string) - (선택) 내보내기 형식으로 "csv" 또는 "xlsx"를 지정할 수 있습니다
    - `fileName` (string) - (선택) 파일 이름입니다 (기본값: "data")
    - `header` (boolean) - (선택) 헤더를 내보낼지 여부를 지정합니다 (기본값: **true**)
    - `footer` (boolean) - (선택) 푸터를 내보낼지 여부를 지정합니다 (기본값: **true**)
    - `download` (boolean) - (선택) 파일 다운로드 여부를 지정합니다. 기본값은 **true**입니다. **false**로 설정하면 파일이 다운로드되지 않으며, Excel 또는 CSV 데이터(Blob)는 `ev.result`로 접근할 수 있습니다

     **"xlsx" 형식에 특화된 옵션**:

    - `sheetName` (string) - Excel 시트 이름입니다 (기본값: "data")
    - `styles` (boolean 또는 object) - **false**로 설정하면 스타일 없이 그리드를 내보냅니다. 스타일 속성 해시를 사용하여 구성할 수 있습니다:
        - `header` - 헤더 셀에 대한 다음 설정이 담긴 객체입니다:
            - `fontWeight` (string) - (선택) "bold"로 설정할 수 있으며, 설정하지 않으면 기본 폰트 두께가 적용됩니다
            - `color` (string) - (선택) 헤더의 텍스트 색상입니다
            - `background` (string) - (선택) 헤더의 배경 색상입니다
            - `align` - (선택) "left"|"right"|"center" 중 하나로 설정할 수 있는 텍스트 정렬입니다. 설정하지 않으면 Excel에서 설정된 정렬이 적용됩니다
            - `borderBottom` (string) - (선택) 하단 테두리 스타일입니다
            - `borderRight` (string) - (선택) 우측 테두리 스타일입니다 (예: *borderRight:  "0.5px solid #dfdfdf"*)
        - `lastHeaderCell` - 헤더 셀의 마지막 행에 대한 스타일 속성입니다. *header*와 동일한 속성을 사용합니다
        - `cell` - 본문 셀에 대한 스타일 속성입니다. *header*와 동일한 속성을 사용합니다
        - `firstFooterCell` - 푸터 셀의 첫 번째 행에 대한 스타일 속성입니다. *header*와 동일한 속성을 사용합니다
        - `footer` - 푸터 셀에 대한 스타일 속성입니다. *header*와 동일한 속성을 사용합니다
    - `cellTemplate` - 각 셀의 내보내기 값을 커스터마이즈하는 함수입니다. value, row, column 객체를 파라미터로 받아 내보낼 커스텀 값을 반환합니다
	- `headerCellTemplate` - 내보내기 시 헤더 또는 푸터 셀의 값을 커스터마이즈하는 함수입니다. text, 헤더 셀 객체, column 객체, 셀 유형("header" 또는 "footer")을 인수로 받아 내보낼 헤더/푸터 값을 수정할 수 있습니다
	- `cellStyle` - 내보내기 시 개별 셀의 스타일과 형식을 커스터마이즈할 수 있는 함수입니다. value, row, column 객체를 파라미터로 받아 스타일 속성(예: 정렬 또는 형식)이 담긴 객체를 반환해야 합니다
	- `headerCellStyle` - `cellStyle`과 유사하지만 헤더 및 푸터 셀에 특화된 함수입니다. text, 헤더 셀 객체, column 객체, 유형("header" 또는 "footer")을 받아 스타일 속성을 반환합니다
    :::note
    기본적으로 "xlsx" 형식의 경우 날짜 및 숫자 필드는 기본 형식 또는 [`fields`](api/config/fields-property.md) 속성을 통해 정의된 형식의 원시 값으로 내보내집니다. 단, 필드에 템플릿이 정의된 경우([`tableShape`](api/config/tableshape-property.md) 속성 참고) 해당 템플릿에서 정의된 렌더링 값으로 내보냅니다. 템플릿과 `format`이 모두 설정된 경우, 템플릿 설정이 형식 설정보다 우선 적용됩니다.
    :::

    **"csv" 형식에 특화된 옵션**:

    - `rows` (string) - (선택) 행 구분자입니다 (기본값: "\n")
    - `cols` (string) - (선택) 열 구분자입니다 (기본값: "\t")

## 예제 {#example}

다음 스니펫에서 데이터 내보내기 방법을 확인할 수 있습니다:

<iframe src="https://snippet.dhtmlx.com/zjuloqxd?mode=result" frameborder="0" class="snippet_iframe" width="100%" height="600"></iframe> 

**관련 문서**: 
- [`getTable`](api/methods/gettable-method.md)
- [데이터 내보내기](guides/exporting-data.md)
- [필드에 형식 적용하기](guides/working-with-data.md#applying-formats-to-fields)
