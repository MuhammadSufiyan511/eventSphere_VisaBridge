import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./server/config/db.js"; 


import eventRoutes from "./src/routes/eventRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";


dotenv.config();

console.log("Stripe Key Loaded:", process.env.STRIPE_SECRET_KEY ? "Yes" : "No");
const app = express();
app.use((req, res, next) => {
  console.log("⤷ Incoming request:", req.method, req.url);
  next();
});
// Middleware
app.use(cors());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
connectDB();

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
console.log("✅ Booking routes mounted at /api/bookings");
app.use("/api/payment", paymentRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});