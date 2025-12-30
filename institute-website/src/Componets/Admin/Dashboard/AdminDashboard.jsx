import { useState, useEffect } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
                <p className="text-3xl font-black text-slate-800">{stats?.students?.total || 0}</p>
                <p className="text-green-600 text-sm">
                  +{stats?.students?.newThisMonth || 0} this month
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
                <p className="text-3xl font-black text-slate-800">{stats?.admissions?.pending || 0}</p>
                <p className="text-amber-600 text-sm">
                  {stats?.admissions?.thisMonth || 0} this month
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
                <p className="text-3xl font-black text-slate-800">{stats?.contacts?.new || 0}</p>
                <p className="text-purple-600 text-sm">
                  {stats?.contacts?.thisMonth || 0} this month
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
                <p className="text-3xl font-black text-slate-800">{stats?.courses?.total || 0}</p>
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
              {stats?.beltDistribution?.map((belt, index) => (
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

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300">
                Review Pending Admissions ({stats?.admissions?.pending || 0})
              </button>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
                Respond to Messages ({stats?.contacts?.new || 0})
              </button>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                Manage Students ({stats?.students?.active || 0})
              </button>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300">
                Course Management ({stats?.courses?.total || 0})
              </button>
            </div>
          </div>
        </div>

        {/* Admission Trends */}
        {stats?.admissionTrends && stats.admissionTrends.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Admission Trends (Last 6 Months)</h3>
            <div className="flex items-end space-x-4 h-40">
              {stats.admissionTrends.map((trend, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-lg"
                    style={{ height: `${(trend.count / Math.max(...stats.admissionTrends.map(t => t.count))) * 100}%` }}
                  ></div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-semibold text-slate-800">{trend.count}</p>
                    <p className="text-xs text-slate-600">
                      {getMonthName(trend._id.month)} {trend._id.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions
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

const getMonthName = (month) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[month - 1];
};

export default AdminDashboard;