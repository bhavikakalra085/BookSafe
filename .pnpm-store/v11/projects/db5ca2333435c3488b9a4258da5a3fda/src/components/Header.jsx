import Icon from './Icon'

export default function Header({ eventName }) {
  return (
    <header className="flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-line bg-[#0b1014]/90 px-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
          <Icon name="seat" className="h-7 w-7" strokeWidth={2.1} />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold tracking-tight text-brand sm:text-2xl">BookSafe</h1>
          <p className="truncate text-xs text-slate-400 sm:text-sm">Premium Seat Reservation</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 sm:flex">
          <Icon name="calendar" className="h-6 w-6 text-slate-300" />
          <div>
            <p className="max-w-48 truncate text-sm font-semibold text-white">{eventName}</p>
            <p className="mt-0.5 text-xs text-slate-400">Chandigarh Arena</p>
          </div>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
          <Icon name="ticket" className="h-6 w-6" />
        </div>
      </div>
    </header>
  )
}
