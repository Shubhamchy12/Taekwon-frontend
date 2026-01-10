import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [achievementType, setAchievementType] = useState('');
  const [achievementDetails, setAchievementDetails] = useState({
    title: '',
    description: '',
    level: '',
    grade: '',
    examiner: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [certificateImage, setCertificateImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchCertificates();
    fetchStudents();
    fetchTemplates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/certificates', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCertificates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setCertificates([]); // Ensure it's always an array
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('/api/certificate-templates', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setCertificateImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCertificateImage(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  const handleUploadCertificate = async (e) => {
    e.preventDefault();
    
    if (!certificateImage) {
      alert('Please select a certificate image to upload');
      return;
    }

    try {
      setLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('studentId', selectedStudent);
      formData.append('achievementType', achievementType);
      formData.append('achievementDetails', JSON.stringify(achievementDetails));
      formData.append('certificateImage', certificateImage);

      const response = await axios.post('/api/certificates/upload', formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      if (response.data.success) {
        alert('Certificate uploaded successfully!');
        setShowUploadModal(false);
        fetchCertificates();
        resetForm();
      }
    } catch (error) {
      console.error('Error uploading certificate:', error);
      alert('Failed to upload certificate. Please try again.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setSelectedStudent('');
    setAchievementType('');
    setAchievementDetails({
      title: '',
      description: '',
      level: '',
      grade: '',
      examiner: ''
    });
    setSelectedTemplate('');
    setCertificateImage(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  const handleRevokeCertificate = async (certificateId) => {
    if (window.confirm('Are you sure you want to revoke this certificate?')) {
      try {
        await axios.put(`/api/certificates/${certificateId}/revoke`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Certificate revoked successfully');
        fetchCertificates();
      } catch (error) {
        console.error('Error revoking certificate:', error);
        alert('Failed to revoke certificate');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      revoked: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload Certificate
        </button>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">All Certificates</h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Achievement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(certificates) && certificates.map((certificate) => (
                  <tr key={certificate._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {certificate.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {certificate.achievementDetails.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {certificate.achievementType.replace('_', ' ').toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(certificate.uploadDate || certificate.issuedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {certificate.imageUrl ? (
                        <div className="flex items-center space-x-2">
                          <img 
                            src={certificate.imageUrl} 
                            alt="Certificate" 
                            className="h-16 w-20 object-cover rounded border cursor-pointer hover:opacity-75"
                            onClick={() => window.open(certificate.imageUrl, '_blank')}
                          />
                          <span className="text-green-600 text-sm">✓ Uploaded</span>
                        </div>
                      ) : (
                        <span className="text-red-400 text-sm">No image uploaded</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(certificate.status)}>
                        {certificate.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(certificate.imageUrl, '_blank')}
                          className="text-blue-600 hover:text-blue-900"
                          disabled={!certificate.imageUrl}
                        >
                          View
                        </button>
                        <button
                          onClick={() => window.open(`/api/certificates/${certificate._id}/download`, '_blank')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Download
                        </button>
                        {certificate.status === 'active' && (
                          <button
                            onClick={() => handleRevokeCertificate(certificate._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Certificate Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Certificate</h3>
              
              <form onSubmit={handleUploadCertificate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Student</option>
                      {students.map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.fullName} - {student.studentId}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Achievement Type</label>
                    <select
                      value={achievementType}
                      onChange={(e) => setAchievementType(e.target.value)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="belt_promotion">Belt Promotion</option>
                      <option value="course_completion">Course Completion</option>
                      <option value="special_achievement">Special Achievement</option>
                      <option value="tournament_award">Tournament Award</option>
                      <option value="participation">Participation Certificate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Achievement Title</label>
                  <input
                    type="text"
                    value={achievementDetails.title}
                    onChange={(e) => setAchievementDetails({...achievementDetails, title: e.target.value})}
                    required
                    placeholder="e.g., Yellow Belt Promotion, Tournament Winner"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={achievementDetails.description}
                    onChange={(e) => setAchievementDetails({...achievementDetails, description: e.target.value})}
                    required
                    rows={3}
                    placeholder="Brief description of the achievement"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {achievementType === 'belt_promotion' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Belt Level</label>
                    <select
                      value={achievementDetails.level}
                      onChange={(e) => setAchievementDetails({...achievementDetails, level: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Belt</option>
                      <option value="yellow">Yellow Belt</option>
                      <option value="green">Green Belt</option>
                      <option value="blue">Blue Belt</option>
                      <option value="red">Red Belt</option>
                      <option value="black-1st">Black Belt 1st Dan</option>
                      <option value="black-2nd">Black Belt 2nd Dan</option>
                      <option value="black-3rd">Black Belt 3rd Dan</option>
                    </select>
                  </div>
                )}

                {/* Certificate Image Upload - Required */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Image <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    {!imagePreview ? (
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="mt-4">
                          <label htmlFor="certificate-image" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              Upload certificate image
                            </span>
                            <span className="mt-1 block text-sm text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </span>
                          </label>
                          <input
                            id="certificate-image"
                            name="certificate-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="sr-only"
                            required
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Certificate preview"
                          className="mx-auto max-h-48 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="mt-2 text-center">
                          <p className="text-sm text-gray-600">{certificateImage?.name}</p>
                          <p className="text-xs text-gray-500">
                            {(certificateImage?.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !certificateImage}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                  >
                    {loading ? 'Uploading...' : 'Upload Certificate'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateManagement;