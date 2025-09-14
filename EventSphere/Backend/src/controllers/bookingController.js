import Booking from '../models/booking.js';
import Event from '../models/event.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res, next) => {
  try {
    const { eventId, user, numberOfTickets } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    if (event.availableSeats < numberOfTickets) {
      res.status(400);
      throw new Error('Not enough seats available');
    }

    const totalAmount = event.price * numberOfTickets;

    const booking = new Booking({
      event: eventId,
      user,
      numberOfTickets,
      totalAmount,
    });

    const createdBooking = await booking.save();

    // Update available seats
    event.availableSeats -= numberOfTickets;
    await event.save();

    res.status(201).json(createdBooking);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).populate('event');
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    console.log("🛠 updateBookingStatus called. raw body:", req.body);

    // accept either bookingId in body or id in query/params for flexibility
    const bookingId =
      req.body?.bookingId || req.params?.id || req.query?.bookingId;

    if (!bookingId) {
      console.log("⚠️ no bookingId provided in request");
      return res.status(400).json({ message: "bookingId is required" });
    }

    console.log("🔎 looking up bookingId:", bookingId);

    const booking = await Booking.findById(bookingId).populate("event");
    if (!booking) {
      console.log("❌ booking not found for id:", bookingId);
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("✅ booking found. current status:", booking.status);

    booking.status = req.body.status || "paid";
    await booking.save();

    console.log("✅ booking updated to status:", booking.status);
    return res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    console.error("🔥 updateBookingStatus error:", error);
    res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};
