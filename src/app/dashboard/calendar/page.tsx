'use client';

import { Suspense, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import CalendarContainer from '../../../components/calendar/CalendarContainer';
import { Post } from '../../../types/models';
import { useEffect } from 'react';

export default function CalendarPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // TODO: Add error UI
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handlePostUpdate = useCallback(async (updatedPost: Post) => {
    try {
      const response = await fetch(`/api/posts/${updatedPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) throw new Error('Failed to update post');

      // Optimistically update the local state
      setPosts(currentPosts =>
        currentPosts.map(post =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error('Error updating post:', error);
      // TODO: Add error UI and revert optimistic update
    }
  }, []);

  const handleDateChange = useCallback((date: Date) => {
    // Could be used to fetch posts for specific date range
    console.log('Date changed:', date);
  }, []);

  const handleViewChange = useCallback((view: 'month' | 'week') => {
    // Could be used to adjust fetch strategy based on view
    console.log('View changed:', view);
  }, []);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Please sign in to view the calendar</p>
      </div>
    );
  }

  if (isLoading) {
    return <CalendarLoading />;
  }

  return (
    <div className="space-y-6 p-6">
      <Suspense fallback={<CalendarLoading />}>
        <CalendarContainer
          posts={posts}
          onPostUpdate={handlePostUpdate}
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
        />
      </Suspense>
    </div>
  );
}

function CalendarLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-gray-200 rounded mb-4"></div>
      <div className="grid grid-cols-7 gap-4">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}