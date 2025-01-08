const mongoose = require('mongoose');

const ClassesSchema = new mongoose.Schema({
  class_id: {
    type: Number,
    required: true,
    unique: true
  },
  class_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Export model
module.exports = mongoose.model('Classes', ClassesSchema);
