const axios = require("axios");
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const path = require("path");
const app = express();
const stripe = Stripe(
  "sk_test_51Q37moFDgyVohtss21uGZgZKXSx6F8MXWikvLxOjR37XWP2AKmeJRVjrQp4VyMu0Dz5N8mnPMfXvjEXMh7M65Nax004MM4qiYl"
);

async function token() {
  let response = await axios.get("http://127.0.0.1:8000/seats/get-csrf-token/");
  return response.data.csrfToken;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files (if any front-end resources or public assets are available)
app.use(express.static(path.join(__dirname, "public")));

// Route for checkout session creation
app.post("/create-checkout-session", async (req, res) => {
  const {
    email,
    movie_name,
    date,
    time_slot,
    seat_number,
    amount,
    seat_status,
    movie_image, // Include movie_image in the request
  } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Movie Ticket: ${movie_name}`,
              description: `Seats: ${seat_number}, Date: ${date}, Time Slot: ${time_slot}`,
            },
            unit_amount: amount, // Amount is in cents (i.e., 100 cents = ₹1)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5000/success?email=${encodeURIComponent(
        email
      )}&movie_name=${encodeURIComponent(movie_name)}&date=${encodeURIComponent(
        date
      )}&time_slot=${encodeURIComponent(
        time_slot
      )}&seat_number=${encodeURIComponent(
        seat_number
      )}&amount=${amount}&seat_status=${encodeURIComponent(seat_status)}&movie_image=${encodeURIComponent(movie_image)}`,
      cancel_url: "http://localhost:5000/cancel", // Updated to Express server
      metadata: {
        email,
        movie_name,
        date,
        time_slot,
        seat_number,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "An error occurred during checkout" });
  }
});

// Success route
app.get("/success", async (req, res) => {
  let email = req.query.email;
  let movie_name = req.query.movie_name;
  let date = req.query.date;
  let time_slot = req.query.time_slot;
  let seat_number = req.query.seat_number;
  let amount = req.query.amount;
  let seat_status = req.query.seat_status;
  let movie_image = req.query.movie_image; // Extract movie image from query

  let selectedSlots = seat_number.split(",");
  seat_status = seat_status.split(",");

  try {
    const updatedSeatStatus = seat_status.map((status, index) => 
      selectedSlots.includes((index + 1).toString()) ? 0 : status
    );

    await axios.put(
      "http://127.0.0.1:8000/seats/updateseat/",
      {
        movie_name,
        date,
        time_slot,
        seat_status: updatedSeatStatus.join(","),
      },
      {
        headers: {
          "X-CSRFToken": await token(),
        },
      }
    );

    amount = parseInt(amount);
    amount = amount / 100;
    await axios.post(
      "http://127.0.0.1:8000/booking/add/",
      {
        email,
        movie_name,
        date,
        time_slot,
        seat_number,
        amount,
      },
      {
        headers: {
          "X-CSRFToken": await token(),
        },
      }
    );
  } catch (error) {
    console.log("Error booking tickets:", error);
  }

  res.send(`
    <html>
      <head>
        <title>Payment Success 🎉</title>
        <style>
          body {
            text-align: center;
            font-family: Arial, sans-serif;
            background-color: #001f3f; /* Dark Blue */
            padding: 50px;
            color: #ffffff;
          }
          h1 {
            color: #4CAF50;
            font-size: 3rem;
          }
          p {
            font-size: 1.5rem;
          }
          img {
            max-width: 300px;
            height: auto;
            margin: 20px 0;
            border-radius: 10px;
          }
          a {
            text-decoration: none;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border-radius: 5px;
            font-size: 1.2rem;
          }
          .receipt-link {
            margin-top: 20px;
            display: block;
            color: #FFD700; /* Gold color */
          }
        </style>
      </head>
      <body>
        <h1>Payment Successful! 🎉</h1>
        <p>Your ticket for <strong>${movie_name}</strong> has been successfully booked!</p>
        <img src="${movie_image}" alt="${movie_name} Movie Poster" />
        <p><strong>Details:</strong></p>
        <p>Seats: ${selectedSlots.join(", ")}</p>
        <p>Date: ${date}</p>
        <p>Time Slot: ${time_slot}</p>
        <p>Email: ${email}</p>
        <p>Total Price: ₹${amount}</p>
        <a href="http://localhost:5173/Booking">Back to Booking</a>
        <a class="receipt-link" href="/download-receipt?email=${encodeURIComponent(email)}&movie_name=${encodeURIComponent(movie_name)}&date=${encodeURIComponent(date)}&time_slot=${encodeURIComponent(time_slot)}&seat_number=${encodeURIComponent(seat_number)}&amount=${amount}">Download Receipt</a>
      </body>
    </html>
  `);
});

// Cancel route
app.get("/cancel", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Payment Cancelled</title>
        <style>
          body {
            text-align: center;
            font-family: Arial, sans-serif;
            background-color: #001f3f; /* Dark Blue */
            padding: 50px;
            color: #ffffff;
          }
          h1 {
            color: #f44336;
            font-size: 3rem;
          }
          p {
            font-size: 1.5rem;
          }
          a {
            text-decoration: none;
            padding: 10px 20px;
            background-color: #f44336;
            color: white;
            border-radius: 5px;
            font-size: 1.2rem;
          }
        </style>
      </head>
      <body>
        <h1>Payment Cancelled!</h1>
        <p>Your ticket booking has been cancelled.</p>
        <a href="http://localhost:5173/Booking">Back to Booking</a>
      </body>
    </html>
  `);
});

// Route to handle receipt download
app.get("/download-receipt", (req, res) => {
  const { email, movie_name, date, time_slot, seat_number, amount } = req.query;
  
  const receiptContent = `
    Movie Ticket Receipt
    --------------------
    Movie Name: ${movie_name}
    Seats: ${seat_number}
    Date: ${date}
    Time Slot: ${time_slot}
    Email: ${email}
    Total Price: ₹${amount}
  `;

  res.setHeader("Content-Disposition", "attachment; filename=receipt.txt");
  res.setHeader("Content-Type", "text/plain");
  res.send(receiptContent);
});

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
