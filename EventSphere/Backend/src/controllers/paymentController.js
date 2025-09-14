import Stripe from "stripe";

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is missing. Check your .env file.");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
  });
};

// Controller
export const createPaymentIntent = async (req, res, next) => {
  try {
    const stripe = getStripe(); // initialized here, after dotenv
    const { totalAmount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

