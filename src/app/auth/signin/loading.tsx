export default function SignInLoading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
					<div className="space-y-6">
						<div className="h-12 bg-gray-200 rounded"></div>
						<div className="h-12 bg-gray-200 rounded"></div>
						<div className="h-12 bg-gray-300 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
