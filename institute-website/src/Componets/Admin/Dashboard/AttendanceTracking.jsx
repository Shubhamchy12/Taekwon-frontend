import { useState } from 'react';

function AttendanceTracking() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDataStructure, setShowDataStructure] = useState(false);

  // Sample mobile app attendance data structure
  const mobileDataStructure = {
    id: 'ATT_' + Date.now(),
    studentId: 'STU001',
    studentName: 'Rahul Kumar',
    date: new Date().toISOString().split('T')[0],
    checkInTime: new Date().toISOString(),
    checkOutTime: null,
    class: 'Intermediate',
    status: 'present',
    duration: 0,
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Combat Warrior Taekwon-do, Bangalore'
    },
    deviceInfo: {
      deviceId: 'DEVICE_001',
      platform: 'Android',
      appVersion: '1.2.3'
    },
    verified: true,
    syncedAt: new Date().toISOString()
  };

  // Attendance records from mobile app (simulated data)
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 'ATT_001',
      studentId: 'STU001',
      studentName: 'Rahul Kumar',
      date: '2024-01-10',
      checkInTime: '2024-01-10T18:00:23Z',
      checkOutTime: '2024-01-10T19:28:15Z',
      class: 'Intermediate',
      status: 'present',
      duration: 88,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'Combat Warrior Taekwon-do' },
      deviceInfo: { platform: 'Android', appVersion: '1.2.3' },
      verified: true,
      syncedAt: '2024-01-10T19:30:00Z'
    },
    {
      id: 'ATT_002',
      studentId: 'STU002',
      studentName: 'Priya Sharma',
      date: '2024-01-10',
      checkInTime: '2024-01-10T19:43:12Z',
      checkOutTime: '2024-01-10T21:16:45Z',
      class: 'Advanced',
      status: 'present',
      duration: 93,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'Combat Warrior Taekwon-do' },
      deviceInfo: { platform: 'iOS', appVersion: '1.2.3' },
      verified: true,
      syncedAt: '2024-01-10T21:18:00Z'
    },
    {
      id: 'ATT_003',
      studentId: 'STU003',
      studentName: 'Amit Singh',
      date: selectedDate,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      class: 'Beginner',
      status: 'present',
      duration: 0,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'Combat Warrior Taekwon-do' },
      deviceInfo: { platform: 'Android', appVersion: '1.2.3' },
      verified: true,
      syncedAt: new Date().toISOString()
    }
  ]);

  // Add new attendance record (simulating mobile app data sync)
  const addNewRecord = () => {
    const newRecord = {
      id: 'ATT_' + Date.now(),
      studentId: 'STU00' + Math.floor(Math.random() * 9 + 1),
      studentName: ['Sneha Patel', 'Vikram Reddy', 'Anita Gupta'][Math.floor(Math.random() * 3)],
      date: selectedDate,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      class: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
      status: 'present',
      duration: 0,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'Combat Warrior Taekwon-do' },
      deviceInfo: { platform: Math.random() > 0.5 ? 'Android' : 'iOS', appVersion: '1.2.3' },
      verified: true,
      syncedAt: new Date().toISOString()
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  const filteredData = attendanceRecords.filter(record => {
    const matchesDate = record.date === selectedDate;
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesClass && matchesSearch;
  });

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStats = () => {
    const present = filteredData.filter(r => r.status === 'present').length;
    const late = filteredData.filter(r => r.status === 'late').length;
    const total = filteredData.length;
    return { present, late, total };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Mobile App Attendance Management</h1>
          <p className="text-slate-600">Maintain and view attendance data from student mobile applications</p>
        </div>
        <button
          onClick={() => setShowDataStructure(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-colors"
        >
          View Data Structure
        </button>
      </div>

      {/* Mobile App Data Flow */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <span className="text-2xl mr-3">📱</span>
          How Mobile App Data is Maintained
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📍</div>
            <h4 className="font-semibold text-slate-700 mb-2">Auto Check-In</h4>
            <p className="text-slate-600 text-sm">Students check-in via mobile app with GPS verification</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🔄</div>
            <h4 className="font-semibold text-slate-700 mb-2">Real-time Sync</h4>
            <p className="text-slate-600 text-sm">Data syncs instantly to admin dashboard</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold text-slate-700 mb-2">Data Management</h4>
            <p className="text-slate-600 text-sm">View, filter, and export attendance records</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Classes</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Search Student</label>
            <input
              type="text"
              placeholder="Search by name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{stats.present}</div>
          <div className="text-slate-600 text-sm">Present Today</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.late}</div>
          <div className="text-slate-600 text-sm">Late Arrivals</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</div>
          <div className="text-slate-600 text-sm">Total Records</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
          <button
            onClick={addNewRecord}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors"
          >
            + Add Record
          </button>
          <div className="text-slate-600 text-xs mt-1">Simulate mobile sync</div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Attendance Records - {selectedDate}</h3>
          <p className="text-slate-600 text-sm">Live data from student mobile applications</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Check-out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Device</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredData.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-900">{record.studentName}</div>
                    <div className="text-slate-500 text-sm">{record.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-900">{record.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-900">{formatTime(record.checkInTime)}</div>
                    <div className="text-slate-500 text-xs">Auto-captured</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-900">
                      {record.checkOutTime ? formatTime(record.checkOutTime) : 'In Progress'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-900 font-medium">
                    {record.duration > 0 ? formatDuration(record.duration) : 'Ongoing'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      record.status === 'present' 
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'late'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status.toUpperCase()}
                    </span>
                    {record.verified && (
                      <div className="text-xs text-green-600 mt-1">✓ GPS Verified</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-900 text-sm">{record.deviceInfo.platform}</div>
                    <div className="text-slate-500 text-xs">v{record.deviceInfo.appVersion}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <div className="text-slate-500">No attendance records found for the selected criteria</div>
            <button
              onClick={addNewRecord}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Sample Record
            </button>
          </div>
        )}
      </div>

      {/* Data Structure Modal */}
      {showDataStructure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Mobile App Data Structure</h2>
              <button 
                onClick={() => setShowDataStructure(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Data Structure from Mobile App</h3>
                <pre className="bg-slate-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{JSON.stringify(mobileDataStructure, null, 2)}
                </pre>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">Automatic Capture</h4>
                  <ul className="text-slate-700 space-y-2 text-sm">
                    <li>• <strong>Timestamp:</strong> Precise check-in/out time</li>
                    <li>• <strong>GPS Location:</strong> Latitude/longitude verification</li>
                    <li>• <strong>Device Info:</strong> Platform, version tracking</li>
                    <li>• <strong>Student Info:</strong> ID, name, class details</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">Data Validation</h4>
                  <ul className="text-slate-700 space-y-2 text-sm">
                    <li>• <strong>Location Check:</strong> Must be at institute</li>
                    <li>• <strong>Time Validation:</strong> During class hours</li>
                    <li>• <strong>Duplicate Prevention:</strong> One check-in per day</li>
                    <li>• <strong>Status Auto-set:</strong> Present/Late based on time</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Admin Management</h4>
                <p className="text-slate-700 text-sm">
                  All mobile app attendance data appears here automatically. Admins can filter by date, class, 
                  search students, and export reports. No manual entry required - everything syncs in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceTracking;