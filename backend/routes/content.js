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

// Middleware untuk validasi header autentikasi
const authenticate = (req, res, next) => {
  const { username, role } = req.headers;
  if (!username || !role) {
    return res.status(401).json({ error: "Unauthorized: Missing username or role in headers" });
  }
  req.user = { username, role };
  next();
};

router.use(authenticate);

// ==========================
//    RUTE UNTUK KONTEN
// ==========================

// Mendapatkan semua konten (materi dan tugas)
router.get("/", (req, res) => {
  const sql = `
    SELECT * FROM content
    ORDER BY created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Menambahkan konten (materi/tugas)
router.post("/", upload.single("file"), (req, res) => {
  const { username } = req.user;
  const { class_id, content_title, content_description, content_type } = req.body;

  if (!class_id || !content_title || !content_description || !content_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const filePath = req.file ? path.join("uploads", req.file.filename) : null;

  const sql = `
    INSERT INTO content (class_id, content_title, content_description, content_url, created_by, content_type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [class_id, content_title, content_description, filePath, username, content_type], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Content added successfully", content_id: result.insertId });
  });
});

// Menghapus konten (materi/tugas)
router.delete("/:content_id", (req, res) => {
  const { role } = req.user;

  if (!["admin", "dosen"].includes(role)) {
    return res.status(403).json({ message: "Forbidden: You do not have access to this resource." });
  }

  const { content_id } = req.params;

  const sql = "DELETE FROM content WHERE content_id = ?";
  db.query(sql, [content_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Content not found." });
    }
    res.json({ message: "Content successfully deleted." });
  });
});

// ==========================
//    RUTE KHUSUS TUGAS
// ==========================

// Mengirim tugas dan notifikasi ke mahasiswa
router.post("/assign-task", (req, res) => {
  const { username, role } = req.user;

  if (role !== "dosen") {
    return res.status(403).json({ error: "Forbidden: Only dosen can assign tasks" });
  }

  const { class_id, task_title, task_description, submission_deadline } = req.body;

  if (!class_id || !task_title || !task_description || !submission_deadline) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertTaskQuery = `
    INSERT INTO submissions (task_title, class_id, user_id, submission_url, submission_date)
    VALUES (?, ?, ?, NULL, NOW())
  `;
  db.query(insertTaskQuery, [task_title, class_id, username], (err, taskResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const taskId = taskResult.insertId;

    const getStudentsQuery = `
      SELECT user_id FROM class_members WHERE class_id = ? AND role = 'mahasiswa'
    `;
    db.query(getStudentsQuery, [class_id], (err, students) => {
      if (err) return res.status(500).json({ error: err.message });

      if (students.length === 0) {
        return res.status(200).json({
          message: "Task assigned, but no students found in the class.",
          task_id: taskId,
        });
      }

      const notifications = students.map((student) => [
        student.user_id,
        `Tugas Baru: ${task_title}`,
        `Tugas baru telah diberikan oleh dosen. Deskripsi: ${task_description}. Batas waktu: ${submission_deadline}.`,
        "info",
      ]);

      const insertNotificationsQuery = `
        INSERT INTO notifications (user_id, title, message, type, is_read, created_at)
        VALUES ?
      `;
      db.query(insertNotificationsQuery, [notifications], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
          message: "Task assigned and notifications sent successfully.",
          task_id: taskId,
        });
      });
    });
  });
});

module.exports = router;
