const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  absensi_id: { type: Number, required: true, unique: true },
  class_id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['hadir', 'tidak hadir'], required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
