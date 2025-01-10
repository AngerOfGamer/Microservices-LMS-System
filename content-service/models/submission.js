const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const SubmissionSchema = new mongoose.Schema({
  submission_id: { type: Number, unique: true },
  task_title: { type: String, required: true, maxlength: 100 },
<<<<<<< HEAD
<<<<<<< HEAD
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Relasi ke koleksi Class
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Relasi ke koleksi User
=======
  class_id: { type: Number, ref:'Class', required: true },
  user_id: { type: Number, ref:'User', required: true },
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Relasi ke koleksi Class
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Relasi ke koleksi User
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
  submission_date: { type: Date, default: Date.now },
  submission_url: { type: String, default: null }
});

SubmissionSchema.pre('save', async function (next) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
  if (!this.submission_id) {
    this.submission_id = await getNextSequence('submission');
  }
  next();
});
<<<<<<< HEAD
=======
    if (!this.submission_id) {
      this.submission_id = await getNextSequence('submission'); 
    }
    next();
  });
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1

module.exports = mongoose.model('Submission', SubmissionSchema);
