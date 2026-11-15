
const calculateTotalAmount = (seats, pricePerSeat) => {
  return seats.length * pricePerSeat;
};

const bookedSeats = (bookings) => {
  const seats = [];
  for (const booking of bookings) {
    if (booking.status === "cancelled") {
      continue; // Skip cancelled bookings
    }
    for (const seat of booking.seats) {
      seats.push(seat);
    }
  }
  return seats;
};

const isSeatAvailable = (bookedSeats, requestedSeats) => {
  for (const seat of requestedSeats) {
    if (bookedSeats.includes(seat)) {
      return false;
    }
  }
  return true;
};

export  {calculateTotalAmount, isSeatAvailable, bookedSeats};