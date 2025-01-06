const express = require("express");
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

// GET: Mendapatkan daftar mahasiswa di kelas
router.get("/students", (req, res) => {
  const { class_id } = req.query;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  const sql = `
    SELECT u.user_id, u.username AS name
    FROM users u
    JOIN class_members cm ON u.user_id = cm.user_id
    WHERE cm.class_id = ? AND cm.role = 'mahasiswa'
  `;
  db.query(sql, [class_id], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("Fetched students:", results);
    res.json(results);
  });
});

// POST: Simpan data absensi
router.post("/", (req, res) => {
  const { date, class_id, attendance } = req.body;

  if (!date || !class_id || !attendance || !attendance.length) {
    return res.status(400).json({ error: "Missing required fields or attendance data is empty" });
  }

  const sql = `
    INSERT INTO absensi (class_id, user_id, date, status)
    VALUES ?
  `;
  const values = attendance.map((record) => [
    class_id,
    record.studentId,
    date,
    record.status,
  ]);

  db.query(sql, [values], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("Attendance saved:", values);
    res.status(201).json({ message: "Attendance saved successfully" });
  });
});

// GET: Catatan absensi mahasiswa
router.get("/records", (req, res) => {
  const { class_id } = req.query;
  const { username } = req.user;

  const getUserIdQuery = "SELECT user_id FROM users WHERE username = ?";
  db.query(getUserIdQuery, [username], (err, userResults) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user_id = userResults[0].user_id;

    const sql = `
      SELECT date, status
      FROM absensi
      WHERE class_id = ? AND user_id = ?
      ORDER BY date DESC
    `;
    db.query(sql, [class_id, user_id], (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: err.message });
      }
      console.log("Attendance records for student:", results);
      res.json(results);
    });
  });
});

// GET: Rekap seluruh hasil absensi untuk kelas tertentu
router.get("/recap", (req, res) => {
  const { class_id } = req.query;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  const sql = `
    SELECT a.date, u.username AS student_name, a.status
    FROM absensi a
    JOIN users u ON a.user_id = u.user_id
    WHERE a.class_id = ?
    ORDER BY a.date DESC, u.username ASC
  `;

  db.query(sql, [class_id], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("Attendance recap:", results);
    res.json(results);
  });
});

module.exports = router;
