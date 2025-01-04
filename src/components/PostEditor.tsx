 'use client';

import { useState, useEffect } from 'react';
import type { IPost } from '../models/Post';
import { getUserTimeZone, toUserTimeZone } from '../lib/utils/dateUtils';

interface PostEditorProps {
	post?: IPost;
	onSave: (post: Partial<IPost>) => Promise<void>;
}

export default function PostEditor({ post, onSave }: PostEditorProps) {
	const [formData, setFormData] = useState<Partial<IPost>>({
		title: post?.title || '',
		content: post?.content || '',
		platforms: post?.platforms || [],
		date: post?.date || new Date(),
		scheduledAt: post?.scheduledAt || new Date(),
		timeZone: post?.timeZone || getUserTimeZone(),
		status: post?.status || 'draft',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSave(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium mb-1">Title</label>
				<input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" required />
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Content</label>
				<textarea
					value={formData.content}
					onChange={(e) => setFormData({ ...formData, content: e.target.value })}
					className="w-full p-2 border rounded"
					rows={4}
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Platforms</label>
				<div className="space-y-2">
					{['twitter', 'linkedin', 'facebook'].map((platform) => (
						<label key={platform} className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={formData.platforms?.includes(platform as 'twitter' | 'linkedin' | 'facebook')}
								onChange={(e) => {
									const platforms = formData.platforms || [];
									const updatedPlatforms = e.target.checked
										? [...platforms, platform as 'twitter' | 'linkedin' | 'facebook']
										: platforms.filter(p => p !== platform);
									setFormData({ ...formData, platforms: updatedPlatforms });
								}}
							/>
							<span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
						</label>
					))}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Date</label>
				<input
					type="datetime-local"
					value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
					onChange={(e) => {
						const localDate = new Date(e.target.value);
						const utcDate = toUserTimeZone(localDate, formData.timeZone || getUserTimeZone());
						setFormData({ ...formData, date: utcDate });
					}}
					className="w-full p-2 border rounded"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Status</label>
				<select
					value={formData.status}
					onChange={(e) => setFormData({ ...formData, status: e.target.value as IPost['status'] })}
					className="w-full p-2 border rounded"
				>
					<option value="draft">Draft</option>
					<option value="scheduled">Scheduled</option>
					<option value="published">Published</option>
					<option value="failed">Failed</option>
				</select>
			</div>

			<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
				{post ? 'Update Post' : 'Create Post'}
			</button>
		</form>
	);
}
