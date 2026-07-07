import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getPost, formatPostDate } from '../lib/posts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-theme-bg text-gray-900 font-inter pt-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-anton uppercase mb-6">Post not found</h1>
          <Link to="/blog" className="text-accent font-anton uppercase tracking-wide">
            ← Back to Writing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg text-gray-900 font-inter pt-32 px-6 pb-24">
      <Seo
        title={`${post.title} — Dan Flatt`}
        description={post.description}
        path={`/blog/${post.slug}`}
      />

      <article className="max-w-2xl mx-auto">
        <Link
          to="/blog"
          className="inline-block text-accent font-anton uppercase tracking-wide text-sm mb-8 hover:opacity-70 transition-opacity"
        >
          ← Writing
        </Link>
        <h1 className="text-4xl md:text-6xl font-anton uppercase text-gray-900 mb-4 leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 mb-12 text-sm uppercase tracking-wide">
          {formatPostDate(post.date)}
        </p>

        <div
          className="post-body text-lg text-gray-700 leading-relaxed space-y-6
            [&_h2]:font-anton [&_h2]:uppercase [&_h2]:text-3xl [&_h2]:text-gray-900 [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:font-anton [&_h3]:uppercase [&_h3]:text-2xl [&_h3]:text-gray-900 [&_h3]:mt-10 [&_h3]:mb-3
            [&_a]:text-accent [&_a]:underline hover:[&_a]:opacity-70
            [&_strong]:text-gray-900
            [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
            [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic
            [&_code]:bg-gray-200 [&_code]:px-1 [&_code]:rounded [&_code]:text-base
            [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-16 pt-8 border-t border-gray-300">
          <p className="text-gray-600 mb-4">
            Speaking about this at your event?{' '}
            <Link to="/speaking" className="text-accent underline">
              Here's how to book me
            </Link>
            .
          </p>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
