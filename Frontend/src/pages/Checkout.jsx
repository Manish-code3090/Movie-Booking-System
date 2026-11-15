import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { createBooking } from '../api/booking.api.js'

const FEE_PER_SEAT = 30
const TAX_RATE = 0.18
const methods = ['UPI', 'Card', 'Net banking']

export default function Checkout() {
  const { state } = useLocation()
  const [method, setMethod] = useState('UPI')
  const [phase, setPhase] = useState('review')
  const [error, setError] = useState('')
  const [conflict, setConflict] = useState(false)
  const [booking, setBooking] = useState(null)

  if (!state) return <Navigate to="/" replace />

  const subtotal = state.prices.reduce((sum, price) => sum + price, 0)
  const fee = state.seats.length * FEE_PER_SEAT
  const tax = Math.round(fee * TAX_RATE)
  const total = subtotal + fee + tax

  const pay = async () => {
    setPhase('processing')
    setError('')
    setConflict(false)
    try {
      const result = await createBooking({ showId: state.showId, seats: state.seats, paymentMethod: method })
      setBooking(result)
      setPhase('confirmed')
    } catch (err) {
      setError(err.message || 'Booking failed. Your seats were not reserved.')
      setConflict(err.code === 'SEAT_CONFLICT')
      setPhase('review')
    }
  }

  if (phase === 'confirmed' && booking) {
    return (
      <div className="checkout confirmation">
        <h1>Booking confirmed</h1>
        <p>Reference {booking.id}</p>
        <dl>
          <dt>Movie</dt>
          <dd>{booking.movie}</dd>
          <dt>Theatre</dt>
          <dd>{booking.theatre}</dd>
          <dt>Show</dt>
          <dd>{booking.date} at {booking.time}</dd>
          <dt>Seats</dt>
          <dd>{booking.seats.join(', ')}</dd>
          <dt>Paid</dt>
          <dd>₹{booking.amount}</dd>
        </dl>
        <Link to="/bookings" className="button-link">View my bookings</Link>
      </div>
    )
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <section className="summary">
        <h2>{state.movie}</h2>
        <p>{state.theatre} · {state.date} · {state.time}</p>
        <p>Seats: {state.seats.join(', ')}</p>
      </section>
      <section className="breakdown">
        <div><span>Tickets ({state.seats.length})</span><span>₹{subtotal}</span></div>
        <div><span>Convenience fee</span><span>₹{fee}</span></div>
        <div><span>Tax on fee (18%)</span><span>₹{tax}</span></div>
        <div className="total"><span>Total</span><span>₹{total}</span></div>
      </section>
      <section className="methods">
        <h2>Payment method</h2>
        {methods.map((item) => (
          <label key={item}>
            <input type="radio" name="method" value={item} checked={method === item} onChange={() => setMethod(item)} />
            {item}
          </label>
        ))}
      </section>
      {error && (
        <p className="status-box error" role="alert">
          {error}
          {conflict && <> <Link to={`/shows/${encodeURIComponent(state.showId)}/seats`}>Choose different seats</Link></>}
        </p>
      )}
      <button type="button" className="primary" disabled={phase === 'processing'} onClick={pay}>
        {phase === 'processing' ? 'Confirming with the server…' : `Pay ₹${total}`}
      </button>
    </div>
  )
}
