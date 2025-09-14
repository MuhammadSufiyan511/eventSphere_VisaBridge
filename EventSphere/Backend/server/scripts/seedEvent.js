import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { completeEventData } from '../Data/eventData.js';
import Event from '../../src/models/event.js';

dotenv.config();

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');
    
    // Insert new events
    await Event.insertMany(completeEventData);
    console.log('Added 50 events to database');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding events:', error);
    process.exit(1);
  }
};

seedEvents();