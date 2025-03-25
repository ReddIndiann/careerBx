import { Link } from 'react-router-dom';

const SchoolTestBanner = () => {
  return (
    <div className="bg-[#002B3C] py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="text-white">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
          </div>
          <h2 className="text-white text-lg md:text-xl font-medium">
            Find out which school would be the best fit for a student like you!
          </h2>
        </div>
        <Link 
          to="/school-test"
          className="bg-white text-[#002B3C] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          Take a free test!
        </Link>
      </div>
    </div>
  );
};

export default SchoolTestBanner; 