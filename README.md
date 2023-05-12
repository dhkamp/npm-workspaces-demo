# npm-workspaces-demo

---
created: 2023-05-08
modified:  
aliases:
- workspaces
tags:
- tooling
- node
- npm
- nodejs
- tools
---

## Beschreibung

Workspaces sind lokale Module bei denen das Einbinden in andere lokale Module (typischerweise `npm link`) vereinfacht ist.

Ein Workspace ist im Prinzip wie ein node_module, welches allen Solutions, die Teil des workspaces sind zur Verfügung steht. 

Des weiteren werden die Dependencies die in einem workspaces (`package.json`) definiert sind, im obersten Projektordner installiert, was dazu führt, dass diese auch in den untergeordneten Projekten verwendet werden können.

## Verwendung

### Workspace erstellen

<div>
	<div style="padding: 10px;background: #bbdefb;border-left: 10px solid #1976d2;font-family: Arial, Helvetica, sans-serif;color: black;">
		<div style="font-weight: bold">Information</div>
		<div>Wenn eine package.json bereits vorhanden ist, muss dieser Schritt nicht durchgeführt werden.</div>
	</div>
</div>

Um workspaces anlegen zu können benötigt man ein eingerichtetes node Projekt - um ein node Projekt einzurichten, muss der folgende Befehl im Projektordner ausgeführt werden.

```bash
npm init
```

Ist die `package.json` vorhanden, kann über den folgenden Befehl ein Workspace namens **webpart** angelegt werden.

```bash
npm init -w ./workspaces/webpart
```

Der Befehl legt den Ordner `workspaces/webpart` an und erstellt darin ebenfalls eine `package.json`.

### Workspace verwenden

Wir gehen bei diesem Beispiel von der folgenden Projektstruktur aus

![[npm_workspaces_example_structure.png]]

Wenn wir jetzt in der Solution **timesheet-webpart** auf den exportierten Code aus `workspaces\webpart` zugreifen wollen, müssen wir im ersten Schritt in der `package.json` einen Verweise auf den Workspace einfügen (relativer Pfad zum workspace-Ordner)

```package.json
{
    "name": "timesheet-webpart",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "type": "module",
    "workspaces": [
        "../../workspaces/webpart"
    ]
}
```

Wenn der Verweis hinzugefügt wurde, muss einmalig die Dependency installiert werden

```bash
npm i
```

Das erstellt im `node_modules`-Ordner des Timesheets einen `webpart`-Ordner als symlink auf den originalen Workspace-Ordner.
Alle zukünftigen Änderungen in `workspaces/webpart` sind dann direkt im timesheet-webpart verfügbar.

Anschließend kann wie aus einem regulären node_module Code importiert und verwendet werden.

```js
import { exportedFromIndexJs } from "webpart";
console.log(exportedFromIndexJs());
```

## Befehle

### Dependencies in einen Workspace installieren
Wenn Dependencies zu einem Workspace hinzugefügt werden, werden diese in der `package.json` des registriert und im root-Projektordner installiert - sodass die Dependencies aus allen Teilprojekten erreichbar ist.

Der Befehl kann aus allen Ordnern, die Teil des root-Projekts sind ausgeführt werden.
```bash
# Registriert die Dependency <package-name> im workspace <workspace-name> und installiert diese inr root.
npm i <package-nam> -w <workspace-name>
```

### npm Scripts eines Workspaces ausführen

Um node-Befehle (z.B. test) in einem Workspaces auszuführen, wird auch das `-w` verwendet.

```bash
npm run test -w <workspace-name>
```

Um Scripte in mehreren Workspaces auszuführen, kann das `-w`-Flag mehrfach verwendet werden.

```bash
npm run test -w <workspace0-name> -w <workspace1-name>
```

Um Scripte in allen Workspaces auszuführen, nur das `-w`-Flag, ohne Wert verwenden

```bash
npm run test -w
```

<div>
	<div style="padding: 10px;background: #bbdefb;border-left: 10px solid #1976d2;font-family: Arial, Helvetica, sans-serif;color: black;">
		<div style="font-weight: bold">Information</div>
		<div>Wird ein Script in mehreren Workspaces ausgeführt, kann es sinnvoll sein, das Flag <strong>--if-present</strong> zu verwenden. Dadurch werden die Befehle nur aufgerufen, wenn diese in der <code>package.json</code> des workspaces auch definiert sind.</div>
	</div>
</div>

## Quellen
+ https://docs.npmjs.com/cli/v7/using-npm/workspaces
+ https://github.com/dhkamp/npm-workspaces-demo