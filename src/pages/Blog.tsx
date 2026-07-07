import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getAllPosts, formatPostDate } from '../lib/posts';

const Blog: React.FC = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-theme-bg text-gray-900 font-inter pt-32 px-6 pb-24">
      <Seo
        title="Writing — Dan Flatt"
        description="Essays and teardowns on AI-native marketing organizations, agent architectures, governed AI, and multi-brand growth."
        path="/blog"
      />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-anton uppercase text-gray-900 mb-6 leading-tight tracking-tight">
          Writing
        </h1>
        <p className="text-xl text-gray-500 font-medium mb-4">
          Essays and teardowns on AI-native marketing organizations, governed AI, and multi-brand
          growth.
        </p>
        <a
          href="/rss.xml"
          className="inline-block text-accent font-anton uppercase tracking-wide text-sm border-b-2 border-accent hover:opacity-70 transition-opacity mb-12"
        >
          Subscribe via RSS →
        </a>

        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-300 pb-10">
              <h2 className="text-3xl font-anton uppercase mb-2 leading-tight">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 mb-3 text-sm uppercase tracking-wide">
                {formatPostDate(post.date)}
              </p>
              <p className="text-lg text-gray-600 mb-4">{post.description}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-accent font-anton uppercase tracking-wide text-sm hover:opacity-70 transition-opacity"
              >
                Read →
              </Link>
            </article>
          ))}

          {posts.length === 0 && (
            <p className="text-lg text-gray-500">First essays landing soon.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
