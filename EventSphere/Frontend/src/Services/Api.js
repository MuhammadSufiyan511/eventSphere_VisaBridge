import axios from 'axios';
import mockEvents from '../Data/mockEvent';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Events
export const getEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('API Error, using mock data:', error);
    // Return mock data if API is not available
    return mockEvents;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    // Find in mock data as fallback
    return mockEvents.find(event => event._id === id) || null;
  }
};

// Bookings
export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

// Payments
export const createPaymentIntent = async (paymentData) => {
  const response = await api.post('/payments/create-intent', paymentData);
  return response.data;
};

export default api;