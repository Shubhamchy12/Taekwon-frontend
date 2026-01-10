import { useState } from 'react';

function CertificationManagement() {
  const [certificates] = useState([
    {
      id: 'CERT001',
      studentId: 'STU001',
      studentName: 'Rahul Kumar',
      certificateType: 'Belt Promotion',
      fromBelt: 'White',
      toBelt: 'Yellow',
      issueDate: '2024-01-15',
      examDate: '2024-01-10',
      instructor: 'Master Kim',
      status: 'Uploaded',
      downloadUrl: '#',
      imageUrl: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Certificate'
    },
    {
      id: 'CERT002',
      studentId: 'STU002',
      studentName: 'Priya Sharma',
      certificateType: 'Tournament Participation',
      achievement: '2nd Place - State Championship',
      issueDate: '2024-01-20',
      eventDate: '2024-01-18',
      instructor: 'Master Kim',
      status: 'Uploaded',
      downloadUrl: '#',
      imageUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Tournament+Certificate'
    },
    {
      id: 'CERT003',
      studentId: 'STU003',
      studentName: 'Amit Singh',
      certificateType: 'Belt Promotion',
      fromBelt: 'Green',
      toBelt: 'Blue',
      issueDate: null,
      examDate: '2024-01-25',
      instructor: 'Master Kim',
      status: 'Pending Upload',
      downloadUrl: null,
      imageUrl: null
    },
    {
      id: 'CERT004',
      studentId: 'STU004',
      studentName: 'Sneha Patel',
      certificateType: 'Course Completion',
      course: 'Self-Defense Workshop',
      issueDate: '2024-01-22',
      completionDate: '2024-01-20',
      instructor: 'Instructor Lee',
      status: 'Uploaded',
      downloadUrl: '#',
      imageUrl: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Course+Certificate'
    }
  ]);

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [certificateImage, setCertificateImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredCertificates = certificates.filter(cert => {
    const matchesType = filterType === 'all' || cert.certificateType === filterType;
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Uploaded': 'bg-green-100 text-green-800',
      'Pending Upload': 'bg-yellow-100 text-yellow-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Belt Promotion': '🥋',
      'Tournament Participation': '🏆',
      'Course Completion': '📜',
      'Achievement': '🌟',
      'Attendance': '📅'
    };
    return icons[type] || '📄';
  };

  const previewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowPreviewModal(true);
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

  const resetForm = () => {
    setCertificateImage(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">Certification Management</h1>
          <p className="text-slate-600">Issue and manage digital certificates for students</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center space-x-2"
        >
          <span>📤</span>
          <span>Upload Certificate</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-blue-600 mb-2">{certificates.length}</div>
          <div className="text-slate-600 font-medium">Total Certificates</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-green-600 mb-2">
            {certificates.filter(c => c.status === 'Uploaded').length}
          </div>
          <div className="text-slate-600 font-medium">Uploaded</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-yellow-600 mb-2">
            {certificates.filter(c => c.status === 'Pending Upload').length}
          </div>
          <div className="text-slate-600 font-medium">Pending Upload</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-purple-600 mb-2">
            {certificates.filter(c => c.certificateType === 'Belt Promotion').length}
          </div>
          <div className="text-slate-600 font-medium">Belt Promotions</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Belt Promotion">Belt Promotion</option>
              <option value="Tournament Participation">Tournament Participation</option>
              <option value="Course Completion">Course Completion</option>
              <option value="Achievement">Achievement</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Uploaded">Uploaded</option>
              <option value="Pending Upload">Pending Upload</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors font-semibold">
              Export Certificates
            </button>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <div key={certificate.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{getTypeIcon(certificate.certificateType)}</div>
                <div>
                  <h3 className="font-bold text-slate-800">{certificate.certificateType}</h3>
                  <p className="text-slate-500 text-sm">{certificate.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(certificate.status)}`}>
                {certificate.status}
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600 text-sm">Student:</span>
                <span className="font-semibold text-slate-800 text-sm">{certificate.studentName}</span>
              </div>
              
              {certificate.fromBelt && certificate.toBelt && (
                <div className="flex justify-between">
                  <span className="text-slate-600 text-sm">Promotion:</span>
                  <span className="font-semibold text-slate-800 text-sm">
                    {certificate.fromBelt} → {certificate.toBelt}
                  </span>
                </div>
              )}
              
              {certificate.achievement && (
                <div className="flex justify-between">
                  <span className="text-slate-600 text-sm">Achievement:</span>
                  <span className="font-semibold text-slate-800 text-sm">{certificate.achievement}</span>
                </div>
              )}
              
              {certificate.course && (
                <div className="flex justify-between">
                  <span className="text-slate-600 text-sm">Course:</span>
                  <span className="font-semibold text-slate-800 text-sm">{certificate.course}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-slate-600 text-sm">Instructor:</span>
                <span className="font-semibold text-slate-800 text-sm">{certificate.instructor}</span>
              </div>
              
              {certificate.issueDate && (
                <div className="flex justify-between">
                  <span className="text-slate-600 text-sm">Issue Date:</span>
                  <span className="font-semibold text-slate-800 text-sm">{certificate.issueDate}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => previewCertificate(certificate)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
              >
                View
              </button>
              {certificate.status === 'Uploaded' && certificate.imageUrl && (
                <button className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
                  Download
                </button>
              )}
              {certificate.status === 'Pending Upload' && (
                <button className="flex-1 bg-amber-500 text-white py-2 px-3 rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold">
                  Upload
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Templates */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Certificate Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer">
            <div className="text-4xl mb-3">🥋</div>
            <div className="font-semibold text-slate-800 mb-1">Belt Promotion</div>
            <div className="text-slate-500 text-sm">Standard belt certificate</div>
          </div>
          
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer">
            <div className="text-4xl mb-3">🏆</div>
            <div className="font-semibold text-slate-800 mb-1">Tournament</div>
            <div className="text-slate-500 text-sm">Competition certificate</div>
          </div>
          
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer">
            <div className="text-4xl mb-3">📜</div>
            <div className="font-semibold text-slate-800 mb-1">Course Completion</div>
            <div className="text-slate-500 text-sm">Training completion</div>
          </div>
          
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer">
            <div className="text-4xl mb-3">⭐</div>
            <div className="font-semibold text-slate-800 mb-1">Achievement</div>
            <div className="text-slate-500 text-sm">Special recognition</div>
          </div>
        </div>
      </div>

      {/* Create Certificate Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Upload Certificate</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Student</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Select Student</option>
                    <option>Rahul Kumar (STU001)</option>
                    <option>Priya Sharma (STU002)</option>
                    <option>Amit Singh (STU003)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Certificate Type</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Belt Promotion</option>
                    <option>Tournament Participation</option>
                    <option>Course Completion</option>
                    <option>Achievement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">From Belt</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>White</option>
                    <option>Yellow</option>
                    <option>Green</option>
                    <option>Blue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">To Belt</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Yellow</option>
                    <option>Green</option>
                    <option>Blue</option>
                    <option>Black</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Issue Date</label>
                  <input type="date" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Instructor</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Master Kim</option>
                    <option>Instructor Lee</option>
                    <option>Instructor Park</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Additional Notes</label>
                <textarea rows="3" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"></textarea>
              </div>

              {/* Certificate Image Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Certificate Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6">
                  {!imagePreview ? (
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4">
                        <label htmlFor="certificate-image" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-bold text-slate-800">
                            Upload certificate image
                          </span>
                          <span className="mt-1 block text-sm text-slate-500">
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
                        <p className="text-sm text-slate-600">{certificateImage?.name}</p>
                        <p className="text-xs text-slate-500">
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
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-amber-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!certificateImage}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {showPreviewModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Certificate View</h2>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            {/* Certificate Image Display */}
            {selectedCertificate.imageUrl ? (
              <div className="mb-8">
                <div className="bg-slate-50 rounded-2xl p-6 text-center">
                  <img 
                    src={selectedCertificate.imageUrl} 
                    alt="Certificate" 
                    className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg border"
                  />
                  <p className="text-slate-600 mt-4 text-sm">Certificate Image - {selectedCertificate.id}</p>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="bg-slate-100 rounded-2xl p-12 text-center">
                  <div className="text-6xl text-slate-400 mb-4">📄</div>
                  <h3 className="text-xl font-bold text-slate-600 mb-2">No Certificate Image</h3>
                  <p className="text-slate-500">Certificate image has not been uploaded yet</p>
                </div>
              </div>
            )}

            {/* Certificate Details */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Certificate Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-600 text-sm">Certificate ID:</span>
                  <p className="font-semibold text-slate-800">{selectedCertificate.id}</p>
                </div>
                <div>
                  <span className="text-slate-600 text-sm">Student:</span>
                  <p className="font-semibold text-slate-800">{selectedCertificate.studentName}</p>
                </div>
                <div>
                  <span className="text-slate-600 text-sm">Type:</span>
                  <p className="font-semibold text-slate-800">{selectedCertificate.certificateType}</p>
                </div>
                <div>
                  <span className="text-slate-600 text-sm">Instructor:</span>
                  <p className="font-semibold text-slate-800">{selectedCertificate.instructor}</p>
                </div>
                {selectedCertificate.fromBelt && selectedCertificate.toBelt && (
                  <>
                    <div>
                      <span className="text-slate-600 text-sm">From Belt:</span>
                      <p className="font-semibold text-slate-800">{selectedCertificate.fromBelt}</p>
                    </div>
                    <div>
                      <span className="text-slate-600 text-sm">To Belt:</span>
                      <p className="font-semibold text-slate-800">{selectedCertificate.toBelt}</p>
                    </div>
                  </>
                )}
                {selectedCertificate.achievement && (
                  <div className="md:col-span-2">
                    <span className="text-slate-600 text-sm">Achievement:</span>
                    <p className="font-semibold text-slate-800">{selectedCertificate.achievement}</p>
                  </div>
                )}
                {selectedCertificate.course && (
                  <div className="md:col-span-2">
                    <span className="text-slate-600 text-sm">Course:</span>
                    <p className="font-semibold text-slate-800">{selectedCertificate.course}</p>
                  </div>
                )}
                <div>
                  <span className="text-slate-600 text-sm">Issue Date:</span>
                  <p className="font-semibold text-slate-800">{selectedCertificate.issueDate || 'Not issued yet'}</p>
                </div>
                <div>
                  <span className="text-slate-600 text-sm">Status:</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedCertificate.status)}`}>
                    {selectedCertificate.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              {selectedCertificate.imageUrl && (
                <>
                  <button 
                    onClick={() => window.open(selectedCertificate.imageUrl, '_blank')}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                  >
                    View Full Size
                  </button>
                  <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                    Download Certificate
                  </button>
                </>
              )}
              {selectedCertificate.status === 'Pending Upload' && (
                <button className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors">
                  Upload Certificate Image
                </button>
              )}
              <button className="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors">
                Send via Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificationManagement;