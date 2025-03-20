import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
                <span className="ml-3 text-xl font-semibold text-gray-900">CareerBox</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/institutions" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                Institutions
              </Link>
              <Link to="/courses" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </Link>
              <Link 
                to="/login" 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
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

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-xl">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/institutions" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Institutions
            </Link>
            <Link 
              to="/courses" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors mt-4"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 