import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/courses' },
    { name: 'Admission', href: '/admission' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4">
              <img 
                src="/combat-warrior-logo.png" 
                alt="Combat Warrior Taekwon-Do Association" 
                className="h-20 w-20"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-800">COMBAT WARRIOR</span>
                <span className="text-sm text-red-700 font-bold">TAEKWON-DO ASSOCIATION</span>
                <span className="text-xs text-gray-600 font-semibold">OF KARNATAKA</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all duration-200 ${
                  location.pathname === item.href
                    ? 'text-red-700 bg-yellow-100 border-b-2 border-red-700'
                    : 'text-gray-800 hover:text-red-700 hover:bg-yellow-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Admin Login Button */}
            <Link
              to="/admin/login"
              className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-2 rounded-lg text-sm font-bold hover:from-red-800 hover:to-red-900 transition-all duration-200 shadow-lg border-2 border-yellow-400"
            >
              Admin Portal
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-red-700 focus:outline-none focus:text-red-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-yellow-50 rounded-lg mt-2 border-2 border-yellow-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-bold transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-red-700 bg-white border-l-4 border-red-700'
                      : 'text-gray-800 hover:text-red-700 hover:bg-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin/login"
                className="block w-full text-center bg-gradient-to-r from-red-700 to-red-800 text-white px-3 py-2 rounded-md text-base font-bold hover:from-red-800 hover:to-red-900 transition-all duration-200 mt-4"
                onClick={() => setIsOpen(false)}
              >
                Admin Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;