export default function Seat({ label, state, onToggle }) {
  return (
    <button
      type="button"
      className={state}
      disabled={state === 'booked'}
      onClick={() => onToggle(label)}
      aria-label={`Seat ${label} ${state}`}
      aria-pressed={state === 'selected'}
    >
      {label.slice(1)}
    </button>
  )
}