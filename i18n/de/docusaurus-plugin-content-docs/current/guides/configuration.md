---
sidebar_label: Konfiguration
title: Konfiguration
description: Sie können mehr über die Konfiguration in der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren. Entdecken Sie Entwicklerhandbücher und API-Referenzen, probieren Sie Codebeispiele und Live-Demos aus und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

# Konfiguration {#configuration}

Konfigurieren Sie die Pivot-Tabelle und das Konfigurationspanel über die folgende API:

- [`config`](api/config/config-property.md) — definiert die Struktur der Pivot-Tabelle und wie Daten aggregiert werden
- [`render-table`](api/events/render-table-event.md) — ändert die Tabellenkonfiguration zur Laufzeit
- [`tableShape`](api/config/tableshape-property.md) — konfiguriert das Erscheinungsbild der Pivot-Tabelle
- [`columnShape`](api/config/columnshape-property.md) — konfiguriert das Erscheinungsbild und Verhalten von Spalten
- [`headerShape`](api/config/headershape-property.md) — konfiguriert das Erscheinungsbild und Verhalten von Kopfzeilen
- [`configPanel`](api/config/configpanel-property.md) — steuert die Sichtbarkeit des Konfigurationspanels
- [`setLocale`](api/methods/setlocale-method.md) — wendet ein Locale an (siehe [Lokalisierung](guides/localization.md))
- [`data`](api/config/data-property.md), [`fields`](api/config/fields-property.md) — lädt Daten und Feld-Metadaten
- [`predicates`](api/config/predicates-property.md) — verarbeitet Daten vor der Aggregation
- [`methods`](api/config/methods-property.md) — definiert benutzerdefinierte Aggregationsmethoden
- [`limits`](api/config/limits-property.md) — begrenzt die Anzahl der Zeilen und Spalten im finalen Datensatz

Anweisungen zur Arbeit mit Daten finden Sie unter [Mit Daten arbeiten](guides/working-with-data.md).

Sie können die folgenden Elemente der Pivot-Tabelle konfigurieren:

- Spalten und Zeilen
- Kopf- und Fußzeilen
- Zellen
- Tabellengrößen

## Tabelle skalieren {#resizing-the-table}

Verwenden Sie die Eigenschaft [`tableShape`](api/config/tableshape-property.md), um die Größe von Zeilen, Spalten, Kopf- und Fußzeile zu ändern.

Das folgende Code-Snippet zeigt die Standardgrößen:

~~~jsx
const sizes = {
    rowHeight: 34,
    headerHeight: 30,
    footerHeight: 30,
    columnWidth: 150
};
~~~

Das folgende Code-Snippet überschreibt die Standardgrößen:

~~~jsx {4-11}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    tableShape: {
        sizes: {
            rowHeight: 44,
            headerHeight: 60,
            footerHeight: 30,
            columnWidth: 170
        }
    },
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

:::info
Um die Breite bestimmter Spalten festzulegen, verwenden Sie den Parameter `width` der Eigenschaft [`columnShape`](api/config/columnshape-property.md).
:::

## Spalten automatisch an den Inhalt anpassen {#autosize-columns-to-content}

Verwenden Sie den Parameter `autoWidth` der Eigenschaft [`columnShape`](api/config/columnshape-property.md), um Spaltenbreiten automatisch zu berechnen. Alle `autoWidth`-Unterparameter sind optional — vollständige Beschreibungen finden Sie in der Referenz zu [`columnShape`](api/config/columnshape-property.md).

Das `autoWidth`-Objekt akzeptiert die folgenden Parameter:

- `columns` — Objekt, das festlegt, welche Felder eine automatisch berechnete Breite erhalten
- `auto` — passt die Breite an die Kopfzeile, den Zelleninhalt oder beides an
- `maxRows` — Anzahl der analysierten Datenzeilen zur Ermittlung der Spaltengröße (Standard: 20)
- `firstOnly` — wenn `true` (Standard), wird jedes Feld nur einmal analysiert. Wenn mehrere Spalten auf demselben Feld basieren (z. B. `oil` mit `count` und `oil` mit `sum`), wird nur die erste Spalte analysiert und die anderen übernehmen deren Breite

Das folgende Code-Snippet aktiviert `autoWidth` für vier Felder und deaktiviert `firstOnly`, sodass jede Spalte eine eigene Messung erhält:

~~~jsx {18-30}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    columnShape: {
        autoWidth: {
            // Spaltenbreite für diese Felder berechnen
            columns: {
                studio: true,
                genre: true,
                title: true,
                score: true
            },
            // alle Felder analysieren
            firstOnly: false
        }
    }
});
~~~

