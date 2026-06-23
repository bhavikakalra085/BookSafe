import Seat from './Seat'

const ROWS = 'ABCDEFGHIJ'.split('')
const SEATS_PER_ROW = 16

const normalizeSeatNumber = (value) => String(value || '').trim().toUpperCase()

function Stage() {
  return (
    <div className="relative h-40 overflow-hidden border-b border-line/70 bg-[radial-gradient(ellipse_at_center_top,rgba(42,53,69,.85),transparent_62%)] sm:h-44">
      <div className="absolute inset-x-[8%] top-0 h-28 bg-[repeating-linear-gradient(90deg,rgba(116,18,32,.22)_0_16px,rgba(30,8,12,.1)_16px_30px)] [clip-path:polygon(0_0,35%_0,30%_100%,0_100%,70%_100%,65%_0,100%_0,100%_100%)]" />
      <div className="absolute left-[13%] top-5 h-28 w-6 rotate-[25deg] bg-gradient-to-b from-red-400/70 via-red-500/20 to-transparent blur-sm" />
      <div className="absolute right-[13%] top-5 h-28 w-6 -rotate-[25deg] bg-gradient-to-b from-red-400/70 via-red-500/20 to-transparent blur-sm" />
      <p className="relative pt-12 text-center text-3xl font-extrabold tracking-[.08em] text-slate-300 drop-shadow-lg sm:text-4xl">STAGE</p>
      <div className="absolute inset-x-[20%] bottom-8 h-12 rounded-[50%] border-b-[3px] border-brand shadow-[0_8px_25px_rgba(255,66,91,.45)]" />
    </div>
  )
}

function LegendItem({ color, label }) {
  return <div className="flex items-center gap-2.5"><span className={`h-5 w-5 rounded-md border ${color}`} /><span className="text-xs text-slate-400 sm:text-sm">{label}</span></div>
}

export default function SeatMap({ seats, selectedSeat, onSelect }) {
  const seatLookup = new Map(seats.map((seat) => [normalizeSeatNumber(seat.seat_number), seat]))
  console.log('SeatMap loaded', { seatsLength: seats.length, seatLookupSize: seatLookup.size, sampleKeys: [...seatLookup.keys()].slice(0, 10) })

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-[#0a1014] shadow-2xl shadow-black/25" aria-label="Concert seating plan">
      <Stage />
      <div className="scrollbar-subtle overflow-x-auto px-4 pb-6 pt-5 sm:px-6">
        <div className="mx-auto w-max min-w-[934px]">
          <p className="mb-3 text-center text-xs font-bold tracking-[.16em] text-slate-500">FRONT</p>
          <div className="space-y-2.5">
            {ROWS.map((row) => (
              <div key={row} className="grid grid-cols-[26px_repeat(8,52px)_18px_repeat(8,52px)_26px] items-center gap-2">
                <span className="text-center text-sm font-medium text-slate-500">{row}</span>
                {Array.from({ length: SEATS_PER_ROW }, (_, index) => {
                  const label = `${row}${index + 1}`
                  const seat = seatLookup.get(label)
                  return (
                    <div key={label} className={index === 8 ? 'col-start-11' : ''}>
                      <Seat seat={seat} label={label} isSelected={selectedSeat?.id === seat?.id} onSelect={onSelect} />
                    </div>
                  )
                })}
                <span className="text-center text-sm font-medium text-slate-500">{row}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs font-bold tracking-[.16em] text-slate-500">BACK</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-line px-4 py-5">
        <LegendItem color="border-green-500/60 bg-green-800/60" label="Available" />
        <LegendItem color="border-red-500/80 bg-red-800/70" label="Booked" />
        <LegendItem color="border-slate-600 bg-slate-600/40" label="Unavailable" />
      </div>
    </section>
  )
}
