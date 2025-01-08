const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  submission_id: { type: Number, required: true, unique: true },
  task_title: { type: String, required: true, maxlength: 100 },
  class_id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  submission_date: { type: Date, default: Date.now },
  submission_url: { type: String, default: null }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
