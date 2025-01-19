import fs from "fs/promises";
import { fileURLToPath } from "url";

// fileURLToPath is a function that converts a file URL to a file path
const dbPath = fileURLToPath(new URL("./../db.json", import.meta.url));

// these are the ORM-like functions that interact with the database:

const getDB = async function () {
  try {
    // utf-8 is the encoding because we will write in it in a human-readable format
    return JSON.parse(await fs.readFile(dbPath, "utf-8")); // read the db.json file and parse it into an object
  } catch (error) {
    throw new Error(
      "Error: in reading the database file. Details: " + error.message
    );
  }
};

const saveDB = async function (db) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2)); // write db passed into db.json . null, 2 to make the json file human-readable. 2 is the number of spaces to indent by
    return db; // return the db object to be used in other functions
  } catch (error) {
    throw new Error(
      "Error: in writing to the database file. Details: " + error.message
    );
  }
};

const insert = async function (data) {
  try {
    const db = await getDB(); // get the db
    db.notes.push(data); // push the data into the notes array
    return await saveDB(db); // write the new db object to the whole db.json file (rewriting it)
    // await saveDB((await getDB()).notes.push(data)); can't make this because push returns the length of the array and the db changed isn't stored in a variable then saved using saveDB
  } catch (error) {
    throw new Error(
      "Error: in inserting data to the database. Details: " + error.message
    );
  }
};

export default { getDB, saveDB, insert };
