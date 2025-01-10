const express = require("express");
const Attendance = require("../models/attendance");
const User = require("../models/user");
const router = express.Router();
const getNextSequence = require("../utils/increment");

// Middleware autentikasi
const authenticate = (req, res, next) => {
  const { username, role } = req.headers;
  if (!username || !role) {
    return res.status(401).json({ error: "Unauthorized: Missing username or role" });
  }
  req.user = { username, role };
  next();
};

router.use(authenticate);

// POST: Simpan data absensi
router.post("/", async (req, res) => {
  const { role } = req.user;

  if (role !== "admin" && role !== "dosen") {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  const { date, class_id, attendance } = req.body;

  if (!date || !class_id || !attendance || !attendance.length) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const attendanceRecords = await Promise.all(
      attendance.map(async (record) => ({
        attendance_id: await getNextSequence("attendance"),
        class_id,
        user_id: record.studentId,
        date,
        status: record.status,
      }))
    );

    await Attendance.insertMany(attendanceRecords);
    res.status(201).json({ message: "Attendance saved successfully" });
  } catch (err) {
    console.error("Error saving attendance:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// GET: Rekap absensi untuk kelas
router.get("/recap", async (req, res) => {
  const { class_id } = req.query;
  const { role, username } = req.user;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  try {
    let recap;

    if (role === "admin" || role === "dosen") {
      recap = await Attendance.find({ class_id })
        .populate("user_id", "username")
        .sort({ date: -1 });
    } else if (role === "mahasiswa") {
      const user = await User.findOne({ username });
      recap = await Attendance.find({ class_id, user_id: user._id })
        .populate("user_id", "username")
        .sort({ date: -1 });
    } else {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.json(
      recap.map((record) => ({
        date: record.date,
        mahasiswa_name: record.user_id.username,
        status: record.status,
      }))
    );
  } catch (err) {
    console.error("Error fetching recap:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
