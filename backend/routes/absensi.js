const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db");

// Middleware untuk role authorization
const authorizeRoles = (roles) => (req, res, next) => {
  const userRole = req.session.user?.role; // Ambil role dari session
  if (roles.includes(userRole)) {
    next();
  } else {
    res.status(403).json({ message: "Anda tidak memiliki akses ke fitur ini." });
  }
};

// Konfigurasi penyimpanan file menggunakan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = ["video/mp4", "application/pdf"];
    if (!fileTypes.includes(file.mimetype)) {
      return cb(new Error("Only MP4 videos and PDF documents are allowed!"));
    }
    cb(null, true);
  },
});

// Endpoint untuk mendapatkan semua konten (akses untuk semua peran)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM content";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json(results);
  });
});

// Endpoint untuk menambahkan konten (akses untuk admin dan dosen)
router.post("/", authorizeRoles(["admin", "dosen"]), upload.single("file"), (req, res) => {
  const { class_id, content_title, content_description, content_type } = req.body;

  if (!class_id || !content_title || !content_type) {
    return res.status(400).json({ message: "Class ID, Title, and Content Type are required." });
  }

  const filePath = req.file ? path.join("uploads", req.file.filename) : null;

  const sql = "INSERT INTO content (class_id, content_title, content_description, content_url, content_type) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [class_id, content_title, content_description, filePath, content_type], (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.status(201).json({ message: "Konten berhasil ditambahkan.", content_id: result.insertId });
  });
});

// Endpoint untuk menghapus konten (akses untuk admin dan dosen)
router.delete("/:content_id", authorizeRoles(["admin", "dosen"]), (req, res) => {
  const { content_id } = req.params;

  const sql = "DELETE FROM content WHERE content_id = ?";
  db.query(sql, [content_id], (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Konten tidak ditemukan." });
    }
    res.json({ message: "Konten berhasil dihapus." });
  });
});

// Endpoint untuk mahasiswa melihat konten berdasarkan class_id mereka
router.get("/:class_id", authorizeRoles(["mahasiswa"]), (req, res) => {
  const { class_id } = req.params;

  const sql = "SELECT * FROM content WHERE class_id = ?";
  db.query(sql, [class_id], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json(results);
  });
});

module.exports = router;
