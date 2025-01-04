import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignUpForm from '@/components/auth/SignUpForm';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  // If user is already signed in, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return <SignUpForm />;
}