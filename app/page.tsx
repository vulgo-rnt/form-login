"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <button onClick={() => router.push("/login")}>Login</button>
      <button onClick={() => router.push("/create")}>Create Account</button>
    </main>
  );
}
