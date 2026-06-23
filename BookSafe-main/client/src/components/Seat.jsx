export default function Seat({ seat, label, isSelected, onSelect }) {
  const unavailable = !seat
  const booked = Boolean(seat?.is_booked)
  const stateClasses = unavailable
    ? 'cursor-not-allowed border-slate-600/60 bg-slate-500/20 text-slate-500'
    : booked
      ? 'border-red-500/80 bg-gradient-to-b from-red-700/60 to-red-950/70 text-red-50 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] hover:-translate-y-0.5 hover:border-red-400'
      : 'border-green-500/60 bg-gradient-to-b from-green-800/50 to-green-950/70 text-green-50 shadow-[0_0_14px_rgba(34,197,94,.05),inset_0_1px_0_rgba(255,255,255,.08)] hover:-translate-y-0.5 hover:border-green-400 hover:bg-green-800/70 hover:shadow-[0_5px_20px_rgba(34,197,94,.14)]'

  return (
    <button
      type="button"
      aria-label={`${label}${unavailable ? ', unavailable' : booked ? ', booked' : ', available'}`}
      aria-pressed={isSelected}
      disabled={unavailable}
      onClick={() => seat && onSelect(seat)}
      className={`h-10 w-12 rounded-lg border text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-[52px] ${stateClasses} ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-ink' : ''}`}
    >
      {label}
    </button>
  )
}
