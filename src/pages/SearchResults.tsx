import  { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {  institutions } from '../data/institutions';
import logo from '../assets/logo.png';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [locationSearch, setLocationSearch] = useState(searchParams.get('location') || '');
  const [typeSearch, setTypeSearch] = useState(searchParams.get('type') || '');
  const [courseSearch, setCourseSearch] = useState(searchParams.get('course') || '');
  const [maxFees, setMaxFees] = useState(searchParams.get('maxFees') || '');
console.log(setLocationSearch,setTypeSearch,setCourseSearch,setMaxFees);
  // Filter results based on URL parameters
  const results = useMemo(() => {
    let filtered = [...institutions];

    if (locationSearch) {
      filtered = filtered.filter(inst => 
        inst.location.toLowerCase().includes(locationSearch.toLowerCase())
      );
    }

    if (typeSearch) {
      filtered = filtered.filter(inst => inst.type === typeSearch);
    }

    if (courseSearch) {
      filtered = filtered.filter(inst => 
        inst.courses.some(course => 
          course.toLowerCase().includes(courseSearch.toLowerCase())
        )
      );
    }

    if (maxFees) {
      const maxFeesNum = parseFloat(maxFees);
      if (!isNaN(maxFeesNum)) {
        filtered = filtered.filter(inst => inst.feesRange.max <= maxFeesNum);
      }
    }

    return filtered;
  }, [locationSearch, typeSearch, courseSearch, maxFees]);

  // Find related institutions (same location or type or has similar courses)
  const relatedResults = useMemo(() => {
    if (results.length === 0) return [];
    
    return institutions.filter(inst => {
      if (results.includes(inst)) return false;
      
      const locationMatch = results.some(r => r.location === inst.location);
      const typeMatch = results.some(r => r.type === inst.type);
      const courseMatch = results.some(r => 
        r.courses.some(c1 => inst.courses.some(c2 => 
          c1.toLowerCase().includes(c2.toLowerCase()) || 
          c2.toLowerCase().includes(c1.toLowerCase())
        ))
      );
      
      return locationMatch || typeMatch || courseMatch;
    }).slice(0, 3); // Show top 3 related institutions
  }, [results]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          
          {/* Current Search Parameters */}
          <div className="flex gap-4 text-sm text-gray-600">
            {locationSearch && <span>Location: {locationSearch}</span>}
            {typeSearch && <span>Type: {typeSearch}</span>}
            {courseSearch && <span>Course: {courseSearch}</span>}
            {maxFees && <span>Max Fees: ${maxFees}</span>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Search Results ({results.length})
        </h1>

        {/* Main Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(institution => (
            <div 
              key={institution.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{institution.name}</h3>
              <p className="text-gray-600 mb-4">{institution.location}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  {institution.type}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {institution.totalYears} years
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  ${institution.feesRange.min} - ${institution.feesRange.max}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <strong>Courses:</strong> {institution.courses.join(', ')}
                </p>
                <p className="text-gray-700">
                  <strong>Admission:</strong> {new Date(institution.admissionDates.start).toLocaleDateString()} - {new Date(institution.admissionDates.end).toLocaleDateString()}
                </p>
              </div>

              <a 
                href={`https://${institution.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium mt-4"
              >
                Visit Website
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Related Results */}
        {relatedResults.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also be interested in</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedResults.map(institution => (
                <div 
                  key={institution.id} 
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-orange-100"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{institution.name}</h3>
                  <p className="text-gray-600 mb-4">{institution.location}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      {institution.type}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      ${institution.feesRange.min} - ${institution.feesRange.max}
                    </span>
                  </div>

                  <a 
                    href={`https://${institution.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium mt-4"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults; 