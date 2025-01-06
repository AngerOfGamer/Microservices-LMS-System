const express = require("express");
const db = require("../db");

const router = express.Router();

// Middleware: Check Authentication
const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "You are not logged in." });
  }
  next();
};

// GET: Retrieve Notifications
router.get("/", checkAuth, (req, res) => {
  const { user_id, role } = req.session.user;

  let sql;
  let params = [];

  if (role === "mahasiswa") {
    sql = `
      SELECT * FROM notifications 
      WHERE recipient_ids IS NULL OR JSON_CONTAINS(recipient_ids, JSON_QUOTE(?))
      ORDER BY created_at DESC
    `;
    params = [user_id];
  } else if (role === "dosen") {
    sql = `
      SELECT n.* 
      FROM notifications n
      JOIN class_members cm ON cm.class_id = n.class_id
      WHERE cm.user_id = ? AND cm.role = 'dosen'
      ORDER BY n.created_at DESC
    `;
    params = [user_id];
  } else {
    return res.status(403).json({ message: "Access denied." });
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error." });
    }
    res.json({ notifications: results });
  });
});

// POST: Create Notification
router.post("/", checkAuth, (req, res) => {
  const { title, content, category, class_id } = req.body;
  const { role, user_id } = req.session.user;

  if (!title || !content || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sqlInsert = `
    INSERT INTO notifications (title, content, category, role, class_id, recipient_ids, created_by, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const recipientIdsQuery = `
    SELECT user_id FROM class_members WHERE class_id = ? AND role = 'mahasiswa'
  `;

  db.query(recipientIdsQuery, [class_id], (err, recipients) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error." });
    }

    const recipientIds = JSON.stringify(recipients.map((r) => r.user_id));
    db.query(
      sqlInsert,
      [title, content, category, role, class_id, recipientIds, user_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to create notification." });
        }

        res.status(201).json({ message: "Notification created successfully." });
      }
    );
  });
});

module.exports = router;
