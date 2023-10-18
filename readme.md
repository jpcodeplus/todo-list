# Aufgaben Liste

## Demo
Eine demo des Projektes kannst du unter => [Todo List Demo](https://jpcodeplus.github.io/todo-list) aufrufen

## Einführung

Das Projekt ist eine webbasierte Aufgabenliste, in der Benutzer ihre Aufgaben notieren, bearbeiten und organisieren können. Es gibt auch eine Suchfunktion, die es ermöglicht, bestimmte Aufgaben zu finden. Darüber hinaus gibt es eine Möglichkeit, die Aufgaben in verschiedene Kategorien wie "Alle", "Offene" und "Beendete" zu sortieren.

## Funktionen

- Hinzufügen neuer Aufgaben.
- Suchen nach bestimmten Aufgaben.
- Filtern und Anzeigen von Aufgaben basierend auf ihrem Status: Alle, Offene, Beendete.
- Unterstützungskontakt über WhatsApp.
- Möglichkeit, das Projekt über PayPal zu unterstützen.

## Erweiterte Funktionen

Die Funktionalität der To-Do-Liste wird durch eine JavaScript-Klasse `TaskManager` verwaltet, die über verschiedene Methoden verfügt, um die Aufgaben zu verwalten. Die Hauptfunktionen sind:

- `addTask(taskText)`: Ermöglicht das Hinzufügen neuer Aufgaben. Die Aufgabe wird als Objekt gespeichert, das den Text der Aufgabe und den Status `completed` enthält, der angibt, ob die Aufgabe abgeschlossen ist oder nicht.

- `deleteTask(index)`: Ermöglicht das Löschen einer Aufgabe. Die Aufgabe wird über ihren Index in der Aufgabenliste identifiziert.

- `toggleCompleted(index)`: Ändert den Status einer Aufgabe. Wenn die Aufgabe abgeschlossen ist, wird sie als offen markiert, und umgekehrt.

- `searchTasks(query)`: Ermöglicht die Suche nach Aufgaben. Die Funktion gibt eine Liste von Aufgaben zurück, die den Suchbegriff im Text enthalten.

- `renderTasks()`: Zeigt die Aufgaben auf der Seite an. Sie unterteilt die Aufgaben in drei Kategorien: Alle, Offene und Beendete Aufgaben und aktualisiert die Anzahl der Aufgaben in jeder Kategorie.

- `initSortable()`: Initialisiert die Sortierfunktion für die Aufgabenlisten. Aufgaben können per Drag & Drop umsortiert werden.

## Nutzung

Um eine neue Aufgabe hinzuzufügen, gib den Text der Aufgabe in das Textfeld ein und drücke die Eingabetaste. Die neue Aufgabe wird zur Liste hinzugefügt und auf der Seite angezeigt.

Du kannst Aufgaben als abgeschlossen markieren, indem du auf den Button neben der Aufgabe klickst. Um eine Aufgabe zu löschen, klicke auf den "Delete"-Button.

Mit der Suchfunktion kannst du nach spezifischen Aufgaben suchen. Gib den Suchbegriff in das Suchfeld ein, und die Liste der Aufgaben wird automatisch gefiltert.


## Mitwirken

Bitte eröffne ein Issue, wenn du Vorschläge hast oder einen Bug findest. Pull-Anfragen sind ebenfalls willkommen.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe die LICENSE-Datei für Details.

## Kontakt

Entwickelt und gestaltet von JP @ Code Plus Media. Bei Fragen, Anregungen oder Bugs einfach Kontakt per WhatsApp aufnehmen: [Kontakt via WhatsApp](https://wa.me/message/JJOPBXW76SLQG1)

