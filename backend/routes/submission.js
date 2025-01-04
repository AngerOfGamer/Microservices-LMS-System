const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all submissions
router.get("/", (req, res) => {
  const sql = "SELECT * FROM submissions";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new submission
router.post("/", (req, res) => {
  const { student_id, class_id, submission_file, submitted_at } = req.body;
  const sql = "INSERT INTO submissions (student_id, class_id, submission_file, submitted_at) VALUES (?, ?, ?, ?)";
  db.query(sql, [student_id, class_id, submission_file, submitted_at], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, student_id, class_id, submission_file, submitted_at });
  });
});

module.exports = router;
