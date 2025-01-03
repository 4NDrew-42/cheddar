'use client';

import { useSession } from 'next-auth/react';
import PostEditor from '../../components/PostEditor';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { Post } from '../../models/Post';

export default function CalendarPage() {
	const { data: session } = useSession();
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		if (session?.user) {
			fetch('/api/posts')
				.then((res) => res.json())
				.then((data) => setPosts(data));
		}
	}, [session]);

	if (!session) {
		return <div className="p-4">Please log in to view your calendar</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">My Content Calendar</h1>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<PostEditor
						onSave={async (post) => {
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
							}
						}}
					/>
				</div>
				<Calendar
					tileContent={({ date }) => {
						const postDates = posts.map((post) => new Date(post.date).toDateString());
						return postDates.includes(date.toDateString()) ? <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto"></div> : null;
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
