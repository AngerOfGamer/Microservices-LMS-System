const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const SubmissionSchema = new mongoose.Schema({
  submission_id: { type: Number, unique: true },
  task_title: { type: String, required: true, maxlength: 100 },
  class_id: { type: Number, ref:'Class', required: true },
  user_id: { type: Number, ref:'User', required: true },
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
