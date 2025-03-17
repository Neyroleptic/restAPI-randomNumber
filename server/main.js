const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const generatedNumbers = new Map();

app.get("/generate", (req, res) => {
  const id = Date.now().toString();
  const number = Math.floor(Math.random() * 1000) + 1;
  generatedNumbers.set(id, number);
  res.json({ id, number });
});

app.get("/retrieve/:id", (req, res) => {
  const number = generatedNumbers.get(req.params.id);
  if (number !== undefined) {
    res.json({ id: req.params.id, number });
  } else {
    res.status(404).json({ error: "ID not found" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
