const express = require("express");
const Attendance = require("../models/attendance");
const User = require("../models/user");
const ClassMember = require("../models/classMember");

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

// GET: Daftar mahasiswa di kelas
router.get("/students", async (req, res) => {
  const { class_id } = req.query;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  try {
    const students = await ClassMember.find({ class_id, role: "mahasiswa" })
      .populate("user_id", "username -_id");
    res.json(students);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST: Simpan data absensi
router.post("/", async (req, res) => {
  const { date, class_id, attendance } = req.body;

  if (!date || !class_id || !attendance || !attendance.length) {
    return res.status(400).json({ error: "Missing required fields or attendance data is empty" });
  }

  try {
    const attendanceRecords = attendance.map(record => ({
      class_id,
      user_id: record.studentId,
      date,
      status: record.status
    }));

    await Attendance.insertMany(attendanceRecords);
    res.status(201).json({ message: "Attendance saved successfully" });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET: Catatan absensi mahasiswa
router.get("/records", async (req, res) => {
  const { class_id } = req.query;
  const { username } = req.user;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const records = await Attendance.find({ class_id, user_id: user._id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET: Rekap seluruh hasil absensi untuk kelas tertentu
router.get("/recap", async (req, res) => {
  const { class_id } = req.query;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  try {
    const recap = await Attendance.find({ class_id })
      .populate("user_id", "username -_id")
      .sort({ date: -1, "user_id.username": 1 });
    res.json(recap);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
