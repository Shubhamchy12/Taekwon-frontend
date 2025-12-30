import { useState, useEffect } from 'react';

function AdmissionManagement() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    courseLevel: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  useEffect(() => {
    fetchAdmissions();
  }, [filters, pagination.currentPage]);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        ...filters
      });

      const response = await fetch(`http://localhost:5000/api/admin/admissions?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdmissions(data.data.admissions);
        setPagination(data.data.pagination);
      } else {
        console.error('Failed to fetch admissions');
      }
    } catch (error) {
      console.error('Error fetching admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (admissionId, newStatus, adminNotes = '') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/admissions/${admissionId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          adminNotes
        })
      });

      if (response.ok) {
        fetchAdmissions(); // Refresh the list
        setShowModal(false);
        setSelectedAdmission(null);
      } else {
        console.error('Failed to update admission status');
      }
    } catch (error) {
      console.error('Error updating admission status:', error);
    }
  };

  const viewAdmissionDetails = async (admissionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/admissions/${admissionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedAdmission(data.data.admission);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching admission details:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'waitlist': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level) => {
    const colors = {
      'beginner': 'bg-green-100 text-green-800',
      'intermediate': 'bg-amber-100 text-amber-800',
      'advanced': 'bg-purple-100 text-purple-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 mb-2">Admission Management</h1>
          <p className="text-slate-600">Review and manage student admission applications</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="waitlist">Waitlist</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Course Level</label>
              <select
                value={filters.courseLevel}
                onChange={(e) => setFilters({ ...filters, courseLevel: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search by name, email, or phone..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Admissions Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading admissions...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Applicant</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Age</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Course Level</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Applied Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {admissions.map((admission) => (
                      <tr key={admission.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-slate-800">{admission.fullName}</div>
                            <div className="text-sm text-slate-600">{admission.email}</div>
                            <div className="text-sm text-slate-600">{admission.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-800 font-medium">
                            {calculateAge(admission.dateOfBirth)} years
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(admission.courseLevel)}`}>
                            {admission.courseLevel.charAt(0).toUpperCase() + admission.courseLevel.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(admission.status)}`}>
                            {admission.status.charAt(0).toUpperCase() + admission.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {new Date(admission.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewAdmissionDetails(admission.id)}
                              className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                            >
                              View
                            </button>
                            {admission.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(admission.id, 'approved')}
                                  className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(admission.id, 'rejected')}
                                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                    {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                    {pagination.totalItems} results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })}
                      disabled={pagination.currentPage === 1}
                      className="px-3 py-1 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm">
                      {pagination.currentPage}
                    </span>
                    <button
                      onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="px-3 py-1 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Admission Details Modal */}
        {showModal && selectedAdmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Admission Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-gray-300 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">1</span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <p className="text-slate-800 font-semibold">{selectedAdmission.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                      <p className="text-slate-800">{new Date(selectedAdmission.dateOfBirth).toLocaleDateString()} ({calculateAge(selectedAdmission.dateOfBirth)} years old)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                      <p className="text-slate-800 capitalize">{selectedAdmission.gender}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <p className="text-slate-800">{selectedAdmission.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">2</span>
                    Contact Information
                  </h3>
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <p className="text-slate-800">{selectedAdmission.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                      <p className="text-slate-800">{selectedAdmission.address}</p>
                    </div>
                  </div>
                </div>

                {/* Course Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">3</span>
                    Course Selection
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Course Level</label>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(selectedAdmission.courseLevel)}`}>
                        {selectedAdmission.courseLevel.charAt(0).toUpperCase() + selectedAdmission.courseLevel.slice(1)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Schedule</label>
                      <p className="text-slate-800 capitalize">{selectedAdmission.preferredSchedule || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">4</span>
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Contact Name</label>
                      <p className="text-slate-800 font-semibold">{selectedAdmission.emergencyContactName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                      <p className="text-slate-800">{selectedAdmission.emergencyContactPhone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Relationship</label>
                      <p className="text-slate-800 capitalize">{selectedAdmission.relationshipToStudent}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                {selectedAdmission.medicalConditions && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">5</span>
                      Medical Information
                    </h3>
                    <div className="bg-slate-50 p-6 rounded-xl">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Medical Conditions</label>
                      <p className="text-slate-800">{selectedAdmission.medicalConditions}</p>
                    </div>
                  </div>
                )}

                {/* Application Status */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">6</span>
                    Application Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Status</label>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAdmission.status)}`}>
                        {selectedAdmission.status.charAt(0).toUpperCase() + selectedAdmission.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Submitted Date</label>
                      <p className="text-slate-800">{new Date(selectedAdmission.submittedAt).toLocaleDateString()}</p>
                    </div>
                    {selectedAdmission.studentId && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
                        <p className="text-slate-800 font-semibold">{selectedAdmission.studentId}</p>
                      </div>
                    )}
                    {selectedAdmission.reviewedAt && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Reviewed Date</label>
                        <p className="text-slate-800">{new Date(selectedAdmission.reviewedAt).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Notes */}
                {selectedAdmission.adminNotes && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Admin Notes</h3>
                    <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                      <p className="text-slate-800">{selectedAdmission.adminNotes}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedAdmission.status === 'pending' && (
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => {
                        const notes = prompt('Add admin notes (optional):');
                        handleStatusUpdate(selectedAdmission._id, 'approved', notes || '');
                      }}
                      className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                    >
                      Approve Application
                    </button>
                    <button
                      onClick={() => {
                        const notes = prompt('Add rejection reason:');
                        if (notes) {
                          handleStatusUpdate(selectedAdmission._id, 'rejected', notes);
                        }
                      }}
                      className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                    >
                      Reject Application
                    </button>
                    <button
                      onClick={() => {
                        const notes = prompt('Add waitlist notes:');
                        handleStatusUpdate(selectedAdmission._id, 'waitlist', notes || '');
                      }}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Add to Waitlist
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdmissionManagement;