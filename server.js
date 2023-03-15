const express = require('express');
const app = express();

const path = require('path');

const api = require('./public/assets/js/index')

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use('/api', api);

app.get("/", (req, res) =>
res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`check it out! http://localhost:${PORT}`)
);