import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all rooms
//Next url is localhost:3000 || the env host process.env.NEXT_PUBLIC_URL
export const getUser = createAsyncThunk('user/getUser', async () => {
    const { data } = await axios.get(`${NEXT_URL}/api/me`);
    return data;
})




const initialState = {
    loading: true,
    user: null,
    error: null,
    success: null,
    isAuthenticated: false 
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null
        }
    },
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            state.isAuthenticated = true
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.success ? action.payload.success : null
            state.user = action.payload?.user ? action.payload.user : null //checking to see if user object exists in the response before setting the state 
        },
        [getUser.pending]: (state, action) => {
            state.loading = true
        },
        [getUser.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearUserError } = userSlice.actions
export default userSlice.reducer
