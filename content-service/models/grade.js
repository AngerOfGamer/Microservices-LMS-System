const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const GradeSchema = new mongoose.Schema({
  grade_id: { type: Number, unique: true },
  submission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  grade: { type: Number, default: null },
  created_at: { type: Date, default: Date.now },
});

GradeSchema.pre('save', async function (next) {
  if (!this.grade_id) {
    this.grade_id = await getNextSequence('grade');
  }
  next();
});

module.exports = mongoose.model('Grade', GradeSchema);
