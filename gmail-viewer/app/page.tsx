import { AuthButton } from "./components/auth-button";
import { EmailList } from "./components/email-list";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gmail Inbox</h1>
        <AuthButton />
      </div>
      <EmailList />
    </div>
  );
}