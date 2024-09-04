import { Router } from 'express';
import {createEvent,getEventsByRole,respondToEvent} from '../controllers/EventsController'
import verifyToken from '../middleware/verifyToken';

const eventsRouter = Router()

eventsRouter.post('/events', verifyToken, createEvent);
eventsRouter.get('/events', verifyToken, getEventsByRole);
eventsRouter.put('/events/:id/response', verifyToken, respondToEvent);

export {eventsRouter}
