import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
//thunk action to get all rooms



export const allAdminBookings = createAsyncThunk('allAdminBookings/allAdminBookings', async () => {

    try {

        const { data } = await axios.get(`/api/admin/bookings`);
        return data

    } catch (err) {
        return err
    }

})




const initialState = {
    bookings: [],
    loading: true,
    error: null,
    success: null


}

export const allAdminBookingsSlice = createSlice({
    name: 'allAdminBookingsSlice',
    initialState: initialState,
    reducers: {
        clearAdminBookingsError: (state) => {
            state.error = null
        },        
        resetAdminBookings: (state) => {
            state.success = null
        },
    },
    extraReducers: {
        [allAdminBookings.fulfilled]: (state, action) => {
            state.loading = false
            state.error = action.payload?.error ? action.payload.error : null
            state.bookings = action.payload?.bookings ? action.payload.bookings : []
            state.success = action.payload?.success ? action.payload.success : null
        },
        [allAdminBookings.pending]: (state, action) => {
            state.loading = true
        },
        [allAdminBookings.rejected]: (state) => {
            state.loading = false
        }



    }
})
export const { clearAdminBookingsError, resetAdminBookings } = allAdminBookingsSlice.actions
export default allAdminBookingsSlice.reducer