## Templates auf Zellen anwenden {#applying-templates-to-cells}

### Templates über tableShape hinzufügen {#add-templates-via-tableshape}

Verwenden Sie den Parameter `templates` der Eigenschaft [`tableShape`](api/config/tableshape-property.md), um Zellwerte über eine Funktion zu rendern. Jeder Schlüssel ist eine Feld-ID und jeder Wert ist eine Funktion, die einen String zurückgibt. Alle Spalten, die auf dem angegebenen Feld basieren, erhalten das Template.

Das folgende Beispiel wendet ein Template auf `state`-Zellen an, das den kombinierten Namen eines Bundesstaates anzeigt (vollständiger Name plus Abkürzung):

~~~jsx {10-15}
const states = {
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Florida": "FL",
  // weitere Werte
};

const table = new pivot.Pivot("#root", {
    tableShape: {
        templates: {
            // Werte der "state"-Zellen anpassen
            state: v => v + ` (${states[v]})`,
        }
    },
    fields,
    data,
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // weitere Werte
        ],
    },
    fields,
});
~~~

### Template über den template-Helper hinzufügen {#adding-a-template-via-the-template-helper}

Um HTML-Inhalte in Body-Zellen einzufügen, verwenden Sie den Helper [`pivot.template`](api/helpers/template.md) und weisen Sie das Ergebnis der Eigenschaft `cell` des Spaltenobjekts zu. Wenden Sie das Template unmittelbar vor dem Rendern der Tabelle an, indem Sie das Ereignis [`render-table`](api/events/render-table-event.md) mit der Methode [`api.intercept`](api/internal/intercept-method.md) abfangen.

Das folgende Beispiel fügt Icons (Stern oder Flagge) in Body-Zellen ein, basierend auf dem Feld (`id`, `user_score`):

~~~js
function cellTemplate(value, method, row, column) {
    const field = column.fields ? column.fields[row.$level] : column.field;

    if (field === "id") {
        return idTemplate(value);
    }

    if (field === "user_score") {
        return scoreTemplate(value);
    }

    return value;
}

function idTemplate(value) {
    const name = value?.toString().split("-")[0];
    return `<span class="cell-id flag-${name}"></span> ${value}`;
}

function scoreTemplate(value) {
    return `<i class="cell-score wxi-star"></i> ${value}`;
}

widget.api.intercept("render-table", ({ config: tableConfig }) => {
    tableConfig.columns = tableConfig.columns.map((c) => {
        if (c.area === "rows") {
            // Template auf Spaltenzellen aus dem "rows"-Bereich anwenden
            c.cell = pivot.template(({ value, method, row, column }) => cellTemplate(value, method, row, column));
        }
        return c;
    });
});
~~~

## Templates auf Kopfzeilen anwenden {#applying-templates-to-headers}

### Templates über headerShape hinzufügen {#add-templates-via-headershape}

Um das Textformat in Kopfzeilen zu steuern, verwenden Sie den Parameter `template` der Eigenschaft [`headerShape`](api/config/headershape-property.md). Der Parameter ist eine Funktion, die:

- das Feld-Label, die ID und das Sublabel (den Methodennamen, falls vorhanden) entgegennimmt
- den verarbeiteten Wert zurückgibt

Das Standard-Template lautet:

~~~js
template: (label, id, subLabel) =>
    label + (subLabel ? ` (${subLabel})` : "")
~~~

Ohne ein benutzerdefiniertes Template zeigen Felder im `values`-Bereich das Label und die Methode an (z. B. `Oil(count)`), und Felder in anderen Bereichen zeigen den `label`-Wert an. Ein [`predicates`](api/config/predicates-property.md)-Template überschreibt das `headerShape`-Template.

Das folgende Beispiel konvertiert den Kopfzeilentext in Kleinbuchstaben und erzeugt Labels wie `profit (sum)`:

~~~jsx {3-6}
new pivot.Pivot("#pivot", {
    data,
    headerShape: {
        // benutzerdefiniertes Template für den Kopfzeilentext 
        template: (label, id, subLabel) => (label + (subLabel ? ` (${subLabel})` : "")).toLowerCase(),
        },
    config: {
        rows: ["state", "product_type"],
        columns: [],
        values: [
            {
                field: "profit",
                method: "sum"
            },
            {
                field: "sales",
                method: "sum"
            },
            // weitere Werte
        ],
    },
    fields,
});
~~~

