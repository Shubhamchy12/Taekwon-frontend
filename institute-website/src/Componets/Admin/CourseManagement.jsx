import { useState, useEffect } from 'react';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock data - replace with actual API calls
  const mockCourses = [
    {
      id: 1,
      title: 'Little Warriors',
      ageGroup: '4-7 Years',
      duration: '45 Minutes',
      schedule: 'Mon, Wed, Fri - 4:00 PM',
      price: 2500,
      maxStudents: 15,
      currentStudents: 12,
      instructor: 'Sabum Nim Deepa Rao',
      description: 'Fun introduction to martial arts focusing on basic movements, coordination, and discipline.',
      features: [
        'Basic stances and movements',
        'Simple self-defense techniques',
        'Character development',
        'Coordination and balance',
        'Fun games and activities'
      ],
      status: 'active',
      category: 'kids'
    },
    {
      id: 2,
      title: 'Junior Program',
      ageGroup: '8-12 Years',
      duration: '60 Minutes',
      schedule: 'Tue, Thu, Sat - 5:00 PM',
      price: 3000,
      maxStudents: 20,
      currentStudents: 18,
      instructor: 'Sabum Nim Ravi Kumar',
      description: 'Structured learning of fundamental Taekwon-Do techniques, forms, and basic sparring.',
      features: [
        'ITF patterns (Tul)',
        'Fundamental techniques',
        'Basic sparring',
        'Breaking techniques',
        'Belt progression system'
      ],
      status: 'active',
      category: 'kids'
    },
    {
      id: 3,
      title: 'Teen Program',
      ageGroup: '13-17 Years',
      duration: '75 Minutes',
      schedule: 'Mon-Sat - 6:00 PM',
      price: 3500,
      maxStudents: 15,
      currentStudents: 14,
      instructor: 'Boosabum Nim Arjun Shetty',
      description: 'Advanced techniques, competitive training, and leadership development for teenagers.',
      features: [
        'Advanced patterns',
        'Competition sparring',
        'Self-defense applications',
        'Leadership training',
        'Tournament preparation'
      ],
      status: 'active',
      category: 'teens'
    },
    {
      id: 4,
      title: 'Adult Program',
      ageGroup: '18+ Years',
      duration: '90 Minutes',
      schedule: 'Mon-Sat - 7:30 PM',
      price: 4000,
      maxStudents: 25,
      currentStudents: 22,
      instructor: 'Sabum Nim Ravi Kumar',
      description: 'Comprehensive training for adults focusing on fitness, self-defense, and traditional Taekwon-Do.',
      features: [
        'Complete ITF curriculum',
        'Advanced self-defense',
        'Fitness and conditioning',
        'Stress relief',
        'Black belt training'
      ],
      status: 'active',
      category: 'adults'
    },
    {
      id: 5,
      title: 'Competition Team',
      ageGroup: 'All Ages',
      duration: '2 Hours',
      schedule: 'Sat-Sun - 9:00 AM',
      price: 5000,
      maxStudents: 10,
      currentStudents: 8,
      instructor: 'Sabum Nim Ravi Kumar',
      description: 'Elite training for students preparing for state, national, and international competitions.',
      features: [
        'Advanced sparring techniques',
        'Competition strategies',
        'Mental preparation',
        'Individual coaching',
        'Tournament participation'
      ],
      status: 'active',
      category: 'special'
    },
    {
      id: 6,
      title: 'Women\'s Self-Defense',
      ageGroup: '16+ Years',
      duration: '60 Minutes',
      schedule: 'Tue, Thu - 10:00 AM',
      price: 2800,
      maxStudents: 12,
      currentStudents: 9,
      instructor: 'Sabum Nim Deepa Rao',
      description: 'Specialized program focusing on practical self-defense techniques for women.',
      features: [
        'Situational awareness',
        'Escape techniques',
        'Pressure point attacks',
        'Confidence building',
        'Real-world scenarios'
      ],
      status: 'active',
      category: 'special'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.ageGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-red-100 text-red-800',
      'full': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'kids': 'bg-blue-100 text-blue-800',
      'teens': 'bg-purple-100 text-purple-800',
      'adults': 'bg-green-100 text-green-800',
      'special': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getOccupancyPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  const getOccupancyColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
        <p className="text-gray-600">Manage training programs, schedules, and enrollment capacity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">📚</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Enrollment</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((sum, c) => sum + c.currentStudents, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{courses.reduce((sum, c) => sum + (c.currentStudents * c.price), 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses by name, instructor, or age group..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="kids">Kids Programs</option>
                <option value="teens">Teen Programs</option>
                <option value="adults">Adult Programs</option>
                <option value="special">Special Programs</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Add Course
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const occupancyPercentage = getOccupancyPercentage(course.currentStudents, course.maxStudents);
          
          return (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(course.category)}`}>
                    {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Age Group:</span>
                    <span className="font-medium">{course.ageGroup}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Schedule:</span>
                    <span className="font-medium text-xs">{course.schedule}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-bold text-red-600">₹{course.price}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="font-medium text-xs">{course.instructor}</span>
                  </div>
                </div>

                {/* Enrollment Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Enrollment</span>
                    <span className="font-medium">{course.currentStudents}/{course.maxStudents}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getOccupancyColor(occupancyPercentage)}`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{occupancyPercentage}% capacity</div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                    View Students
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No courses found matching your criteria</div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Course</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Course Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Age Group"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max Students"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="">Select Category</option>
                  <option value="kids">Kids Program</option>
                  <option value="teens">Teen Program</option>
                  <option value="adults">Adult Program</option>
                  <option value="special">Special Program</option>
                </select>
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Schedule (e.g., Mon, Wed, Fri - 4:00 PM)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <textarea
                    placeholder="Course Description"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Course</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  defaultValue={selectedCourse.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="text"
                  defaultValue={selectedCourse.ageGroup}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="text"
                  defaultValue={selectedCourse.duration}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="number"
                  defaultValue={selectedCourse.price}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="number"
                  defaultValue={selectedCourse.maxStudents}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <select 
                  defaultValue={selectedCourse.category}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="kids">Kids Program</option>
                  <option value="teens">Teen Program</option>
                  <option value="adults">Adult Program</option>
                  <option value="special">Special Program</option>
                </select>
                <div className="col-span-2">
                  <input
                    type="text"
                    defaultValue={selectedCourse.schedule}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <textarea
                    defaultValue={selectedCourse.description}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseManagement;