import ShowTime from './ShowTime.jsx'

export default function TheatreCard({ theatre, shows }) {
  return (
    <section className="theatre-card">
      <h3>{theatre.name}</h3>
      <div className="showtime-list">
        {shows.map((show) => (
          <ShowTime key={show.id} show={show} />
        ))}
      </div>
    </section>
  )
}