const router = require('express').Router()
const express = require('express');
const uuid = require('uuid');


// READ route
router.get("/notes", (req, res) => {
// Read the contents of the db.json file
// Parse the data from JSON to JavaScript object
// Log the notes and its type
// Send the notes back as the response
  });

  // CREATE route
router.post("/notes", (req, res) => {
console.log("Req Body:", req.body);
console.log("Req Body Type:", typeof req.body);
  
// Create a new note object with a unique ID
 const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
};
  
// Read the contents of the db.json file
fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // Parse the data from JSON to JavaScript object
    // Add the new note to the array of notes
    // Write the updated notes back to the db.json file
});

// DELETE route
router.delete("/notes/:id", (req, res) => {
    console.log("Req Params:", req.params);
  
    // Read the contents of the db.json file
    // Parse the data from JSON to JavaScript object
    // Filter out the note that matches the provided ID
    // Write the filtered notes back to the db.json file
  });
  
  module.exports = router;