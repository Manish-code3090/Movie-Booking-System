import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getShowSeats } from '../api/theatre.api.js'
import Seat from '../components/Seat.jsx'
import Status from '../components/Status.jsx'

const MAX_SEATS = 6

export default function SeatSelection() {
  const { showId } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState([])
  const [notice, setNotice] = useState('')

  const load = () => {
    setLoading(true)
    setError('')
    getShowSeats(decodeURIComponent(showId))
      .then((result) => setData(result))
      .catch((err) => setError(err.message || 'Could not load seats'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [showId])

  const priceByRow = useMemo(() => {
    const map = {}
    data?.rows.forEach((row) => {
      map[row.row] = row.price
    })
    return map
  }, [data])

  const subtotal = selected.reduce((sum, label) => sum + priceByRow[label[0]], 0)

  const toggle = (label) => {
    setNotice('')
    setSelected((current) => {
      if (current.includes(label)) return current.filter((item) => item !== label)
      if (current.length >= MAX_SEATS) {
        setNotice(`You can select up to ${MAX_SEATS} seats`)
        return current
      }
      return [...current, label]
    })
  }

  const proceed = () => {
    navigate('/checkout', {
      state: {
        showId: data.show.id,
        movie: data.movie.title,
        theatre: data.theatre.name,
        date: data.show.date,
        time: data.show.time,
        seats: selected,
        prices: selected.map((label) => priceByRow[label[0]]),
      },
    })
  }

  const categories = data
    ? data.rows.reduce((groups, row) => {
        const last = groups[groups.length - 1]
        if (last && last.category === row.category) last.rows.push(row)
        else groups.push({ category: row.category, price: row.price, rows: [row] })
        return groups
      }, [])
    : []

  return (
    <div className="seat-page">
      <Status loading={loading} error={error}>
        {data && (
          <>
            <header className="seat-header">
              <h1>{data.movie.title}</h1>
              <p>{data.theatre.name} · {data.show.date} · {data.show.time}</p>
            </header>
            <div className="seat-map">
              <div className="screen" />
              <p className="screen-label">Screen this way</p>
              {categories.map((group) => (
                <div key={group.category} className="seat-group">
                  <h3>{group.category} · ₹{group.price}</h3>
                  {group.rows.map((row) => (
                    <div key={row.row} className="seat-row">
                      <span>{row.row}</span>
                      {row.seats.map((seat) => (
                        <Seat key={seat.label} label={seat.label} state={seat.booked ? 'booked' : selected.includes(seat.label) ? 'selected' : 'available'} onToggle={toggle} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <ul className="legend">
              <li><i className="available" />Available</li>
              <li><i className="selected" />Selected</li>
              <li><i className="booked" />Booked</li>
            </ul>
            <footer className="seat-footer">
              <div>
                <strong>{selected.length ? selected.join(', ') : 'No seats selected'}</strong>
                <p>{notice || `Subtotal ₹${subtotal}`}</p>
              </div>
              <button type="button" disabled={!selected.length} onClick={proceed}>Continue to checkout</button>
            </footer>
          </>
        )}
      </Status>
    </div>
  )
}
