const express = require("express");
const db = require("../db");

const router = express.Router();

// 1. Tambah Notifikasi Baru
router.post("/", (req, res) => {
  const { user_id, title, message, type } = req.body;

  if (!user_id || !title || !message || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO notifications (user_id, title, message, type, is_read, created_at)
    VALUES (?, ?, ?, ?, 0, NOW())
  `;

  db.query(sql, [user_id, title, message, type], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Notification created successfully", notification_id: result.insertId });
  });
});

// 2. Ambil Semua Notifikasi
router.get("/", (req, res) => {
  const sql = "SELECT * FROM notifications ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3. Tandai Notifikasi sebagai Dibaca
router.patch("/:notification_id", (req, res) => {
  const { notification_id } = req.params;

  const sql = `
    UPDATE notifications 
    SET is_read = 1 
    WHERE notification_id = ?
  `;

  db.query(sql, [notification_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({ message: "Notification marked as read" });
  });
});

// 4. Hapus Notifikasi
router.delete("/:notification_id", (req, res) => {
  const { notification_id } = req.params;

  const sql = "DELETE FROM notifications WHERE notification_id = ?";

  db.query(sql, [notification_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({ message: "Notification deleted successfully" });
  });
});

module.exports = router;
