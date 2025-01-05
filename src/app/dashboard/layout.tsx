import React from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashboardNav from '@components/dashboard/DashboardNav';
import { authOptions } from '../../lib/auth';

export const metadata: Metadata = {
	title: 'Dashboard - Cheddar',
	description: 'Manage your Cheddar account',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/auth/signin');
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<DashboardNav />
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">{children}</div>
			</main>
		</div>
	);
}
