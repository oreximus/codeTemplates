// app/components/auth-button.tsx
  "use client";
  
  import { signIn, signOut, useSession } from "next-auth/react";
  
  export function AuthButton() {
    const { data: session } = useSession();
  
    if (session) {
      return (
        <button
          onClick={() => signOut()}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Sign Out
        </button>
      );
    }
  
    return (
      <button
        onClick={() => signIn("google")}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    );
  }