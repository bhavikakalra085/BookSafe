import Icon from './Icon'

export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed inset-x-3 top-4 z-50 flex flex-col items-end gap-2 sm:left-auto sm:right-5 sm:w-96" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`pointer-events-auto animate-toast-in flex w-full items-start gap-3 rounded-xl border bg-[#11191f] p-4 shadow-2xl ${toast.type === 'error' ? 'border-red-500/40' : 'border-green-500/40'}`}>
          <span className={toast.type === 'error' ? 'text-red-400' : 'text-green-400'}><Icon name={toast.type === 'error' ? 'alert' : 'check'} /></span>
          <p className="flex-1 text-sm font-medium leading-5 text-slate-100">{toast.message}</p>
          <button type="button" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)} className="text-slate-500 transition hover:text-white"><Icon name="close" className="h-4 w-4" /></button>
        </div>
      ))}
    </div>
  )
}
