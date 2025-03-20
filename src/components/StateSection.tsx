

const StatsSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Visitors Stat */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3 className="text-5xl font-bold text-gray-900">51m+</h3>
            <p className="text-lg text-gray-600">unique visitors every year</p>
          </div>

          {/* Programs Stat */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
              </svg>
            </div>
            <h3 className="text-5xl font-bold text-gray-900">245,000+</h3>
            <p className="text-lg text-gray-600">programmes listed globally</p>
          </div>

          {/* Institutions Stat */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
              </svg>
            </div>
            <h3 className="text-5xl font-bold text-gray-900">3,500+</h3>
            <p className="text-lg text-gray-600">featured institutions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;