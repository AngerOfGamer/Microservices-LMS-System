const express = require('express');
const Notification = require('../models/notification');
const ClassMember = require('../models/classMember');

const router = express.Router();

// Endpoint untuk mendapatkan notifikasi berdasarkan role mahasiswa
router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Anda belum login.' });
  }

  const { role, user_id } = req.session.user;

  if (role !== 'mahasiswa') {
    return res.status(403).json({ message: 'Hanya mahasiswa yang dapat melihat notifikasi ini.' });
  }

  try {
    // Notifikasi terkait kelas mahasiswa
    const classNotifications = await Notification.find({ role: 'mahasiswa', class_id: { $ne: null } })
      .populate({
        path: 'class_id',
        match: { user_id },
      })
      .sort({ created_at: -1 });

    // Notifikasi umum dari admin
    const adminNotifications = await Notification.find({ role: 'mahasiswa', class_id: null })
      .sort({ created_at: -1 });

    const allNotifications = [...classNotifications, ...adminNotifications];

    res.status(200).json({ notifications: allNotifications });
  } catch (err) {
    console.error('Kesalahan saat memuat notifikasi:', err.message);
    res.status(500).json({ message: 'Kesalahan server saat memuat notifikasi.' });
  }
});

// Endpoint untuk membuat notifikasi baru
router.post('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Anda belum login.' });
  }

  const { role, user_id } = req.session.user;
  const { title, content, category, class_id } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: 'Judul, konten, dan kategori wajib diisi.' });
  }

  try {
    if (role === 'admin' && category === 'libur') {
      // Admin hanya dapat membuat notifikasi kategori libur
      const notification = new Notification({
        title,
        content,
        category,
        role: 'mahasiswa',
        created_by: user_id,
      });

      await notification.save();
      return res.status(201).json({ message: 'Notifikasi berhasil dibuat.' });
    }

    if (role === 'dosen' && ['materi', 'tugas', 'penilaian'].includes(category)) {
      // Validasi dosen hanya dapat membuat notifikasi untuk kelas mereka
      const isAuthorized = await ClassMember.exists({ user_id, class_id, role: 'dosen' });

      if (!isAuthorized) {
        return res.status(403).json({ message: 'Anda tidak mengajar di kelas ini.' });
      }

      const notification = new Notification({
        title,
        content,
        category,
        role: 'mahasiswa',
        class_id,
        created_by: user_id,
      });

      await notification.save();
      return res.status(201).json({ message: 'Notifikasi berhasil dibuat.' });
    }

    res.status(403).json({ message: 'Role atau kategori tidak valid.' });
  } catch (err) {
    console.error('Kesalahan saat membuat notifikasi:', err.message);
    res.status(500).json({ message: 'Gagal membuat notifikasi.' });
  }
});

module.exports = router;
