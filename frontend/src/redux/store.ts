import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/UserRed'
import eventsOptReducer from './reducer/EventsOptRed'

const store = configureStore({
    reducer:{
        userReducer,
        eventsOptReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store