// src/pages/auth/signin.tsx
import { getCsrfToken } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import React from 'react';

interface SignInProps {
	csrfToken: string;
}

const SignIn: React.FC<SignInProps> = ({ csrfToken }) => {
	return (
		<div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
			<h1>Sign In</h1>
			<form method="post" action="/api/auth/callback/credentials">
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<div style={{ marginBottom: '1rem' }}>
					<label htmlFor="email">Email</label>
					<input id="email" name="email" type="email" required style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
				</div>
				<div style={{ marginBottom: '1rem' }}>
					<label htmlFor="password">Password</label>
					<input id="password" name="password" type="password" required style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
				</div>
				<button type="submit" style={{ padding: '0.5rem 1rem' }}>
					Sign In
				</button>
			</form>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
};

export default SignIn;
