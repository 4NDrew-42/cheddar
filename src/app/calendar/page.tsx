'use client';
export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';
import PostEditor from '../../components/PostEditor';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { Post } from '../../models/Post';
import { useRouter } from 'next/navigation';

export default function CalendarPage() {
	const { data: session, status } = useSession();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
			return;
		}

		if (status === 'authenticated' && session?.user) {
			setLoading(true);
			fetch('/api/posts')
				.then((res) => res.json())
				.then((data) => setPosts(data))
				.catch((error) => console.error('Error fetching posts:', error))
				.finally(() => setLoading(false));
		}
	}, [status, session, router]);

	if (status === 'loading' || loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		return null; // Router will handle redirect
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">My Content Calendar</h1>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<PostEditor
						onSave={async (post) => {
							try {
								const response = await fetch('/api/posts', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify(post),
								});
								if (response.ok) {
									const newPost = await response.json();
									setPosts([...posts, newPost]);
								} else {
									console.error('Failed to create post:', await response.text());
								}
							} catch (error) {
								console.error('Error creating post:', error);
							}
						}}
					/>
				</div>
				<Calendar
					tileContent={({ date }) => {
						const postDates = posts.map((post) => new Date(post.date).toDateString());
						return postDates.includes(date.toDateString()) ? <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto" /> : null;
					}}
				/>
				<div>
					<h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
					<div className="space-y-4">
						{posts.map((post: Post & { _id: string }) => (
							<div key={post._id} className="p-4 border rounded-lg">
								<h3 className="font-medium">{post.title}</h3>
								<p className="text-sm text-gray-600">{new Date(post.date).toLocaleString()}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
