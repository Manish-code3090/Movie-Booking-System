import { useEffect, useState } from 'react'
import { getMyBookings } from '../api/booking.api.js'
import Status from '../components/Status.jsx'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getMyBookings()
      .then((data) => {
        if (active) setBookings([...data])
      })
      .catch((err) => {
        if (active) setError(err.message || 'Could not load bookings')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="bookings">
      <h1>My bookings</h1>
      <Status loading={loading} error={error} empty={!bookings.length} emptyText="You have no bookings yet. Pick a movie on the home page to book seats.">
        <ul className="booking-list">
          {bookings.map((item) => (
            <li key={item.id}>
              <div>
                <h3>{item.movie}</h3>
                <p>{item.theatre}</p>
                <p>{item.date} at {item.time} · Seats {item.seats.join(', ')}</p>
              </div>
              <div className="booking-side">
                <span className="badge">{item.status}</span>
                <strong>₹{item.amount}</strong>
                <small>{item.id}</small>
              </div>
            </li>
          ))}
        </ul>
      </Status>
    </div>
  )
}
