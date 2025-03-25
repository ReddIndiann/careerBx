import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { institutions } from '../data/institutions';
import stud from '../assets/stud.jpg';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    course: ''
  });
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

  const handleSearch = () => {
    // Create URL search params
    const params = new URLSearchParams();
    if (searchParams.location) params.append('location', searchParams.location);
    if (searchParams.type) params.append('type', searchParams.type);
    if (searchParams.course) params.append('course', searchParams.course);

    // Use React Router's navigate instead of window.open
    navigate(`/search-results?${params.toString()}`);
  };

  const handleLocationSelect = (location: string) => {
    setLocationSearch(location);
    setSearchParams(prev => ({ ...prev, location }));
    setShowLocationDropdown(false);
  };

  const handleCourseSelect = (course: string) => {
    setCourseSearch(course);
    setSearchParams(prev => ({ ...prev, course }));
    setShowCourseDropdown(false);
  };

  return (
    <div 
      style={{ 
        backgroundImage: `url(${stud})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      className="relative min-h-screen flex flex-col justify-center items-center px-4"
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
          <div className="grid grid-cols-3 gap-3 mb-4">
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
  );
};

export default HeroSection; 