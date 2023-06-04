const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Read notes from db.json file
function readNotesFromFile(callback) {
  // Read the contents of the db.json file
  // Parse the data as JSON
  // Pass the notes to the callback function
}

// Write notes to db.json file
function writeNotesToFile(notes, callback) {
  // Write the notes array to the db.json file
  // Invoke the callback function to indicate the operation is complete

}

// READ route
router.get("/notes", (req, res) => {
  // Retrieve all notes from the file
  // If an error occurred while reading the file, return a 500 error
  // Return the notes as a JSON response
});

// CREATE route
router.post("/notes", (req, res) => {
  console.log("Req Body:", req.body);
  console.log("Req Body Type:", typeof req.body);
  // If the request body does not contain a title or text, return a 400 error
  // Retrieve existing notes from the file
  readNotesFromFile((err, notes) => {
      // If an error occurred while reading the file, return a 500 error
    })

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

      // Return a 201 status indicating the note was successfully created
      return res.status(201).json({ message: "Note Created" });
    });
  });


// DELETE route
router.delete("/notes/:id", (req, res) => {
  console.log("Req Params:", req.params);

  // Retrieve existing notes from the file
  readNotesFromFile((err, notes) => {
    if (err) {
      // If an error occurred while reading the file, return a 500 error
      return res.status(500).json({ error: "Internal server error" });
    }
    // Filter out the note with the specified ID
    // Write the filtered notes back to the file
    writeNotesToFile(filteredNotes, (err) => {
      if (err) {
        // If an error occurred while writing the file, return a 500 error
        return res.status(500).json({ error: "Internal server error" });
      }

      console.log("deleted note");

      // Return a 200 status indicating the note was successfully deleted
      return res.status(200).json({ message: "Note Deleted" });
    });
  });
});

module.exports = router;
