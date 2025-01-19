#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import Notes from "./notes.js";
import Server from "./server.js";

yargs(hideBin(process.argv))
  .scriptName("note") // Use 'note' instead of 'index.js' in the result of --help option
  // Define a command for the CLI note
  .command(
    // this command is for creating a new note
    "new <note>", // Define the command name
    "create a new note", // Define the command description
    (yargs) => {
      // Define the positional argument
      return yargs.positional("note", {
        describe: "Is the content of the note you want to create",
        type: "string",
      });
    },
    // Define the function to run when the command is called
    async (argv) => {
      try {
        const note = await Notes.newNote(
          // return only element
          argv.note,
          argv.tags ? argv.tags.split(",").map((tag) => tag.trim()) : []
        );
        console.log("Note created:");
        Notes.printNotes([note]); // must take an array
      } catch (error) {
        console.error(error.message);
      }
    }
  )
  .command(
    // this command is for getting all notes
    "all",
    "get all notes",
    () => {}, // there is no positional argument
    async (argv) => {
      try {
        Notes.printNotes(await Notes.getAllNotes());
      } catch (error) {
        console.error(error.message);
      }
    }
  )
  .command(
    "find",
    "get matching notes by id or content or tags or all",
    () => {},
    async (argv) => {
      try {
        const filter = {
          id: argv.id,
          tags: argv.tags
            ? argv.tags.split(",").map((tag) => tag.trim())
            : undefined, // if there are tags, split them and trim them, else undefined
          content: argv.content,
        };
        Notes.printNotes(await Notes.findNotesByContent(filter));
      } catch (error) {
        console.error(error.message);
      }
    }
  )
  .command(
    "remove",
    "remove a note by id or content or tags or all",
    () => {},
    async (argv) => {
      try {
        const filter = {
          id: argv.id,
          tags: argv.tags
            ? argv.tags.split(",").map((tag) => tag.trim())
            : undefined, // if there are tags, split them and trim them, else undefined
          content: argv.content,
        };
        await Notes.removeNote(await Notes.findNotesByContent(filter));
      } catch (error) {
        console.error(error.message);
      }
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "Is the port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      try {
        await Server.start(await Notes.getAllNotes(), argv.port);
      } catch (error) {
        console.error(error.message);
      }
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      try {
        await Notes.removeAllNotes();
      } catch (error) {
        console.error(error.message);
      }
    }
  )
  // global flag
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags of the note",
  })
  .option("id", {
    alias: "i",
    type: "number",
    description: "id of the note",
  })
  .option("content", {
    alias: "c",
    type: "string",
    description: "content of the note",
  })
  .demandCommand(1) // Require a command to be run
  .parse(); // Parse the arguments

// <> is required, [] is optional
