import { useState, useEffect } from 'react';

function SimpleDashboard() {
  const [stats, setStats] = useState({
    admissions: { total: 45, pending: 8, approved: 32, thisMonth: 12 },
    students: { total: 156, active: 142, newThisMonth: 18 },
    contacts: { total: 89, new: 5, thisMonth: 23 },
    courses: { total: 4 },
    beltDistribution: [
      { _id: 'white', count: 45 },
      { _id: 'yellow', count: 38 },
      { _id: 'green', count: 32 },
      { _id: 'blue', count: 25 },
      { _id: 'black-1st', count: 16 }
    ]
  });

  const getBeltColor = (belt) => {
    const colors = {
      'white': 'bg-gray-100 border-2 border-gray-300',
      'yellow': 'bg-yellow-400',
      'green': 'bg-green-500',
      'blue': 'bg-blue-600',
      'red': 'bg-red-600',
      'black-1st': 'bg-black',
      'black-2nd': 'bg-black',
      'black-3rd': 'bg-black'
    };
    return colors[belt] || 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Combat Warrior Taekwon-do Institute Management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-black text-slate-800">{stats.students.total}</p>
                <p className="text-green-600 text-sm">
                  +{stats.students.newThisMonth} this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">👥</span>
              </div>
            </div>
          </div>

          {/* Pending Admissions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Pending Admissions</p>
                <p className="text-3xl font-black text-slate-800">{stats.admissions.pending}</p>
                <p className="text-amber-600 text-sm">
                  {stats.admissions.thisMonth} this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">📝</span>
              </div>
            </div>
          </div>

          {/* New Messages */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">New Messages</p>
                <p className="text-3xl font-black text-slate-800">{stats.contacts.new}</p>
                <p className="text-purple-600 text-sm">
                  {stats.contacts.thisMonth} this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">💬</span>
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active Courses</p>
                <p className="text-3xl font-black text-slate-800">{stats.courses.total}</p>
                <p className="text-green-600 text-sm">All levels</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">📚</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Belt Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Belt Distribution</h3>
            <div className="space-y-4">
              {stats.beltDistribution.map((belt, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full ${getBeltColor(belt._id)}`}></div>
                    <span className="font-medium text-slate-700 capitalize">
                      {belt._id.replace('-', ' ')} Belt
                    </span>
                  </div>
                  <span className="font-bold text-slate-800">{belt.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300">
                Review Pending Admissions ({stats.admissions.pending})
              </button>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
                Respond to Messages ({stats.contacts.new})
              </button>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                Manage Students ({stats.students.active})
              </button>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300">
                Course Management ({stats.courses.total})
              </button>
            </div>
          </div>
        </div>

        {/* Sample Admissions Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">Recent Admissions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">Vikram Reddy</td>
                  <td className="px-6 py-4 text-slate-600">Intermediate</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">Jan 15, 2025</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">Priya Sharma</td>
                  <td className="px-6 py-4 text-slate-600">Beginner</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Approved
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">Jan 10, 2025</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">Arjun Kumar</td>
                  <td className="px-6 py-4 text-slate-600">Advanced</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">Jan 20, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleDashboard;