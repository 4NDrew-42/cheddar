'use client';

import { Post } from '../../types/models';
import { format } from 'date-fns';
import { useDrag } from 'react-dnd';
import { useRef } from 'react';

interface PostPreviewProps {
  post: Post;
  isCompact?: boolean;
}

const platformIcons: Record<'twitter' | 'linkedin' | 'facebook', string> = {
  twitter: '🐦',
  linkedin: '🔗',
  facebook: '📘',
};

const statusColors: Record<'draft' | 'scheduled' | 'published' | 'failed', string> = {
  draft: 'bg-gray-200',
  scheduled: 'bg-blue-200',
  published: 'bg-green-200',
  failed: 'bg-red-200',
};

export default function PostPreview({ post, isCompact = false }: PostPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'POST',
    item: { post },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Connect the drag ref to our element ref
  drag(ref);

  return (
    <div
      ref={ref}
      className={`${
        isCompact ? 'p-2 text-xs' : 'p-3 text-sm'
      } border rounded-lg shadow-sm bg-white cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* Title */}
      <h3 className={`font-medium line-clamp-${isCompact ? '1' : '2'} mb-1`}>
        {post.title}
      </h3>

      {/* Time and Status */}
      <div className="flex items-center justify-between">
        <div className="text-gray-500">
          {format(new Date(post.scheduledAt), 'h:mm a')}
        </div>
        <div className={`${statusColors[post.status]} px-2 py-0.5 rounded-full`}>
          {post.status}
        </div>
      </div>

      {/* Platform Icons */}
      {!isCompact && (
        <div className="flex gap-2 mt-2">
          {post.platforms.map((platform) => (
            <span key={platform} className="text-sm">
              {platformIcons[platform]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
