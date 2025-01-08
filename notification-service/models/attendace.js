const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const AttendanceSchema = new mongoose.Schema({
    attendance_id: { type: Number, unique: true },
    class_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['hadir', 'tidak hadir'], required: true },
    created_at: { type: Date, default: Date.now }
});

AttendanceSchema.pre('save', async function (next) {
    if (!this.attendance_id) {
      this.attendance_id = await getNextSequence('attendance'); 
    }
    next();
  });

module.exports = mongoose.model('Attendance', AttendanceSchema);
