function AdminSidebar({ activeSection, setActiveSection, onLogout }) {
  const menuGroups = [
    {
      title: 'Dashboard & Analytics',
      items: [
        { id: 'dashboard', name: 'Dashboard & Analytics Reports', icon: '📊', description: 'System Overview & Reports' }
      ]
    },
    {
      title: 'Student Management',
      items: [
        { id: 'students', name: 'Student Account Management', icon: '👥', description: 'Creation & Management' },
        { id: 'attendance', name: 'Attendance Management & Reports', icon: '📅', description: 'Digital Tracking & Analytics' },
        { id: 'belts', name: 'Level / Belt Management', icon: '🥋', description: 'Level 1, Level 2, etc.' }
      ]
    },
    {
      title: 'Academy Operations',
      items: [
        { id: 'contact', name: 'Contact Management', icon: '📞', description: 'Inquiries & Communication' },
        { id: 'events', name: 'Event Creation & Tracking', icon: '🎯', description: 'Attendance Tracking' },
        { id: 'certificates', name: 'Certificate Upload', icon: '🏆', description: 'Digital Certificates' },
        { id: 'admissions', name: 'Online Admissions', icon: '📝', description: 'Student Enrollment' }
      ]
    },
    {
      title: 'Financial Management',
      items: [
        { id: 'fees', name: 'Fee Management', icon: '💰', description: 'Complete Fee Setup & Tracking' }
      ]
    },
    {
      title: 'System Administration',
      items: [
        { id: 'settings', name: 'System Settings', icon: '⚙️', description: 'Configuration & Preferences' }
      ]
    }
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-slate-900 font-black text-xl">CW</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-slate-400 text-sm">Full System Control</p>
          </div>
        </div>
      </div>

      {/* Core Modules Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-slate-700">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
          Core Modules (Web-Based)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Complete control over system operations with 9 integrated modules
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-3 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              {group.title}
            </h3>
            <div className="space-y-2">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-start space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-102'
                  }`}
                >
                  <span className="text-2xl mt-0.5 group-hover:animate-pulse">{item.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-sm leading-tight">{item.name}</div>
                    <div className={`text-xs mt-1 ${
                      activeSection === item.id
                        ? 'text-amber-100'
                        : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* System Status */}
      <div className="px-6 py-3 border-t border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-400">System Online</span>
          </div>
          <span className="text-slate-500">v2.1.0</span>
        </div>
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-slate-900 font-bold">A</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm">System Administrator</p>
            <p className="text-slate-400 text-xs">Full Access Control</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg group"
        >
          <span className="group-hover:animate-bounce">🚪</span>
          <span>Secure Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;