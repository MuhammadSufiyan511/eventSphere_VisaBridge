import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = ({ bookingId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Ask backend for clientSecret
      const res = await fetch(
        "http://localhost:5000/api/payment/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ totalAmount: amount }),
        }
      );
      const { clientSecret } = await res.json();

      // 2️⃣ Confirm payment with Stripe.js
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await fetch("http://localhost:5000/api/bookings/update-status", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId, status: "paid" }),
        });
        alert("🎉 Payment successful!");
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-md p-3">
        <CardElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-300"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
};

export default function StripeCheckout({ bookingId, amount, onSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        bookingId={bookingId}
        amount={amount}
        onSuccess={onSuccess}
      />
    </Elements>
  );
}
