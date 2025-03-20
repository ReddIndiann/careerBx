

const InstitutionsSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToJZdKXNYyEBGen4CCW29JQA_bOEVTa39c_g&s" // Add your image path here
              alt="University campus"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-orange-500">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
              </svg>
              <span className="text-xl font-medium">For institutions</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your partner for digital, direct and truly global student recruitment
            </h2>

            <p className="text-lg text-gray-700">
              Reach and enrol the most diverse, independent students looking for the best university match globally, and realise your international student recruitment ambitions.
            </p>

            <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              For institutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionsSection;