
import express from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/bookingController.js';

const router = express.Router();

router.route('/').post(createBooking).get(getBookings);
router.put('/update-status', updateBookingStatus);

export default router;