### Templates über den template-Helper hinzufügen {#add-templates-via-the-template-helper}

Um HTML-Inhalte in Kopfzeilenzellen einzufügen, verwenden Sie den Helper [`pivot.template`](api/helpers/template.md) und weisen Sie das Ergebnis der Eigenschaft `cell` des Kopfzeilenzellobjekts zu. Wenden Sie das Template unmittelbar vor dem Rendern der Tabelle an, indem Sie das Ereignis [`render-table`](api/events/render-table-event.md) mit der Methode [`api.intercept`](api/internal/intercept-method.md) abfangen.

Das folgende Beispiel fügt Icons hinzu in:

- Kopfzeilen-Labels basierend auf dem Feldnamen (zum Beispiel erhält `id` ein Globus-Icon)
- Spaltenüberschriften basierend auf dem Zellenwert (farbige Pfeil-Indikatoren basierend auf dem `status`-Wert)

~~~jsx
function rowsHeaderTemplate(value, field) {
    let icon = "";
    if (field === "id") icon = "<i class='icon wxi-earth'></i>";
    if (field === "user_score") icon = "<i class='icon wxi-star'></i>";
    return `${value} ${icon}`;
}

function statusTemplate(value) {
    let icon = "";
    if (value === "Up") icon = "<i style='color:green' class='icon wxi-arrow-up'></i>";
    if (value === "Down") icon = "<i style='color:red' class='icon wxi-arrow-down'></i>";
    return `${value} ${icon}`;
}

widget.api.intercept("render-table", ({ config: tableConfig }) => {
    tableConfig.columns = tableConfig.columns.map((c) => {
        if (c.area === "rows") {
            // Template auf die erste Kopfzeile der Spalten aus dem "rows"-Bereich anwenden
            c.header[0].cell = pivot.template(({ value, field }) => rowsHeaderTemplate(value, field));
        } else {
            // Kopfzeilenzellen, die Werte aus dem "status"-Feld anzeigen
            const headerCell = c.header.find((h) => h.field === "status");
            if (headerCell) {
                headerCell.cell = pivot.template(({ value }) => statusTemplate(value));
            }
        }
        return c;
    });
});
~~~

## Spalten einklappbar machen {#make-columns-collapsible}

Um Benutzern zu ermöglichen, Spalten unter einer gemeinsamen Kopfzeile ein- und auszuklappen, setzen Sie den Parameter `collapsible` der Eigenschaft [`headerShape`](api/config/headershape-property.md) auf `true`.

Das folgende Code-Snippet aktiviert einklappbare Spaltenüberschriften:

~~~jsx {4-6}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    headerShape: {
        collapsible: true,
    },
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

## Spalten fixieren {#freezing-columns}

Fixieren Sie Spalten links oder rechts, damit sie sichtbar bleiben, während der Rest der Tabelle gescrollt wird. Verwenden Sie den Parameter `split` der Eigenschaft [`tableShape`](api/config/tableshape-property.md) und setzen Sie `left` oder `right` auf `true`.

### Spalten links fixieren {#freeze-columns-on-the-left}

Wenn `split.left` `true` ist, entspricht die Anzahl der fixierten Spalten der Anzahl der `rows`-Felder in der Eigenschaft [`config`](api/config/config-property.md). Im Baumstruktur-Modus wird unabhängig von der Anzahl der `rows`-Felder nur eine Spalte fixiert.

Das folgende Code-Snippet fixiert eine Spalte links (ein `rows`-Feld ist definiert):

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio"],
        columns: ["genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    tableShape: { 
        split: {left: true } 
    }
});
~~~

Um eine benutzerdefinierte Anzahl von fixierten Spalten festzulegen, hören Sie auf das Ereignis [`render-table`](api/events/render-table-event.md) und überschreiben Sie `tableConfig.split`. Vermeiden Sie das Aufteilen von Spalten mit Colspans.

Das folgende Code-Snippet fixiert alle `rows`-Spalten plus doppelt so viele `values`-Felder links:

~~~jsx {19-26}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["continent", "name"],
        columns: ["year"],
        values: [
            {
                field: "oil",
                method: "sum"
            },
            {
                field: "oil",
                method: "count"
            }
        ]
    }
});
table.api.on("render-table", ({ config: tableConfig }) => {
    const { config } = table.api.getState();

    tableConfig.split = {
        left: config.rows.length + config.values.length * 2
    };
});
~~~

### Spalten rechts fixieren {#freezing-columns-on-the-right}

Setzen Sie `split.right` auf `true`, um Gesamtsummen-Spalten rechts zu fixieren.

