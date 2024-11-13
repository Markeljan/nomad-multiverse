"use client";
import { useSignerStatus } from "@account-kit/react";
import { WelcomeDialog } from "@/components/home/WelcomeDialog";
import { MintSection } from "@/components/home/MintSection";

export default function Home() {
  const { isAuthenticating, isInitializing, isConnected } = useSignerStatus();
  const isLoading = isAuthenticating || isInitializing;

  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center p-24 gap-4 justify-center text-center">
      {isLoading ? (
        <>Loading...</>
      ) : isConnected ? (
        <MintSection />
      ) : (
        <WelcomeDialog />
      )}
    </main>
  );
}
