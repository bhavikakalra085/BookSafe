import { useEffect } from 'react'
import Icon from './Icon'

export default function Modal({ isOpen, seat, isSubmitting, onClose, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !seat) return null
  const isCancellation = Boolean(seat.is_booked)

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="animate-modal-in w-full max-w-md rounded-2xl border border-line bg-[#10171d] p-6 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-4">
          <span className={`grid h-12 w-12 place-items-center rounded-xl ${isCancellation ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}><Icon name={isCancellation ? 'alert' : 'ticket'} className="h-6 w-6" /></span>
          <button type="button" aria-label="Close dialog" disabled={isSubmitting} onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-40"><Icon name="close" /></button>
        </div>
        <h2 id="modal-title" className="mt-5 text-2xl font-extrabold">{isCancellation ? 'Cancel this booking?' : 'Confirm your seat'}</h2>
        <p className="mt-2 leading-6 text-slate-400">{isCancellation ? `Seat ${seat.seat_number} will become available for other guests.` : `You’re about to reserve seat ${seat.seat_number} for ${seat.event_name || 'Concert Night'}.`}</p>
        <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-black/15 p-4"><span className="text-sm text-slate-400">Selected seat</span><span className="text-lg font-extrabold">{seat.seat_number}</span></div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" disabled={isSubmitting} onClick={onClose} className="rounded-xl border border-slate-600 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/5 disabled:opacity-40">Keep browsing</button>
          <button type="button" disabled={isSubmitting} onClick={onConfirm} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition disabled:cursor-wait disabled:opacity-70 ${isCancellation ? 'bg-red-600 hover:bg-red-500' : 'bg-brand hover:bg-[#ff5b70]'}`}>
            {isSubmitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
            {isSubmitting ? 'Processing…' : isCancellation ? 'Cancel booking' : 'Book this seat'}
          </button>
        </div>
        {!isCancellation && <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500"><Icon name="lock" className="h-4 w-4" />Secured by transactional seat locking</p>}
      </div>
    </div>
  )
}
