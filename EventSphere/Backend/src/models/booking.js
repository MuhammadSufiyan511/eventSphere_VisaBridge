import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  numberOfTickets: {
    type: Number,
    required: true,
    min: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending',
  },
  stripeSessionId: {
    type: String,
  },
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
