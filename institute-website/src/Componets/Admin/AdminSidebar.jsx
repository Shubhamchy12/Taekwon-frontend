function AdminSidebar({ activeSection, setActiveSection, onLogout }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'students', name: 'Student Records', icon: '👥' },
    { id: 'attendance', name: 'Attendance Tracking', icon: '📅' },
    { id: 'fees', name: 'Fee Management', icon: '💰' },
    { id: 'events', name: 'Event Management', icon: '🎯' },
    { id: 'certificates', name: 'Certifications', icon: '🏆' },
    { id: 'admissions', name: 'Online Admissions', icon: '📝' },
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-slate-900 font-black text-xl">CW</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-slate-400 text-sm">Combat Warrior Academy</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <p className="font-semibold">Admin User</p>
            <p className="text-slate-400 text-sm">Administrator</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;