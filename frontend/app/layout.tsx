"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <QueryClientProvider client={queryClient}>
          <nav className="bg-white border-b border-gray-100 px-8 h-14 flex items-center gap-8 sticky top-0 z-50">
            <Link href="/" className="font-bold text-base text-indigo-600 tracking-tight mr-auto">
              OrderMS
            </Link>
            <Link href="/create-order" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
              Create Order
            </Link>
            <Link href="/orders" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
              Orders
            </Link>
          </nav>
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}