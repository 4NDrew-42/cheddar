'use client';
import Link from 'next/link';

export default function HomePage() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
			<h1 className="text-3xl font-bold mb-4">Welcome to My Homepage</h1>
			<p className="text-center max-w-md mb-6 leading-relaxed">This is a custom landing page. Use it to introduce yourself, your product, or any other content you’d like your visitors to see first.</p>
			<div className="flex gap-4">
				<Link href="/calendar" className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
					Go to Calendar
				</Link>
				<Link href="https://nextjs.org/docs" target="_blank" className="py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400">
					Next.js Docs
				</Link>
			</div>
		</main>
	);
}
