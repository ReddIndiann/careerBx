
const StudentsSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-orange-500">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
              <span className="text-xl font-medium">For students</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Find your perfect course to study abroad or online
            </h2>

            <p className="text-lg text-gray-700">
              Find your Best-Fit study among more than 245,000 bachelors, masters, PhDs, short courses or online programmes globally
            </p>

            <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              For students
            </button>
          </div>

          {/* Right side - Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvnXv2e80mFJwz_5toqa7R6Ryzj2p9TwHteA&s" // Add your image path here
              alt="Students studying together"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentsSection;