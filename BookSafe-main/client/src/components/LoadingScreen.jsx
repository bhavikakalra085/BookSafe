export default function LoadingScreen() {
  return (
    <main className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]" aria-label="Loading seats" aria-busy="true">
      <div className="overflow-hidden rounded-2xl border border-line bg-[#0a1014]">
        <div className="relative h-44 overflow-hidden bg-slate-800/20 after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/[.04] after:to-transparent" />
        <div className="grid grid-cols-8 gap-3 p-8 sm:grid-cols-12 lg:grid-cols-16">{Array.from({ length: 80 }, (_, i) => <span key={i} className="h-10 animate-pulse rounded-lg bg-slate-700/25" />)}</div>
      </div>
      <div className="h-80 animate-pulse rounded-2xl border border-line bg-slate-800/20" />
    </main>
  )
}
