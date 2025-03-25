import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { institutions } from '../data/institutions';

const ResultsSideNav = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterSections, setFilterSections] = useState<{ id: string; isOpen: boolean }[]>([
    { id: 'courses', isOpen: false },
    { id: 'type', isOpen: false },
    { id: 'location', isOpen: false },
    { id: 'fees', isOpen: false },
    { id: 'duration', isOpen: false }
  ]);

  // Get unique values from institutions data
  const uniqueCourses = Array.from(new Set(institutions.flatMap(inst => inst.courses))).sort();
  const institutionTypes = ['University', 'Polytechnic', 'Vocational'];
  const uniqueLocations = Array.from(new Set(institutions.map(inst => inst.location))).sort();

  // Get current filter values from URL
  const currentCourse = searchParams.get('course') || '';
  const currentType = searchParams.get('type') || '';
  const currentLocation = searchParams.get('location') || '';
  const currentMinFees = searchParams.get('minFees') || '';
  const currentMaxFees = searchParams.get('maxFees') || '';

  const toggleSection = (sectionId: string) => {
    setFilterSections(sections =>
      sections.map(section =>
        section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  };

  const isSectionOpen = (sectionId: string) => {
    return filterSections.find(section => section.id === sectionId)?.isOpen;
  };

  const updateSearchParam = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const handleFeesChange = (min: string, max: string) => {
    if (min) searchParams.set('minFees', min);
    else searchParams.delete('minFees');
    
    if (max) searchParams.set('maxFees', max);
    else searchParams.delete('maxFees');
    
    setSearchParams(searchParams);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Filter Results</h2>
      </div>

      {/* Courses Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('courses')}
          className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="font-medium text-gray-900">Courses</span>
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform ${isSectionOpen('courses') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isSectionOpen('courses') && (
          <div className="px-4 py-3 bg-gray-50">
            <div className="space-y-2">
              {uniqueCourses.map((course) => (
                <div key={course} className="flex items-center justify-between group">
                  <label className="flex items-center space-x-2 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="course"
                      checked={currentCourse === course}
                      onChange={() => updateSearchParam('course', course)}
                      className="form-radio h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{course}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Institution Type Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('type')}
          className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            <span className="font-medium text-gray-900">Institution Type</span>
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform ${isSectionOpen('type') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isSectionOpen('type') && (
          <div className="px-4 py-3 bg-gray-50">
            <div className="space-y-2">
              {institutionTypes.map((type) => (
                <div key={type} className="flex items-center justify-between group">
                  <label className="flex items-center space-x-2 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={currentType === type}
                      onChange={() => updateSearchParam('type', type)}
                      className="form-radio h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{type}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Location Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('location')}
          className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span className="font-medium text-gray-900">Location</span>
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform ${isSectionOpen('location') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isSectionOpen('location') && (
          <div className="px-4 py-3 bg-gray-50">
            <div className="space-y-2">
              {uniqueLocations.map((location) => (
                <div key={location} className="flex items-center justify-between group">
                  <label className="flex items-center space-x-2 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      checked={currentLocation === location}
                      onChange={() => updateSearchParam('location', location)}
                      className="form-radio h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{location}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fees Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('fees')}
          className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span className="font-medium text-gray-900">Tuition Fees (USD)</span>
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform ${isSectionOpen('fees') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isSectionOpen('fees') && (
          <div className="px-4 py-3 bg-gray-50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                <input
                  type="number"
                  value={currentMinFees}
                  onChange={(e) => handleFeesChange(e.target.value, currentMaxFees)}
                  placeholder="Min"
                  className="form-input w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                <input
                  type="number"
                  value={currentMaxFees}
                  onChange={(e) => handleFeesChange(currentMinFees, e.target.value)}
                  placeholder="Max"
                  className="form-input w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Duration Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('duration')}
          className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span className="font-medium text-gray-900">Duration (Years)</span>
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform ${isSectionOpen('duration') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isSectionOpen('duration') && (
          <div className="px-4 py-3 bg-gray-50">
            <div className="space-y-2">
              {[2, 3, 4].map((years) => (
                <div key={years} className="flex items-center justify-between group">
                  <label className="flex items-center space-x-2 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      value={years}
                      onChange={(e) => updateSearchParam('duration', e.target.value)}
                      className="form-radio h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{years} Years</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      <div className="p-4">
        <button 
          onClick={() => setSearchParams(new URLSearchParams())}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default ResultsSideNav; 