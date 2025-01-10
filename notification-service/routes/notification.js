const express = require("express");
const mongoose = require("mongoose");
const Notification = require("../models/notification");
const ClassMember = require("../models/classMember");
const Class = require("../models/class");
const User = require("../models/user");

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

// GET: Mahasiswa melihat notifikasi
router.get("/", async (req, res) => {
  const { role, username } = req.user;

  if (role !== "mahasiswa") {
    return res.status(403).json({ message: "Hanya mahasiswa yang dapat melihat notifikasi ini." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Pengguna tidak ditemukan." });
    }

    // Cari kelas mahasiswa
    const classIds = await ClassMember.find({ user_id: user._id }).select("class_id");
    const classIdArray = classIds.map((cls) => cls.class_id);

    // Query notifikasi
    const notifications = await Notification.find({
      $or: [
        { class_id: { $in: classIdArray } }, // Notifikasi untuk kelas mahasiswa
        { class_id: null }, // Notifikasi umum (libur)
      ],
    })
      .sort({ created_at: -1 })
      .lean();

    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err.message);
    res.status(500).json({ message: "Gagal memuat notifikasi." });
  }
});

// POST: Membuat notifikasi baru
router.post("/", async (req, res) => {
  const { role, username } = req.user;
  const { title, content, category, class_id } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: "Judul, konten, dan kategori wajib diisi." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Pengguna tidak ditemukan." });
    }

    if (role === "admin" && category === "libur") {
      const notification = new Notification({
        title,
        content,
        category,
        class_id: null,
        created_by: user._id,
      });
      await notification.save();
      return res.status(201).json({ message: "Notifikasi libur berhasil dibuat." });
    }

    if (role === "dosen" && ["materi", "tugas"].includes(category)) {
      if (!mongoose.Types.ObjectId.isValid(class_id)) {
        return res.status(400).json({ message: "class_id tidak valid." });
      }

      const isAuthorized = await ClassMember.exists({
        user_id: user._id,
        class_id: class_id,
        role: "dosen",
      });

      if (!isAuthorized) {
        return res.status(403).json({ message: "Anda tidak mengajar di kelas ini." });
      }

      const notification = new Notification({
        title,
        content,
        category,
        class_id: mongoose.Types.ObjectId(class_id),
        created_by: user._id,
      });
      await notification.save();
      return res.status(201).json({ message: "Notifikasi berhasil dibuat." });
    }

    res.status(403).json({ message: "Role atau kategori tidak valid." });
  } catch (err) {
    console.error("Error creating notification:", err.message);
    res.status(500).json({ message: "Gagal membuat notifikasi." });
  }
});

// GET: Dosen melihat kelas yang diajarkan
router.get("/classes", async (req, res) => {
  const { username, role } = req.user;

  if (role !== "dosen") {
    return res.status(403).json({ message: "Hanya dosen yang dapat mengakses kelas ini." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Pengguna tidak ditemukan." });
    }

    const classes = await ClassMember.find({ user_id: user._id, role: "dosen" })
      .populate("class_id", "class_name")
      .lean();

    res.status(200).json({ classes: classes.map((cls) => cls.class_id) });
  } catch (err) {
    console.error("Error fetching classes:", err.message);
    res.status(500).json({ error: "Kesalahan saat mengambil data kelas." });
  }
});

module.exports = router;
