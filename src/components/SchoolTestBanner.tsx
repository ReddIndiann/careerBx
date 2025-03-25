
import { Link } from 'react-router-dom';

const SchoolTestBanner = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ready to Find Your Perfect School?
            </h2>
            <p className="text-white/90 text-lg">
              Take our quick assessment to get personalized institution recommendations
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/school-test"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 transition-colors duration-150"
            >
              Start Assessment
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolTestBanner; 