const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Middleware untuk role authorization
const authorizeRoles = (roles) => (req, res, next) => {
  const userRole = req.session.user?.role; // Role dari session
  if (roles.includes(userRole)) {
    next();
  } else {
    res.status(403).json({ message: "Anda tidak memiliki akses ke fitur ini." });
  }
};

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Endpoint untuk mengambil semua konten
router.get("/", (req, res) => {
  const sql = "SELECT * FROM content";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching contents:", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

// Endpoint untuk menambahkan konten baru (hanya admin dan dosen)
router.post("/", authorizeRoles(["admin", "dosen"]), upload.single("file"), (req, res) => {
  const { class_id, content_title, content_description, category, created_by } = req.body;
  const filePath = req.file ? path.join("uploads", req.file.filename) : null;

  if (!class_id || !content_title || !category || !created_by) {
    return res.status(400).json({ message: "Data tidak lengkap." });
  }

  const sql = `
    INSERT INTO content (class_id, content_title, content_description, content_url, category, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [class_id, content_title, content_description, filePath, category, created_by], (err, result) => {
    if (err) {
      console.error("Error adding content:", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Konten berhasil ditambahkan.", content_id: result.insertId });
  });
});

// Endpoint untuk menghapus konten (hanya admin dan dosen)
router.delete("/:content_id", authorizeRoles(["admin", "dosen"]), (req, res) => {
  const { content_id } = req.params;

  const sql = "DELETE FROM content WHERE content_id = ?";
  db.query(sql, [content_id], (err, result) => {
    if (err) {
      console.error("Error deleting content:", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Konten tidak ditemukan." });
    }
    res.json({ message: "Konten berhasil dihapus." });
  });
});

module.exports = router;
