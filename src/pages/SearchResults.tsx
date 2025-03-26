import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { institutions } from '../data/institutions';
import ResultsSideNav from '../components/ResultsSideNav';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  // Get search parameters
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';
  const course = searchParams.get('course') || '';
  const minFees = searchParams.get('minFees') ? parseInt(searchParams.get('minFees')!) : null;
  const maxFees = searchParams.get('maxFees') ? parseInt(searchParams.get('maxFees')!) : null;

  // Filter institutions based on search parameters
  const filteredInstitutions = institutions.filter(institution => {
    const matchesLocation = !location || institution.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !type || institution.type === type;
    const matchesCourse = !course || institution.courses.some(c => c.toLowerCase().includes(course.toLowerCase()));
    const matchesFees = (!minFees || institution.feesRange.min >= minFees) && 
                       (!maxFees || institution.feesRange.max <= maxFees);
    
    return matchesLocation && matchesType && matchesCourse && matchesFees;
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSideNavOpen(window.innerWidth >= 1024); // Show side nav by default on large screens
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 bg-white p-2 rounded-lg shadow-md"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Side Navigation */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
        ${isSideNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <ResultsSideNav />
              </div>

      {/* Overlay for mobile */}
      {isSideNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSideNavOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">
              Search Results ({filteredInstitutions.length})
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Showing</span>
              <span className="font-medium">{filteredInstitutions.length}</span>
              <span>results</span>
            </div>
        </div>

          {/* Results Grid */}
          <div className="grid gap-6">
            {filteredInstitutions.map((institution) => (
                <div 
                  key={institution.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {institution.name}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      {institution.location} • {institution.type}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      {institution.courses.slice(0, 3).join(', ')}
                      {institution.courses.length > 3 && ' ...'}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span>
                        <span className="font-medium">{institution.totalYears}</span> years
                    </span>
                      <span>
                        <span className="font-medium">
                          {institution.feesRange.currency} {institution.feesRange.min.toLocaleString()} - {institution.feesRange.max.toLocaleString()}
                        </span> / year
                    </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default SearchResults; 