import React from 'react';
import { Link } from 'react-router-dom';
import stud from '../assets/stud.jpg';

const CombinedSection = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${stud})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Your Path to Success
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Whether you're a student looking for the perfect institution or an institution aiming to connect with potential students, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Students Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">For Students</h3>
              <p className="text-gray-200">
                Discover and connect with educational institutions that align with your goals and aspirations.
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-orange-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Personalized institution recommendations
              </li>
              <li className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-orange-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Detailed institution profiles and comparisons
              </li>
              <li className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-orange-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Application guidance and resources
              </li>
            </ul>
            <div className="text-center">
              <Link
                to="/student-signup"
                className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-150"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Institutions Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">For Institutions</h3>
              <p className="text-gray-200">
                Connect with potential students and showcase your institution's unique offerings and opportunities.
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Enhanced visibility to potential students
              </li>
              <li className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Comprehensive institution profile management
              </li>
              <li className="flex items-center text-gray-200">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Student engagement analytics and insights
              </li>
            </ul>
            <div className="text-center">
              <Link
                to="/institution-signup"
                className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-150"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedSection; 