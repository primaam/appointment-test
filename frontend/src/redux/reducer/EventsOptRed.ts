import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {EventsOptTypes} from '../../types/EventsTypes'

interface EventsOptState{
    option: EventsOptTypes[];
    error: string | null;
}

const initialState: EventsOptState = {
    option: [],
    error: null
}

const eventsOptSlice = createSlice({
    name: 'eventsOpt',
    initialState,
    reducers:{
        getEventsOptSuccess(state, action){
            const data = action.payload.map((item: any)=>{
                return {
                    eventsOptId: item.events_opt_id,
                    eventsOptName: item.events_opt_name,
                    userId: item.hr_id
                }
            })

            state.option = data
        },
        getEventsOptFailed(state, action: PayloadAction<{message: string}>){
            state.error = action.payload.message            
        }
    }
})

export const {getEventsOptFailed,getEventsOptSuccess} = eventsOptSlice.actions
export default eventsOptSlice.reducer