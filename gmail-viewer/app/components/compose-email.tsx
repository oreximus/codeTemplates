// app/components/compose-email.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { SendEmailData } from '../types';

export default function ComposeEmail() {
  const { data: session } = useSession();
  const [emailData, setEmailData] = useState<SendEmailData>({
    to: '',
    subject: '',
    body: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) return;

    setStatus('sending');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) throw new Error('Failed to send email');
      
      setStatus('success');
      setEmailData({ to: '', subject: '', body: '' });
    } catch (error) {
      setStatus('error');
      console.error('Error sending email:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">To:</label>
        <input
          type="email"
          required
          className="w-full p-2 border rounded"
          value={emailData.to}
          onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Subject:</label>
        <input
          type="text"
          required
          className="w-full p-2 border rounded"
          value={emailData.subject}
          onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message:</label>
        <textarea
          required
          className="w-full p-2 border rounded h-32"
          value={emailData.body}
          onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {status === 'sending' ? 'Sending...' : 'Send Email'}
      </button>

      {status === 'success' && (
        <div className="text-green-500">Email sent successfully!</div>
      )}
      {status === 'error' && (
        <div className="text-red-500">Failed to send email. Please try again.</div>
      )}
    </form>
  );
}