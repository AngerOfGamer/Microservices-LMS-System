const express = require("express");
const db = require("../db");

const router = express.Router();

// Endpoint untuk membuat notifikasi baru
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Anda belum login." });
  }

  const { role, user_id } = req.session.user; // Role dan ID user dari sesi
  const { title, content, category, class_id } = req.body; // Data dari frontend

  // Validasi input
  if (!title || !content || !category) {
    return res.status(400).json({ message: "Judul, konten, dan kategori wajib diisi." });
  }

  // Role-specific validation
  if (role === "admin" && category !== "libur") {
    return res.status(403).json({ message: "Admin hanya dapat membuat notifikasi kategori libur." });
  }

  if (role === "dosen" && (!class_id || ["materi", "tugas", "penilaian"].indexOf(category) === -1)) {
    return res.status(403).json({
      message: "Dosen hanya dapat membuat notifikasi kategori materi, tugas, atau penilaian untuk kelas tertentu.",
    });
  }

  // Jika role adalah dosen, periksa apakah dia mengajar di kelas yang dimaksud
  if (role === "dosen") {
    const sqlCheckClass = `
      SELECT c.class_id
      FROM classes c
      JOIN class_members cm ON cm.class_id = c.class_id
      WHERE cm.user_id = ? AND cm.role = 'dosen' AND c.class_id = ?`;

    db.query(sqlCheckClass, [user_id, class_id], (err, results) => {
      if (err) {
        console.error("Kesalahan query:", err);
        return res.status(500).json({ message: "Kesalahan server saat memvalidasi kelas." });
      }

      if (results.length === 0) {
        return res.status(403).json({ message: "Anda tidak mengajar di kelas ini." });
      }

      // Validasi berhasil, lanjutkan membuat notifikasi
      createNotification();
    });
  } else {
    // Jika role admin, langsung lanjutkan pembuatan notifikasi
    createNotification();
  }

  function createNotification() {
    // Ambil recipient IDs jika kategori membutuhkan target spesifik
    if (role === "dosen") {
      const sqlGetStudents = `
        SELECT user_id
        FROM class_members
        WHERE class_id = ? AND role = 'mahasiswa'`;

      db.query(sqlGetStudents, [class_id], (err, studentResults) => {
        if (err) {
          console.error("Kesalahan query mahasiswa:", err);
          return res.status(500).json({ message: "Kesalahan server saat mengambil mahasiswa." });
        }

        const recipientIds = studentResults.map((student) => student.user_id);
        saveNotification(recipientIds);
      });
    } else {
      // Admin tidak membutuhkan recipient spesifik
      saveNotification(null);
    }
  }

  function saveNotification(recipientIds) {
    const sqlInsertNotification = `
      INSERT INTO notifications (title, content, category, role, class_id, recipient_ids, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

    db.query(
      sqlInsertNotification,
      [title, content, category, "mahasiswa", class_id || null, JSON.stringify(recipientIds), user_id],
      (err, result) => {
        if (err) {
          console.error("Kesalahan query notifikasi:", err);
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
