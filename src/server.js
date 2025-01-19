import fs from "node:fs/promises";
import { fileURLToPath } from "url";
import http from "node:http";
import open from "open";

const interpolate = function (html, data) {
  // regex to match all {{placeholder}} in the html
  return html.replace(
    /\{\{\s*(\w+)\s*\}\}/g, // search for { then { then any number of spaces then any word then any number of spaces then } then } globally
    (match, placeholder) => data[placeholder] || ""
  ); // The replace method is used to replace each matched placeholder with its corresponding value from the data object, or '' if it doesn't exist
};

const fomateNotes = function (notes) {
  return notes
    .map((note) => {
      return `
        <div class="note">
            <h2>ID: ${note.ID}</h2>
            <p><strong> Tags: </strong>${note.Tags.join(", ")}</p>
            <p><strong> Content: </strong>${note.Content}</p>
        </div>
        `; // return a div with the note's ID, Content, and Tags joined by a comma
    })
    .join("\n"); // join all the notes into one string with new lines
};

const createLocalServer = async function (notes) {
  // this function takes notes and returns a server
  return http.createServer(async (req, res) => {
    // this built-in method takes a function and returns a server
    const html = await fs.readFile(
      fileURLToPath(new URL("./template.html", import.meta.url)),
      "utf-8"
    ); // read the index.html file and store it in html
    res.writeHead(200, { "Content-Type": "text/html" }); // set the header to text/html and status code to 200
    res.end(interpolate(html, { notes: fomateNotes(notes) })); // end the response by interpolating the html file with the notes formatted by fomateNotes
  });
};

const start = async function (notes, port) {
  // this function takes notes and a port number
  const server = await createLocalServer(notes); // create a server with the notes passed
  server.listen(port, () => {
    // listen on the port
    console.log(`Server is running on port http://localhost:${port}`); // log a message to the console
    open(`http://localhost:${port}`); // open the browser to the server after it's running
  });
};

export default { start, createLocalServer, fomateNotes, interpolate }; // I only need start function, however I exported all the functions so they can be tested
