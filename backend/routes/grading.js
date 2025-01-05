const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all grades
router.get("/", (req, res) => {
  const sql = "SELECT * FROM nilai";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching grades:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// Add or update grade
router.post("/", (req, res) => {
  const { submission_id, grade, feedback } = req.body;

  // Validation
  if (!submission_id || grade == null) {
    return res.status(400).json({ error: "Submission ID and grade are required" });
  }

  const sql = `
    INSERT INTO nilai (submission_id, grade, feedback)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE grade = VALUES(grade), feedback = VALUES(feedback)
  `;
  db.query(sql, [submission_id, grade, feedback], (err, result) => {
    if (err) {
      console.error("Error adding/updating grade:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({
      message: "Grade added/updated successfully",
      grade: { submission_id, grade, feedback },
    });
  });
});

module.exports = router;
