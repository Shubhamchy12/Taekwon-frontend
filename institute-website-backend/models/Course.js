const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  duration: {
    months: {
      type: Number,
      required: true,
      min: 1
    },
    sessionsPerWeek: {
      type: Number,
      required: true,
      min: 1,
      max: 7
    },
    sessionDuration: {
      type: Number, // in minutes
      required: true,
      min: 30
    }
  },
  fees: {
    registrationFee: {
      type: Number,
      required: true,
      min: 0
    },
    monthlyFee: {
      type: Number,
      required: true,
      min: 0
    },
    examFee: {
      type: Number,
      default: 0
    }
  },
  curriculum: [{
    week: {
      type: Number,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    objectives: [String],
    techniques: [String]
  }],
  prerequisites: [String],
  ageGroup: {
    min: {
      type: Number,
      required: true,
      min: 4
    },
    max: {
      type: Number,
      required: true,
      max: 100
    }
  },
  maxStudents: {
    type: Number,
    required: true,
    min: 1
  },
  currentEnrollment: {
    type: Number,
    default: 0
  },
  instructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  schedule: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
    },
    endTime: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate availability
courseSchema.virtual('availableSlots').get(function() {
  return this.maxStudents - this.currentEnrollment;
});

// Check if course is full
courseSchema.virtual('isFull').get(function() {
  return this.currentEnrollment >= this.maxStudents;
});

// Update updatedAt before saving
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes
courseSchema.index({ level: 1 });
courseSchema.index({ isActive: 1 });
courseSchema.index({ 'ageGroup.min': 1, 'ageGroup.max': 1 });

module.exports = mongoose.model('Course', courseSchema);