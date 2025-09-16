import React, { useState, useEffect } from 'react';
import UserBookings from '../components/UserBookings';
import { getBookings } from '../Services/Api';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // In a real app, you would pass the user ID
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Dashboard</h1>
        {loading ? (
          <p>Loading your bookings...</p>
        ) : (
          <UserBookings bookings={bookings} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;