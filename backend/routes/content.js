const express = require("express");
const multer = require("multer"); // Middleware untuk upload file
const path = require("path");
const db = require("../db");

const router = express.Router();

// Konfigurasi penyimpanan file menggunakan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder tempat menyimpan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Middleware untuk upload file
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = ["video/mp4", "application/pdf"];
    if (!fileTypes.includes(file.mimetype)) {
      return cb(new Error("Only MP4 videos and PDF documents are allowed!"));
    }
    cb(null, true);
  },
});

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

// Add new content (support for video or document upload)
router.post("/", upload.single("file"), (req, res) => {
  const { class_id, content_title, content_description, content_url, created_by, content_type } = req.body;

  // Validasi input
  if (!class_id || !content_title || !created_by || !content_type) {
    return res.status(400).json({ error: "Class ID, Title, Creator, and Content Type are required" });
  }

  let filePath = req.file ? path.join("uploads", req.file.filename) : content_url;

  const sql = "INSERT INTO content (class_id, content_title, content_description, content_url, created_by, content_type) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [class_id, content_title, content_description, filePath, created_by, content_type], (err, result) => {
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
      content_url: filePath,
      created_by,
      content_type,
    });
  });
});

// Edit content by ID
router.put("/:content_id", upload.single("file"), (req, res) => {
  const { content_id } = req.params;
  const { class_id, content_title, content_description, created_by, content_type } = req.body;
  const filePath = req.file ? path.join("uploads", req.file.filename) : undefined;

  // Update SQL
  const sql = `UPDATE content SET 
    class_id = ?, 
    content_title = ?, 
    content_description = ?, 
    content_url = COALESCE(?, content_url), 
    created_by = ?, 
    content_type = ? 
    WHERE content_id = ?`;

  db.query(sql, [class_id, content_title, content_description, filePath, created_by, content_type, content_id], (err, result) => {
    if (err) {
      console.error("Error updating content:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json({ message: "Content updated successfully" });
  });
});

// Delete content by ID
router.delete("/:content_id", (req, res) => {
  const { content_id } = req.params;

  // Get file path for deletion
  const getFilePathSql = "SELECT content_url FROM content WHERE content_id = ?";
  db.query(getFilePathSql, [content_id], (err, results) => {
    if (err) {
      console.error("Error fetching content for deletion:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Content not found" });
    }

    const filePath = results[0].content_url;

    // Delete content from database
    const deleteSql = "DELETE FROM content WHERE content_id = ?";
    db.query(deleteSql, [content_id], (err, result) => {
      if (err) {
        console.error("Error deleting content:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Hapus file jika ada
      if (filePath && filePath.startsWith("uploads/")) {
        const fs = require("fs");
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err.message);
        });
      }

      res.json({ message: "Content deleted successfully" });
    });
  });
});

module.exports = router;
