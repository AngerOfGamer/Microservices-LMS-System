const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all grades
router.get("/", (req, res) => {
  const sql = "SELECT * FROM grades";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add or update a grade
router.post("/", (req, res) => {
  const { submission_id, grader_id, grade, feedback } = req.body;
  const sql = `
    INSERT INTO grades (submission_id, grader_id, grade, feedback)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE grade = VALUES(grade), feedback = VALUES(feedback)
  `;
  db.query(sql, [submission_id, grader_id, grade, feedback], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ submission_id, grader_id, grade, feedback });
  });
});

module.exports = router;
