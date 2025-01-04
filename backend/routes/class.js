const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all classes
router.get("/", (req, res) => {
  const sql = "SELECT * FROM classes";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new class
router.post("/", (req, res) => {
  const { class_name, description } = req.body;
  const sql = "INSERT INTO classes (class_name, description) VALUES (?, ?)";
  db.query(sql, [class_name, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, class_name, description });
  });
});

module.exports = router;
