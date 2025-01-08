const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  nilai_id: { type: Number, required: true, unique: true },
  submission_id: { type: Number, required: true },
  grade: { type: Number, default: null },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grade', GradeSchema);
