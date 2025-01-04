'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
	{ href: '/dashboard', label: 'Overview' },
	{ href: '/dashboard/posts', label: 'Posts' },
	{ href: '/dashboard/calendar', label: 'Calendar' },
	{ href: '/dashboard/settings', label: 'Settings' },
];

export default function DashboardNav() {
	const pathname = usePathname();

	return (
		<nav className="bg-white shadow">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link href="/dashboard" className="text-xl font-bold text-gray-800">
								Cheddar
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`${
										pathname === item.href ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
									} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
					<div className="flex items-center">
						<button
							onClick={() => signOut({ callbackUrl: '/' })}
							className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
