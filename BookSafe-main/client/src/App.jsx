import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SeatMap from './components/SeatMap'
import BookingPanel from './components/BookingPanel'
import Modal from './components/Modal'
import ToastViewport from './components/ToastViewport'
import LoadingScreen from './components/LoadingScreen'
import ErrorState from './components/ErrorState'
import { bookSeat, cancelSeat, getSeats } from './services/seatApi'

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback

export default function App() {
  const [seats, setSeats] = useState([])
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, message, type }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 4200)
  }, [])

  const loadSeats = useCallback(async ({ quiet = false } = {}) => {
    if (!quiet) setIsLoading(true)
    setError('')
    try {
      const data = await getSeats()
      setSeats(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setError(getErrorMessage(requestError, 'We could not load the seating plan.'))
    } finally {
      if (!quiet) setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    getSeats()
      .then((data) => {
        if (active) setSeats(Array.isArray(data) ? data : [])
      })
      .catch((requestError) => {
        if (active) setError(getErrorMessage(requestError, 'We could not load the seating plan.'))
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const stats = useMemo(() => {
    const booked = seats.filter((seat) => Boolean(seat.is_booked)).length
    return { booked, available: seats.length - booked, total: seats.length }
  }, [seats])

  const closeModal = () => {
    if (!isSubmitting) setSelectedSeat(null)
  }

  const handleConfirm = async () => {
    if (!selectedSeat || isSubmitting) return
    const isCancellation = Boolean(selectedSeat.is_booked)
    setIsSubmitting(true)
    try {
      const response = isCancellation
        ? await cancelSeat(selectedSeat.id)
        : await bookSeat(selectedSeat.id)
      addToast(response.message || (isCancellation ? 'Booking cancelled.' : 'Seat booked successfully.'))
      setSelectedSeat(null)
    } catch (requestError) {
      addToast(getErrorMessage(requestError, 'Something went wrong. Please try again.'), 'error')
      setSelectedSeat(null)
    } finally {
      await loadSeats({ quiet: true })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen px-3 py-3 sm:px-5 sm:py-4 lg:px-7">
      <div className="mx-auto max-w-[1560px]">
        <Header eventName={seats[0]?.event_name || 'Concert Night'} />

        {isLoading ? (
          <LoadingScreen />
        ) : error ? (
          <ErrorState message={error} onRetry={() => loadSeats()} />
        ) : seats.length === 0 ? (
          <ErrorState empty onRetry={() => loadSeats()} />
        ) : (
          <main className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
            <SeatMap seats={seats} selectedSeat={selectedSeat} onSelect={setSelectedSeat} />
            <BookingPanel stats={stats} selectedSeat={selectedSeat} onContinue={() => setSelectedSeat(selectedSeat)} />
          </main>
        )}
      </div>

      <Modal
        isOpen={Boolean(selectedSeat)}
        seat={selectedSeat}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
      <ToastViewport
        toasts={toasts}
        onDismiss={(id) => setToasts((current) => current.filter((toast) => toast.id !== id))}
      />
    </div>
  )
}
