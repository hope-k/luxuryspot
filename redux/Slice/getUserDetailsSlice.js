import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all rooms
//Next url is localhost:3000 || the env host process.env.NEXT_PUBLIC_URL
export const getUserDetails = createAsyncThunk('getUserDetails/getUserDetailsSlice', async (id) => {
    const { data } = await axios.get(`${NEXT_URL}/api/admin/users/${id}`);
    return data;
})




const initialState = {
    loading: true,
    user: {},
    error: null,
    success: null,

}

export const getUserDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: initialState,
    reducers: {
        clearUserDetailsError: (state) => {
            state.error = null
        }
    },
    extraReducers: {
        [getUserDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.success = action.payload?.success ? action.payload.success : null
            state.user = action.payload?.user ? action.payload.user : {} //checking to see if user object exists in the response before setting the state 
        },
        [getUserDetails.pending]: (state, action) => {
            state.loading = true
        },
        [getUserDetails.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearUserDetailsError } = getUserDetailsSlice.actions
export default getUserDetailsSlice.reducer
