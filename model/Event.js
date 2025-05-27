const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  idEvent: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: [String],   
    default: [],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);
