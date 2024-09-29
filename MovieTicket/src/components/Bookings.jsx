import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import './css/Booking.css'

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  const { movieName } = location.state || {}; // Destructure movieName from location state

  // Redirect to home if the user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to home page
    }
  }, [user, navigate]);

  // If movieName is not provided, show an error message or redirect
  if (!movieName) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
        Error: No movie selected
      </div>
    );
  }

  const [slots, setSlots] = useState(
    Array.from({ length: 24 }, (_, i) => i + 1)
  );
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [seatStatus, setSeatStatus] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const ticketPrice = 250;

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/seats/get-csrf-token/"
      );
      setCsrfToken(response.data.csrfToken);
    } catch (error) {
      console.log("Error fetching CSRF token:", error);
    }
  };

  const fetchSeatStatus = async () => {
    if (movieName && selectedDate && selectedTimeSlot) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/seats/seatsdata/",
          {
            movie_name: movieName,
            date: selectedDate.toISOString().split("T")[0],
            time_slot: selectedTimeSlot,
          }
        );

        if (response.status === 200) {
          const seatStatusArray = response.data.seat_status
            .split(",")
            .map(Number);
          setSeatStatus(seatStatusArray);
        }
      } catch (error) {
        console.error("Error fetching seat status:", error);
      }
    }
  };

  const handleSlotClick = (slot) => {
    if (!selectedTimeSlot) {
      alert("Please select a time slot first.");
      return;
    }

    const isBooked = seatStatus[slot - 1] === 0;
    if (isBooked) return;

    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((s) => s !== slot)
        : [...prevSlots, slot]
    );
  };

  const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      return currentDate;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedSlots([]);
    setSelectedTimeSlot("");
    setSeatStatus([]);
  };

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
    setSelectedSlots([]);
  };

  useEffect(() => {
    if (movieName && selectedDate && selectedTimeSlot) {
      fetchSeatStatus();
    }
  }, [movieName, selectedDate, selectedTimeSlot]);

  const selectedDateStr = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1
    }/${selectedDate.getFullYear()}`;
  const totalPrice = selectedSlots.length * ticketPrice;

  const makePayment = async () => {
    if (selectedSlots.length === 0 || !selectedTimeSlot) {
      alert("Please select at least one slot and a time slot.");
      return;
    }
    const stripe = await loadStripe(
      "pk_test_51Q37moFDgyVohtssMBKZtx7aXn0a7YdVV0EcXLRd0XL4sAgxHdFdwF9hA9yriHwaYYqgMw2VHHReiWQoImoSvKjc00ZHGK6KlD"
    );

    const body = {
      "email": user.email,
      "movie_name": movieName,
      "date": selectedDate.toISOString().split("T")[0],
      "time_slot": selectedTimeSlot,
      "seat_number": selectedSlots.join(","),
      "amount": totalPrice * 100, // Stripe uses amount in cents
      "seat_status": seatStatus,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white pt-20">
      <div className="container text-center bg-gray-700 p-6 rounded-lg shadow-lg">
        <div className="title text-2xl font-bold mb-5">
          Movie Name: {movieName}
        </div>

        <div className="date-selector flex overflow-x-auto justify-between mb-5">
          {generateDates().map((date, index) => (
            <div
              key={index}
              className={`date-option p-2 rounded-md cursor-pointer transition-all ${date.toDateString() === selectedDate.toDateString()
                ? "bg-blue-500 text-white font-bold scale-105"
                : "bg-gray-200 text-gray-600 hover:bg-gray-400 hover:text-white"
                }`}
              onClick={() => handleDateClick(date)}
            >
              {`${date.getDate()}/${date.getMonth() + 1
                }/${date.getFullYear()} (${date.toLocaleDateString("en-US", {
                  weekday: "short",
                })})`}
            </div>
          ))}
        </div>


        <div className="time-slot-selector mb-5">
          <label className="block mb-2 text-lg font-semibold">
            Select Time Slot:
          </label>
          <select
            value={selectedTimeSlot}
            onChange={handleTimeSlotChange}
            className="p-2 bg-gray-300 text-black rounded-lg"
          >
            <option value="" disabled>
              -- Select Time Slot --
            </option>
            <option value="10:00AM-12:00PM">10:00 AM to 12:00 PM</option>
            <option value="6:00PM-8:30PM">6:00 PM to 8:30 PM</option>
          </select>
        </div>
        {/* <div className="screen w-full h-8 bg-gray-500 rounded-md relative mb-5">
          <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 font-bold text-gray-300">
            SCREEN
          </span>
        </div> */}
        <div className="w-full flex flex-col items-center mb-4">
          <div className="text-white text-center mb-2 font-bold">
            SCREEN THIS WAY
          </div>
          <div className="bg-blue-300 w-2/3 h-2 rounded-t-full shadow-lg shadow-gray-500 border border-white border-[rgba(128,128,128,0.6)] -mb-1"></div>
        </div>

        <br />
        <br />


        <div className="grid grid-cols-6 gap-3 mb-5">
          {slots.map((slot, index) => {
            const isBooked = seatStatus[index] === 0;
            return (
              <div
                key={index}
                className={`slot w-12 h-12 flex items-center justify-center rounded cursor-pointer transition-all text-sm font-bold  ${isBooked
                  ? "bg-gray-900 cursor-not-allowed text-gray-300"
                  : selectedSlots.includes(slot)
                    ? "bg-green-600 text-white"
                    : "bg-gray-400 hover:bg-gray-600 text-black"
                  }`}
                style={{ marginLeft: "95px" }}
                onClick={() => handleSlotClick(slot)}
              >
                {slot}
              </div>
            );
          })}
        </div>

        <button
          onClick={makePayment}
          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all mb-5"
        >
          Book Tickets
        </button>

        <div className="summary bg-black p-4 rounded text-left">
          <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
          <p>
            <strong>Movie Name:</strong> {movieName}
          </p>
          <p>
            <strong>Date:</strong> {selectedDateStr}
          </p>
          <p>
            <strong>Time Slot:</strong> {selectedTimeSlot}
          </p>
          <p>
            <strong>Seats:</strong> {selectedSlots.join(", ") || "None"}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
