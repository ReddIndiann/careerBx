import  { useState, useMemo, useEffect, useRef } from 'react';
import {  institutions } from '../data/institutions';
import stud from '../assets/stud.jpg';
// import logo from '../assets/logo.png';

const HeroSection = () => {
  // Add console log to check institutions data
  console.log('Available institutions:', institutions);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    course: '',
    maxFees: ''
  });
  // const [searchResults, setSearchResults] = useState<Institution[]>([]);
  // const [showResults, setShowResults] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const courseRef = useRef<HTMLDivElement>(null);

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (courseRef.current && !courseRef.current.contains(event.target as Node)) {
        setShowCourseDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get unique locations and courses
  const uniqueLocations = useMemo(() => {
    const locations = new Set(institutions.map(inst => inst.location));
    return Array.from(locations).sort();
  }, []);

  const uniqueCourses = useMemo(() => {
    const courses = new Set(institutions.flatMap(inst => inst.courses));
    return Array.from(courses).sort();
  }, []);

  // Filtered locations and courses based on search
  const filteredLocations = useMemo(() => {
    return uniqueLocations.filter(location =>
      location.toLowerCase().includes(locationSearch.toLowerCase())
    );
  }, [locationSearch, uniqueLocations]);

  const filteredCourses = useMemo(() => {
    return uniqueCourses.filter(course =>
      course.toLowerCase().includes(courseSearch.toLowerCase())
    );
  }, [courseSearch, uniqueCourses]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    // Create URL search params
    const params = new URLSearchParams();
    if (searchParams.location) params.append('location', searchParams.location);
    if (searchParams.type) params.append('type', searchParams.type);
    if (searchParams.course) params.append('course', searchParams.course);
    if (searchParams.maxFees) params.append('maxFees', searchParams.maxFees);

    // Open in new tab
    window.open(`/search-results?${params.toString()}`, '_blank');
  };

  const handleLocationSelect = (location: string) => {
    console.log('Location selected:', location);
    setLocationSearch(location);
    setSearchParams(prev => {
      const newParams = { ...prev, location };
      console.log('Updated search params after location select:', newParams);
      return newParams;
    });
    setShowLocationDropdown(false);
  };

  const handleCourseSelect = (course: string) => {
    console.log('Course selected:', course);
    setCourseSearch(course);
    setSearchParams(prev => {
      const newParams = { ...prev, course };
      console.log('Updated search params after course select:', newParams);
      return newParams;
    });
    setShowCourseDropdown(false);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-4 bg-white/95 backdrop-blur-sm shadow-lg z-50">
        <div className="z-50">
          {/* <img src={logo} alt="Logo" className="h-10 w-auto" /> */}
        </div>
        
        <button 
          className="relative z-50 flex flex-col gap-2 p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-gray-900 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}></span>
        </button>
      </nav>

      {/* Hero Content */}
      <div 
        style={{ 
          backgroundImage: `url(${stud})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>
        
        <div className="relative z-10 max-w-3xl w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
            Find Your Perfect <span className="text-orange-400">Educational Path</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore Ghana's top universities, polytechnics, and vocational schools all in one place
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Location Dropdown */}
              <div className="relative" ref={locationRef}>
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  value={locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setShowLocationDropdown(true);
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                />
                {showLocationDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {filteredLocations.map((location, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-orange-50 cursor-pointer transition-colors"
                        onClick={() => handleLocationSelect(location)}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Type Dropdown */}
              <select
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                value={searchParams.type}
                onChange={(e) => setSearchParams(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">Institution Type</option>
                <option value="University">University</option>
                <option value="Polytechnic">Polytechnic</option>
                <option value="Vocational">Vocational</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Course Dropdown */}
              <div className="relative" ref={courseRef}>
                <input
                  type="text"
                  placeholder="Course"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  value={courseSearch}
                  onChange={(e) => {
                    setCourseSearch(e.target.value);
                    setShowCourseDropdown(true);
                  }}
                  onFocus={() => setShowCourseDropdown(true)}
                />
                {showCourseDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {filteredCourses.map((course, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-orange-50 cursor-pointer transition-colors"
                        onClick={() => handleCourseSelect(course)}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Maximum Fees Input */}
              <input
                type="number"
                placeholder="Max Fees (USD)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                value={searchParams.maxFees}
                onChange={(e) => setSearchParams(prev => ({ ...prev, maxFees: e.target.value }))}
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-500 transition-all shadow-lg hover:shadow-xl"
            >
              Search Institutions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 