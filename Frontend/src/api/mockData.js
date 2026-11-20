export const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

export const cities = ['Delhi', 'Patna', 'Mumbai', 'Bengaluru']

export const movies = [
  { id: 'm1', title: 'Midnight Express', genres: ['Thriller', 'Action'], language: 'Hindi', rating: 8.1, duration: 142, hue: 8, description: 'A night train, a stolen ledger and four hours to reach the last station before the evidence disappears.', cast: ['Aarav Mehta', 'Nisha Rao', 'Kabir Sen'] },
  { id: 'm2', title: 'Ganga Ghat Diaries', genres: ['Drama'], language: 'Hindi', rating: 8.6, duration: 128, hue: 38, description: 'Three generations of a boatman family on the riverbanks of Bihar deal with a changing town.', cast: ['Ritu Sinha', 'Pankaj Das', 'Meera Jha'] },
  { id: 'm3', title: 'Orbit Zero', genres: ['Sci-Fi', 'Adventure'], language: 'English', rating: 7.4, duration: 155, hue: 205, description: 'A maintenance crew on a failing orbital station has to choose between rescue and the mission.', cast: ['Dana Hale', 'Ivo Marsh', 'Lena Cho'] },
  { id: 'm4', title: 'Laddoo Wars', genres: ['Comedy', 'Family'], language: 'Hindi', rating: 7.2, duration: 119, hue: 48, description: 'Two rival sweet shops on the same lane compete for the biggest wedding order of the year.', cast: ['Sanjay Pillai', 'Tara Kapoor', 'Om Verma'] },
  { id: 'm5', title: 'Kaveri Rising', genres: ['Drama', 'Romance'], language: 'Tamil', rating: 8.0, duration: 137, hue: 150, description: 'An engineer returns to her village to rebuild a dam and meets the man who opposed it.', cast: ['Anitha Raj', 'Karthik S', 'Lakshmi N'] },
  { id: 'm6', title: 'Dark Harbour', genres: ['Horror'], language: 'English', rating: 6.9, duration: 108, hue: 275, description: 'A fishing town keeps a rule nobody explains: never light the lamp on the pier after the bell.', cast: ['Joel Reyes', 'Mina Park', 'Tom Ashby'] },
]

export const theatres = [
  { id: 't1', name: 'PVR Select City', city: 'Delhi', screens: 4 },
  { id: 't2', name: 'Cinepolis DLF', city: 'Delhi', screens: 6 },
  { id: 't3', name: 'Maurya Cinemas', city: 'Patna', screens: 3 },
  { id: 't4', name: 'Gold Cinema Boring Road', city: 'Patna', screens: 2 },
  { id: 't5', name: 'INOX Nariman Point', city: 'Mumbai', screens: 5 },
  { id: 't6', name: 'Carnival Andheri', city: 'Mumbai', screens: 4 },
  { id: 't7', name: 'PVR Orion', city: 'Bengaluru', screens: 7 },
  { id: 't8', name: 'INOX Garuda', city: 'Bengaluru', screens: 5 },
]

export const showTimes = ['10:30', '14:00', '18:15', '21:30']

export const seatRows = [
  { row: 'A', category: 'Premium', price: 320 },
  { row: 'B', category: 'Premium', price: 320 },
  { row: 'C', category: 'Executive', price: 220 },
  { row: 'D', category: 'Executive', price: 220 },
  { row: 'E', category: 'Executive', price: 220 },
  { row: 'F', category: 'Executive', price: 220 },
  { row: 'G', category: 'Normal', price: 150 },
  { row: 'H', category: 'Normal', price: 150 },
]

export const seatsPerRow = 10

export const buildShowId = (theatreId, movieId, date, time) => `${theatreId}|${movieId}|${date}|${time}`

export const parseShowId = (showId) => {
  const [theatreId, movieId, date, time] = showId.split('|')
  return { theatreId, movieId, date, time }
}

const bookedStore = {}

export const getBookedSeats = (showId) => {
  if (bookedStore[showId]) return bookedStore[showId]
  let hash = 0
  for (const char of showId) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  const seats = new Set()
  seatRows.forEach(({ row }) => {
    for (let n = 1; n <= seatsPerRow; n += 1) {
      hash = (hash * 1103515245 + 12345) >>> 0
      if (hash % 100 < 22) seats.add(`${row}${n}`)
    }
  })
  bookedStore[showId] = seats
  return seats
}

export const bookingsStore = []

export const users = []