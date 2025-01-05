import { Suspense } from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { IPost } from '../../../models/Post';

// Temporary mock data until we implement data fetching
const mockPosts: IPost[] = [
  {
    _id: '1',
    id: '1',
    title: 'First Post',
    content: 'Content here',
    date: new Date(),
    scheduledAt: new Date(),
    timeZone: 'America/Chicago',
    platforms: ['twitter', 'linkedin'],
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1'
  }
];

function PostsHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
      <Link
        href="/dashboard/posts/new"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create New
      </Link>
    </div>
  );
}

function StatusFilter({ activeStatus }: { activeStatus: string }) {
  const statuses = ['All', 'Draft', 'Scheduled', 'Published'];
  
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8" aria-label="Status filters">
        {statuses.map((status) => (
          <a
            key={status}
            href={`?status=${status.toLowerCase()}`}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeStatus === status.toLowerCase()
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            {status}
          </a>
        ))}
      </nav>
    </div>
  );
}

function PlatformIcons({ platforms }: { platforms: string[] }) {
  return (
    <div className="flex space-x-2">
      {platforms.map((platform) => (
        <img
          key={platform}
          src={`/${platform}.svg`}
          alt={platform}
          className="w-5 h-5"
          title={platform.charAt(0).toUpperCase() + platform.slice(1)}
        />
      ))}
    </div>
  );
}

function PostGrid({ posts }: { posts: IPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post._id}
          className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {post.title}
            </h3>
            <div className="relative group">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link href={`/dashboard/posts/${post._id}/edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</Link>
                <Link href={`/dashboard/posts/${post._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <PlatformIcons platforms={post.platforms} />
            <span className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${post.status === 'draft' && 'bg-gray-100 text-gray-800'}
              ${post.status === 'scheduled' && 'bg-blue-100 text-blue-800'}
              ${post.status === 'published' && 'bg-green-100 text-green-800'}
              ${post.status === 'failed' && 'bg-red-100 text-red-800'}
            `}>
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </span>
          </div>
          <time className="text-sm text-gray-500">
            {new Date(post.scheduledAt).toLocaleDateString()}
          </time>
        </div>
      ))}
    </div>
  );
}

function PostsLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const session = await getServerSession(authOptions);
  const status = searchParams.status || 'all';

  // Filter posts based on status (will implement actual data fetching later)
  const filteredPosts = status === 'all'
    ? mockPosts
    : mockPosts.filter(post => post.status === status);

  return (
    <>
      <PostsHeader />
      <StatusFilter activeStatus={status} />
      <Suspense fallback={<PostsLoading />}>
        <PostGrid posts={filteredPosts} />
      </Suspense>
    </>
  );
}