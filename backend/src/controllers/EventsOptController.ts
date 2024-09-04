import { Request, Response } from 'express';
import EventsOpt from '../models/EventsOpt'

const createEventOpt = async (req: Request, res: Response) => {
    try {
        const hrId = (req as any).user.userId
        const { events_opt_name} = req.body;

        if (!events_opt_name) {
            return res.status(400).json({ message: 'Fields cannot be empty' });
        }

        const newEventOpt = await EventsOpt.create({
            events_opt_name,
            hr_id: hrId
        });

        return res.status(201).json(newEventOpt);
    } catch (error) {
        console.error('Error creating event option:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const getEventOpt = async (req: Request, res: Response)=>{
    try{
        const hrId = (req as any).user.userId

        const eventOpts = await EventsOpt.findAll({
            where: { hr_id: hrId }
        });

        return res.json(eventOpts);
    }catch(e){
        console.error('Error fetching event options:', e);
        return res.status(500).json({ message: 'Server Error' });
    }
}

const deleteEventOpt = async (req: Request, res: Response) => {
    try {
        const hrId = (req as any).user.userId;
        const id = parseInt(req.params.id, 10);

        const eventOpt = await EventsOpt.findOne({
            where: {
                events_opt_id: id,
                hr_id: hrId
            }
        });

        if (!eventOpt) {
            return res.status(404).json({ message: "Event not found" });
        }

        await eventOpt.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting event option:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export { getEventOpt, createEventOpt, deleteEventOpt };