const express = require("express");
const db = require("../db");

const router = express.Router();

// Endpoint untuk mendapatkan notifikasi berdasarkan role mahasiswa
router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Anda belum login." });
  }

  const { role, user_id } = req.session.user;

  if (role !== "mahasiswa") {
    return res.status(403).json({ message: "Hanya mahasiswa yang dapat melihat notifikasi ini." });
  }

  // Query untuk notifikasi terkait kelas mahasiswa
  const sqlGetClassNotifications = `
    SELECT n.*
    FROM notifications n
    JOIN class_members cm ON cm.class_id = n.class_id
    WHERE cm.user_id = ? AND cm.role = 'mahasiswa'
    ORDER BY n.created_at DESC`;

  // Query untuk notifikasi umum dari admin
  const sqlGetAdminNotifications = `
    SELECT n.*
    FROM notifications n
    WHERE n.class_id IS NULL AND n.role = 'mahasiswa'
    ORDER BY n.created_at DESC`;

  // Gabungkan notifikasi kelas dan admin
  db.query(sqlGetClassNotifications, [user_id], (err, classNotifications) => {
    if (err) {
      console.error("Kesalahan query notifikasi kelas:", err);
      return res.status(500).json({ message: "Kesalahan server saat memuat notifikasi kelas." });
    }

    db.query(sqlGetAdminNotifications, (err, adminNotifications) => {
      if (err) {
        console.error("Kesalahan query notifikasi admin:", err);
        return res.status(500).json({ message: "Kesalahan server saat memuat notifikasi admin." });
      }

      const allNotifications = [...classNotifications, ...adminNotifications];
      allNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Urutkan berdasarkan tanggal

      res.status(200).json({ notifications: allNotifications });
    });
  });
});


// Endpoint untuk membuat notifikasi baru
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Anda belum login." });
  }

  const { role, user_id } = req.session.user;
  const { title, content, category, class_id } = req.body;

  // Log payload yang diterima untuk debugging
  console.log("Payload diterima backend:", { title, content, category, class_id });

  // Validasi input
  if (!title || !content || !category) {
    return res.status(400).json({ message: "Judul, konten, dan kategori wajib diisi." });
  }

  // Validasi role admin
  if (role === "admin") {
    if (category !== "libur") {
      return res.status(403).json({ message: "Admin hanya dapat membuat notifikasi kategori libur." });
    }
    return createNotification(null); // Admin tidak memerlukan class_id
  }

  // Validasi role dosen
  if (role === "dosen") {
    if (!class_id || ["materi", "tugas", "penilaian"].indexOf(category) === -1) {
      return res.status(403).json({
        message: "Dosen hanya dapat membuat notifikasi kategori materi, tugas, atau penilaian untuk kelas tertentu.",
      });
    }

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
