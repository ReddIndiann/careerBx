import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end h-16">
            {/* Menu button */}
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  <span 
                    className={`absolute block w-6 h-0.5 bg-current transform transition duration-500 ease-in-out ${
                      isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                    }`}
                  />
                  <span 
                    className={`absolute block w-6 h-0.5 bg-current transform transition duration-500 ease-in-out ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span 
                    className={`absolute block w-6 h-0.5 bg-current transform transition duration-500 ease-in-out ${
                      isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menu popup */}
        <div 
          className={`absolute top-16 right-0 w-64 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-l-xl py-4">
            <div className="px-4 space-y-3">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/institutions" 
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Institutions
              </Link>
              <Link 
                to="/courses" 
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-lg text-base font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 