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
      status: 'Issued',
      downloadUrl: '#'
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
      status: 'Issued',
      downloadUrl: '#'
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
      status: 'Pending',
      downloadUrl: null
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
      status: 'Issued',
      downloadUrl: '#'
    }
  ]);

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCertificates = certificates.filter(cert => {
    const matchesType = filterType === 'all' || cert.certificateType === filterType;
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Issued': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
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
          <span>🏆</span>
          <span>Issue Certificate</span>
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
            {certificates.filter(c => c.status === 'Issued').length}
          </div>
          <div className="text-slate-600 font-medium">Issued</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-yellow-600 mb-2">
            {certificates.filter(c => c.status === 'Pending').length}
          </div>
          <div className="text-slate-600 font-medium">Pending</div>
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
              <option value="Issued">Issued</option>
              <option value="Pending">Pending</option>
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
                Preview
              </button>
              {certificate.status === 'Issued' && (
                <button className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
                  Download
                </button>
              )}
              {certificate.status === 'Pending' && (
                <button className="flex-1 bg-amber-500 text-white py-2 px-3 rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold">
                  Issue
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
              <h2 className="text-2xl font-bold text-slate-800">Issue New Certificate</h2>
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
              
              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
                >
                  Issue Certificate
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
              <h2 className="text-2xl font-bold text-slate-800">Certificate Preview</h2>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            {/* Certificate Design */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-8 border-amber-400 rounded-2xl p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-black text-3xl">CW</span>
                </div>
                <h1 className="text-3xl font-black text-slate-800 mb-2">Combat Warrior Taekwon-do</h1>
                <p className="text-slate-600">Association of Karnataka</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-4xl font-black text-amber-600 mb-4">CERTIFICATE OF {selectedCertificate.certificateType.toUpperCase()}</h2>
                <p className="text-lg text-slate-700 mb-6">This is to certify that</p>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-300 pb-2 inline-block">
                  {selectedCertificate.studentName}
                </h3>
                
                {selectedCertificate.fromBelt && selectedCertificate.toBelt && (
                  <p className="text-lg text-slate-700 mb-4">
                    has successfully completed the requirements for promotion from <strong>{selectedCertificate.fromBelt} Belt</strong> to <strong>{selectedCertificate.toBelt} Belt</strong>
                  </p>
                )}
                
                {selectedCertificate.achievement && (
                  <p className="text-lg text-slate-700 mb-4">
                    has achieved <strong>{selectedCertificate.achievement}</strong>
                  </p>
                )}
                
                {selectedCertificate.course && (
                  <p className="text-lg text-slate-700 mb-4">
                    has successfully completed the <strong>{selectedCertificate.course}</strong>
                  </p>
                )}
              </div>
              
              <div className="flex justify-between items-end">
                <div className="text-left">
                  <div className="border-t-2 border-slate-400 pt-2 mb-2">
                    <p className="font-bold text-slate-800">{selectedCertificate.instructor}</p>
                    <p className="text-slate-600 text-sm">Chief Instructor</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 border-2 border-slate-400 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-slate-400 text-xs">SEAL</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-slate-600 text-sm mb-2">Date of Issue</p>
                  <p className="font-bold text-slate-800">{selectedCertificate.issueDate || 'Pending'}</p>
                  <p className="text-slate-600 text-xs mt-2">Certificate ID: {selectedCertificate.id}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                Edit Certificate
              </button>
              <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                Download PDF
              </button>
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