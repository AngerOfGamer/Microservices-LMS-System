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

// POST: Mahasiswa mengumpulkan tugas
router.post("/", upload.single("file"), (req, res) => {
  const { username } = req.user;
  const { task_title, class_id } = req.body;
  const file_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!task_title || !class_id || !file_url) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const getUserIdQuery = "SELECT user_id FROM users WHERE username = ?";
  db.query(getUserIdQuery, [username], (err, userResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (userResults.length === 0) return res.status(404).json({ error: "User not found" });

    const user_id = userResults[0].user_id;

    const sql = `
      INSERT INTO submissions (task_title, class_id, user_id, submission_url)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [task_title, class_id, user_id, file_url], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Submission uploaded successfully" });
    });
  });
});

// GET: Admin/Dosen melihat daftar submission
router.get("/", (req, res) => {
  const { class_id } = req.query;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  const sql = `
    SELECT s.submission_id, s.task_title, u.username, s.submission_date, s.submission_url, n.grade
    FROM submissions s
    JOIN users u ON s.user_id = u.user_id
    LEFT JOIN nilai n ON s.submission_id = n.submission_id
    WHERE s.class_id = ?
    ORDER BY s.submission_date DESC
  `;

  db.query(sql, [class_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST: Admin/Dosen memberikan nilai
router.post("/grade", (req, res) => {
  const { role } = req.user;
  const { submission_id, grade } = req.body;

  if (role !== "admin" && role !== "dosen") {
    return res.status(403).json({ error: "Only admin or dosen can grade submissions" });
  }

  if (!submission_id || grade === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO nilai (submission_id, grade)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE grade = VALUES(grade)
  `;

  db.query(sql, [submission_id, grade], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Grade assigned successfully" });
  });
});

module.exports = router;
