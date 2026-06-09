"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import "@/lib/socket";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <QueryClientProvider client={queryClient}>
<nav className="bg-slate-900 border-b border-slate-800 px-6 h-14 flex items-center">
  {/* Brand */}
  <Link href="/" className="flex items-center gap-2 mr-auto">
    <span className="text-sm font-bold tracking-tight text-white">
      Order<span className="text-blue-400">MS</span>
    </span>
  </Link>

  {/* Nav links */}
  <div className="flex items-center gap-8 mr-4">
    <Link
      href="/create-order"
      className="text-sm font-semibold text-slate-200 hover:text-white transition-colors"
    >
      Create Order
    </Link>

    <Link
      href="/orders"
      className="text-sm font-semibold text-slate-200 hover:text-white transition-colors"
    >
      Orders
    </Link>

    <Link
      href="/analytics"
      className="text-sm font-semibold text-slate-200 hover:text-white transition-colors"
    >
      Analytics
    </Link>
  </div>
</nav>

          <main className="max-w-6xl mx-auto px-6 py-6">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}