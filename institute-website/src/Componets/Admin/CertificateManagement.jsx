import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/certificates', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.data.status === 'success') {
        setCertificates(response.data.data.certificates || []);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCertificate = async (e) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      alert('Please enter a verification code');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/certificates/verify', {
        verificationCode: verificationCode.trim().toUpperCase()
      });

      setVerificationResult(response.data);
    } catch (error) {
      console.error('Error verifying certificate:', error);
      alert(error.response?.data?.message || 'Verification failed. Please check the code and try again.');
      setVerificationResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeCertificate = async (certificateId) => {
    if (window.confirm('Are you sure you want to revoke this certificate?')) {
      try {
        await axios.put(`/api/certificates/${certificateId}`, 
          { status: 'revoked' },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
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

  const getTypeDisplay = (type) => {
    const displays = {
      'belt_promotion': 'Belt Promotion',
      'tournament_award': 'Tournament Award',
      'course_completion': 'Course Completion',
      'special_achievement': 'Special Achievement',
      'participation': 'Participation'
    };
    return displays[type] || type;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
        <button
          onClick={() => setShowVerifyModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Verify Certificate
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
                    Verification Code
                  </th>
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
                    Issue Date
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {certificate.verificationCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {certificate.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {certificate.achievementDetails.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getTypeDisplay(certificate.achievementType)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(certificate.issuedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(certificate.status)}>
                        {certificate.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {certificate.imageUrl && (
                          <button
                            onClick={() => window.open(certificate.imageUrl, '_blank')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                        )}
                        {certificate.imageUrl && (
                          <button
                            onClick={() => window.open(`/api/certificates/${certificate._id}/download`, '_blank')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Download
                          </button>
                        )}
                        {certificate.status === 'active' && (
                          <button
                            onClick={() => handleRevokeCertificate(certificate._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Revoke
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

      {/* Verify Certificate Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Verify Certificate</h3>
              
              <form onSubmit={handleVerifyCertificate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                    placeholder="Enter verification code"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    maxLength={32}
                    required
                  />
                </div>

                {verificationResult && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                    {verificationResult.isValid ? (
                      <div>
                        <h4 className="text-sm font-medium text-green-800">Certificate Verified ✓</h4>
                        <div className="mt-2 text-sm text-green-700">
                          <p><strong>Student:</strong> {verificationResult.certificate.studentName}</p>
                          <p><strong>Achievement:</strong> {verificationResult.certificate.achievementDetails.title}</p>
                          <p><strong>Type:</strong> {getTypeDisplay(verificationResult.certificate.achievementType)}</p>
                          <p><strong>Issue Date:</strong> {formatDate(verificationResult.certificate.issuedDate)}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Certificate Not Found ✗</h4>
                        <p className="mt-1 text-sm text-red-700">
                          The verification code is invalid or the certificate may have been revoked.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowVerifyModal(false);
                      setVerificationCode('');
                      setVerificationResult(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify'}
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