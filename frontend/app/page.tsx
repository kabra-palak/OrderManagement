import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-gray-50">

      {/* Subtle background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100 rounded-full blur-2xl opacity-50 pointer-events-none" />

      {/* Badge */}
      <span className="relative z-10 text-[0.65rem] font-semibold tracking-widest uppercase text-blue-700 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-6">
        Order Management System
      </span>

      {/* Heading */}
      <h1 className="relative z-10 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900 mb-5 text-center">
        Manage orders<br />
        <span className="text-blue-600">across every store</span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-lg text-gray-500 max-w-md text-center mb-10">
        Centralize, track, and fulfill orders with precision — in real time.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 mb-16">
        <Link
          href="/create-order"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          <span className="text-base leading-none">+</span> Create Order
        </Link>
        <Link
          href="/orders"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 bg-white px-6 py-2.5 rounded-lg transition-colors"
        >
          View Orders <span>→</span>
        </Link>
        <Link
          href="/analytics"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 bg-white px-6 py-2.5 rounded-lg transition-colors"
        >
          Analytics <span>↗</span>
        </Link>
      </div>

      {/* Feature cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0 0 11.25 11h-1.5A2.25 2.25 0 0 0 7.5 13.5V21m0 0H4.5A2.25 2.25 0 0 1 2.25 18.75V9a2.25 2.25 0 0 1 .659-1.591l7.5-7.5a2.25 2.25 0 0 1 3.182 0l7.5 7.5A2.25 2.25 0 0 1 21.75 9v9.75A2.25 2.25 0 0 1 19.5 21H13.5Z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Multi-Store</h3>
          <p className="text-xs text-gray-500 leading-relaxed">Manage orders from multiple stores in one place.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Real-Time Updates</h3>
          <p className="text-xs text-gray-500 leading-relaxed">Status changes reflect instantly via WebSockets.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Analytics</h3>
          <p className="text-xs text-gray-500 leading-relaxed">Track revenue, top items, and daily order trends.</p>
        </div>
      </div>

    </div>
  );
}