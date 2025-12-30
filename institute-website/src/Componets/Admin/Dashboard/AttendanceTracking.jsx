import { useState } from 'react';

function AttendanceTracking() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');
  
  const [students] = useState([
    { id: 'STU001', name: 'Rahul Kumar', class: 'Intermediate', belt: 'Yellow', present: true },
    { id: 'STU002', name: 'Priya Sharma', class: 'Advanced', belt: 'Green', present: true },
    { id: 'STU003', name: 'Amit Singh', class: 'Advanced', belt: 'Blue', present: false },
    { id: 'STU004', name: 'Sneha Patel', class: 'Beginner', belt: 'White', present: true },
    { id: 'STU005', name: 'Vikram Reddy', class: 'Intermediate', belt: 'Yellow', present: true },
    { id: 'STU006', name: 'Anita Gupta', class: 'Beginner', belt: 'White', present: false },
    { id: 'STU007', name: 'Ravi Mehta', class: 'Advanced', belt: 'Blue', present: true },
    { id: 'STU008', name: 'Kavya Nair', class: 'Intermediate', belt: 'Green', present: true },
  ]);

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = student.present;
      return acc;
    }, {})
  );

  const filteredStudents = students.filter(student => 
    selectedClass === 'all' || student.class === selectedClass
  );

  const toggleAttendance = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const presentCount = filteredStudents.filter(student => attendance[student.id]).length;
  const totalCount = filteredStudents.length;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const weeklyAttendance = [
    { day: 'Mon', date: '25', attendance: 85 },
    { day: 'Tue', date: '26', attendance: 92 },
    { day: 'Wed', date: '27', attendance: 78 },
    { day: 'Thu', date: '28', attendance: 88 },
    { day: 'Fri', date: '29', attendance: 95 },
    { day: 'Sat', date: '30', attendance: 82 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-800 mb-2">Attendance Tracking</h1>
        <p className="text-slate-600">Digital attendance management for all classes and students</p>
      </div>

      {/* Date and Class Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              <option value="Beginner">Beginner Class</option>
              <option value="Intermediate">Intermediate Class</option>
              <option value="Advanced">Advanced Class</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300">
              Save Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-green-600 mb-2">{presentCount}</div>
          <div className="text-slate-600 font-medium">Present Today</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-red-600 mb-2">{totalCount - presentCount}</div>
          <div className="text-slate-600 font-medium">Absent Today</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-blue-600 mb-2">{totalCount}</div>
          <div className="text-slate-600 font-medium">Total Students</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-amber-600 mb-2">{attendancePercentage}%</div>
          <div className="text-slate-600 font-medium">Attendance Rate</div>
        </div>
      </div>

      {/* Weekly Attendance Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Weekly Attendance Overview</h3>
        <div className="grid grid-cols-6 gap-4">
          {weeklyAttendance.map((day, index) => (
            <div key={index} className="text-center">
              <div className="bg-slate-100 rounded-xl p-4 mb-2">
                <div className="text-sm font-semibold text-slate-600 mb-2">{day.day}</div>
                <div className="text-lg font-bold text-slate-800 mb-2">{day.date}</div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${day.attendance}%` }}
                  ></div>
                </div>
                <div className="text-sm font-semibold text-slate-700">{day.attendance}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-800">Mark Attendance - {selectedDate}</h3>
          <p className="text-slate-600">Click on student cards to mark present/absent</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => toggleAttendance(student.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  attendance[student.id]
                    ? 'border-green-300 bg-green-50 hover:bg-green-100'
                    : 'border-red-300 bg-red-50 hover:bg-red-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      attendance[student.id] ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-semibold text-slate-800">{student.name}</span>
                  </div>
                  <span className={`text-2xl ${
                    attendance[student.id] ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {attendance[student.id] ? '✓' : '✗'}
                  </span>
                </div>
                
                <div className="text-sm text-slate-600 space-y-1">
                  <div>ID: {student.id}</div>
                  <div>Class: {student.class}</div>
                  <div>Belt: {student.belt}</div>
                </div>
                
                <div className={`mt-3 text-center py-2 rounded-lg font-semibold text-sm ${
                  attendance[student.id]
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }`}>
                  {attendance[student.id] ? 'PRESENT' : 'ABSENT'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">✓</div>
            <div className="font-semibold">Mark All Present</div>
          </button>
          
          <button className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">✗</div>
            <div className="font-semibold">Mark All Absent</div>
          </button>
          
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">Generate Report</div>
          </button>
          
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">📧</div>
            <div className="font-semibold">Send Notifications</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTracking;