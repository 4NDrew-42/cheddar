'use client';

import { IPost } from '../../models/Post';
import { format } from 'date-fns';

interface PostPreviewProps {
	post: IPost;
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

export default function PostPreview({ post }: PostPreviewProps) {
	return (
		<div className="p-3 border rounded-lg shadow-sm bg-white">
			{/* Title */}
			<h3 className="text-sm font-medium line-clamp-2 mb-2">{post.title}</h3>

			{/* Time and Status */}
			<div className="flex items-center justify-between text-xs">
				<div className="text-gray-500">{format(new Date(post.scheduledAt), 'h:mm a')}</div>
				<div className={`${statusColors[post.status]} px-2 py-1 rounded-full text-xs`}>{post.status}</div>
			</div>

			{/* Platform Icons */}
			<div className="flex gap-2 mt-2">
				{post.platforms.map((platform) => (
					<span key={platform} className="text-sm">
						{platformIcons[platform]}
					</span>
				))}
			</div>
		</div>
	);
}
