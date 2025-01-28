  // app/lib/gmail.ts
  import { EmailMessage } from "../types";
  
  export async function fetchEmails(accessToken: string): Promise<EmailMessage[]> {
    try {
      const response = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const data = await response.json();
      const messages = await Promise.all(
        data.messages.map(async (message: { id: string }) => {
          const messageResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const messageData = await messageResponse.json();
          
          const headers = messageData.payload.headers;
          const subject = headers.find((h: any) => h.name === "Subject")?.value || "No Subject";
          const from = headers.find((h: any) => h.name === "From")?.value || "Unknown";
          const date = headers.find((h: any) => h.name === "Date")?.value || "";
  
          return {
            id: messageData.id,
            snippet: messageData.snippet,
            subject,
            from,
            date: new Date(date).toLocaleDateString(),
          };
        })
      );
  
      return messages;
    } catch (error) {
      console.error("Error fetching emails:", error);
      throw error;
    }
  }