Das folgende Code-Snippet fixiert die Gesamtsummen-Spalte rechts:

~~~jsx {4-7}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    tableShape:{
        split: {right: true},
        totalColumn: true,
    },
    config:  {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

Um eine benutzerdefinierte Anzahl von Spalten rechts zu fixieren, hören Sie auf das Ereignis [`render-table`](api/events/render-table-event.md) und überschreiben Sie `tableConfig.split`. Vermeiden Sie das Aufteilen von Spalten mit Colspans.

Das folgende Code-Snippet fixiert so viele Spalten rechts wie es `values`-Felder gibt:

~~~jsx {20-25}
const widget = new pivot.Pivot("#pivot", {
    fields,
    data: dataset,
    config:  {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});

widget.api.on("render-table", ({ config: tableConfig }) => {
    const { config } = widget.api.getState();
    tableConfig.split = {
        right: config.values.length,
    }
})
~~~

## In Spalten sortieren {#sort-in-columns}

Die Sortierung in der Benutzeroberfläche ist standardmäßig aktiviert — Benutzer klicken auf eine Spaltenüberschrift, um zu sortieren. Um sie zu deaktivieren, setzen Sie den Parameter `sort` der Eigenschaft [`columnShape`](api/config/columnshape-property.md) auf `false`.

Das folgende Code-Snippet deaktiviert die UI-Sortierung:

~~~jsx {19}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    },
    columnShape: {
        sort: false
    }
});
~~~

Weitere Informationen zur Standard-Sortierung, benutzerdefinierten Komparatoren und Laufzeit-Updates finden Sie unter [Daten sortieren](guides/working-with-data.md#sorting-data).

## Baumstruktur-Modus aktivieren {#enabling-the-tree-mode}

Der Baumstruktur-Modus stellt Daten hierarchisch mit ausklappbaren Zeilen dar. Setzen Sie den Parameter `tree` der Eigenschaft [`tableShape`](api/config/tableshape-property.md) auf `true` (Standard: `false`). Das erste Feld des `rows`-Arrays in [`config`](api/config/config-property.md) wird zur übergeordneten Zeile.

Das folgende Code-Snippet aktiviert den Baumstruktur-Modus mit `studio` als übergeordneter und `genre` als untergeordneten Zeilen:

~~~jsx {3}
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true
    },
    fields,
    data: dataset,
    config: {
        rows: ["studio", "genre"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            },
            {
                field: "episodes",
                method: "count"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "max"
            }
        ]
    }
});
~~~

## Alle Zeilen aus- oder einklappen {#expandingcollapsing-all-rows}

Um alle Zeilen programmatisch aus- oder einzuklappen, aktivieren Sie den Baumstruktur-Modus über die Eigenschaft [`tableShape`](api/config/tableshape-property.md). Greifen Sie dann mit der Methode [`getTable`](api/methods/gettable-method.md) auf die Table-Widget-Instanz zu und lösen Sie das Ereignis [`open-row`](api/table/open-row.md) oder [`close-row`](api/table/close-row.md) über die Methode `api.exec` der Tabelle aus.

Das folgende Beispiel rendert die Schaltflächen "Alle öffnen" und "Alle schließen", die im Baumstruktur-Modus jeden Ast aus- oder einklappen:

~~~jsx
const table = new pivot.Pivot("#root", {
    tableShape: {
        tree: true
    },
    fields,
    data: dataset,
    config: {
        rows: ["type", "studio"],
        columns: [],
        values: [
            {
                field: "score",
                method: "max"
            },
            {
                field: "rank",
                method: "min"
            },
            {
                field: "members",
                method: "sum"
            },
            {
                field: "episodes",
                method: "count"
            }
        ]
    }
});

const api = table.api;
const tableInstance = api.getTable();
// alle Tabellenäste beim Rendern geschlossen halten
api.intercept("render-table", (ev) => {
    ev.config.data.forEach((r) => (r.open = false));

    // hier false zurückgeben, um das Rendern der Tabelle zu verhindern
    // return false;
});

function openAll() {
    tableInstance.exec("open-row", { id: 0, nested: true });
}

function closeAll() {
    tableInstance.exec("close-row", { id: 0, nested: true });
}

const openAllButton = document.createElement("button");
openAllButton.addEventListener("click", openAll);
openAllButton.textContent = "Open all";

const closeAllButton = document.createElement("button");
closeAllButton.addEventListener("click", closeAll);
closeAllButton.textContent = "Close all";

document.body.appendChild(openAllButton);
document.body.appendChild(closeAllButton);
~~~

