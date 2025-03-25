import { Link } from 'react-router-dom';
import stud from '../assets/stud.jpg';

const CombinedSection = () => {
  return (
    <section 
      style={{ 
        backgroundImage: `url(${stud})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
      className="py-20 px-4 md:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Path to Success
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Whether you're a student looking for the right institution or an institution looking to connect with students,
            we're here to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - For Students */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl space-y-6">
            <div className="flex items-center gap-3 text-orange-400">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
              <span className="text-xl font-medium text-orange-400">For Students</span>
            </div>

            <h3 className="text-3xl font-bold text-white leading-tight">
              Discover Your Perfect Educational Journey
            </h3>

            <p className="text-lg text-gray-200">
              Find your ideal study program among thousands of courses across Ghana's top institutions. 
              Get personalized recommendations based on your interests and goals.
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-200">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Comprehensive institution profiles
              </li>
              <li className="flex items-center gap-2 text-gray-200">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Program comparison tools
              </li>
              <li className="flex items-center gap-2 text-gray-200">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Scholarship information
              </li>
            </ul>

            <Link 
              to="/school-test"
              className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Find Your School Match
            </Link>
          </div>

          {/* Right side - For Institutions */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
              <span className="text-xl font-medium text-blue-400">For Institutions</span>
            </div>

            <h3 className="text-3xl font-bold text-white leading-tight">
              Connect with Qualified Students
            </h3>

            <p className="text-lg text-gray-200">
              Showcase your programs to thousands of potential students. 
              Our platform helps you reach and engage with students who match your institution's profile.
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-200">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Enhanced institution visibility
              </li>
              <li className="flex items-center gap-2 text-gray-200">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Student matching algorithms
              </li>
              <li className="flex items-center gap-2 text-gray-200">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Analytics and insights
              </li>
            </ul>

            <Link 
              to="/institution-signup"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Partner with Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedSection; 