  // app/api/send-email/route.ts
  import { NextResponse } from 'next/server';
  import { getServerSession } from 'next-auth/next';
  import { authOptions } from '@/app/lib/auth';
  import { sendEmail } from '@/app/lib/gmail';

  export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const emailData = await request.json();
      const result = await sendEmail(session.accessToken as string, emailData);
      return NextResponse.json(result);
    } catch (error) {
      console.error('Failed to send email:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  }