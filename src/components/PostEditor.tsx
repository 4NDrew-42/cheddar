'use client';

import { useState } from 'react';
import type { Post } from '../models/Post';

interface PostEditorProps {
	post?: Post;
	onSave: (post: Partial<Post>) => Promise<void>;
}

export default function PostEditor({ post, onSave }: PostEditorProps) {
	const [formData, setFormData] = useState<Partial<Post>>({
		title: post?.title || '',
		copy: post?.copy || '',
		mediaUrl: post?.mediaUrl || '',
		mediaType: post?.mediaType || 'image',
		platform: post?.platform || [],
		date: post?.date || new Date(),
		status: post?.status || 'Draft',
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
				<textarea value={formData.copy} onChange={(e) => setFormData({ ...formData, copy: e.target.value })} className="w-full p-2 border rounded" rows={4} />
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Media URL</label>
				<input type="url" value={formData.mediaUrl} onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })} className="w-full p-2 border rounded" />
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Media Type</label>
				<select value={formData.mediaType} onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })} className="w-full p-2 border rounded">
					<option value="image">Image</option>
					<option value="video">Video</option>
				</select>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Platforms</label>
				<input
					type="text"
					value={formData.platform?.join(', ')}
					onChange={(e) => setFormData({ ...formData, platform: e.target.value.split(',').map((p) => p.trim()) })}
					className="w-full p-2 border rounded"
					placeholder="Comma separated platforms"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Date</label>
				<input
					type="datetime-local"
					value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
					onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
					className="w-full p-2 border rounded"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Status</label>
				<select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full p-2 border rounded">
					<option value="Draft">Draft</option>
					<option value="Scheduled">Scheduled</option>
					<option value="Published">Published</option>
				</select>
			</div>

			<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
				{post ? 'Update Post' : 'Create Post'}
			</button>
		</form>
	);
}
