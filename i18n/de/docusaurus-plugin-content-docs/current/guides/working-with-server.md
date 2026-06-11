---
sidebar_label: Mit dem Server arbeiten
title: Mit dem Server arbeiten
description: In der Dokumentation der DHTMLX JavaScript Pivot-Bibliothek erfahren Sie, wie Sie Pivot in ein Backend integrieren. Erkunden Sie Entwicklerleitfäden und die API-Referenz, testen Sie Code-Beispiele und Live-Demos, und laden Sie eine kostenlose 30-Tage-Evaluierungsversion von DHTMLX Pivot herunter.
---

Pivot läuft vollständig im Browser. Das Widget nimmt ein Array aus rohen Zeilen sowie eine [`config`](/api/config/config-property) (Rows / Columns / Values) entgegen und aggregiert die Zeilen clientseitig. Es gibt keine integrierte Transport-Schicht, aber die öffentliche API stellt Hooks für die Kommunikation mit einem beliebigen Backend bereit.

Eine typische Integration umfasst drei Teile:

1. **Laden** von rohen, nicht aggregierten Daten vom Server bei der Initialisierung
2. **Speichern der Config**, wenn der Benutzer das Layout ändert, damit die Sitzung später fortgesetzt werden kann
3. **Speichern der aggregierten Tabelle**, wenn der Server einen Snapshot des zusammengefassten Ergebnisses benötigt

## Rohdaten vom Server laden {#load-raw-data-from-the-server}

Die [`data`](/api/config/data-property)-Eigenschaft erwartet ein Array aus rohen Zeilenobjekten. Pivot aggregiert die Zeilen selbst, daher gibt der Server nicht aufbereitete Daten zurück.

Rufen Sie Daten und Felder mit `fetch` (oder einem beliebigen HTTP-Client) ab und erstellen Sie das Widget, sobald die Antwort eintrifft:

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
        fetch(server + "/config").then(res => res.json()), // optional
    ]).then(([data, fields, config]) => {
        new pivot.Pivot("#root", {
            data,
            fields,
            config,
        });
    });
</script>
~~~

Wenn der Server Datumsfelder als ISO-Strings zurückgibt, konvertieren Sie diese in `Date`-Instanzen, bevor Sie das Array an Pivot übergeben. Aggregationsmethoden für datumsbasierte Felder erfordern echte `Date`-Werte:

~~~jsx
data.forEach(row => {
    if (typeof row.when === "string") row.when = new Date(row.when);
});
~~~

:::info
**Siehe auch**:
- [Daten laden](/guides/loading-data)
- [Datumsformatierung](/guides/localization#date-formatting)
:::

## Layout des Benutzers speichern, um die Sitzung fortzusetzen {#save-the-users-layout-to-resume-the-session}

Damit Benutzer zu dem Layout zurückkehren können, das sie zuletzt verwendet haben, speichern Sie das [`config`](/api/config/config-property)-Objekt bei jeder Änderung. Das [`update-config`](/api/events/update-config-event)-Event wird ausgelöst, wenn der Benutzer das Layout über die Benutzeroberfläche bearbeitet. Der Payload ist die verarbeitete Config mit der Struktur `{ rows, columns, values, filters }`.

Verwenden Sie [`api.on()`](/api/internal/on-method), um das Event zu beobachten, ohne es zu modifizieren. Wechseln Sie zu [`api.intercept()`](/api/internal/intercept-method), wenn der Handler den Event-Payload ändern muss.

Das folgende Beispiel abonniert das `update-config`-Event und sendet das neue Layout an den Server:

~~~html
<div id="root"></div>

<script>
    const server = "https://some-backend-url";

    Promise.all([
        fetch(server + "/data").then(res => res.json()),
        fetch(server + "/fields").then(res => res.json()),
    ]).then(([data, fields]) => {
        const table = new pivot.Pivot("#root", { data, fields });

        table.api.on("update-config", newConfig => {
            fetch(server + "/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newConfig),
            });
        });
    });
</script>
~~~

