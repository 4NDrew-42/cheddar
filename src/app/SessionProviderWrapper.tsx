'use client';

import { SessionProvider } from 'next-auth/react';
import { config } from '../lib/config';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="p-4 text-center">
				<h2 className="text-lg font-semibold text-red-600">Something went wrong</h2>
				<p className="mt-2 text-gray-600">{error.message}</p>
				<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => window.location.reload()}>
					Try again
				</button>
			</div>
		</div>
	);
}

export default function SessionProviderWrapper({ children }: PropsWithChildren) {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<SessionProvider basePath={`${config.baseUrl}/api/auth`} refetchInterval={0} refetchOnWindowFocus={false}>
				{children}
			</SessionProvider>
		</ErrorBoundary>
	);
}
