import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface Post {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <section className="max-w-5xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold mb-2">Latest from Our Blog</h2>
      <p className="text-gray-600 mb-8">Stay informed with the latest insights, tips, and guides about education, careers, and personal development.</p>
      {loading ? (
        <div>Loading blog posts...</div>
      ) : posts.length === 0 ? (
        <div>No blog posts found.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
              <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover rounded mb-4" />
              <div className="flex-1 flex flex-col">
                <span className="text-xs text-gray-400 mb-1">{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
                <Link to={"/posts-upload"} className="mt-auto text-orange-600 font-semibold hover:underline">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <Link to="/posts-upload" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">View All Articles</Link>
      </div>
    </section>
  );
};

export default BlogPreview; 