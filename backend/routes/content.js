const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all content
router.get("/", (req, res) => {
  const sql = "SELECT * FROM content";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching content:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// Get content by class ID
router.get("/:class_id", (req, res) => {
  const { class_id } = req.params;
  const sql = "SELECT * FROM content WHERE class_id = ?";
  db.query(sql, [class_id], (err, results) => {
    if (err) {
      console.error("Error fetching content:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// Add new content
router.post("/", (req, res) => {
  const { class_id, content_title, content_description, content_url, created_by } = req.body;

  if (!class_id || !content_title || !created_by) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "INSERT INTO content (class_id, content_title, content_description, content_url, created_by) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [class_id, content_title, content_description, content_url, created_by], (err, result) => {
    if (err) {
      console.error("Error adding content:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({
      message: "Content added successfully",
      content_id: result.insertId,
    });
  });
});

// Delete content by ID
router.delete("/:content_id", (req, res) => {
  const { content_id } = req.params;
  const sql = "DELETE FROM content WHERE content_id = ?";
  db.query(sql, [content_id], (err, result) => {
    if (err) {
      console.error("Error deleting content:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json({ message: "Content deleted successfully" });
  });
});

module.exports = router;
