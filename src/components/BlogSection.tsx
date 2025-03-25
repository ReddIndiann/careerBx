import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Choose the Right University Program",
      excerpt: "Discover the key factors to consider when selecting your university program and make an informed decision for your future.",
      category: "Education Guide",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "Apr 15, 2024"
    },
    {
      id: 2,
      title: "Top Scholarships for Ghanaian Students in 2024",
      excerpt: "A comprehensive guide to the best scholarship opportunities available for Ghanaian students this year.",
      category: "Scholarships",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "Apr 12, 2024"
    },
    {
      id: 3,
      title: "Career Paths in Technology: What's Right for You?",
      excerpt: "Explore different career opportunities in the tech industry and find the path that matches your interests and skills.",
      category: "Career Guide",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "Apr 10, 2024"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest insights, tips, and guides about education, careers, and personal development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <Link to={`/blog/${post.id}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-orange-500 text-sm font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4 flex items-center text-orange-500 font-medium">
                    Read More
                    <svg 
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/blog"
            className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors"
          >
            View All Articles
            <svg 
              className="w-5 h-5 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 