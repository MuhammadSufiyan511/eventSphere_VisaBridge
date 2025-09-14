import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';

const router = express.Router();

router.route('/create-payment-intent').post(createPaymentIntent);

export default router;