## Ausrichtung des Kopfzeilentexts ändern {#change-header-text-orientation}

Um den Kopfzeilentext von horizontal auf vertikal zu drehen, setzen Sie den Parameter `vertical` der Eigenschaft [`headerShape`](api/config/headershape-property.md) auf `true`.

Das folgende Code-Snippet rendert vertikalen Kopfzeilentext:

~~~jsx {4-6}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    headerShape: {
        vertical: true
    },
    config: {
        rows: ["studio"],
        columns: ["type"],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
~~~

## Sichtbarkeit des Konfigurationspanels steuern {#controlling-visibility-of-configuration-panel}

Das Konfigurationspanel wird standardmäßig angezeigt. Benutzer können es über die Schaltfläche **Einstellungen ausblenden** / **Einstellungen anzeigen** umschalten. Steuern Sie das Panel programmatisch über die Eigenschaft [`configPanel`](api/config/configpanel-property.md), das Ereignis [`show-config-panel`](api/events/show-config-panel-event.md) oder die Methode [`showConfigPanel`](api/methods/showconfigpanel-method.md).

### Konfigurationspanel ausblenden {#hide-the-configuration-panel}

Um das Panel bei der Initialisierung auszublenden, setzen Sie die Eigenschaft [`configPanel`](api/config/configpanel-property.md) auf `false`.

Das folgende Code-Snippet initialisiert Pivot mit ausgeblendetem Panel:

~~~jsx
// das Konfigurationspanel ist beim Start ausgeblendet
const table = new pivot.Pivot("#root", {
    fields,
    data: dataset,
    configPanel: false,
    config: {
        rows: ["hobbies"],
        columns: ["relationship_status"],
        values: [
            {
                field: "age",
                method: "min"
            },
            {
                field: "age",
                method: "max"
            }
        ]
    }
});
~~~

Um das Panel zur Laufzeit umzuschalten, lösen Sie das Ereignis [`show-config-panel`](api/events/show-config-panel-event.md) mit der Methode [`api.exec`](api/internal/exec-method.md) aus und setzen Sie den Parameter `mode` auf `false`.

Das folgende Code-Snippet blendet das Panel nach der Initialisierung aus:

~~~jsx {19-22}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});
// Konfigurationspanel ausblenden
table.api.exec("show-config-panel", {
    mode: false
});
~~~

### Standard-Umschalten deaktivieren {#disable-the-default-toggling}

Um die Standard-Umschalttaste vollständig zu blockieren, fangen Sie das Ereignis [`show-config-panel`](api/events/show-config-panel-event.md) mit der Methode [`api.intercept`](api/internal/intercept-method.md) ab und geben Sie `false` zurück.

Das folgende Code-Snippet deaktiviert die Umschalttaste:

~~~jsx {20-22}
const table = new pivot.Pivot("#root", {
    fields,
    data,
    config: {
        rows: ["studio", "genre"],
        columns: [],
        values: [
            {
                field: "title",
                method: "count"
            },
            {
                field: "score",
                method: "max"
            }
        ]
    }
});

table.api.intercept("show-config-panel", () => {
    return false;
});
~~~

Als alternative API verwenden Sie die Methode [`showConfigPanel`](api/methods/showconfigpanel-method.md).

### Aktionen mit Feldern im Panel {#actions-with-fields-in-the-panel}

Das Konfigurationspanel unterstützt die folgenden Feldoperationen:

- [`add-field`](api/events/add-field-event.md) — ein Feld zu einem Bereich hinzufügen
- [`delete-field`](api/events/delete-field-event.md) — ein Feld aus einem Bereich entfernen
- [`update-field`](api/events/update-field-event.md) — die Methode oder Einstellungen eines Feldes aktualisieren
- [`move-field`](api/events/move-field-event.md) — Felder innerhalb eines Bereichs neu anordnen

**Verwandte Beispiele**:
- [Pivot 2. Texttemplates für Tabellen- und Kopfzeilenzellen hinzufügen](https://snippet.dhtmlx.com/n9ylp6b2)
- [Pivot 2. Benutzerdefinierte fixierte Spalten (eigene Anzahl)](https://snippet.dhtmlx.com/53erlmgp)
- [Pivot 2. Alle Zeilen aus- und einklappen](https://snippet.dhtmlx.com/i4mi6ejn)
- [Pivot 2. Fixierte Spalten links und rechts](https://snippet.dhtmlx.com/lahf729o)
- [Pivot 2. Sortierung](https://snippet.dhtmlx.com/j7vtief6)
