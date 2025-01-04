import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignInForm from '../../../components/auth/SignInForm';
import { authOptions } from '../../../lib/auth';

export default async function SignInPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const session = await getServerSession(authOptions);

	// If user is already signed in, redirect to dashboard
	if (session) {
		redirect('/dashboard');
	}

	// Await searchParams before accessing its properties
	const params = await Promise.resolve(searchParams);
	const signupSuccess = params?.success === 'true';
	const callbackUrl = typeof params?.callbackUrl === 'string' ? params.callbackUrl : '/dashboard';

	return <SignInForm signupSuccess={signupSuccess} callbackUrl={callbackUrl} />;
}
