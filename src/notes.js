import DB from "./db.js";

const newNote = async function (noteContent, tags = []) {
  const db = await DB.getDB();
  const note = {
    Tags: tags,
    Content: noteContent,
    ID: db.notes.length === 0 ? 1 : db.notes.pop().ID + 1, // get the last note's ID and add 1 to it
  };
  return (await DB.insert(note)).notes.pop(); // insert the note object into the real db then return the last note added
};

const getAllNotes = async function () {
  return (await DB.getDB()).notes; // return the notes array from the db object
};

// takes an array of notes
const printNotes = async function (notes) {
  // if there are notes
  if (notes.length !== 0) {
    console.log(notes.length, "Notes found:");
    notes.forEach((note) => {
      console.log("\n-----------------");
      console.log(`ID: ${note.ID}`);
      console.log(`Tags: ${note.Tags.join(", ")}`);
      console.log(`Content: ${note.Content}`);
      console.log("-----------------\n");
    });
  } else {
    // if there are no notes
    console.error("No notes found!");
  }
};

const isUniqueArray = function (originalArray, elementToCheck) {
  for (let i = 0; i < originalArray.length; i++) {
    if (originalArray[i].ID === elementToCheck.ID) {
      return false;
    }
  }
  return true;
};

const findNotesByContent = async function (filter) {
  // filter the notes by the string filter
  const dbNotes = (await DB.getDB()).notes;
  const { id, tags, content } = filter;
  const notes = [];

  if (id) {
    const note = dbNotes.find((note) => note.ID === id);
    if (note) notes.push(note); // if the note is found, add it to the notes array. we don't need to check if it's unique because it's the first element
  }

  if (tags) {
    dbNotes.forEach((note) => {
      note.Tags.forEach((tag) => {
        // for each tag in the note's tags
        if (tags.includes(tag)) {
          // if the tag is in the tags array
          if (isUniqueArray(notes, note)) notes.push(note); // if the note is unique, add it to the notes array
        }
      });
    });
  }

  if (content) {
    dbNotes
      .filter((note) => note.Content.includes(content)) // filter the notes by the content
      .forEach((note) => {
        // for each note in the filtered notes if it's unique add it to the notes array
        if (isUniqueArray(notes, note)) notes.push(note); // if the note is unique, add it to the notes array
      });
  }
  return notes;
};

const removeNote = async function (notesPassed) {
  const db = await DB.getDB();
  if (notesPassed.length !== 0) {
    // if there are notes to remove
    notesPassed.forEach((notePassed) => {
      // for each note to remove
      const index = db.notes.findIndex((dbNote) => dbNote.ID === notePassed.ID); // find the index of the note in the db
      if (index !== -1) {
        // if the note is found
        db.notes.splice(index, 1); // remove the note from the db
      }
    });
    await DB.saveDB(db); // save the db object
    console.log(notesPassed.length, "Notes removed!");
  } else {
    console.error("Error: Note not found!");
  }
};

const removeAllNotes = async function () {
  const db = await DB.getDB(); // get the db object
  db.notes = []; // set the notes array to an empty array
  await DB.saveDB(db); // save the db object
  console.log("All notes removed!");
  // await DB.saveDB({ notes: [] }); // I didn't do that because if in future we add more properties to the db object, they will be lost
};

export default {
  newNote,
  getAllNotes,
  printNotes,
  findNotesByContent,
  removeNote,
  removeAllNotes,
};
