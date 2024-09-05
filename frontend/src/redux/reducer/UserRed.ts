import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserTypes} from '../../types/UserTypes'

interface UserState{
    isAuthenticated: boolean;
    error: string | null;
    token: string | null;
    user: UserTypes | null
}

const initialState: UserState ={
    isAuthenticated: false,
    error: null,
    token: null,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginSuccess(state, action: PayloadAction<{user: UserTypes, token: string}>){
            state.isAuthenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
        },
        loginFailed(state, action: PayloadAction<{error: string}>){
            state.isAuthenticated = false
            state.error = action.payload.error
        },
        logout(state){
            state.isAuthenticated = false
            state.error= null
            state.token= null
            state.user= null
        }
    }
})

export const {loginSuccess,loginFailed, logout} = userSlice.actions
export default userSlice.reducer