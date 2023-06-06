const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Read notes from db
function readNotesFromFile(callback) {
  // Read db content
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    // get data as a JSON
    const notes = JSON.parse(data);

    // Pass the notes to the callback function
    return callback(null, notes);
  });
}

// Write notes to db
function writeNotesToFile(notes, callback) {
  // Write the notes array to the db
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    console.log("File saved!");

    // callback to indicate the operation is complete
    return callback(null);
  });
}

// READ route
router.get("/notes", (req, res) => {
  // Retrieve all notes
  readNotesFromFile((err, notes) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("Notes:", notes);
    console.log("Type:", typeof notes);

    // Return the notes as a JSON
    return res.json(notes);
  });
});

// CREATE route
router.post("/notes", (req, res) => {
  console.log("Req Body:", req.body);
  console.log("Req Body Type:", typeof req.body);

  const { title, text } = req.body;

  if (!title || !text) {
    // If the request body does not contain a title or text, return a 400 error
    return res.status(400).json({ error: "Empty Strings are insufficent" });
  }

  // Retrieve existing notes from the file
  readNotesFromFile((err, notes) => {
    if (err) {
      // If an error occurred while reading the file, return a 500 error
      return res.status(500).json({ error: "Internal server error" });
    }

    // Create a new note object with a unique ID
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };

    // Add the new note to the existing notes array
    notes.push(newNote);
    console.log("Notes:", notes);

    // Write the updated notes array back to the file
    writeNotesToFile(notes, (err) => {
      if (err) {
        // If an error occurred while writing the file, return a 500 error
        return res.status(500).json({ error: "Internal server error" });
      }

      // Return a 201 when the noteis created
      return res.status(201).json({ message: "Note Created" });
    });
  });
});

// DELETE route
router.delete("/notes/:id", (req, res) => {
  console.log("Req Params:", req.params);

  // Retrieve existing notes
  readNotesFromFile((err, notes) => {
    if (err) {
      // If an error occurred while reading the file, return a 500 error
      return res.status(500).json({ error: "Internal server error" });
    }

    // Filter out the note with using its ID
    const filteredNotes = notes.filter((note) => note.id !== req.params.id);
    console.log("Filtered Notes:", filteredNotes);

    // Write the filtered notes back to the file
    writeNotesToFile(filteredNotes, (err) => {
      if (err) {
        // If an error occurred while writing the file, return a 500 error
        return res.status(500).json({ error: "Internal server error" });
      }

      console.log("deleted note");

      // Return a 200 status when a note is deleted
      return res.status(200).json({ message: "Note Deleted" });
    });
  });
});

module.exports = router;
