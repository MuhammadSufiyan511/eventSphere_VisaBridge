import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../Services/Api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { clientSecret } = await createPaymentIntent({ totalAmount: booking.totalAmount });
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    fetchClientSecret();
  }, [booking]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      // Confirm the payment
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setError(confirmError.message);
      } else {
        // Payment successful
        alert('Payment successful!');
        // TODO: Update booking status to paid
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

const PaymentForm = ({ booking }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm booking={booking} />
    </Elements>
  );
};

export default PaymentForm;