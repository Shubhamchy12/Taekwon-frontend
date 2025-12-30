import { useState } from 'react';

function StudentManagement() {
  const [students] = useState([
    {
      id: 'STU001',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 9876543210',
      belt: 'Yellow',
      joinDate: '2024-01-15',
      status: 'Active',
      course: 'Intermediate',
      fees: 'Paid'
    },
    {
      id: 'STU002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      belt: 'Green',
      joinDate: '2023-11-20',
      status: 'Active',
      course: 'Advanced',
      fees: 'Pending'
    },
    {
      id: 'STU003',
      name: 'Amit Singh',
      email: 'amit.singh@email.com',
      phone: '+91 9876543212',
      belt: 'Blue',
      joinDate: '2023-08-10',
      status: 'Active',
      course: 'Advanced',
      fees: 'Paid'
    },
    {
      id: 'STU004',
      name: 'Sneha Patel',
      email: 'sneha.patel@email.com',
      phone: '+91 9876543213',
      belt: 'White',
      joinDate: '2024-02-28',
      status: 'Active',
      course: 'Beginner',
      fees: 'Paid'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBelt, setFilterBelt] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBelt = filterBelt === '' || student.belt === filterBelt;
    return matchesSearch && matchesBelt;
  });

  const getBeltColor = (belt) => {
    const colors = {
      'White': 'bg-gray-100 text-gray-800 border-gray-300',
      'Yellow': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Green': 'bg-green-100 text-green-800 border-green-300',
      'Blue': 'bg-blue-100 text-blue-800 border-blue-300',
      'Black': 'bg-gray-900 text-white border-gray-700'
    };
    return colors[belt] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">Student Records</h1>
          <p className="text-slate-600">Manage and track all student information digitally</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add New Student</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Search Students</label>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Filter by Belt</label>
            <select
              value={filterBelt}
              onChange={(e) => setFilterBelt(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Belts</option>
              <option value="White">White Belt</option>
              <option value="Yellow">Yellow Belt</option>
              <option value="Green">Green Belt</option>
              <option value="Blue">Blue Belt</option>
              <option value="Black">Black Belt</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors font-semibold">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Student ID</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Name</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Contact</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Belt Level</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Course</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Join Date</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Fee Status</th>
                <th className="text-left py-4 px-6 font-bold text-slate-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-amber-50 transition-colors`}>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800">{student.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-slate-800">{student.name}</div>
                      <div className="text-sm text-slate-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-600">{student.phone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getBeltColor(student.belt)}`}>
                      {student.belt} Belt
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-600">{student.course}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-600">{student.joinDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      student.fees === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.fees}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        View
                      </button>
                      <button className="bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 transition-colors text-sm">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-blue-600 mb-2">{students.length}</div>
          <div className="text-slate-600 font-medium">Total Students</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-green-600 mb-2">
            {students.filter(s => s.status === 'Active').length}
          </div>
          <div className="text-slate-600 font-medium">Active Students</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-amber-600 mb-2">
            {students.filter(s => s.belt === 'Black').length}
          </div>
          <div className="text-slate-600 font-medium">Black Belts</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <div className="text-3xl font-black text-red-600 mb-2">
            {students.filter(s => s.fees === 'Pending').length}
          </div>
          <div className="text-slate-600 font-medium">Pending Fees</div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Add New Student</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Course Level</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentManagement;