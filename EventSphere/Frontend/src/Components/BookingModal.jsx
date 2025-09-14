import React, { useState } from "react";
import StripeCheckout from "./StripeCheckout";

const BookingModal = ({ event, onClose }) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [step, setStep] = useState("details"); // 'details' or 'payment'
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const totalPrice = (event.price || 0) * ticketCount;

  // Create booking on the server and then go to payment step
  const handleBooking = async () => {
    try {
      setLoading(true);

      // Create booking on backend first (status: pending)
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event._id,
          user: {
            name: "Guest User",           // replace with real user when available
            email: "guest@example.com",
          },
          numberOfTickets: ticketCount,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Booking creation failed" }));
        throw new Error(err.message || "Booking creation failed");
      }

      const booking = await res.json();
      // store bookingId for the payment step
      setBookingId(booking._id);

      // move to payment step
      setStep("payment");
    } catch (err) {
      console.error("Create booking error:", err);
      alert("Could not create booking: " + (err.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Called by StripeCheckout after payment success
  const handlePaymentSuccess = async () => {
    if (!bookingId) {
      console.error("No bookingId - cannot update status");
      alert("Booking ID missing. Please contact support.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/bookings/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: "paid" }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Failed to update booking" }));
        throw new Error(err.message || "Failed to update booking");
      }

      alert("🎉 Booking confirmed & paid!");
      onClose();
    } catch (err) {
      console.error("Update booking status error:", err);
      alert("Payment succeeded but we couldn't update booking status. Contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            🎟 Book Tickets – {event.title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">✕</button>
        </div>

        <div className="p-6">
          {step === "details" ? (
            <>
              <div className="mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(event.date).toLocaleDateString()} <br />
                  <span className="font-semibold">Location:</span>{" "}
                  {event.location}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tickets">Number of Tickets</label>
                <input
                  type="number"
                  id="tickets"
                  min="1"
                  max={event.availableTickets}
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Math.max(1, Number(e.target.value || 1)))}
                  className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-sm text-gray-500 mt-1">Available: {event.availableTickets}</p>
              </div>

              <div className="mb-6">
                <p className="text-lg font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</p>
              </div>

              <div className="flex justify-end space-x-3">
                <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg">Cancel</button>
                <button
                  onClick={handleBooking}
                  disabled={loading || ticketCount < 1 || ticketCount > event.availableTickets}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow disabled:opacity-50"
                >
                  {loading ? "Please wait..." : "Continue to Payment"}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4 text-sm text-gray-600">You're paying <strong>${totalPrice.toFixed(2)}</strong> for {ticketCount} ticket(s).</p>
              {/* pass bookingId and amount to StripeCheckout */}
              <StripeCheckout bookingId={bookingId} amount={totalPrice} onSuccess={handlePaymentSuccess} />
              <button onClick={() => setStep("details")} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg">← Back</button>
              {loading && <p className="text-center mt-3 text-sm text-gray-600">Processing...</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
