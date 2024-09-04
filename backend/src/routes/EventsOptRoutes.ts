import {Router} from 'express'
import {createEventOpt,deleteEventOpt,getEventOpt} from '../controllers/EventsOptController'
import verifyToken from '../middleware/verifyToken'

const eventsOptRouter = Router()

eventsOptRouter.post('/events-opt', verifyToken, createEventOpt)
eventsOptRouter.get('/events-opt', verifyToken, getEventOpt)
eventsOptRouter.delete('/events-opt/:id', verifyToken, deleteEventOpt)

export {eventsOptRouter}