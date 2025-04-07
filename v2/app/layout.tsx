import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/inter';
import SplitLayout from "@/components/SplitLayout";
import ChatInterface from "@/components/ChatInterface";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajeeth's Personal Site",
  description: "Personal site and AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <SplitLayout
          leftContent={
            <div className="max-w-3xl px-20 py-20 prose notion">
              {children}
            </div>
          }
          rightContent={
            <div className="h-full flex flex-col">
              <div className="p-10">
                <div className="mb-6">
                  <h1 className="text-[24px] font-semibold text-notion mb-3">Personal Assistant</h1>
                  <p className="text-[16px] leading-[1.6] text-notion-gray">
                    Ask me anything about my professional experience, skills, and background.
                  </p>
                </div>
                <div className="h-[calc(100vh-14rem)]">
                  <ChatInterface />
                </div>
              </div>
            </div>
          }
        />
      </body>
    </html>
  );
}
