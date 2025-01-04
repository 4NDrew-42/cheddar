'use client';

import { useInfiniteQuery, type InfiniteData, type UseInfiniteQueryResult } from '@tanstack/react-query';
import { IPost } from '../models/Post';
import PostPreview from './calendar/PostPreview';
import { useCallback, useRef } from 'react';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';

interface PaginatedPostsProps {
	initialPosts: IPost[];
	loadMore: (cursor?: string) => Promise<IPost[]>;
}

interface PostsResponse {
	posts: IPost[];
	nextCursor?: string;
}

const observerCallback = (
	entries: IntersectionObserverEntry[],
	hasNextPage: boolean,
	isFetchingNextPage: boolean,
	fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<PostsResponse>>>
) => {
	if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
		void fetchNextPage({ cancelRefetch: false });
	}
};

export default function PaginatedPosts({ initialPosts, loadMore }: PaginatedPostsProps) {
	const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<PostsResponse>({
		queryKey: ['posts'],
		queryFn: async ({ pageParam = '' }) => {
			const posts = await loadMore(pageParam as string);
			return { posts, nextCursor: posts[posts.length - 1]?.id };
		},
		initialData: {
			pages: [{ posts: initialPosts }],
			pageParams: [''],
		},
		initialPageParam: '',
		getNextPageParam: (lastPage: PostsResponse) => lastPage.nextCursor,
	});

	const observer = useRef<IntersectionObserver>();
	const lastPostRef = useCallback(
		(node: HTMLElement | null) => {
			if (isFetchingNextPage) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => observerCallback(entries, hasNextPage, isFetchingNextPage, fetchNextPage), {
				root: null,
				rootMargin: '0px',
				threshold: 0.1,
			});

			if (node) observer.current.observe(node);
		},
		[fetchNextPage, hasNextPage, isFetchingNextPage]
	);

	if (status === 'pending') return <div>Loading...</div>;
	if (error) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;

	return (
		<div className="space-y-4">
			{data?.pages.map((page: PostsResponse, i: number) => (
				<div key={i} className="space-y-4">
					{page.posts.map((post: IPost, index: number) => (
						<div key={post.id} ref={index === page.posts.length - 1 ? lastPostRef : null}>
							<PostPreview post={post} />
						</div>
					))}
				</div>
			))}

			{isFetchingNextPage && <div>Loading more...</div>}
		</div>
	);
}
