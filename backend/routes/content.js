const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");

const router = express.Router();

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

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
    }
    cb(null, true);
  },
});

// Rute: Mendapatkan semua konten
router.get("/", (req, res) => {
  const username = req.headers["username"];
  const role = req.headers["role"];

  // Cek autentikasi
  if (!username || !role) {
    return res.status(401).json({ error: "Unauthorized: Missing username or role in headers" });
  }

  const sql = "SELECT * FROM content";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", upload.single("file"), (req, res) => {
  const username = req.headers["username"];
  const role = req.headers["role"];

  // Validasi autentikasi
  if (!username || !role) {
    return res.status(401).json({ error: "Unauthorized: Missing username or role in headers" });
  }

  // Validasi input
  const { class_id, content_title, content_description, content_type } = req.body;
  if (!class_id || !content_title || !content_description || !content_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const created_by = username; // Gunakan username dari header
  const filePath = req.file ? path.join("uploads", req.file.filename) : null;

  const sql = `
    INSERT INTO content (class_id, content_title, content_description, content_url, created_by, content_type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [class_id, content_title, content_description, filePath, created_by, content_type], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Content added successfully", content_id: result.insertId });
  });
});

// Rute: Menghapus konten (hanya admin dan dosen)
router.delete("/:content_id", (req, res) => {
  const username = req.headers["username"];
  const role = req.headers["role"];

  // Cek autentikasi
  if (!username || !role) {
    return res.status(401).json({ error: "Unauthorized: Missing username or role in headers" });
  }

  // Cek otorisasi
  if (!["admin", "dosen"].includes(role)) {
    return res.status(403).json({ message: "Forbidden: You do not have access to this resource." });
  }

  const { content_id } = req.params;

  const sql = "DELETE FROM content WHERE content_id = ?";
  db.query(sql, [content_id], (err, result) => {
    if (err) {
      console.error("Error deleting content:", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Content not found." });
    }
    res.json({ message: "Content successfully deleted." });
  });
});

module.exports = router;
