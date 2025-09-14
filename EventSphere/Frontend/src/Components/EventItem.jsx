import React from 'react';
import { Link } from 'react-router-dom';

const EventItem = ({ event }) => {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Category: {event.category}</p>
      <p>Price: ${event.price}</p>
      <p>Available Seats: {event.availableSeats}</p>
      <Link to={`/bookings?eventId=${event._id}`}>Book Now</Link>
    </div>
  );
};

export default EventItem;