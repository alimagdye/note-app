# note-app
Note is a CLI App using Node.JS

## Features

- Add new notes with a title and body.
- List all saved notes.
- Read a specific note by title.
- Delete notes by title.
- Configured to run globally using `npm link`.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alimagdye/note-app.git
   cd note-app

    Install dependencies:

npm install

Set up the CLI tool globally using npm link:

    npm link

    This allows the note command to be used globally.

Usage

Once the application is set up, you can use the note command followed by specific options to manage your notes.
Add a Note

note add --title="Your Note Title" --body="Your Note Body"

Adds a new note with the specified title and body.
List Notes

note list

Lists all saved notes.
Read a Note

note read --title="Your Note Title"

Reads and displays the content of a note by its title.
Delete a Note

note remove --title="Your Note Title"

Deletes the note with the specified title.
Project Structure

    index.js: Main application file handling CLI commands and note operations.
    db.json: Stores notes in JSON format for persistence.
    package.json: Manages dependencies and defines the note command for global usage.

Dependencies

    yargs: For parsing command-line arguments.
    fs: To handle file system operations.
    open: For additional functionalities (e.g., opening files or URLs).

Example Commands

    Add a note:

note add --title="Meeting Notes" --body="Discuss project roadmap"

List notes:

note list

Read a note:

note read --title="Meeting Notes"

Remove a note:

    note remove --title="Meeting Notes"

Contributing

Contributions are welcome! If you find a bug or have a feature request, please create an issue or submit a pull request.
License

This project is licensed under the MIT License.


Feel free to update the README further if you add more features or changes to your app!
