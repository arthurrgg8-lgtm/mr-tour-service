export default function PaymentNotice() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_42%)]"
      />

      <section className="relative w-full max-w-2xl rounded-3xl border border-amber-400/20 bg-slate-900/80 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur sm:p-12">
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/10">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8 text-amber-300"
          >
            <path
              d="M12 8v5m0 3.5v.01M10.3 3.8 2.4 17.4A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.6L13.7 3.8a2 2 0 0 0-3.4 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
          Service notice
        </p>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Website temporarily unavailable
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
          This website is temporarily unavailable while an outstanding
          development account is being settled. Full service will be restored
          promptly once the administrative matter is resolved.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
          <p className="font-sans text-sm font-semibold text-slate-200">
            Site owner notice
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Please contact your development provider to complete the outstanding
            settlement and restore access.
          </p>
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-slate-500">
          Thank you for your understanding
        </p>
      </section>
    </main>
  )
}
