const paths = {
  seat: <><path d="M6 11V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4"/><path d="M5 11a2 2 0 0 0-2 2v3a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-3a2 2 0 0 0-2-2v5H5Z"/><path d="M7 19v2m10-2v2"/></>,
  calendar: <><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
  ticket: <><path d="M2 9a3 3 0 0 0 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 0 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2m0 4v2m0 4v2"/></>,
  lock: <><rect width="16" height="12" x="4" y="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/></>,
  party: <><path d="m2 22 5.5-5.5M14 2l.5 2.5L17 5l-2.5.5L14 8l-.5-2.5L11 5l2.5-.5ZM19 9l.35 1.65L21 11l-1.65.35L19 13l-.35-1.65L17 11l1.65-.35Z"/><path d="M4.93 19.07 8.5 8.5l7 7-10.57 3.57Z"/><path d="M8.5 8.5c1.2 1.2 1.2 3.1 0 4.3m3.5-1c1.2 1.2 1.2 3.1 0 4.3"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  alert: <><circle cx="12" cy="12" r="9"/><path d="M12 8v5m0 3h.01"/></>,
  refresh: <><path d="M20 7v5h-5"/><path d="M4 17a8 8 0 0 1 13.7-5.6L20 12M4 12a8 8 0 0 0 13.7 5.6"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}
