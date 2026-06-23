import Icon from './Icon'

const steps = [
  { icon: 'seat', title: 'Select Seat', text: 'Choose any available seat from the layout' },
  { icon: 'lock', title: 'Book Instantly', text: 'Your seat is secured safely' },
  { icon: 'party', title: 'Enjoy the Show', text: 'Get ready for an amazing experience!' },
]

function Stat({ value, label, tone }) {
  return <div className="rounded-xl border border-line bg-white/[.025] px-3 py-5 text-center"><p className={`text-3xl font-extrabold ${tone}`}>{value}</p><p className="mt-1 text-xs text-slate-300">{label}</p></div>
}

export default function BookingPanel({ stats, selectedSeat, onContinue }) {
  return (
    <aside className="grid gap-4 md:grid-cols-2 xl:sticky xl:top-5 xl:grid-cols-1">
      <section className="rounded-2xl border border-line bg-gradient-to-b from-[#10171d] to-[#0b1115] p-5 shadow-xl shadow-black/20">
        <h2 className="text-lg font-bold">Booking Summary</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat value={stats.available} label="Available" tone="text-green-400" />
          <Stat value={stats.booked} label="Booked" tone="text-brand" />
        </div>
        <div className="mt-5 min-h-52 rounded-xl border border-dashed border-slate-700/70 bg-black/10 p-5">
          {selectedSeat ? (
            <div className="flex h-full min-h-42 flex-col items-center justify-center text-center">
              <span className={`grid h-14 w-14 place-items-center rounded-xl border ${selectedSeat.is_booked ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-green-500/50 bg-green-500/10 text-green-400'}`}><Icon name="ticket" className="h-7 w-7" /></span>
              <p className="mt-4 text-2xl font-extrabold">Seat {selectedSeat.seat_number}</p>
              <p className="mt-1 text-sm text-slate-400">{selectedSeat.is_booked ? 'Currently booked' : 'Ready to reserve'}</p>
              <button type="button" onClick={onContinue} className="mt-5 w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-[#ff5b70]">Review {selectedSeat.is_booked ? 'cancellation' : 'booking'}</button>
            </div>
          ) : (
            <div className="flex h-full min-h-42 flex-col items-center justify-center text-center">
              <Icon name="ticket" className="h-10 w-10 rotate-[-10deg] text-slate-500" />
              <p className="mt-4 font-semibold">No seat selected</p>
              <p className="mt-2 max-w-48 text-sm leading-6 text-slate-400">Click any seat to review its booking status.</p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-gradient-to-b from-[#10171d] to-[#0b1115] p-5 shadow-xl shadow-black/20">
        <h2 className="text-lg font-bold">How it works</h2>
        <div className="mt-5 space-y-5">
          {steps.map((step) => <div key={step.title} className="flex gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-green-500/[.07] text-green-400"><Icon name={step.icon} className="h-7 w-7" /></span><div><h3 className="text-sm font-semibold">{step.title}</h3><p className="mt-1 text-sm leading-5 text-slate-400">{step.text}</p></div></div>)}
        </div>
      </section>
    </aside>
  )
}
