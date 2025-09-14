import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import { createBooking } from '../services/api';

const BookingForm = ({ event }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [booking, setBooking] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        eventId: event._id,
        user,
        numberOfTickets,
      };
      const newBooking = await createBooking(bookingData);
      setBooking(newBooking);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (booking) {
    return <PaymentForm booking={booking} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Number of Tickets:</label>
        <input
          type="number"
          min="1"
          max={event.availableSeats}
          value={numberOfTickets}
          onChange={(e) => setNumberOfTickets(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Proceed to Payment</button>
    </form>
  );
};

export default BookingForm;