Beim nächsten Besuch geben Sie die gespeicherte Config von `/config` zurück und übergeben sie beim Start als `config`-Eigenschaft. Das Widget startet mit dem vorherigen Layout. Falls das Layout nach der Erstellung des Widgets eintrifft, wenden Sie die gespeicherte Config mit der Methode [`setConfig()`](/api/methods/setconfig-method) an.

Häufige Aktualisierungen können den Server überlasten, wenn der Benutzer Felder im Konfigurationspanel verschiebt. Schließen Sie den POST in einen Timer ein, um die Aufrufe zu entprellen:

~~~jsx
let saveTimer;
table.api.on("update-config", newConfig => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newConfig),
        });
    }, 300);
});
~~~

:::note
Der `update-config`-Payload ist die *verarbeitete* Konfiguration: Pivot kann Feldreferenzen in die Form `{ field, method }` normalisieren. Senden Sie die verarbeitete Struktur beim Start als `config`-Eigenschaft zurück. Eine zusätzliche Konvertierung ist nicht erforderlich.
:::

:::tip
Geben Sie `false` aus dem Handler zurück, um die Layout-Änderung zu blockieren. Nutzen Sie dies, um die Persistenz an eine serverseitige Validierung zu knüpfen.
:::

## Aggregierte Tabelle speichern {#save-the-aggregated-table}

Manchmal ist das *Ergebnis* selbst der Wert: ein serverseitiger Cache der gerenderten Tabelle, ein regelmäßiger Bericht oder eine Export-Pipeline. Das [`render-table`](/api/events/render-table-event)-Event wird ausgelöst, nachdem Pivot die Aggregation abgeschlossen hat, und enthält die vollständig zusammengefasste Tabelle: `columns`, `data`-Zeilen, `footer`, `split` und weitere Felder.

Das folgende Beispiel abonniert `render-table` und sendet den Snapshot an den Server, wobei das erste Rendering übersprungen wird:

~~~jsx
const table = new pivot.Pivot("#root", { data, fields, config });

let firstRender = true;
let saveTimer;

table.api.on("render-table", ({ config: tableConfig }) => {
    // erstes Rendering überspringen, das durch die erste Aggregation ausgelöst wird
    if (firstRender) {
        firstRender = false;
        return;
    }

    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        fetch(server + "/snapshot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                columns: tableConfig.columns,
                data: tableConfig.data,
                footer: tableConfig.footer,
                split: tableConfig.split,
            }),
        });
    }, 300);
});
~~~

:::note
Das `render-table`-Event wird häufiger ausgelöst als `update-config`. Das Event läuft bei jeder Neuberechnung, einschließlich Sortierung und Auf-/Zuklappen. Entprellen Sie den Handler und überspringen Sie das erste Rendering, um nur einen POST pro tatsächlicher Änderung zu senden.
:::

:::tip
Geben Sie `false` aus dem Handler zurück, um das Rendering zu verhindern. Nutzen Sie dies, wenn der Server den Snapshot ablehnt oder für Nur-Lese-Modi.
:::

### Aggregierten Snapshot neu laden {#reload-an-aggregated-snapshot}

Pivot erstellt aggregierte Tabellen und zeigt keine voraggregtierten an. Die [`data`](/api/config/data-property)-Eigenschaft akzeptiert immer rohe Zeilen. Ein aus `render-table` gespeicherter Snapshot eignet sich daher für folgende Anwendungsfälle:

- eine nachgelagerte Export-Pipeline (CSV, XLSX) auf dem Server
- eine Nur-Lese-Ansicht, die von einer einfachen Datentabelle aus den gespeicherten `columns` und `data` gerendert wird
- ein zwischengespeicherter Bericht, der anderen Benutzern bereitgestellt wird, ohne die Aggregation erneut auszuführen

**Verwandte Artikel**:

- [Daten laden](/guides/loading-data)
- [Daten exportieren](/guides/exporting-data)

**Verwandte API**:

- [`api.on()`](/api/internal/on-method)
- [`update-config`](/api/events/update-config-event)
- [`render-table`](/api/events/render-table-event)
