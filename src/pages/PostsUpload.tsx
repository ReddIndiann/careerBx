import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, Timestamp, orderBy, query } from 'firebase/firestore';

interface Post {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

const PostsUpload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
      setPosts(data);
      setLoadingPosts(false);
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage('Please fill all fields.');
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const placeholderImageUrl = 'https://via.placeholder.com/400x200?text=Placeholder+Image';

      const post = {
        title,
        content,
        imageUrl: placeholderImageUrl,
        createdAt: Timestamp.now().toDate().toISOString(),
      };
      await addDoc(collection(db, 'posts'), post);
      setMessage('Post uploaded successfully!');
      setTitle('');
      setContent('');
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
      setPosts(data);
    } catch (error) {
      setMessage('Error uploading post: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload a New Post</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter post title"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter post content"
            rows={4}
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Post'}
        </button>
        {message && <div className="mt-4 text-blue-700">{message}</div>}
      </form>

      <h3 className="text-xl font-semibold mb-4">All Posts</h3>
      {loadingPosts ? (
        <div>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border rounded p-4 flex flex-col md:flex-row gap-4 items-start">
              <img src={post.imageUrl} alt={post.title} className="w-32 h-32 object-cover rounded" />
              <div>
                <h4 className="text-lg font-bold mb-1">{post.title}</h4>
                <p className="mb-2">{post.content}</p>
                <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsUpload; 