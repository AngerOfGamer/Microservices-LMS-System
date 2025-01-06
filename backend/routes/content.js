const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");

const router = express.Router();

// Middleware autentikasi
const authenticate = (req, res, next) => {
  const { username, role } = req.headers;
  if (!username || !role) {
    return res.status(401).json({ error: "Unauthorized: Missing username or role in headers" });
  }
  req.user = { username, role };
  next();
};

router.use(authenticate);

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// POST: Menambahkan konten baru dengan file
router.post("/", upload.single("file"), (req, res) => {
  const { username } = req.user;
  const { class_id, content_title, content_description, category } = req.body;
  const file_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!class_id || !content_title || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const getUserIdQuery = "SELECT user_id FROM users WHERE username = ?";
  db.query(getUserIdQuery, [username], (err, userResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (userResults.length === 0) return res.status(404).json({ error: "User not found" });

    const created_by = userResults[0].user_id;

    const sql = `
      INSERT INTO content (class_id, content_title, content_description, category, created_by, content_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [class_id, content_title, content_description, category, created_by, file_url], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Content added successfully", content_id: result.insertId });
    });
  });
});

// GET: Mendapatkan semua konten berdasarkan `class_id`
router.get("/", (req, res) => {
  const { class_id } = req.query;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  const sql = "SELECT * FROM content WHERE class_id = ?";
  db.query(sql, [class_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
