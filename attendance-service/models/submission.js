const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const SubmissionSchema = new mongoose.Schema({
  submission_id: { type: Number, unique: true },
  task_title: { type: String, required: true, maxlength: 100 },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Relasi ke koleksi Class
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Relasi ke koleksi User
  submission_date: { type: Date, default: Date.now },
  submission_url: { type: String, default: null }
});

SubmissionSchema.pre('save', async function (next) {
  if (!this.submission_id) {
    this.submission_id = await getNextSequence('submission');
  }
  next();
});

module.exports = mongoose.model('Submission', SubmissionSchema);