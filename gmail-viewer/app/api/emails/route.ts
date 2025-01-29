// app/api/emails/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import { listEmails } from '@/app/lib/gmail';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const emails = await listEmails(session.accessToken as string);
    return NextResponse.json(emails);
  } catch (error) {
    console.error('Failed to fetch emails:', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}