// app/components/email-list.tsx
"use client";

import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { EmailMessage } from "../types";

export default function EmailList() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmails() {
      setLoading(true);
      setError(null);

      try {
        const currentSession = await getSession();
        if (!currentSession?.accessToken) {
          throw new Error("No access token available.");
        }

        const response = await fetch("/api/emails", {
          headers: {
            Authorization: `Bearer ${currentSession.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setEmails(data);
      } catch (error: any) {
        console.error("Failed to fetch emails:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchEmails();
    }
  }, [session]);

  if (loading) return <div>Loading emails...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <div key={email.id} className="border p-4 rounded-lg">
          <div className="flex justify-between">
            <h3 className="font-semibold">{email.subject}</h3>
            <span className="text-sm text-gray-500">{email.date}</span>
          </div>
          <p className="text-sm text-gray-600">{email.from}</p>
          <p className="mt-2">{email.body}</p>
        </div>
      ))}
    </div>
  );
}
