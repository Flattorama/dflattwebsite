import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-gray-900 font-inter pt-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-anton uppercase text-gray-900 mb-6 leading-tight tracking-tight">
          Blog
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          Welcome to the blog section. This is a placeholder page for testing navigation with React Router.
        </p>
        <div className="mt-8 space-y-6">
          <article className="border-b border-gray-300 pb-6">
            <h2 className="text-3xl font-anton uppercase mb-2">Coming Soon</h2>
            <p className="text-gray-500 mb-2">Posted on Nov 28, 2025</p>
            <p className="text-lg text-gray-600">
              More blog posts and articles coming soon. Check back later for updates on web development, design, and creative technology.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;
