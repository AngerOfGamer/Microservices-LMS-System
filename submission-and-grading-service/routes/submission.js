const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Submission = require("../models/submission");
const Grade = require("../models/grade");
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

// Konfigurasi multer untuk file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// POST: Mahasiswa mengunggah tugas
router.post("/", upload.single("file"), async (req, res) => {
  const { username } = req.user;
  const { task_title, class_id } = req.body;
  const file_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!task_title || !class_id || !file_url) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const submission = new Submission({
      task_title,
      class_id: new mongoose.Types.ObjectId(class_id),
      user_id: user._id,
      submission_url: file_url,
    });

    await submission.save();
    res.status(201).json({ message: "Submission uploaded successfully" });
  } catch (err) {
    console.error("Error saving submission:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET: Admin/Dosen melihat daftar submission
router.get("/", async (req, res) => {
  const { class_id } = req.query;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  try {
    const submissions = await Submission.find({ class_id })
      .populate("user_id", "username")
      .lean();

    const grades = await Grade.find({
      submission_id: { $in: submissions.map((s) => s._id) },
    }).lean();

    const results = submissions.map((submission) => {
      const grade = grades.find((g) => g.submission_id.equals(submission._id));
      return {
        ...submission,
        grade: grade ? grade.grade : null,
      };
    });

    res.json(results);
  } catch (err) {
    console.error("Error fetching submissions:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST: Admin/Dosen memberikan nilai
router.post("/grade", async (req, res) => {
  const { role } = req.user;
  const { submission_id, grade } = req.body;

  if (role !== "admin" && role !== "dosen") {
    return res.status(403).json({ error: "Only admin or dosen can grade submissions" });
  }

  if (!submission_id || grade === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const submissionObjectId = new mongoose.Types.ObjectId(submission_id); // Pastikan submission_id valid

    const gradeRecord = await Grade.findOneAndUpdate(
      { submission_id: submissionObjectId },
      { grade },
      { upsert: true, new: true }
    );

    res.json({ message: "Grade assigned successfully", grade: gradeRecord });
  } catch (err) {
    console.error("Error assigning grade:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
