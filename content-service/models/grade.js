const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const GradeSchema = new mongoose.Schema({
  grade_id: { type: Number, unique: true },
<<<<<<< HEAD
<<<<<<< HEAD
  submission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  grade: { type: Number, default: null },
  created_at: { type: Date, default: Date.now },
});

GradeSchema.pre('save', async function (next) {
  if (!this.grade_id) {
    this.grade_id = await getNextSequence('grade');
  }
  next();
=======
  submission_id: { type: Number, ref:'Submission', required: true },
=======
  submission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
  grade: { type: Number, default: null },
  created_at: { type: Date, default: Date.now },
});

GradeSchema.pre('save', async function (next) {
<<<<<<< HEAD
    if (!this.grade_id) {
      this.grade_id = await getNextSequence('grade'); 
    }
    next();
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
  if (!this.grade_id) {
    this.grade_id = await getNextSequence('grade');
  }
  next();
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
});

module.exports = mongoose.model('Grade', GradeSchema);
