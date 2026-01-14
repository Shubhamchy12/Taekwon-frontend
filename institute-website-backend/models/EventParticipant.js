const mongoose = require('mongoose');

const eventParticipantSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  participationStatus: {
    type: String,
    enum: ['Registered', 'Confirmed', 'Participated', 'Cancelled', 'No-Show'],
    default: 'Registered'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for event lookups
eventParticipantSchema.index({ event: 1 });
eventParticipantSchema.index({ participationStatus: 1 });

module.exports = mongoose.model('EventParticipant', eventParticipantSchema);
