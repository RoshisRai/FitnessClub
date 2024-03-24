const mongoose = require('mongoose');

const saunaSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  preferredCommunication: {
    type: String,
    enum: ['phone', 'email'],
    required: true,
  },
  additionalComments: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'active'],
    default: 'pending',
  },
  scheduledDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const SaunaSession = mongoose.model('SaunaSession', saunaSessionSchema);

module.exports = SaunaSession;
