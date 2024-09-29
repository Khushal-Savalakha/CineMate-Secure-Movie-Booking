import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Purchases = () => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [noPurchases, setNoPurchases] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    } else {
      setError('User not logged in.');
      setLoading(false);
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/booking/search/', {
        email: user.email
      });
      if (response.data.length === 0) {
        setNoPurchases(true);
      } else {
        setBookings(response.data);
        setNoPurchases(false);
      }
    } catch (error) {
      console.log('Error fetching bookings:', error);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <p className="text-xl">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500">
      <p className="text-xl">{error}</p>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white py-8">
      <div className="container bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6 border-b-2 border-gray-600 pb-2">Your Purchases</h1>

        {noPurchases ? (
          <p className="text-lg text-gray-400">You have no purchases yet.</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-600 pb-1">Booking Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Movie Name:</span> {booking.movie_name}</p>
                <p><span className="font-medium">Date:</span> {booking.date}</p>
                <p><span className="font-medium">Time Slot:</span> {booking.time_slot}</p>
                <p><span className="font-medium">Seat Number:</span> {booking.seat_number}</p>
                <p><span className="font-medium">Amount:</span> ₹{booking.amount}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Purchases;
