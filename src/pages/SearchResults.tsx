import { useSearchParams } from 'react-router-dom';
import { institutions } from '../data/institutions';
import ResultsSideNav from '../components/ResultsSideNav';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  
  // Get search parameters
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';
  const course = searchParams.get('course') || '';

  // Filter institutions based on search parameters
  const filteredInstitutions = institutions.filter(institution => {
    const matchesLocation = !location || institution.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !type || institution.type === type;
    const matchesCourse = !course || institution.courses.some(c => 
      c.toLowerCase().includes(course.toLowerCase())
    );
    return matchesLocation && matchesType && matchesCourse;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Navigation */}
      <ResultsSideNav />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Search Results ({filteredInstitutions.length})
          </h1>

          {/* Results Grid */}
          <div className="grid gap-6">
            {filteredInstitutions.map((institution) => (
              <div 
                key={institution.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
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
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">{institution.totalYears}</span> years
                      </span>
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">
                          {institution.feesRange.currency} {institution.feesRange.min.toLocaleString()} - {institution.feesRange.max.toLocaleString()}
                        </span> / year
                      </span>
                    </div>
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}

            {filteredInstitutions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No institutions found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 