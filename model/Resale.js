const mongoose = require('mongoose');

const resaleSchema = new mongoose.Schema({
  idEvent: {
    type: String,
    required: true,
  },
  idTicket: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Resale', resaleSchema);
