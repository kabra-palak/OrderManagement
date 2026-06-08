import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[72vh] text-center px-4 py-16 overflow-hidden">

      {/* Badge */}
      <span className="relative z-10 text-[0.7rem] font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded-full mb-6">
        Order Management System
      </span>

      {/* Heading */}
      <h1 className="relative z-10 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900 mb-5">
        Manage orders<br />
        <span className="text-indigo-600">across every store</span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-lg text-gray-500 max-w-sm mb-10">
        Centralize, track, and fulfill orders with precision.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex items-center gap-4">
        <Link
          href="/create-order"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <span className="text-base leading-none">+</span> Create Order
        </Link>
        <Link
          href="/orders"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-300 bg-white px-6 py-2.5 rounded-lg transition-colors"
        >
          View Orders <span>→</span>
        </Link>
      </div>

    </div>
  );
}