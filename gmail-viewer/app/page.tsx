// app/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from './lib/auth';
import EmailList from './components/email-list';
import ComposeEmail from './components/compose-email';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Link
          href="/api/auth/signin"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gmail Client</h1>
        <Link
          href="/api/auth/signout"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Compose Email</h2>
          <ComposeEmail />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Emails</h2>
          <EmailList />
        </div>
      </div>
    </div>
  );
}