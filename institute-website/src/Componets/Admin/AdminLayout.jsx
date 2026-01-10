import { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';

function AdminLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/admin/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin' && parsedUser.role !== 'instructor') {
        navigate('/admin/login');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const menuGroups = [
    {
      title: 'Dashboard & Analytics',
      items: [
        { path: '/admin/dashboard', name: 'Dashboard & Analytics Reports', icon: '📊' }
      ]
    },
    {
      title: 'Student Management',
      items: [
        { path: '/admin/students', name: 'Student Account Management', icon: '👥'},
        { path: '/admin/attendance', name: 'Attendance Management & Reports', icon: '📅'},
        { path: '/admin/belts', name: 'Level / Belt Management', icon: '🥋'}
      ]
    },
    {
      title: 'Academy Operations',
      items: [
        { path: '/admin/events', name: 'Event Creation & Tracking', icon: '🎯'},
        { path: '/admin/certificates', name: 'Certificate Upload', icon: '🏆'},
        { path: '/admin/admissions', name: 'Admissions', icon: '📝'}
      ]
    },
    {
      title: 'Financial Management',
      items: [
        { path: '/admin/fees', name: 'Fee Setup & Tracking', icon: '💰'},
       
      ]
    },
    {
      title: 'System Administration',
      items: [
         { path: '/admin/courses', name: 'Course Management', icon: '📚'},
        { path: '/admin/contacts', name: 'Contact Form', icon: '💬'},
       
      ]
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Sidebar */}
      <div className="w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col h-screen flex-shrink-0 fixed left-0 top-0 z-10">
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

       

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 group h-[72px] ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-102'
                  }`}
                >
                  <span className="text-2xl group-hover:animate-pulse flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-sm leading-tight truncate">{item.name}</div>
                    <div className={`text-xs mt-1 leading-tight truncate ${
                      location.pathname === item.path
                        ? 'text-amber-100'
                        : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-slate-900 font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{user?.name || 'Admin'}</p>
              <p className="text-slate-400 text-xs capitalize">{user?.role || 'admin'} Access</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg group"
          >
            <span className="group-hover:animate-bounce">🚪</span>
            <span>Secure Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 min-h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;