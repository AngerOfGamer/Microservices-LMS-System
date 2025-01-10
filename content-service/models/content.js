const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const ContentSchema = new mongoose.Schema({
  content_id: { type: Number, unique: true },
<<<<<<< HEAD
<<<<<<< HEAD
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  content_title: { type: String, required: true, maxlength: 100 },
  content_description: { type: String, default: null },
  content_url: { type: String, default: null },
  category: { type: String, enum: ['materi', 'tugas'], required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
});

ContentSchema.pre('save', async function (next) {
  if (!this.content_id) {
    this.content_id = await getNextSequence('content');
  }
  next();
});

=======
  class_id: { type: Number, ref:'Class', required: true },
=======
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
  content_title: { type: String, required: true, maxlength: 100 },
  content_description: { type: String, default: null },
  content_url: { type: String, default: null },
  category: { type: String, enum: ['materi', 'tugas'], required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
});

ContentSchema.pre('save', async function (next) {
  if (!this.content_id) {
    this.content_id = await getNextSequence('content');
  }
  next();
});

<<<<<<< HEAD

>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
module.exports = mongoose.model('Content', ContentSchema);
