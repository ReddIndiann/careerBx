import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ResultsSideNav from '../components/ResultsSideNav';

interface Institution {
  id?: string;
  name: string;
  location: string;
  type: string;
  courses: string[];
  feesRange: {
    min: number;
    max: number;
    currency: string;
  };
  admissionDates: {
    start: string;
    end: string;
  };
  totalYears: number;
  accreditation: string;
  facilities: string[];
  website: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  // Get search parameters
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';
  const course = searchParams.get('course') || '';
  const minFees = searchParams.get('minFees') ? parseInt(searchParams.get('minFees')!) : null;
  const maxFees = searchParams.get('maxFees') ? parseInt(searchParams.get('maxFees')!) : null;

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, 'institutions'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Institution[];
        setInstitutions(data);
      } catch {
        setError('Failed to fetch institutions.');
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

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

  if (loading) {
    return <div className="flex justify-center items-center h-96 text-xl">Loading institutions...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-96 text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="flex">
      {isSideNavOpen && <ResultsSideNav />}
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
                key={institution.id || institution.name} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6"
              >
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 