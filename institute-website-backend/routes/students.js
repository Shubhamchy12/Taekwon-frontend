const express = require('express');
const Student = require('../models/Student');
const { protect, staffOnly } = require('../middleware/auth');

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// @desc    Get all students
// @route   GET /api/students
// @access  Private (Admin/Staff)
router.get('/', staffOnly, async (req, res) => {
  try {
    const { status, courseLevel, currentBelt, page = 1, limit = 10, search } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (courseLevel) filter.courseLevel = courseLevel;
    if (currentBelt) filter.currentBelt = currentBelt;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get students with pagination
    const students = await Student.find(filter)
      .populate('userId', 'name email lastLogin')
      .sort({ enrollmentDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Student.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: {
        students: students.map(student => ({
          id: student._id,
          studentId: student.studentId,
          fullName: student.fullName,
          email: student.email,
          phone: student.phone,
          age: student.age,
          currentBelt: student.currentBelt,
          courseLevel: student.courseLevel,
          status: student.status,
          enrollmentDate: student.enrollmentDate,
          attendancePercentage: student.attendancePercentage,
          user: student.userId
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching students'
    });
  }
});

// @desc    Get single student details
// @route   GET /api/students/:id
// @access  Private (Admin/Staff)
router.get('/:id', staffOnly, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'name email phone lastLogin')
      .populate('admissionId')
      .populate('beltHistory.examiner', 'name')
      .populate('skillAssessments.assessor', 'name');

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        student: {
          ...student.toObject(),
          age: student.age,
          attendancePercentage: student.attendancePercentage
        }
      }
    });

  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching student details'
    });
  }
});

// @desc    Update student information
// @route   PUT /api/students/:id
// @access  Private (Admin/Staff)
router.put('/:id', staffOnly, async (req, res) => {
  try {
    const updates = req.body;
    
    // Remove fields that shouldn't be updated directly
    delete updates._id;
    delete updates.studentId;
    delete updates.userId;
    delete updates.admissionId;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully',
      data: { student }
    });

  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating student'
    });
  }
});

// @desc    Add attendance record
// @route   POST /api/students/:id/attendance
// @access  Private (Admin/Staff)
router.post('/:id/attendance', staffOnly, async (req, res) => {
  try {
    const { date, status, notes } = req.body;

    if (!date || !status) {
      return res.status(400).json({
        status: 'error',
        message: 'Date and status are required'
      });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    // Check if attendance for this date already exists
    const existingAttendance = student.attendanceRecords.find(
      record => record.date.toDateString() === new Date(date).toDateString()
    );

    if (existingAttendance) {
      return res.status(400).json({
        status: 'error',
        message: 'Attendance for this date already exists'
      });
    }

    // Add attendance record
    student.attendanceRecords.push({
      date: new Date(date),
      status,
      notes: notes || ''
    });

    await student.save();

    res.status(201).json({
      status: 'success',
      message: 'Attendance recorded successfully',
      data: {
        attendancePercentage: student.attendancePercentage
      }
    });

  } catch (error) {
    console.error('Add attendance error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error recording attendance'
    });
  }
});

// @desc    Add belt promotion
// @route   POST /api/students/:id/belt-promotion
// @access  Private (Admin/Staff)
router.post('/:id/belt-promotion', staffOnly, async (req, res) => {
  try {
    const { belt, notes } = req.body;

    if (!belt) {
      return res.status(400).json({
        status: 'error',
        message: 'Belt level is required'
      });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    // Add to belt history
    student.beltHistory.push({
      belt,
      awardedDate: new Date(),
      examiner: req.user._id,
      notes: notes || ''
    });

    // Update current belt
    student.currentBelt = belt;

    await student.save();

    res.status(201).json({
      status: 'success',
      message: 'Belt promotion recorded successfully',
      data: {
        currentBelt: student.currentBelt,
        promotionDate: new Date()
      }
    });

  } catch (error) {
    console.error('Belt promotion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error recording belt promotion'
    });
  }
});

// @desc    Add skill assessment
// @route   POST /api/students/:id/assessment
// @access  Private (Admin/Staff)
router.post('/:id/assessment', staffOnly, async (req, res) => {
  try {
    const { skills, overallGrade, comments } = req.body;

    if (!skills) {
      return res.status(400).json({
        status: 'error',
        message: 'Skills assessment is required'
      });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    // Add skill assessment
    student.skillAssessments.push({
      date: new Date(),
      assessor: req.user._id,
      skills,
      overallGrade: overallGrade || 'B',
      comments: comments || ''
    });

    await student.save();

    res.status(201).json({
      status: 'success',
      message: 'Skill assessment recorded successfully'
    });

  } catch (error) {
    console.error('Skill assessment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error recording skill assessment'
    });
  }
});

// @desc    Add payment record
// @route   POST /api/students/:id/payment
// @access  Private (Admin/Staff)
router.post('/:id/payment', staffOnly, async (req, res) => {
  try {
    const { amount, paymentType, paymentMethod, receiptNumber } = req.body;

    if (!amount || !paymentType || !paymentMethod || !receiptNumber) {
      return res.status(400).json({
        status: 'error',
        message: 'Amount, payment type, payment method, and receipt number are required'
      });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    // Add payment record
    student.paymentHistory.push({
      amount,
      paymentDate: new Date(),
      paymentType,
      paymentMethod,
      receiptNumber,
      status: 'paid'
    });

    await student.save();

    res.status(201).json({
      status: 'success',
      message: 'Payment recorded successfully'
    });

  } catch (error) {
    console.error('Payment record error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error recording payment'
    });
  }
});

module.exports = router;