const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  preferredCommunication: {
    type: String,
    enum: ['phone', 'email'],
    required: true
  },
  additionalComments: {
    type: String
  },
  membershipType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'deactivated'],
    default: 'pending',
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date,
    default: -1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;
