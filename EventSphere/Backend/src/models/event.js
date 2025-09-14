import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,  // contains both date + time
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Music', 'Arts', 'Sports'], // match your seedData categories
  },
  price: {
    type: Number,
    required: true,
    min: 10,
    max: 200,
  },
  availableTickets: {   // 👈 changed from availableSeats
    type: Number,
    required: true,
    min: 0,
  },
  image: {   // 👈 changed from imageUrl
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
