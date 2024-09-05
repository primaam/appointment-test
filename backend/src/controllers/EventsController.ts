import { Request, Response } from 'express';
import Events from '../models/Events';
import User from '../models/User';
import EventsOpt from '../models/EventsOpt';

const createEvent = async (req: Request, res: Response) => {
    try {
        const hrId = (req as any).user.userId;
        const { vendor_id, events_opt_id, proposed_dates, location, description } = req.body;

        const newEvent = await Events.create({
            hr_id: hrId,
            vendor_id,
            events_opt_id,
            proposed_dates,
            location,
            description,
        });

        return res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const getEventsByRole = async(req:Request, res: Response)=>{
    try {
        const userRole = (req as any).user.role
        const id = (req as any).user.userId

        if(userRole === "ADMIN"){
            const events = await Events.findAll()
            return res.json(events)
        }else if(userRole === "HR"){
            const events = await Events.findAll({
                where: {hr_id : id},
                include:[
                    {model: EventsOpt, attributes: ['events_opt_name']},
                    {model: User, attributes: ['company_name']}
                ]
            })

            return res.json(events);
        }else if(userRole === "VENDOR"){
            const events = await Events.findAll({
                where: {vendor_id : id},
                include:[
                    {model: EventsOpt, attributes: ['events_opt_name']},
                    {model: User,as: "Vendor", attributes: ['company_name']}
                ]
            })

            return res.status(200).json(events);
        }else{
            return res.status(403).json({ message: 'Access Denied' });
        }
    } catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

const respondToEvent = async (req: Request, res: Response) => {
    try {
        const userRole = (req as any).user.role;
        const vendorId = (req as any).user.userId;
        const { id } = req.params;
        const { confirmed_date, status, rejection_remarks } = req.body;

        if (userRole == "HR") {
            return res.status(403).json({ message: 'You are not authorized to response this event' });
        }

        const event = await Events.findOne({ where: { events_id: id, vendor_id: vendorId } });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.confirmed_date = confirmed_date;
        event.status = status;
        event.rejection_remarks = rejection_remarks;

        await event.save();

        return res.json(event);
    } catch (error) {
        console.error('Error responding to event:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export {createEvent, getEventsByRole, respondToEvent}
