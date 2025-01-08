const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  content_id: { type: Number, required: true, unique: true },
  class_id: { type: Number, required: true },
  content_title: { type: String, required: true, maxlength: 100 },
  content_description: { type: String, default: null },
  content_url: { type: String, default: null },
  category: { type: String, enum: ['materi', 'tugas'], default: 'materi', required: true },
  created_by: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', ContentSchema);
