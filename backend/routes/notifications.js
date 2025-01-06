const express = require("express");
const db = require("../db"); 
const router = express.Router();

// Middleware untuk memeriksa apakah pengguna sudah login
const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Anda belum login." });
  }
  next();
};

// Middleware untuk validasi role pengguna
const checkRole = (allowedRoles) => (req, res, next) => {
  const { role } = req.session.user;
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ message: "Akses ditolak." });
  }
  next();
};

// Endpoint untuk mendapatkan notifikasi (hanya untuk mahasiswa)
router.get("/", checkAuth, checkRole(["mahasiswa"]), (req, res) => {
  const { user_id } = req.session.user;

  const sqlGetNotifications = `
    SELECT n.*
    FROM notifications n
    LEFT JOIN class_members cm ON cm.class_id = n.class_id
    WHERE (n.class_id IS NULL OR cm.user_id = ?) AND n.role = 'mahasiswa'
    ORDER BY n.created_at DESC`;

  db.query(sqlGetNotifications, [user_id], (err, results) => {
    if (err) {
      console.error("Kesalahan query notifikasi:", err);
      return res.status(500).json({ message: "Kesalahan server." });
    }

    res.status(200).json({ notifications: results });
  });
});

// Endpoint untuk membuat notifikasi baru
router.post("/", checkAuth, (req, res) => {
  const { role, user_id } = req.session.user;
  const { title, content, category, class_id } = req.body;

  // Validasi input
  if (!title || !content || !category) {
    return res.status(400).json({ message: "Judul, konten, dan kategori wajib diisi." });
  }

  // Validasi berdasarkan role
  if (role === "admin") {
    if (category !== "libur") {
      return res.status(403).json({ message: "Admin hanya dapat membuat notifikasi kategori libur." });
    }
    return createNotification(null); // Admin tidak memerlukan class_id
  }

  if (role === "dosen") {
    if (!class_id || !["materi", "tugas", "penilaian"].includes(category)) {
      return res.status(400).json({
        message: "Dosen hanya dapat membuat notifikasi kategori materi, tugas, atau penilaian untuk kelas tertentu.",
      });
    }

    // Validasi apakah dosen mengajar di kelas yang dipilih
    const sqlCheckClass = `
      SELECT c.class_id
      FROM classes c
      JOIN class_members cm ON cm.class_id = c.class_id
      WHERE cm.user_id = ? AND cm.role = 'dosen' AND c.class_id = ?`;

    db.query(sqlCheckClass, [user_id, class_id], (err, results) => {
      if (err) {
        console.error("Kesalahan query validasi kelas:", err);
        return res.status(500).json({ message: "Kesalahan server saat memvalidasi kelas." });
      }

      if (results.length === 0) {
        return res.status(403).json({ message: "Anda tidak mengajar di kelas ini." });
      }

      return createNotification(class_id);
    });
  }

  function createNotification(classId) {
    const sqlInsertNotification = `
      INSERT INTO notifications (title, content, category, role, class_id, recipient_ids, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

    const recipientIds = classId ? JSON.stringify([]) : null; // Admin tidak memiliki recipient
    db.query(
      sqlInsertNotification,
      [title, content, category, "mahasiswa", classId, recipientIds, user_id],
      (err, result) => {
        if (err) {
          console.error("Kesalahan query pembuatan notifikasi:", err);
          return res.status(500).json({ message: "Gagal membuat notifikasi." });
        }

        res.status(201).json({
          message: "Notifikasi berhasil dibuat.",
          notificationId: result.insertId,
        });
      }
    );
  }
});

module.exports = router;
