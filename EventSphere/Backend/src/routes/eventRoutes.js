import express from 'express';
import { getEvents, getEventById } from '../controllers/eventController.js';

const router = express.Router();

// GET /api/events - Get all events
router.get('/', getEvents);

// GET /api/events/:id - Get single event
router.get('/:id', getEventById);

export default router;