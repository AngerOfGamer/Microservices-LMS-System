const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const ClassSchema = new mongoose.Schema({
  class_id: { type: Number, unique: true },
  class_name: { type: String, required: true, maxlength: 100 },
  description: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});

ClassSchema.pre('save', async function (next) {
  if (!this.class_id) {
    this.class_id = await getNextSequence('class');
  }
  next();
});

module.exports = mongoose.model('Class', ClassSchema);