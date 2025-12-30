const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const certificateSchema = new mongoose.Schema({
  // Unique identifier and verification
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    unique: true
  },
  verificationCode: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4().replace(/-/g, '').toUpperCase()
  },
  
  // Student Information
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  
  // Achievement Information
  achievementType: {
    type: String,
    required: true,
    enum: ['belt_promotion', 'course_completion', 'special_achievement']
  },
  achievementDetails: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    level: {
      type: String // Belt level, course level, etc.
    },
    grade: {
      type: String // Performance grade if applicable
    },
    examiner: {
      type: String // Examining instructor name
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    eventId: {
      type: String // For special achievements/events
    }
  },
  
  // Template and Generation Info
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CertificateTemplate',
    required: true
  },
  issuedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // File Information
  filePath: {
    type: String,
    required: true
  },
  fileHash: {
    type: String,
    required: true
  },
  
  // Status and Metadata
  status: {
    type: String,
    enum: ['active', 'revoked', 'expired'],
    default: 'active'
  },
  metadata: {
    templateVersion: {
      type: String,
      required: true
    },
    generationMethod: {
      type: String,
      default: 'automated'
    },
    fileSize: {
      type: Number
    },
    dimensions: {
      width: Number,
      height: Number
    },
    emailSent: {
      type: Boolean,
      default: false
    },
    downloadCount: {
      type: Number,
      default: 0
    }
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for performance
certificateSchema.index({ studentId: 1 });
certificateSchema.index({ achievementType: 1 });
certificateSchema.index({ status: 1 });
certificateSchema.index({ issuedDate: -1 });

// Update updatedAt before saving
certificateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to increment download count
certificateSchema.methods.incrementDownloadCount = function() {
  this.metadata.downloadCount += 1;
  return this.save();
};

// Method to revoke certificate
certificateSchema.methods.revoke = function() {
  this.status = 'revoked';
  return this.save();
};

module.exports = mongoose.model('Certificate', certificateSchema);