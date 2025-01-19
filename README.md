# note-app
A feature-rich Node.js CLI and web-based application for managing notes. This app uses a JSON file (db.json) as its database and supports operations like adding, retrieving, filtering, removing, and viewing notes in a web browser.
## Features

- Add Notes: Create new notes with content and optional tags.
- List Notes: View all saved notes in the CLI or browser.
- Search Notes: Find notes by ID, tags, or content.
- Delete Notes: Remove specific notes or clear all notes.
- View Notes in Browser: Launch a local server to view notes in an HTML format.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alimagdye/note-app.git
   cd note-app


2. Install Dependencies:

   ```bash
    npm install


3. Set Up as a Global CLI Tool:
   ```bash
   npm link

This will make the note command globally accessible.
 

## Usage

After installation, use the note command with the following options:

- Add a Note

```bash
   note new "<note content>" --tags "tag1,tag2,..."
```

Creates a new note with content and optional tags.
Example:

    note new "Complete project documentation" --tags "work,   urgent  "


<br><br>

- List All Notes
```bash
   note all
```
 Displays all saved notes in the CLI.


<br><br>

- Search Notes

```bash
note find --id <ID> --tags "tag1, tag2" --content "search term"
```
Find notes by ID, tags, or content.
Example:
```bash
    note find --tags "work" --content "project"
```


<br><br>

- Remove Notes

```bash
note remove --id=<ID> --tags=tag1,tag2,... --content="term"
```
Deletes notes matching the provided filters.
Example:

    note remove --tags "urgent"


<br><br>

- Clear All Notes

```bash
note clean
```
 Removes all notes from the database.


<br><br>

- View Notes in Browser
```bash
note web [port]
```
Launches a local server to view notes in the browser. The default port is 5000.
Example:

    note web 3000

In the browser notes are displayed in a structured, styled HTML format.


<br><br>

## Global Options

    --tags, -t: Specify tags for filtering or adding notes.
    --id, -i: Specify the ID of the note for filtering.
    --content, -c: Specify the content for filtering.
    --help, to show information about all commands and flags




## Contributing

Contributions are welcome! If you find a bug or have a feature request, please create an issue or submit a pull request.
