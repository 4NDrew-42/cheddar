import { useQuery } from '@tanstack/react-query';
import { Post } from '../models/Post';

const API_BASE = '/api/posts';

// Fetch posts with caching
export function usePosts(date: Date) {
	const start = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
	const end = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();

	return useQuery<Post[]>({
		queryKey: ['posts', date.getFullYear(), date.getMonth()],
		queryFn: async () => {
			const res = await fetch(`${API_BASE}?start=${start}&end=${end}`);
			if (!res.ok) throw new Error('Failed to fetch posts');
			return res.json();
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
		retry: 2,
	});
}

// Paginated posts with cursor
export function usePaginatedPosts(cursor?: string) {
	return useQuery<{ posts: Post[]; nextCursor?: string }>({
		queryKey: ['posts', cursor],
		queryFn: async () => {
			const url = cursor ? `${API_BASE}?cursor=${cursor}` : API_BASE;
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch posts');
			return res.json();
		},
		keepPreviousData: true,
	});
}

// Error handling utilities
export function handleApiError(error: unknown) {
	if (error instanceof Error) {
		return {
			message: error.message,
			status: 500,
		};
	}
	return {
		message: 'An unexpected error occurred',
		status: 500,
	};
}
