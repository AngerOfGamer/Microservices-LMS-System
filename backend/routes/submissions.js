const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all submissions
router.get("/", (req, res) => {
  const sql = "SELECT * FROM submissions";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching submissions:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// Add new submission
router.post("/", (req, res) => {
  const { task_title, class_id, user_id, submission_url } = req.body;

  // Validation
  if (!task_title || !class_id || !user_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO submissions (task_title, class_id, user_id, submission_url)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [task_title, class_id, user_id, submission_url], (err, result) => {
    if (err) {
      console.error("Error adding submission:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({
      message: "Submission added successfully",
      submission: { id: result.insertId, task_title, class_id, user_id, submission_url },
    });
  });
});

module.exports = router;
