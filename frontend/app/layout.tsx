"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <QueryClientProvider client={queryClient}>
          <nav className="bg-white shadow px-6 py-4 flex gap-6">
            <a href="/" className="font-bold text-xl text-indigo-600">OrderMS</a>
            <a href="/create-order" className="text-gray-600 hover:text-indigo-600">Create Order</a>
            <a href="/orders" className="text-gray-600 hover:text-indigo-600">Orders</a>
          </nav>
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}