// app/components/email-list.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchEmails } from "../lib/gmail";
import type { EmailMessage } from "../types";

export function EmailList() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getEmails() {
      if (session?.accessToken) {
        setLoading(true);
        try {
          const emailData = await fetchEmails(session.accessToken as string);
          setEmails(emailData);
        } catch (err) {
          setError("Failed to fetch emails");
        } finally {
          setLoading(false);
        }
      }
    }

    getEmails();
  }, [session]);

  if (loading) return <div>Loading emails...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <div
          key={email.id}
          className="rounded-lg border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <h2 className="font-semibold">{email.subject}</h2>
            <span className="text-sm text-gray-500">{email.date}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{email.from}</p>
          <p className="mt-2 text-gray-700">{email.snippet}</p>
        </div>
      ))}
    </div>
  );
}
