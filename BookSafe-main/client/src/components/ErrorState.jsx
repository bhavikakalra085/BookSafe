import Icon from './Icon'

export default function ErrorState({ message, empty = false, onRetry }) {
  return (
    <main className="mt-5 grid min-h-[65vh] place-items-center rounded-2xl border border-line bg-[#0b1115] px-5 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand"><Icon name={empty ? 'seat' : 'alert'} className="h-8 w-8" /></span>
        <h2 className="mt-5 text-2xl font-extrabold">{empty ? 'The house is still empty' : 'The curtain is stuck'}</h2>
        <p className="mt-2 leading-6 text-slate-400">{empty ? 'No seats have been added for this event yet.' : message}</p>
        <button type="button" onClick={onRetry} className="mx-auto mt-6 flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ff5b70]"><Icon name="refresh" className="h-4 w-4" />Try again</button>
      </div>
    </main>
  )
}
