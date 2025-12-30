const express = require('express');
const Course = require('../models/Course');
const { protect, staffOnly } = require('../middleware/auth');
const { validateCourse } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all courses (public)
// @route   GET /api/courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { level, isActive = true } = req.query;

    // Build filter object
    const filter = { isActive: isActive === 'true' };
    if (level) filter.level = level;

    const courses = await Course.find(filter)
      .populate('instructors', 'name email')
      .sort({ level: 1, name: 1 });

    res.status(200).json({
      status: 'success',
      data: {
        courses: courses.map(course => ({
          id: course._id,
          name: course.name,
          level: course.level,
          description: course.description,
          duration: course.duration,
          fees: course.fees,
          ageGroup: course.ageGroup,
          maxStudents: course.maxStudents,
          currentEnrollment: course.currentEnrollment,
          availableSlots: course.availableSlots,
          isFull: course.isFull,
          schedule: course.schedule,
          instructors: course.instructors
        }))
      }
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching courses'
    });
  }
});

// @desc    Get single course details
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructors', 'name email phone');

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        course: {
          ...course.toObject(),
          availableSlots: course.availableSlots,
          isFull: course.isFull
        }
      }
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching course details'
    });
  }
});

// Protected routes (Admin/Staff only)
router.use(protect);
router.use(staffOnly);

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin/Staff)
router.post('/', validateCourse, async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Course created successfully',
      data: { course }
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating course'
    });
  }
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin/Staff)
router.put('/:id', validateCourse, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Course updated successfully',
      data: { course }
    });

  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating course'
    });
  }
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin/Staff)
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Soft delete - just mark as inactive
    course.isActive = false;
    await course.save();

    res.status(200).json({
      status: 'success',
      message: 'Course deactivated successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting course'
    });
  }
});

// @desc    Update course enrollment
// @route   PUT /api/courses/:id/enrollment
// @access  Private (Admin/Staff)
router.put('/:id/enrollment', async (req, res) => {
  try {
    const { action } = req.body; // 'enroll' or 'unenroll'

    if (!['enroll', 'unenroll'].includes(action)) {
      return res.status(400).json({
        status: 'error',
        message: 'Action must be either "enroll" or "unenroll"'
      });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    if (action === 'enroll') {
      if (course.currentEnrollment >= course.maxStudents) {
        return res.status(400).json({
          status: 'error',
          message: 'Course is full'
        });
      }
      course.currentEnrollment += 1;
    } else {
      if (course.currentEnrollment <= 0) {
        return res.status(400).json({
          status: 'error',
          message: 'No students to unenroll'
        });
      }
      course.currentEnrollment -= 1;
    }

    await course.save();

    res.status(200).json({
      status: 'success',
      message: `Student ${action}ed successfully`,
      data: {
        currentEnrollment: course.currentEnrollment,
        availableSlots: course.availableSlots
      }
    });

  } catch (error) {
    console.error('Update enrollment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating enrollment'
    });
  }
});

module.exports = router;