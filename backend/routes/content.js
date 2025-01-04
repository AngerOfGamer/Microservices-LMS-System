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
    res.json(results); // Mengembalikan semua data content dalam format JSON
  });
});

// Get content by class ID
router.get("/:class_id", (req, res) => {
  const { class_id } = req.params;
  const sql = "SELECT * FROM content WHERE class_id = ?";
  db.query(sql, [class_id], (err, results) => {
    if (err) {
      console.error("Error fetching content by class ID:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No content found for this class" });
    }
    res.json(results); // Mengembalikan data content berdasarkan class_id
  });
});

// Add new content
router.post("/", (req, res) => {
  const { class_id, content_title, content_description, content_url, created_by } = req.body;

  // Validasi input
  if (!class_id || !content_title || !created_by) {
    return res.status(400).json({ error: "Class ID, Title, and Creator are required" });
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
      class_id,
      content_title,
      content_description,
      content_url,
      created_by,
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
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json({ message: "Content deleted successfully" });
  });
});

module.exports = router;
