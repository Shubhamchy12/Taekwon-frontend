function DashboardHome() {
  const stats = [
    { title: 'Total Students', value: '247', change: '+12', icon: '👥', color: 'from-blue-500 to-blue-600' },
    { title: 'Active Courses', value: '8', change: '+2', icon: '📚', color: 'from-green-500 to-green-600' },
    { title: 'Monthly Revenue', value: '₹1,24,500', change: '+8%', icon: '💰', color: 'from-amber-500 to-orange-600' },
    { title: 'Pending Fees', value: '₹18,750', change: '-5%', icon: '⏰', color: 'from-red-500 to-red-600' },
  ];

  const recentActivities = [
    { type: 'admission', message: 'New admission: Rahul Kumar', time: '2 hours ago' },
    { type: 'payment', message: 'Fee payment received from Priya Sharma', time: '4 hours ago' },
    { type: 'certificate', message: 'Yellow belt certificate issued to Amit Singh', time: '6 hours ago' },
    { type: 'event', message: 'Tournament registration opened', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-800 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening at Combat Warrior Academy.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-slate-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Weekly Attendance</h3>
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
              const attendance = [85, 92, 78, 88, 95, 82][index];
              return (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-medium text-slate-600">{day}</div>
                  <div className="flex-1 bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${attendance}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm font-semibold text-slate-800">{attendance}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 bg-slate-50 rounded-xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  activity.type === 'admission' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                  activity.type === 'certificate' ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'admission' ? '👤' :
                   activity.type === 'payment' ? '💳' :
                   activity.type === 'certificate' ? '🏆' : '🎯'}
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 font-medium">{activity.message}</p>
                  <p className="text-slate-500 text-sm">{activity.time}</p>
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
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">➕</div>
            <div className="font-semibold">Add Student</div>
          </button>
          
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="font-semibold">Mark Attendance</div>
          </button>
          
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-semibold">Record Payment</div>
          </button>
          
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold">Issue Certificate</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;