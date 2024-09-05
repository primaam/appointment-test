import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {EventsOptTypes, EventsTypes} from '../../types/EventsTypes'

interface EventState{
    error: string | null;
    events: EventsTypes[]
}

const initialState: EventState = {
    error: null,
    events: []
}

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers:{
        getEventsSuccess(state, action: PayloadAction<EventsTypes[]>){
            state.events = action.payload
        },
        getEventsFailed(state, action: PayloadAction<{message: string}>){
            state.error = action.payload.message            
        }
    }
})

export const {getEventsFailed,getEventsSuccess} = eventsSlice.actions
export default eventsSlice.reducer